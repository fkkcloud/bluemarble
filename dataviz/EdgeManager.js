var EdgeManager = function(width, height) {

  this.width = width;
  this.height = height;

  this.edges = [];

  this.isDataReady = false;

  this.dataManager;

  this.setup = function(dataManager) {
    this.isDataReady = true;

    this.dataManager = dataManager;

    var keys = Object.keys(this.dataManager.edges);

    var width =  this.width;
    var height = this.height;

    var buf = [];
    keys.forEach(function (key) { 
      var edge_data = this.dataManager.edges[key]; // get data

      var original_edge_start = new THREE.Vector3(parseFloat(edge_data.pos_start.x), parseFloat(edge_data.pos_start.y), 0);
      var original_edge_end   = new THREE.Vector3(parseFloat(edge_data.pos_end.x),   parseFloat(edge_data.pos_end.y)  , 0);

      var width_scale_factor  = (width  * 0.038);
      var height_scale_factor = (height * 0.112);

      var scaled_edge_start = new THREE.Vector3(
        original_edge_start.x * width_scale_factor, 
        original_edge_start.y * height_scale_factor,
        0);

      var scaled_edge_end = new THREE.Vector3(
        original_edge_end.x * width_scale_factor, 
        original_edge_end.y * height_scale_factor,
        0);

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
        edge_data.group_cluster);

      new_edge.setup();
      buf.push(new_edge);
    });

    this.edges = buf;
  };

  this.run = function() {
    for (var i = 0; i < this.edges.length; i++) {
      var edge = this.edges[i];
      edge.run();
    }
  };

  this.toggleShowByCluster = function(clusterID, val) {
    for (var i = 0; i < this.edges.length; i++) {
      if (this.edges[i].group_cluster == clusterID)
        this.edges[i].show = val;
    }
  };


};