var camera, SCENE, renderer;
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
  //etageManager.setup(dataManager);
  EdgeManager.setup(dataManager);
}

var init = function () {
	$.getJSON("nodesUS.json", loadNodesUS);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( 1200, 800 );

	setTimeout(function(){
		document.body.appendChild( renderer.domElement );
	}, 2000);

	camera = new THREE.PerspectiveCamera( 45, 1200 / 800, 1, 1000 );
	camera.position.x = 800;
	camera.position.y = 400;
	camera.position.z = 1000;

	SCENE = new THREE.Scene();


			function setup_circle(pos, startframe)
			{
				var radius   = 10,
					segments = 12,
					line_material = new THREE.LineBasicMaterial( { color: 0x0000ff } ),
					material = new THREE.MeshBasicMaterial( { color:0x00ff00 } ),
					line_geometry = new THREE.CircleGeometry( radius, segments ),
					geometry = new THREE.CircleGeometry( radius, segments )
				
				var circle_shaded = new THREE.Mesh( geometry, material );
				
				// Remove center vertex
				line_geometry.vertices.shift();
				
				line_material.linewidth = 3;
				var circle_outline = new THREE.Line( line_geometry, line_material );

				var node = new THREE.Object3D();
				node.add(circle_shaded);
				node.add(circle_outline);
				
				node.position = pos;
				SCENE.add(node);
			}
			setup_circle(new THREE.Vector3(0, 0, 0), 0);
	
	EdgeManager = new EdgeManager(800, 800);
}

var animate = function () {
	FRAME++;
	EdgeManager.run();

	requestAnimationFrame( animate );
	renderer.render( SCENE, camera );
}

init();
animate();