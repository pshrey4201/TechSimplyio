<?php
    // include_once 'header.php'
?>
<!--This is the sign up page, we are getting the user's input here!  -->
<!--Change this too Three.js  -->
    <!-- <div id="loginContainer"> -->
        <!-- <div class="main-wrapper card"> -->
          <!-- <div id="login" class="login"> -->
            <div class="login">
            <h2>signup</h2>
            <form class="signup-form" action="includes/signup.inc.php" method="POST">
                <input type="text" name="first" placeholder="Firstname">
                <input type="text" name="last" placeholder="Lastname">
                <input type="text" name="email" placeholder="E-mail">
                <input type="text" name="uid" placeholder="Username">
                <input type="password" name="pwd" placeholder="Password">
                <button type="submit" name="submit">Sign up</button>
            </form>
          </div>
          <!-- </div> -->
        <!-- </div> -->
    <!-- </div> -->
<?php
    include_once 'footer.php';
 ?>
