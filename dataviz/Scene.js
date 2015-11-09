var camera, SCENE, renderer, controls;
var EdgeManager;
var NodeManager;
var FRAME = 0;
var bAnimate = false;

function mapRange(from, to, s) 
{
	
	return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);

};
    
function getCenterPoints(pt1, pt2)
{

	var x = (pt1.x + pt2.x) * 0.5;
	var y = (pt1.y + pt2.y) * 0.5;

	return new THREE.Vector3(x, y, 0.0);

}

function getLength(pt1, pt2)
{

	return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));

}

function rgbToHex(r, g, b)
{

	r = Math.min(Math.max(0, r), 255);
    g = Math.min(Math.max(0, g), 255);
    b = Math.min(Math.max(0, b), 255);

	return "#" +
  		("0" + parseInt(r,10).toString(16)).slice(-2) +
  		("0" + parseInt(g,10).toString(16)).slice(-2) +
  		("0" + parseInt(b,10).toString(16)).slice(-2);

}

var dataManager = {

  'nodes': null,
  'edges': null

};

function loadNodesUS(json){
  dataManager.nodes = json;

  $.getJSON("edgesUS.json", loadEdgesUS);
}

function loadEdgesUS(json){
  dataManager.edges = json;

  dataReadyAndSetupManagers();
}

// as data gets ready, create manager for node and edge
function dataReadyAndSetupManagers(){
  EdgeManager.setup(dataManager);
  NodeManager.setup(dataManager);
}

var init = function () {
	$.getJSON("nodesUS.json", loadNodesUS);

	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize( 1240, 820 );
	renderer.setClearColor( 0x000000, 0 );

	setTimeout(function(){
		document.getElementById("canvasHolder").appendChild( renderer.domElement );
		bAnimate = true;
	}, 2000);

	camera = new THREE.PerspectiveCamera( 80, 1240 / 820, 10, 3510 );
	camera.position.x = 2760;
	camera.position.y = 400;
	camera.position.z = 900;

	SCENE = new THREE.Scene();

	//controls = new THREE.OrbitControls( camera );
	// normalized device coordinates
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
	}


	

	EdgeManager = new EdgeManager(1240, 820);
	NodeManager = new NodeManager(1240, 820);
}

var animate = function () {
	if (bAnimate){
		FRAME++;
	}

	EdgeManager.run();
	NodeManager.run();

	requestAnimationFrame( animate );
	//controls.update();
	renderer.render( SCENE, camera );
}

init();
animate();