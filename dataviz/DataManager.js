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