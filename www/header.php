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
        <!--This is the link of the external style sheet!-->
    </head>
<body>
      <div id="deviceready">
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
        <div class="navbar">
            <ul>
              <li><span><a href="index.php">TechSimply</a></span></li>
              <li><span>Login</span></li>
              <li><img src="./Test_pages/gear-transparent-4.png" class="settings"/></li>
              <li class='search'><span>Search</span></li>
            </ul>
        </div>
        <div id="container"></div>
        <script src="./Frameworks/Three-js/three.js-master/build/three.js"></script>
        <!--<script src="./Frameworks/Three-js/three.js-master/examples/js/controls/OrbitControls.js"></script>-->
        <script src="./Frameworks/Three-js/three.js-master/examples/js/libs/stats.min.js"></script>

        <script>
            var container;
            var camera, scene, renderer;
            var starCount = 1000;
            var group;
            var width = window.innerWidth * 0.70 ;
            var height = window.innerHeight;

            init();
            animate();

            function init() {

                container = document.getElementById( 'container' );

                camera = new THREE.PerspectiveCamera( 25, width / height, 1, 4000 );
                camera.position.z = 550;

                //var controls = new THREE.OrbitControls( camera, container );

                scene = new THREE.Scene();
                scene.fog = new THREE.FogExp2( 0x212121, 0.0035 );

                group = new THREE.Group();
                scene.add( group );

                var starMaterial = new THREE.PointsMaterial( {
                    color: 0xFFFFFF,
                    size: 5,
                    blending: THREE.AdditiveBlending,
                    transparent: false,
                    sizeAttenuation: true
                } );

                var stars = new THREE.BufferGeometry();

                var starPositions = new Float32Array( starCount * 3 );

                for( var i = 0; i < starCount; i++ ) {

                    var x = THREE.Math.randFloatSpread( 500 );
                    var y = THREE.Math.randFloatSpread( 500 );
                    var z = THREE.Math.randFloatSpread( 500 );

                    starPositions[ i * 3 ] = x;
                    starPositions[ i * 3 + 1 ] = y;
                    starPositions[ i * 3 + 2 ] = z;

                };

                stars.setDrawRange( 0, starCount );
                stars.addAttribute( 'position', new THREE.BufferAttribute( starPositions, 3 ).setDynamic( true ) );

                starCloud = new THREE.Points( stars, starMaterial );
                group.add( starCloud );





                renderer = new THREE.WebGLRenderer( { alpha: true } );
                renderer.setClearColor( 0x000000, 0.0 );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( width, height );

                container.appendChild( renderer.domElement );

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.setSize( width, height );
            }

            function animate() {

                group.rotation.y += .001;
                group.rotation.x -= .001;
                //group.rotation.z += .001;

                requestAnimationFrame( animate );

                render();

            }

            function render() {

                renderer.render( scene, camera );

            }

        </script>
      </div>
    <!--<script type="text/javascript" src="cordova.js"></script>
    <script type="text/javascript" src="js/index.js"></script>-->
