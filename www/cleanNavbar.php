<?php
session_start();
 ?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
		<title>Sample Home Page</title>
		<!--<meta charset="utf-8">-->
		<!--<link href="Test_pages/font.css" rel="stylesheet">-->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100" rel="stylesheet">
    <link rel="stylesheet" text="text/css" href="Test_pages/clean_external_stylesheet.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="./Frameworks/Three-js/three.js-master/build/three.js"></script>
    </head>
    <body>
        <div id="deviceready">
          <div id="container"><div id="loginContainer">
          <div id="background-wrapper" class="main-wrapper card">  </div>
        </div></div>
          <div class="navbar">
              <ul>
                <li><span><a href="#">TechSimply</a></span></li>
                <li><span><a onclick='changeThreeWidth();'id="loginButton">Login</a></span></li>
                <li><img src="./Test_pages/gear-transparent-4.png" class="settings"/></li>
                <li class='search'><span>Search</span></li>
              </ul>
          </div>

                    <div class="card"></div>

            <div id="threeJsContainer"></div>
            <script src="./js/three.js"></script>

        </div>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
