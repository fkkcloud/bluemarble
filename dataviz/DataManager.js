var dataManager = {

	start : function(name){
				if (name == 'US'){
					$.getJSON("nodesUS.json", loadClusterNodesUS);
				}
				else if (name == 'KR'){
					console.log('korean data is not available yet');
				}
			},

	/* US DATA */
  	'nodesUSCluster': null,

  	'edgesUSCluster': null,

  	'nodesUSMergePaths' : null,

  	'edgesUSMergePaths' : null,

  	/* KR Data */
  	'nodesKRCluster': null,

  	'edgesKRCluster': null,

  	'nodesKRMergePath' : null,

  	'edgesKRMergePath' : null,

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

  dataReadyAndSetupClusterManagers();
}

// as data gets ready, create manager for Cluster node and edge
function dataReadyAndSetupClusterManagers(){
	EdgeManagerCluster = new EdgeManager(1240, 820, SCENE_CLUSTER);
	NodeManagerCluster = new NodeManager(1240, 820, SCENE_CLUSTER);

    EdgeManagerCluster.setup(dataManager.edgesUSCluster);
    NodeManagerCluster.setup(dataManager.nodesUSCluster);

    $.getJSON("mergePathNodeUS.json", loadMergePathNodesUS);
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

  dataReadyAndSetupMergePathManagers();
}

// as data gets ready, create manager for Cluster node and edge
function dataReadyAndSetupMergePathManagers(){
	EdgeManagerMergePaths = [];
	NodeManagerMergePaths = [];

	for (var mergePathId in dataManager.nodesUSMergePaths){

		var nodesUSMergePath = dataManager.nodesUSMergePaths[mergePathId];

		var mergePathNodeManager = new NodeManager(1240, 820, SCENE_MERGEPATH); 
		
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

		var mergePathEdgeManager = new EdgeManager(1240, 820, SCENE_MERGEPATH); 

		var edges = {};
		for (var key in edgesUSMergePath){

			var edge = edgesUSMergePath[key];
			var edge_id = edge['edge_id'];
			edges[edge_id] = edge;

		}
		mergePathEdgeManager.setup(edges);
		
		EdgeManagerMergePaths.push(mergePathEdgeManager);

	}

  	dataManager.bDataLoaded = true;
}