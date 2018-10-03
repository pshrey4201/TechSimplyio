<?php
    include_once 'header.php'
?>
<!--This is the comment  -->
    <section class="main-container">
        <div class="main-wrapper">
          <?php
              if (isset($_SESSION['u_id'])) {
                echo "You have now been logged in";
              }
          ?>
        </div>
    </section>
<?php
    include_once 'footer.php';
 ?>
