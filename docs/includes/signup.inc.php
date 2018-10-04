<?php

if (isset($_POST['submit'])) {
    include_once 'dbh.inc.php'; //This includes the file we created!
    $first = mysqli_real_escape_string($conn, $_POST['first']);
    $last = mysqli_real_escape_string($conn, $_POST['last']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $uid = mysqli_real_escape_string($conn, $_POST['uid']);
    $pwd = mysqli_real_escape_string($conn, $_POST['pwd']);
     //Use this method to prevent hackers from using sql injections
     //Error handles
     //Check for empty fields
     // = or
     if (empty($first) || empty($last) || empty($email) || empty($uid) || empty($pwd)) {
       header("Location: ../signup.php?signup=empty");
       /*Takes the use back to the default page if the user tries anything stupid */
       exit();
     } else {
          //Check if input characters are valid, prevents sql injections
          // A-Z & a-z
          if (!preg_match("/^[a-zA-Z]*$/", $first) || !preg_match("/^[a-zA-Z]*$/", $last)) {
            header("Location: ../signup.php?signup=invalid"); /*Tells/shows the user invalid */
            exit();
          } else {
            //Checks if email is valid
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
              header("Location: ../signup.php?signup=email"); /*Tells/shows the email invalid */
              exit();
            } else {
                //Checks if the user has the same user id
                $sql = "SELECT * FROM users WHERE user_uid='$uid'";
                $result = mysqli_query($conn, $sql);
                $resultCheck = mysqli_num_rows($result);

                if ($resultCheck > 0) {
                  header("Location: ../signup.php?signup=usertaken"); /* If the user name is taken */
                  exit();
                } else {
                  //Hashing the passwords
                  $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
                  //Insert the user into the database
                  $sql = "INSERT INTO users (user_first, user_last, user_email, user_uid, user_pwd) VALUES ('$first', '$
                    last', '$email', '$uid', '$hashedPwd');";
                    mysqli_query($conn, $sql);
                    header("Location: ../signup.php?signup=success"); /* User did it right */
                    exit();
                }
            }
        }
     }
} else {
  header("Location: ../signup.php"); /*Takes the use back to the default page if the user tries anything stupid */
  exit();
}
