function removeCurrentRow(e) {
  e.preventDefault();
  if(confirm("您确定要删除吗？"))
    $(this).parent().parent().remove();
}

function createTableRow($table, vals) {
  var table = $table[0].tBodies[0],
  newRow = table.insertRow(0),
  cbCell = optCell = null,
  btnTeamVisible = $("<button>").attr("class","btn").append($("<i>").attr("class","icon-user")).tooltip({title:"团队可见"}),
  btnGlobalVisible = $("<button>").attr("class","btn").append($("<i>").attr("class","icon-eye-open")).tooltip({title:"整体可见"}),
  btnHide = $("<button>").attr("class","btn").append($("<i>").attr("class","icon-circle-arrow-down")).tooltip({title:"隐藏"}),
  btnDel = $("<button>").attr("class","btn").append($("<i>").attr("class","icon-remove")).tooltip({title:"删除"});
  btnDel.click(removeCurrentRow);

  //$table.dataTable().fnAddData([
    //$('<div>').append(btnTeamVisible).html(),"FOO","FOO","FOO","FOO","FOO","FOO","FOO"
  //]);

  cbCell = $(newRow.insertCell(0));
  cbCell.append($("<div>").attr("class","checker").append($("<span>").append($("<input>").attr("type", "checkbox").attr("opacity","0"))));
  vals.forEach(function(val, idx) {
    var cell = $(newRow.insertCell(idx + 1));
    cell.html(val);
  });
  optCell = $(newRow.insertCell(vals.length + 1));
  optCell.append(btnTeamVisible);
  optCell.append(btnGlobalVisible);
  optCell.append(btnHide);
  optCell.append(btnDel);

  table.appendChild(newRow);
}

$(function() {
  $("#btn-create-template").click(function() {
    $("#create-template-popup").modal({
      "backdrop"  : "static",
      "keyboard"  : true,
      "show"      : true                 
    });
  });
  $("#btn-save").click(function() {
    $("#create-template-popup").modal('hide');
    createTableRow($("#tb-vm-template"), [
                   $("#txt-name").val(),
                   $("#txt-keywords").val(),
                   $("#ddl-os").val(),
                   "16GB",
                   $("#cb-public")[0].checked ? "是" : "否",
                   $("<span>").attr("class", "label").html("未启动")
    ]);
    document.getElementById("form-vm-template").reset();
  });
  $("#tb-vm-template_wrapper td>button.btn>i.icon-user").tooltip({title: "团队可见"});
  $("#tb-vm-template_wrapper td>button.btn>i.icon-eye-open").tooltip({title: "整体可见"});
  $("#tb-vm-template_wrapper td>button.btn>i.icon-circle-arrow-down").tooltip({title: "隐藏"});
  $("#tb-vm-template_wrapper td>button.btn>i.icon-remove").tooltip({title: "删除"});
});
