
    var container;
    var camera, scene, renderer;
    var starCount = 1000;
    var group;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var clickCount = 0;

    init();
    animate();


    function init() {

        container = document.getElementById( 'threeJsContainer' );

        camera = new THREE.PerspectiveCamera( 25, width / height, 1, 4000 );
        camera.position.z = 550;

        //var controls = new THREE.OrbitControls( camera, container );

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x212121, 0.0035 );

        group = new THREE.Group();
        scene.add( group );

        var starMaterial = new THREE.PointsMaterial( {
            color: 0xFFFFFF,
            size: 1,
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
      if (clickCount == 1) {
        width = window.innerWidth * 0.70;
      } else {
        width = window.innerWidth;
      };

      height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize( width, height );
    }

    function animate() {

        group.rotation.y += .0001;
        group.rotation.x -= .0001;
        //group.rotation.z += .001;

        requestAnimationFrame( animate );

        render();

    }

    function render() {

        renderer.render( scene, camera );

    }
    function changeThreeWidth() {
      if (clickCount == 0) {
        width = window.innerWidth * 0.70;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
        clickCount += 1;
        document.getElementById("loginContainer").style.animation = "open 1s ease normal forwards";
        document.getElementById("loginContainer").style.animationPlayState = "running";


      } else {
        width = window.innerWidth;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
        clickCount = 0;
        document.getElementById("loginContainer").style.animation = "close 1s ease normal forwards";
        document.getElementById("loginContainer").style.animationPlayState = "running";
      }

    }
    $(document).ready(function(){
      // $("#loginButton").click(function(){
        $("#container").load("./header.php");
        // $("a").click(function(){
          // $("#background-wrapper").load("header.php");
        // });
});
