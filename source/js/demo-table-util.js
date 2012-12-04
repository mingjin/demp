function removeCurrentRow(e) {
  e.preventDefault();
  if(confirm("您确定要删除吗？"))
    $(this).parent().parent().remove();
}
function removeAllRows($table) {
  $table.find("tbody > tr").remove();
};

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
