<?php
    include_once 'header.php'
?>
<!--When the user logs in it will display that they have logged in.-->
    <section class="main-container">
        <div class="main-wrapper">
          <?php
              if (isset($_SESSION['u_id'])) {
                echo "You have now been logged in #This works!!!";
              }
          ?>
            <h2>Home</h2>
        </div>
    </section>
<?php
    include_once 'footer.php';
 ?>
