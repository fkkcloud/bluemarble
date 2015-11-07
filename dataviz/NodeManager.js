var NodeManager = function(width, height) {
  this.stepWidth = (width / 7) - 30;
  this.etages = [];
  this.size = 30;
  this.color = [];
  this.dataManager;
  this.width = width;
  this.height = height;
  this.nodes = [];
  this.isDataReady = false;

  this.setup = function(dataManager) {
    this.isDataReady = true;

    this.dataManager = dataManager;
    
    this.color[0] = new THREE.Color("rgb(81, 159, 204)");
    this.color[1] = new THREE.Color("rgb(137, 147, 153)");
    this.color[2] = new THREE.Color("rgb(126, 255, 233)");
    this.color[3] = new THREE.Color("rgb(255, 199, 190)");
    this.color[4] = new THREE.Color("rgb(204, 81, 85)");
    this.color[5] = new THREE.Color("rgb(63, 127, 116)");
    this.color[6] = new THREE.Color("rgb(101, 127, 123)");
    this.color[7] = new THREE.Color("rgb(255, 232, 126)");

    var keys = Object.keys(this.dataManager.nodes);
    var node_count = keys.length;

    var array = [];

    var width = this.width;
    var height = this.height;

    keys.forEach(function (key) { 
        var node_data = this.dataManager.nodes[key];

        var width_scale_factor  = (width  * 0.038);
        var height_scale_factor = (height * 0.112);

        var original_post = new THREE.Vector3(
          parseFloat(node_data.pos.x),
          parseFloat(node_data.pos.y),
          0.0);

        var scaled_pos = new THREE.Vector3(
          original_post.x * width_scale_factor, 
          original_post.y * height_scale_factor,
          0.0);
        
        var scale_factor = mapRange([0.0, 0.5], [45, 27.5], node_data.normalized_size);

        var scaled_size = node_data.normalized_size * scale_factor;

        var fix_min_scale_factor = mapRange([0.0, 3.0], [10.0, 1.0], scaled_size);

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
        var new_node = new Node(
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

    this.nodes = array; 
  };

  this.run = function() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].run();
    };
  };

  this.toggleShowByCluster = function(clusterID, val) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].group_cluster == clusterID)
        this.nodes[i].show = val;
    };
  };

};
