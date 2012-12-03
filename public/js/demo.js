function removeCurrentRow() {
  if(confirm("您确定要删除吗？"))
    $(this).parent().parent().remove();
}

function createTableRow(table, vals) {
  var table = table.tBodies[0],
  newRow = table.insertRow(0),
  delCell = null,
  btnDel = $("<input>").attr("type", "button").attr("value", "删除").attr("class", "btn btn-mini");
  btnDel.click(removeCurrentRow);

  vals.forEach(function(val, idx) {
    var cell = $(newRow.insertCell(idx));
    cell.html(val);
  });
  delCell = $(newRow.insertCell(vals.length));
  delCell.append(btnDel);

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
    createTableRow(document.getElementById("tb-vm-template"), [
                   $("#txt-name").val(),
                   $("#txt-desc").val(),
                   $("#ddl-os").val(),
                   "16GB",
                   $("#cb-public")[0].checked ? "是" : "否"
    ]);
    document.getElementById("form-vm-template").reset();
  });


});
