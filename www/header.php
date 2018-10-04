<?php
session_start();
 ?>
        <script>
        $(document).ready(function(){
        $("button").click(function(){
          $("#background-wrapper").load("./signup.php");
        });
        });
        </script>
        <div id="loginContainer">
        <div id="background-wrapper" class="main-wrapper card">
            <div id="login" class="login">
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
                    <button type="button" id="signUpButton">Sign up</button>';
                  }
              ?>

            </div>
        </div>
      </div>
