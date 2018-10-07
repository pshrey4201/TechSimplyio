if($( window ).width() <= 1000){
      $("#deviceready").load("../small_screen.php");
} else {
      $("#deviceready").load("../big_screen.php");
}
