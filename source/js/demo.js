function removeCurrentRow(e) {
  e.preventDefault();
  if(confirm("您确定要删除吗？"))
    $(this).parent().parent().remove();
}

function createTableRow(table, vals) {
  var table = table.tBodies[0],
  newRow = table.insertRow(0),
  cbCell = optCell = null,
  btnTeamVisible = $("<button>").attr("class","btn").append($("<i>").attr("class","icon-user")).tooltip({title:"团队可见"}),
  btnGlobalVisible = $("<button>").attr("class","btn").append($("<i>").attr("class","icon-eye-open")).tooltip({title:"整体可见"}),
  btnHide = $("<button>").attr("class","btn").append($("<i>").attr("class","icon-circle-arrow-down")).tooltip({title:"隐藏"}),
  btnDel = $("<button>").attr("class","btn").append($("<i>").attr("class","icon-remove")).tooltip({title:"删除"});
//<div class="btn-group">
//<button class="btn"><i class="icon-play"></i></button>
//<button class="btn"><i class="icon-stop"></i></button>
//<button class="btn"><i class="icon-retweet"></i></button>
//<button class="btn"><i class="icon-remove"></i></button>
//</div>
  btnDel.click(removeCurrentRow);

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
    createTableRow(document.getElementById("tb-vm-template"), [
                   $("#txt-name").val(),
                   $("#txt-keywords").val(),
                   $("#ddl-os").val(),
                   "16GB",
                   $("#cb-public")[0].checked ? "是" : "否",
                   $("<span>").attr("class", "label").html("未启动")
    ]);
    document.getElementById("form-vm-template").reset();
  });
});
