var camera, renderer, controls;
var SCENE_CLUSTER, SCENE_MERGEPATH
var EdgeManagerCluster, EdgeManagerMergePaths;
var NodeManagerCluster, NodeManagerMergePaths;

// scene options
var SELECTED_MERGEPATHIDS = [ 0 ];

var FRAME = { value: 0 };
var PAGE_NUM = { value: 0 }; // 0 - intro, 1 - clusters, 2 - mergepaths

var RENDER_PARMS = { AdditiveColor : true };

var bCanvasLoaded = false;
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

	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize( 1240, 820 );
	renderer.setClearColor( 0x000000, 0 );
	
	setTimeout(function(){
		document.getElementById("canvasHolder").appendChild( renderer.domElement );
		setState();
		bCanvasLoaded = true;
	}, 2000);

	camera = new THREE.PerspectiveCamera( 80, 1240 / 820, 10, 3510 );
	camera.position.x = 2760;
	camera.position.y = 400;
	camera.position.z = 900;

	SCENE_CLUSTER = new THREE.Scene();
	SCENE_MERGEPATH = new THREE.Scene();

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

	dataManager.start('US');
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
		renderer.render( SCENE_CLUSTER, camera );

	}
	else if (PAGE_NUM.value === 2){
		// turn off other edges
		if (FRAME.value === 0){

			console.log('SELECTED_MERGEPATHIDS', SELECTED_MERGEPATHIDS)
			selectMergePaths(SELECTED_MERGEPATHIDS);

		}

		// have to turn off 
		for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

			var id = SELECTED_MERGEPATHIDS[j]
			EdgeManagerMergePaths[id].run();
			NodeManagerMergePaths[id].run(time);
		
		}
		renderer.render( SCENE_MERGEPATH, camera );
		
	}

	FRAME.value += 1;

	if (stats) // debug
		stats.end();

	requestAnimationFrame( animate );
	//controls.update();
}

var selectMergePaths = function (mergePathIds){

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
	for (var i = 0; i < EdgeManagerMergePaths.length; i++){

		for (var j = 0; j < mergePathIds.length; j++){

			if (i === mergePathIds[j] ){
				EdgeManagerMergePaths[i].toggleVisibility(true);
			}

		}
		
	}

	// turn on nodes mergePathId
	for (var i = 0; i < NodeManagerMergePaths.length; i++){

		for (var j = 0; j < mergePathIds.length; j++){

			if (i === mergePathIds[j]){
				NodeManagerMergePaths[i].toggleNodeVisibility(true);
				NodeManagerMergePaths[i].toggleNodeTextVisibility(true);
			}

		}

	}

}


init();
animate();