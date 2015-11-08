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