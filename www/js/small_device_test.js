$(document).ready(function(){
  $("#container").load("./home.php");
});
function changeTab(x){
  var url = "../"+x+".php";
  $("#container").load(url);
}
