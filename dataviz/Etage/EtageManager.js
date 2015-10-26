var EtageManager = function() {
  this.stepWidth = (width / 7) - 30;
  this.etages = [];
  this.size = 30;
  this.color = [];
  this.dataManager;

  this.isDataReady = false;

  this.setup = function(dataManager) {
    this.isDataReady = true;

    this.dataManager = dataManager;
    
    this.color[0] = createVector(81, 159, 204);
    this.color[1] = createVector(137, 147, 153);
    this.color[2] = createVector(126, 255, 233);
    this.color[3] = createVector(255, 199, 190);
    this.color[4] = createVector(204, 81, 85);
    this.color[5] = createVector(63, 127, 116);
    this.color[6] = createVector(101, 127, 123);
    this.color[7] = createVector(255, 232, 126);

    var keys = Object.keys(this.dataManager.nodes);
    var node_count = keys.length;

    var array = [];

    var width = window.innerWidth;
    var height = window.innerHeight;

    keys.forEach(function (key) { 
        var node_data = this.dataManager.nodes[key];

        var width_scale_factor  = (width  * 0.011);
        var height_scale_factor = (height * 0.115) * -1.0;

        var original_post = createVector(
          parseFloat(node_data.pos.x),
          parseFloat(node_data.pos.y));

        var scaled_pos = createVector(
          original_post.x * width_scale_factor, 
          original_post.y * height_scale_factor + height);
        
        var scale_factor = map(node_data.normalized_size, 0.0, 0.5, 45, 35);

        var scaled_size = node_data.normalized_size * scale_factor;

        var fix_min_scale_factor = map(scaled_size, 0.0, 3.0, 10.0, 1.0);

        if (scaled_size < 3.0)
          scaled_size *= fix_min_scale_factor;

        /* 
        id, 
        originalPos,
        pos,
        originalSize,
        size, 
        node_type, 
        ch, 
        name, 
        node_meanAge_all, 
        node_meanAge_mergedPath, 
        group_mergePath, 
        node_meanAge_cluster, 
        group_cluster, 
        floor 
        */
        var new_node = new Etage(
          key,
          original_post,
          scaled_pos,
          node_data.normalized_size,
          scaled_size,
          node_data.type,
          node_data.ch,
          node_data.name,
          node_data.node_meanAge_all,
          node_data.node_meanAge_mergedPath,
          node_data.group_mergePath,
          node_data.node_meanAge_cluster,
          node_data.group_cluster);

        array.push(new_node);

        new_node.setup();
    })

    this.etages = array; 
  };

  this.run = function() {
    //this.update();
    this.display();
  };

  this.display = function() {
    for (var i = 0; i < this.etages.length; i++) {
      this.etages[i].update();
      this.etages[i].display();
    };
  };

  this.update = function(){
    /*
    var width  = window.innerWidth;
    var height = window.innerHeight;

    for (var i = 0; i < this.etages.length; i++) {
      var width_scale_factor  = (width * 0.011);
      var height_scale_factor = (height * 0.105) * -1.0;
      var scaled_pos = createVector(
        this.etages[i].originalPos.x * width_scale_factor, 
        this.etages[i].originalPos.y * height_scale_factor + window.innerHeight);
      this.etages[i].pos = scaled_pos;  
    };*/
  }

  //GETTERs 
  this.getEtages = function(){
    return this.etages;
  };

  this.getStepWidth = function() {
    return this.stepWidth;
  };

  this.toggleShowByCluster = function(clusterID, val) {
    for (var i = 0; i < this.etages.length; i++) {
      if (this.etages[i].group_cluster == clusterID)
        this.etages[i].show = val;
    };
  };

};
