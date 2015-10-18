

var TrajetManager = function(width, height) {

  this.stepWidth = (width / 7) - 30;
  this.etages = [];
  this.etagesPosition = [];
  this.trajets = [];
  this.etages;
  this.sliderValue = 0;

  this.isDataReady = false;

  this.dataManager;

  this.setup = function(dataManager, etagesManager) {
    this.isDataReady = true;

    this.dataManager = dataManager;

    var randomTime = parseInt(random(20, 50));
    //this.sliderValue = randomTime;

    var keys = Object.keys(this.dataManager.edges);
    var edge_count = keys.length;
    this.sliderValue = edge_count;

    var array = [];

    var width = window.innerWidth;
    var height = window.innerHeight;

    keys.forEach(function (key) { 
      var edge_data = this.dataManager.edges[key];

      var stepWidth = etagesManager.getStepWidth();

      var original_edge_start = createVector(parseFloat(edge_data.pos_start.x), parseFloat(edge_data.pos_start.y));
      var original_edge_end   = createVector(parseFloat(edge_data.pos_end.x),   parseFloat(edge_data.pos_end.y));

      var width_scale_factor  = (width  * 0.011);
      var height_scale_factor = (height * 0.115) * -1.0;

      var scaled_edge_start = createVector(
        original_edge_start.x * width_scale_factor, 
        original_edge_start.y * height_scale_factor + height);

      var scaled_edge_end = createVector(
        original_edge_end.x * width_scale_factor, 
        original_edge_end.y * height_scale_factor + height);

      var new_edge = new Trajet(
        original_edge_start,
        scaled_edge_start, 
        original_edge_end,
        scaled_edge_end, 
        edge_data.noCase_all, 
        edge_data.noCase_mergedPath, 
        edge_data.type, 
        edge_data.noCase_cluster, 
        stepWidth);

      new_edge.setup();
      array.push(new_edge);
    });

    this.trajets = array;
  };

  this.run = function() {
    //this.update();
    this.display();
  };

  this.update = function() {
    /*
    var width = window.innerWidth;
    var height = window.innerHeight;

    for (var i = 0; i < this.trajets.length; i++) {
      var trajet = this.trajets[i];

      var width_scale_factor  = (width * 0.011);
      var height_scale_factor = (height * 0.115) * -1.0;

      trajet.start = createVector(
        trajet.original_start.x * width_scale_factor, 
        trajet.original_start.y * height_scale_factor + height);

      trajet.end = createVector(
        trajet.original_end.x * width_scale_factor, 
        trajet.original_end.y * height_scale_factor + height);
    }*/
  };

  this.display = function() {
    for (var i = 0; i < this.trajets.length; i++) {
      var trajet = this.trajets[i];
      trajet.run();
    }
  };

  this.getAll = function() {
    return this.trajets;
  }

  this.getTrajetsByFloor = function(floor) {
    var allTrajetsByFloor = [];
    for (var i = 0; i < this.trajets.length; i++) {
      var trajet = this.trajets[i];
      if (trajet.getEtageStart() == floor) {
        allTrajetsByFloor.push(trajet);
      }
    };

    return allTrajetsByFloor;
  }

  this.setAllState = function(newState) {
    for (var i = this.trajets.length - 1; i >= 0; i--) {
      var trajet = this.trajets[i];
      trajet.setState(newState);
    }
  };

  this.setAllStateByFloor = function(newState, floor) {
    for (var i = this.trajets.length - 1; i >= 0; i--) {
      var trajet = this.trajets[i];
      if (trajet.getEtageStart() == floor) {
        trajet.setState(newState);
      }
    }
  };

  this.setSliderValue = function(newSliderValue) {
    this.sliderValue = newSliderValue;
  };

};