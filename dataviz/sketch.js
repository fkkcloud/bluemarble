
var width = window.innerWidth;
var height = window.innerHeight;
var x = width / 2;
var y = height / 2;

var GLOBAL_FRAME = 0;

var etageManager  = new EtageManager();
var trajetManager = new TrajetManager(width, height);
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
    background(51);

    smooth(10);
    frameRate(60);    

    $.getJSON("nodesUS.json", loadNodesUS);

    setTimeout(function(){
          var canvasHolder = select('#canvasHolder'),
          canvasWidth  = canvasHolder.width,
          canvasHeight = canvasHolder.height; 
          createCanvas(canvasWidth, canvasHeight).parent('canvasHolder');
    }, 10);
    //eventManager.setup();
}

function draw() {

    
    background(51);


    if (!etageManager.isDataReady && !trajetManager.isDataReady)
      return;

    trajetManager.run();
    etageManager.run();

    //save('render.' + GLOBAL_FRAME + '.jpg');

    GLOBAL_FRAME++;
}

