var $wizard = null, newNodes = [];
function formValToLabel($txt) {
  $txt.parent().html($txt.val());
}
function resetWizard(wizard) {
  wizard[0].reset();
  wizard.formwizard("reset");
  removeAllRows($("#tb-env-nodes-list"));
  $("#collapseGTwo > .widget-content").html('');
  newNodes = [];
}
function drawVMTemplatesDDL(argument) {
  var ddl = $("<select>");
  ["应用服务器", "Apache服务器", "数据库服务器"].forEach(function(val) {
    ddl.append($("<option>").text(val).val(val));
  });
  return ddl;
}
function initNodeWizard(wizard) {
  wizard.formwizard({ 
    formPluginEnabled: true,
    validationEnabled: true,
    focusFirstInput : true,
    disableUIStyles : true,
    textBack: "上一步",
    textNext: "下一步",
    textSubmit: "添加",

    formOptions :{
      dataType: 'json',
      resetForm: true
    }
  });	
  $("#step2-create-node").click(function(e) {
    var table = document.getElementById("tb-env-nodes-list").tBodies[0],
    txtNodeName = $("<input>").attr("type","text"),
    ddlVMTemplate = drawVMTemplatesDDL(),
    txtProperty = $("<input>").attr("type","text"),
    btnDel = $("<span>").attr("class","btn").append($("<i>").attr("class", "icon-remove"));
    btnDel.click(removeCurrentRow);
    txtProperty.blur(function() {
      newNodes.push({
        Name: txtNodeName.val(),
        Template: ddlVMTemplate.val(),
        Property: txtProperty.val()
      });
      formValToLabel(txtNodeName);
      formValToLabel(ddlVMTemplate);
      formValToLabel(txtProperty);
    });

    var newRow = table.insertRow(0);
    $(newRow.insertCell(0)).append(txtNodeName);
    $(newRow.insertCell(1)).append(ddlVMTemplate);
    $(newRow.insertCell(2)).append(txtProperty);
    $(newRow.insertCell(3)).append(btnDel);

    table.appendChild(newRow);
  });
  wizard.on("step_shown", function(event, data){

    if(data.isLastStep) {
      $("#sp-node-name").text($("#txt-name").val());
      $("#sp-node-desc").text($("#txt-desc").val());
      $("#sp-node-public").text($("#cb-public")[0].checked ? "是" : "否");
      newNodes.forEach(function(node) {
        $("#collapseGTwo > .widget-content").append($("<span>").text(node.Name)).append("<br>");
      });
    }
	});
  wizard.ajaxComplete(function(e) {
    $("#create-node-popup").modal('hide');
    createTableRow($("#tb-vm-multi-nodes"), [
                  $("#txt-name").val(),
                  $("#txt-desc").val(),
                  newNodes.length,
                  $("#cb-public")[0].checked ? "是" : "否",
                  $("<span>").attr("class", "label").html("未启动")
    ]);
    resetWizard(wizard);
    return false;
  });
}
$(function() {
  $wizard = $("#form-wizard");
  initNodeWizard($wizard);
  $("#btn-create-node").click(function(e) {
    e.preventDefault();
    $("#create-node-popup").modal({
      "backdrop"  : "static",
      "keyboard"  : true,
      "show"      : true                 
    });
  });
});
