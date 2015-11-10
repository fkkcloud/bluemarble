var camera, SCENE, renderer, controls;
var EdgeManager;
var NodeManager;
var FRAME = 0;
var bAnimate = false;
var stats;

var setState = function() {
	stats = new Stats();
	stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

	// align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	document.body.appendChild( stats.domElement );
}

var init = function () {
	$.getJSON("nodesUS.json", loadNodesUS);

	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize( 1240, 820 );
	renderer.setClearColor( 0x000000, 0 );

	setTimeout(function(){
		document.getElementById("canvasHolder").appendChild( renderer.domElement );
		setState();
		bAnimate = true;
	}, 2000);

	camera = new THREE.PerspectiveCamera( 80, 1240 / 820, 10, 3510 );
	camera.position.x = 2760;
	camera.position.y = 400;
	camera.position.z = 900;

	SCENE = new THREE.Scene();

	//controls = new THREE.OrbitControls( camera );
	// normalized device coordinates
	/*
	document.onmousedown = function(event){
	    var mouse = {};

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster = new THREE.Raycaster();

		var vector = new THREE.Vector3( mouse.x, mouse.y, 1 ).unproject( camera );

		raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

		var intersects = raycaster.intersectObjects( SCENE.children );

		console.log(intersects.length);
		if (intersects.length > 0)
			INTERSECTED = intersects[ 0 ].object.scale.set(3, 3, 3);
	}*/

	EdgeManager = new EdgeManager(1240, 820);
	NodeManager = new NodeManager(1240, 820);
}

var animate = function (time) {
	if (stats) // debug
		stats.begin();

	if (bAnimate){
		FRAME++;
	}

	EdgeManager.run();
	NodeManager.run(time);
	renderer.render( SCENE, camera );

	if (stats) // debug
		stats.end();

	requestAnimationFrame( animate );
	//controls.update();
}

init();
animate();