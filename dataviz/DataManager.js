var dataManager = {

	start : function(name){
		DATATYPE.value = name;

		if (name == 'US'){
			dataManager.bDataLoaded = false;

			camera.position.x = WIDTH  * 2.2;
			camera.position.y = HEIGHT * 0.5;
			camera.position.z = 800;

			SCENE_CLUSTER = new THREE.Scene();
			SCENE_MERGEPATH = new THREE.Scene();

			$.getJSON("nodesUS.json", loadClusterNodesUS);
			NOT_CLUSTER_ID       = 17;
			SELECTED_MERGEPATHID = 4;
			SELECTED_CLUSTER     = 12;
			ALL_CLUSTER_ID       = 18;
		}
		else if (name == 'KOR'){
			dataManager.bDataLoaded = false;

			camera.position.x = WIDTH  * 1.4;
			camera.position.y = HEIGHT * 0.6;
			camera.position.z = 1000;

			SCENE_CLUSTER = new THREE.Scene();
			SCENE_MERGEPATH = new THREE.Scene();

			$.getJSON("nodesKOR.json", loadClusterNodesKOR);
			NOT_CLUSTER_ID       = 3;
			SELECTED_MERGEPATHID = 40;
			SELECTED_CLUSTER     = 0;
			ALL_CLUSTER_ID       = 4;
		}
	},

	/* US DATA */
  	'nodesUSCluster': null,

  	'edgesUSCluster': null,

  	'nodesUSMergePaths' : null,

  	'edgesUSMergePaths' : null,

  	/* KR Data */
  	'nodesKORCluster': null,

  	'edgesKORCluster': null,

  	'nodesKORMergePath' : null,

  	'edgesKORMergePath' : null,

  	bDataLoaded : false

};

// --------------------------- --------------------------- // --------------------------- --------------------------- 
// --------------------------- CLUSTER US
// --------------------------- --------------------------- // --------------------------- --------------------------- 
function loadClusterNodesUS(json){
  dataManager.nodesUSCluster = json;

  $.getJSON("edgesUS.json", loadClusterEdgesUS);
}

function loadClusterEdgesUS(json){
  dataManager.edgesUSCluster = json;

  dataReadyAndSetupClusterManagersUS();
}

// --------------------------- --------------------------- // --------------------------- --------------------------- 
// --------------------------- MERGEPATH US
// --------------------------- --------------------------- // --------------------------- --------------------------- 
function loadMergePathNodesUS(json){
  dataManager.nodesUSMergePaths = json;

  $.getJSON("mergePathEdgeUS.json", loadMergePathEdgesUS);
}

function loadMergePathEdgesUS(json){

  dataManager.edgesUSMergePaths = json;

  dataReadyAndSetupMergePathManagersUS();

  dataManager.bDataLoaded = true;
}

// --------------------------- --------------------------- // --------------------------- --------------------------- 
// --------------------------- CLUSTER KOR
// --------------------------- --------------------------- // --------------------------- --------------------------- 
function loadClusterNodesKOR(json){
  dataManager.nodesKORCluster = json;

  $.getJSON("edgesKOR.json", loadClusterEdgesKOR);
}

function loadClusterEdgesKOR(json){
  dataManager.edgesKORCluster = json;

  dataReadyAndSetupClusterManagersKOR();

}

// --------------------------- --------------------------- // --------------------------- --------------------------- 
// --------------------------- MERGEPATH KOR
// --------------------------- --------------------------- // --------------------------- --------------------------- 
function loadMergePathNodesKOR(json){
  dataManager.nodesKORMergePaths = json;

  $.getJSON("mergePathEdgeKOR.json", loadMergePathEdgesKOR);
}

function loadMergePathEdgesKOR(json){

  dataManager.edgesKORMergePaths = json;

  dataReadyAndSetupMergePathManagersKOR();

  dataManager.bDataLoaded = true;
}

// --------------------------- --------------------------- // --------------------------- --------------------------- 
// --------------------------- SETUP US
// --------------------------- --------------------------- // --------------------------- --------------------------- 

// as data gets ready, create manager for Cluster node and edge
function dataReadyAndSetupClusterManagersUS(){
	EdgeManagerCluster = new EdgeManager(WIDTH, HEIGHT, SCENE_CLUSTER);
	NodeManagerCluster = new NodeManager(WIDTH, HEIGHT, SCENE_CLUSTER);

    EdgeManagerCluster.setup(dataManager.edgesUSCluster);
    NodeManagerCluster.setup(dataManager.nodesUSCluster);

    $.getJSON("mergePathNodeUS.json", loadMergePathNodesUS);
}


// as data gets ready, create manager for Cluster node and edge
function dataReadyAndSetupMergePathManagersUS(){
	EdgeManagerMergePaths = [];
	NodeManagerMergePaths = [];

	for (var mergePathId in dataManager.nodesUSMergePaths){

		var nodesUSMergePath = dataManager.nodesUSMergePaths[mergePathId];

		var mergePathNodeManager = new NodeManager(WIDTH, HEIGHT, SCENE_MERGEPATH); 
		
		var nodes = {};
		for (var key in nodesUSMergePath){

			var node = nodesUSMergePath[key];
			var node_id = node['node_id'];
			nodes[node_id] = node;

		}

		mergePathNodeManager.setup(nodes);
		
		NodeManagerMergePaths.push(mergePathNodeManager);

	}

	for (var mergePathId in dataManager.edgesUSMergePaths){

		var edgesUSMergePath = dataManager.edgesUSMergePaths[mergePathId];

		var mergePathEdgeManager = new EdgeManager(WIDTH, HEIGHT, SCENE_MERGEPATH); 

		var edges = {};
		for (var key in edgesUSMergePath){

			var edge = edgesUSMergePath[key];
			var edge_id = edge['edge_id'];
			edges[edge_id] = edge;

		}
		mergePathEdgeManager.setup(edges);
		
		EdgeManagerMergePaths.push(mergePathEdgeManager);

	}

}


// --------------------------- --------------------------- // --------------------------- --------------------------- 
// --------------------------- SETUP KOR
// --------------------------- --------------------------- // --------------------------- --------------------------- 

// as data gets ready, create manager for Cluster node and edge
function dataReadyAndSetupClusterManagersKOR(){
	EdgeManagerCluster = new EdgeManager(WIDTH, HEIGHT, SCENE_CLUSTER);
	NodeManagerCluster = new NodeManager(WIDTH, HEIGHT, SCENE_CLUSTER);

    EdgeManagerCluster.setup(dataManager.edgesKORCluster);
    NodeManagerCluster.setup(dataManager.nodesKORCluster);

    $.getJSON("mergePathNodeUS.json", loadMergePathNodesKOR);
}


// as data gets ready, create manager for Cluster node and edge
function dataReadyAndSetupMergePathManagersKOR(){
	EdgeManagerMergePaths = [];
	NodeManagerMergePaths = [];

	for (var mergePathId in dataManager.nodesKORMergePaths){

		var nodesKORMergePath = dataManager.nodesKORMergePaths[mergePathId];

		var mergePathNodeManager = new NodeManager(WIDTH, HEIGHT, SCENE_MERGEPATH); 
		
		var nodes = {};
		for (var key in nodesKORMergePath){

			var node = nodesKORMergePath[key];
			var node_id = node['node_id'];
			nodes[node_id] = node;

		}

		mergePathNodeManager.setup(nodes);
		
		NodeManagerMergePaths.push(mergePathNodeManager);

	}

	for (var mergePathId in dataManager.edgesKORMergePaths){

		var edgesKORMergePath = dataManager.edgesKORMergePaths[mergePathId];

		var mergePathEdgeManager = new EdgeManager(WIDTH, HEIGHT, SCENE_MERGEPATH); 

		var edges = {};
		for (var key in edgesKORMergePath){

			var edge = edgesKORMergePath[key];
			var edge_id = edge['edge_id'];
			edges[edge_id] = edge;

		}
		mergePathEdgeManager.setup(edges);
		
		EdgeManagerMergePaths.push(mergePathEdgeManager);

	}

	//console.log('ha', MERGEPATH_INITNODE_REF);
}