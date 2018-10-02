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
            <h2>Home</h2>
            <h3>Git test this is a test part2!</h3>
        </div>
    </section>
<?php
    include_once 'footer.php';
 ?>
