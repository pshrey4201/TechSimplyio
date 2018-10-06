<?php
    // include_once 'header.php'
?>
<script>
$(document).ready(function(){
$("a").click(function(){
  $("#background-wrapper").load("./header.php");
});
});
</script>
<!--This is the sign up page, we are getting the user's input here!  -->
<!--Change this too Three.js  -->
    <!-- <div id="loginContainer"> -->
        <!-- <div class="main-wrapper card"> -->
          <!-- <div id="login" class="login"> -->
            <div id="signup">
                <div><span><a>Back</a></span></div>
            <form action="includes/signup.inc.php" method="POST">
                <span><input type="text" name="first" placeholder="Firstname"></span>
                <span><input type="text" name="last" placeholder="Lastname"></span>
                <span><input type="text" name="email" placeholder="E-mail"></span>
                <span><input type="text" name="uid" placeholder="Username"></span>
                <span><input type="password" name="pwd" placeholder="Password"></span>
                <button type="submit" name="submit">Sign up</button>
            </form>
          </div>
          <!-- </div> -->
        <!-- </div> -->
    <!-- </div> -->
<?php
    include_once 'footer.php';
 ?>
