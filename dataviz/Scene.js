var camera, SCENE, renderer, controls;
var EdgeManager;
var FRAME = 0;

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

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( 1240, 620 );

	setTimeout(function(){
		document.body.appendChild( renderer.domElement );
	}, 2000);

	camera = new THREE.PerspectiveCamera( 45, 1240 / 620, 1, 1000 );
	camera.position.x = 1860;
	camera.position.y = 400;
	camera.position.z = 1000;

	SCENE = new THREE.Scene();

	controls = new THREE.OrbitControls( camera );

	EdgeManager = new EdgeManager(800, 800);
	NodeManager = new NodeManager(800, 800);
}

var animate = function () {
	FRAME++;

	EdgeManager.run();
	NodeManager.run();

	requestAnimationFrame( animate );
	//controls.update();
	renderer.render( SCENE, camera );
}

init();
animate();