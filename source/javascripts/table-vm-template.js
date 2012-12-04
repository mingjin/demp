$(function() {
  $("#btn-create-template").click(function() {
    $("#create-template-popup").modal({
      "backdrop"  : "static",
      "keyboard"  : true,
      "show"      : true                 
    });
  });
  $("#btn-save-template").click(function() {
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
