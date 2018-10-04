<?php
session_start();
 ?>
<!DOCTYPE html>
<!--  -->
<html>
    <head>
        <title>Welcome</title>
        <link rel="stylesheet" type="text/css" href="./Test_pages/clean_external_stylesheet.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto:100" rel="stylesheet">
        <script src="./Frameworks/Three-js/three.js-master/build/three.js"></script>
    </head>
<body>
      <div id="deviceready">
        <div id="loginContainer">
        <div class="main-wrapper card">
            <div class="login">
              <?php
                  if (isset($_SESSION['u_id'])) {
                    echo'<form action="includes/logout.inc.php" method="POST">
                      <button type="submit" name="submit">Logout</button>
                    </form>';
                  } else {
                    echo '<form action="includes/login.inc.php" method="POST">
                        <span><input type="text" name="uid" placeholder="Username/e-mail"></span>
                        <span><input type="password" name="pwd" placeholder="password"></span>
                        <button type="submit" name="submit">Login</button>
                    </form>
                    <a href="signup.php">Sign up</a>';
                  }
              ?>

            </div>
        </div>
      </div>
        <div class="navbar">
            <ul>
              <li><span><a href="cleanNavbar.php">TechSimply</a></span></li>
              <li><span><a onclick='changeThreeWidth()'>Login</span></a></li>
              <li><img src="./Test_pages/gear-transparent-4.png" class="settings"/></li>
              <li class='search'><span>Search</span></li>
            </ul>
        </div>
        <div id="container"></div>
        <script src="./js/three.js"></script>
      </div>
