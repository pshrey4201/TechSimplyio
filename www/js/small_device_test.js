$(document).ready(function(){
  $("#container").load("../home.php");
});
  var clickCount = 0;
    var oldX;
function changeTab(x){
    var url = "../"+x+".php";
    $("#container").load(url);

  // if (clickCount === 0 ){
  //   document.getElementById(x).style.animation = "changeAnimation 1s ease normal forwards";
  //   document.getElementById(x).style.animationPlayState = "running";
  //   clickCount += 1;
  //   oldX = x;
  // } else {
  //   // clickCount = 0;
  //   document.getElementById(x).style.animation = "changeAnimation 1s ease normal forwards";
  //   document.getElementById(x).style.animationPlayState = "running";
  //   document.getElementById(oldX).style.animation = "closeAnimation 1s ease normal forwards";
  //   document.getElementById(oldX).style.animationPlayState = "running";
  //   oldX = x;
  // }
}
