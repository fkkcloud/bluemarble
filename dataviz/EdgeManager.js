var EdgeManager = function(width, height, scene) {

  this.width = width;
  this.height = height;

  this.edges = [];

  this.isDataReady = false;

  this.dataManager;

  this.scene = scene;

  this.setup = function(data) {
    this.isDataReady = true;

    var keys = Object.keys(data);

    var width =  this.width;
    var height = this.height;

    var scene = this.scene;

    var buf = [];
    keys.forEach(function (key) { 
      var edge_data = data[key]; // get data

      var original_edge_start = new THREE.Vector3(parseFloat(edge_data.pos_start.x), parseFloat(edge_data.pos_start.y), 0);
      var original_edge_end   = new THREE.Vector3(parseFloat(edge_data.pos_end.x),   parseFloat(edge_data.pos_end.y)  , 0);

      var width_scale_factor  = (width  * 0.035);
      var height_scale_factor = (height * 0.24);
      var y_pos_offset = -470;

      var scaled_edge_start = new THREE.Vector3(
        original_edge_start.x * width_scale_factor, 
        original_edge_start.y * height_scale_factor + y_pos_offset,
        0);

      var scaled_edge_end = new THREE.Vector3(
        original_edge_end.x * width_scale_factor, 
        original_edge_end.y * height_scale_factor + y_pos_offset,
        0);

      var visualize_type = edge_data.custom_meanAge !== undefined ? 0 : 1;

      var new_edge = new Edge(
        original_edge_start,
        scaled_edge_start, 
        original_edge_end,
        scaled_edge_end, 
        edge_data.noCase_all, 
        edge_data.noCase_mergedPath, 
        edge_data.type, 
        edge_data.noCase_cluster,
        edge_data.mean_start,
        edge_data.mean_end,
        edge_data.size_start,
        edge_data.size_end,
        edge_data.source_Ch,
        edge_data.group_cluster,
        scene,
        edge_data.custom_meanAge,
        visualize_type); //

      new_edge.setup();
      buf.push(new_edge);
    });

    this.edges = buf;

    if (PAGE_NUM.value === 1){
      this.toggleVisibility(false);
      this.toggleShowByCluster(SELECTED_CLUSTER, true);
    }

  };

  this.run = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].run();
    }
  };

  this.toggleVisibility = function(val) {
    for (var i = 0; i < this.edges.length; i++) {
      if (val)
        this.edges[i].show();
      else
        this.edges[i].hide();
    };
  };

  this.toggleShowByCluster = function(clusterID) {

    this.hideAll();

    for (var i = 0; i < this.edges.length; i++) {

      var edge = this.edges[i];

      var bEdgeShow = false;

      for (var j = 0; j < edge.group_cluster_list.length; j++){

        var edge_cluster_id = edge.group_cluster_list[j];

        if (edge_cluster_id == clusterID){
          bEdgeShow = true;
          break;
        }  

      }

      if (bEdgeShow)
        edge.show();
      else
        edge.hide();
      
    }
  };

  this.hideAll = function(){

    for (var i = 0; i < this.edges.length; i++) {

      var edge = this.edges[i];
      edge.hide();

    }

  }

  this.showAll = function(){

    for (var i = 0; i < this.edges.length; i++) {

      var edge = this.edges[i];
      edge.show();

    }

  }

  this.reset = function() {
    for (var i = 0; i < this.edges.length; i++) {
        this.edges[i].reset();
    }
  };
};