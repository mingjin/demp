var $wizard = null, newNodes = [], wizardInitState = null;
function textBoxToLabel($txt) {
  $txt.parent().html($txt.val());
}
function initNodeWizard(wizard) {
  wizard.formwizard({ 
    formPluginEnabled: true,
    validationEnabled: true,
    focusFirstInput : true,
    disableUIStyles : true,

    formOptions :{
      success: function(data){$("#status").fadeTo(500,1,function(){ $(this).html("<span>Form was submitted!</span>").fadeTo(5000, 0); })},
      beforeSubmit: function(data){$("#submitted").html("<span>Form was submitted with ajax. Data sent to the server: " + $.param(data) + "</span>");},
      dataType: 'json',
      resetForm: true
    }
  });	
  $("#step2-create-node").click(function(e) {
    var table = document.getElementById("tb-env-nodes-list").tBodies[0],
    txtNodeName = $("<input>").attr("type","text"),
    txtVMTemplate = $("<input>").attr("type","text"),
    txtProperty = $("<input>").attr("type","text"),
    btnDel = $("<span>").attr("class","btn").append($("<i>").attr("class", "icon-remove"));
    btnDel.click(removeCurrentRow);
    txtProperty.blur(function() {
      newNodes.push({
        Name: txtNodeName.val(),
        Template: txtVMTemplate.val(),
        Property: txtProperty.val()
      });
      textBoxToLabel(txtNodeName);
      textBoxToLabel(txtVMTemplate);
      textBoxToLabel(txtProperty);
    });

    var newRow = table.insertRow(0);
    $(newRow.insertCell(0)).append(txtNodeName);
    $(newRow.insertCell(1)).append(txtVMTemplate);
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


      $("#btn-do-create-node").one("click", function(e) {
        e.preventDefault();
        $("#create-node-popup").modal('hide');
        createTableRow($("#tb-vm-multi-nodes"), [
                      $("#txt-name").val(),
                      $("#txt-desc").val(),
                      newNodes.length,
                      $("#cb-public")[0].checked ? "是" : "否",
                      $("<span>").attr("class", "label").html("未启动")
        ]);
        document.getElementById("form-wizard").reset();

        wizard.html(wizardInitState);
        initNodeWizard(wizard);
        return false;
      });
    }
	});
}
$(function() {
  $wizard = $("#form-wizard");
  wizardInitState = $wizard.html();
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
