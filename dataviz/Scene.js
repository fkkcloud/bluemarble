var camera, renderer, controls;
var SCENE_CLUSTER, SCENE_MERGEPATH;
var EdgeManagerCluster, EdgeManagerMergePaths;
var NodeManagerCluster, NodeManagerMergePaths;
var RENDEROPTIONS;

// scene options
var SELECTED_MERGEPATHID;
var SELECTED_CLUSTER;
var NOT_CLUSTER_ID;
var ALL_CLUSTER_ID;

var DATATYPE = { value: 'US' };

var FRAME    = { value: 0 };
var PAGE_NUM = { value: 0 }; // 0 - intro, 1 - clusters, 2 - mergepaths

var RENDER_PARMS = { AdditiveColor : true };

var bCanvasLoaded = false;
var stats;

// interact
var raycaster;
var highlighter;
var MOUSE;
var INTERSECTED;

// interact debug
var debug = false;
var ray;
var ray_geometry;

var WIDTH;
var HEIGHT;

var navbar_height = 74;

var interactable_meshes;

var setState = function() {
	stats = new Stats();
	stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

	// align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top  = '0px';
	if (!debug) stats.domElement.style.display  = 'none';

	document.body.appendChild( stats.domElement );
}

function onDocumentMouseMove( event ) {

    event.preventDefault();

    //console.log(event.clientX, event.clientY);

    MOUSE.x =   ( (event.clientX) / WIDTH  ) * 2 - 1;
    MOUSE.y = - ( (event.clientY - navbar_height + window.pageYOffset) / HEIGHT ) * 2 + 1;
}

var init = function () {

	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight * 0.8; // reduce the amount of top info bar

	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, devicePixelRatio: window.devicePixelRatio || 1});
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setClearColor( 0x000000, 0 );
	renderer.setViewport( 0, 0, WIDTH, HEIGHT );

	camera = new THREE.PerspectiveCamera( 80, WIDTH / HEIGHT, 10, 10000 );
			camera.position.x = WIDTH  * 2.2;
			camera.position.y = HEIGHT * 0.5;
			camera.position.z = 800;

	setTimeout(function(){
		document.getElementById("canvasHolder").appendChild( renderer.domElement );
		setState();
		bCanvasLoaded = true;
		$('#options-clusters').css('visibility', 'visible');
		$('#options-mergepaths').css('visibility', 'visible');
	}, 2000);

	dataManager.start('US');

	// interaction setup
	init_interaction();
}

var animate = function (time) {

	if (!dataManager.bDataLoaded || !bCanvasLoaded){

		requestAnimationFrame( animate );
		return;

	}

	if (stats) // debug
		stats.begin();

	if (PAGE_NUM.value === 0){
		if (stats) // debug
			stats.end();
		requestAnimationFrame( animate );
		return;
	}
	else if (PAGE_NUM.value === 1){

		EdgeManagerCluster.run();
		NodeManagerCluster.run(time);

		interactable_meshes = [];

		// get interactable objects
		for (var a = 0; a < NodeManagerCluster.nodes.length; a++){
			interactable_meshes.push(NodeManagerCluster.nodes[a].circle_shaded);
		}

		animate_interaction();

		renderer.render( SCENE_CLUSTER, camera );

	}
	else if (PAGE_NUM.value === 2){

		// turn off other edges
		if (FRAME.value === 0){

			console.log('SELECTED_MERGEPATHID - ', SELECTED_MERGEPATHID)
			selectMergePaths(SELECTED_MERGEPATHID);

		}

		interactable_meshes = [];

		EdgeManagerMergePaths[SELECTED_MERGEPATHID].run();
		NodeManagerMergePaths[SELECTED_MERGEPATHID].run(time);

		// set/get interactable objects
		for (var a = 0; a < NodeManagerMergePaths[SELECTED_MERGEPATHID].nodes.length; a++){
			interactable_meshes.push(NodeManagerMergePaths[SELECTED_MERGEPATHID].nodes[a].circle_shaded);
		}
		
		animate_interaction();

		renderer.render( SCENE_MERGEPATH, camera );
		
	}

	FRAME.value += 1;

	if (stats) // debug
		stats.end();

	requestAnimationFrame( animate );
	//controls.update();
}

var selectMergePaths = function (mergePathId){

	// turn off edges except mergePathId
	for (var i = 0; i < EdgeManagerMergePaths.length; i++){

		EdgeManagerMergePaths[i].toggleVisibility(false);
		
	}

	// turn off nodes except mergePathId
	for (var i = 0; i < NodeManagerMergePaths.length; i++){

		NodeManagerMergePaths[i].toggleNodeVisibility(false);
		NodeManagerMergePaths[i].toggleNodeTextVisibility(false);

	}

	// turn on edges mergePathId
	EdgeManagerMergePaths[mergePathId].toggleVisibility(true);

	// turn on nodes mergePathId
	NodeManagerMergePaths[mergePathId].toggleNodeVisibility(true);
	NodeManagerMergePaths[mergePathId].toggleNodeTextVisibility(true);

	console.log(EdgeManagerMergePaths.length);
	console.log(NodeManagerMergePaths.length);

}

var init_interaction = function () {

	raycaster = new THREE.Raycaster();
	MOUSE     = new THREE.Vector2();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	if (debug) debug_init_ray_interact(SCENE_MERGEPATH); // ray debug
}

var animate_interaction = function () {

	var vector = new THREE.Vector3( MOUSE.x, MOUSE.y, 1 ).unproject( camera );
	vector.sub( camera.position ).normalize();

	raycaster.set( camera.position, vector );
	//raycaster.setFromCamera( MOUSE, camera );

	if (debug) debug_animate_ray_interact(camera, vector); // ray debug

	var intersects = raycaster.intersectObjects( interactable_meshes );

	if ( intersects.length > 0 ) {

		if (INTERSECTED != intersects[ 0 ].object){

			if ( INTERSECTED ) {

				INTERSECTED.material.color.setRGB(INTERSECTED.parent.node_color.r, INTERSECTED.parent.node_color.g, INTERSECTED.parent.node_color.b);
				INTERSECTED.parent.scale.set(1.0, 1.0, 1.0);

				//text
				INTERSECTED.parent.text.scale.set(1.0, 1.0, 1.0);
				INTERSECTED.parent.text.position.z = -20.0;
				INTERSECTED.parent.text.material.opacity = 0.0;

				INTERSECTED = null;
			}

			INTERSECTED = intersects[ 0 ].object;
		}
		else {

			INTERSECTED.material.color.setRGB(INTERSECTED.parent.node_color.r * 1.5, INTERSECTED.parent.node_color.g * 1.5, INTERSECTED.parent.node_color.b * 1.5);
			INTERSECTED.parent.scale.set(INTERSECTED.parent.node_size, INTERSECTED.parent.node_size, INTERSECTED.parent.node_size);

			//text
			INTERSECTED.parent.text.scale.set(1.05, 1.05, 1.05);
			INTERSECTED.parent.text.position.z = 20.0;
			INTERSECTED.parent.text.material.opacity = 1.0;

		}

	} else {

		//highlighter.visible = false;
		
		if ( INTERSECTED ) {

			INTERSECTED.material.color.setRGB(INTERSECTED.parent.node_color.r, INTERSECTED.parent.node_color.g, INTERSECTED.parent.node_color.b);
			INTERSECTED.parent.scale.set(1.0, 1.0, 1.0);

			//text
			INTERSECTED.parent.text.scale.set(1.0, 1.0, 1.0);
			INTERSECTED.parent.text.position.z = -20.0;
			INTERSECTED.parent.text.material.opacity = 0.0;
		}

		INTERSECTED = null;

	}

}

var debug_init_ray_interact = function (scene) {
	ray_geometry = new THREE.BufferGeometry();//new THREE.Geometry();
	var positions = new Float32Array( 2 * 3 );
	var colors = new Float32Array( 2 * 3 );
	ray_geometry.addAttribute( 'position', new THREE.BufferAttribute( positions , 3 ) );
	ray_geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
	var ray_material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

	ray = new THREE.Line( ray_geometry, ray_material );

	scene.add(ray);
}

var debug_animate_ray_interact = function (camera, vector) {
	ray_geometry.getAttribute('position').setX(0, camera.position.x);
	ray_geometry.getAttribute('position').setY(0, camera.position.y);
	ray_geometry.getAttribute('position').setZ(0, camera.position.z - 10);
	ray_geometry.getAttribute('position').setX(1, vector.x * 90000);
	ray_geometry.getAttribute('position').setY(1, vector.y * 90000);
	ray_geometry.getAttribute('position').setZ(1, vector.z * 90000);
	ray_geometry.getAttribute('position').needsUpdate = true;
	ray_geometry.getAttribute('color').setX(0, 0);
	ray_geometry.getAttribute('color').setY(0, 0);
	ray_geometry.getAttribute('color').setZ(0, 1);
	ray_geometry.getAttribute('color').setX(1, 0);
	ray_geometry.getAttribute('color').setY(1, 1);
	ray_geometry.getAttribute('color').setZ(1, 0);
	ray_geometry.getAttribute('color').needsUpdate = true;
	ray_geometry.computeBoundingSphere();
}

init();
animate();