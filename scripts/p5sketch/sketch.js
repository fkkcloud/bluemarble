
var width = window.innerWidth;
var height = window.innerHeight;
var x = width / 2;
var y = height / 2;

var etageManager  = new EtageManager();
var trajetManager = new TrajetManager();
//var eventManager  = new EventManager(etageManager, trajetManager);

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

function dataReadyAndSetupManagers(){
  etageManager.setup(dataManager);
  trajetManager.setup(dataManager, etageManager);
}

function setup() {
    //var canvas = createCanvas(width, height);
    //canvas.parent('canvasHolder');
    //createCanvas(window.innerWidth, window.innerHeight);
    //background(51);
    smooth();
    frameRate(16);

    $.getJSON("nodesUS.json", loadNodesUS);

    //eventManager.setup();
  var canvasHolder = select('#canvasHolder'),
        canvasWidth  = canvasHolder.width,
        canvasHeight = canvasHolder.height;
  
  console.log(canvasHolder);
  print(canvasWidth + ', ' + canvasHeight);
 
  createCanvas(canvasWidth, canvasHeight).parent('canvasHolder');
}

function draw() {
    //createCanvas(window.innerWidth, window.innerHeight);
    background(51);


    if (!etageManager.isDataReady && !trajetManager.isDataReady)
      return;

    trajetManager.run();
    etageManager.run();
}

