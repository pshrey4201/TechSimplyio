
    var container;
    var camera, scene, renderer;
    var starCount = 1000;
    var group;
    var width = $( window ).width();
    var height = $( window ).height();
    var clickCount = 0;
    var plane, cube;
		var mouse, raycaster, isShiftDown = false;
		var rollOverMesh, rollOverMaterial;
		var cubeGeo, cubeMaterial;
		var objects = [];
    var mapData = [];


    init();
    animate();


    function init() {

        container = document.getElementById( 'threeJsContainer' );

        camera = new THREE.PerspectiveCamera( 25, width / height, 1, 10000 );
        camera.position.set( 0, 1500, 0 );
    		camera.lookAt( 0, 0, 0 );

        //var controls = new THREE.OrbitControls( camera, container );

        scene = new THREE.Scene();
        var rollOverGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
				rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, transparent: true } );
				rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
				scene.add( rollOverMesh );
				// cubes
				cubeGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
				cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
				// grid
				var gridHelper = new THREE.GridHelper( 1000, 20 );
				scene.add( gridHelper );
				//
				raycaster = new THREE.Raycaster();
				mouse = new THREE.Vector2();
				var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
				geometry.rotateX( - Math.PI / 2 );
				plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
				scene.add( plane );
				objects.push( plane );
				// lights
				var ambientLight = new THREE.AmbientLight( 0x606060 );
				scene.add( ambientLight );
				var directionalLight = new THREE.DirectionalLight( 0xffffff );
				directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
				scene.add( directionalLight );

        group = new THREE.Group();
        scene.add( group );

        renderer = new THREE.WebGLRenderer( { alpha: true } );
        renderer.setClearColor( 0x000000, 0.0 );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( width, height );


        container.appendChild( renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'keydown', onDocumentKeyDown, false );
				document.addEventListener( 'keyup', onDocumentKeyUp, false );

    }

    function onWindowResize() {
      if (clickCount == 1) {
        width = $( window ).width() * 0.70;
      } else {
        width = $( window ).width();
      };

      height =  $( window ).height();

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize( width, height );
    }

    function onDocumentMouseMove( event ) {
  				event.preventDefault();
  				mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  				raycaster.setFromCamera( mouse, camera );
  				var intersects = raycaster.intersectObjects( objects );
  				if ( intersects.length > 0 ) {
  					var intersect = intersects[ 0 ];
  					rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
  					rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
  				}
  				render();
  			}
  			function onDocumentMouseDown( event ) {
  				event.preventDefault();
  				mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  				raycaster.setFromCamera( mouse, camera );
  				var intersects = raycaster.intersectObjects( objects );
  				if ( intersects.length > 0 ) {
  					var intersect = intersects[ 0 ];
  					// delete cube
  					if ( isShiftDown ) {
  						if ( intersect.object !== plane ) {
  							scene.remove( intersect.object );
  							objects.splice( objects.indexOf( intersect.object ), 1 );
                for( i = 0; i <= mapData.length; i++ ){
                  if( intersect.point === mapData[i] ) {
                    mapData.splice( i );
                  }
                }
                console.log(mapData);
  						}
  						// create cube
  					} else {
  						var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
  						voxel.position.copy( intersect.point ).add( intersect.face.normal );
  						voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
  						scene.add( voxel );
  						objects.push( voxel );
              mapData.push(intersect.point);
              console.log(mapData);
  					}
  					render();
  				}
  			}
  			function onDocumentKeyDown( event ) {
  				switch ( event.keyCode ) {
  					case 16: isShiftDown = true; break;
  				}
  			}
  			function onDocumentKeyUp( event ) {
  				switch ( event.keyCode ) {
  					case 16: isShiftDown = false; break;
  				}
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
        width =  $( window ).width() * 0.70;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
        clickCount += 1;
        document.getElementById("loginContainer").style.animation = "open 1s ease normal forwards";
        document.getElementById("loginContainer").style.animationPlayState = "running";


      } else {
        width = $( window ).width();
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
        $("#background-wrapper").load("./header.php");
        // $("a").click(function(){
          // $("#background-wrapper").load("header.php");
        // });
});

// // Disable scrolling.
// // document.body.addEventListener('touchmove', function(evt) {
//   //In this case, the default behavior is scrolling the body, which
//   //would result in an overflow.  Since we don't want that, we preventDefault.
//   if(!evt._isScroller) {
//     evt.preventDefault()
//   }
// }, {passive: false})
