if($( window ).width() <= 800){
      $("#deviceready").load("../small_screen_test.php");
} else {
      $("#deviceready").load("../big_screen.php");
}
