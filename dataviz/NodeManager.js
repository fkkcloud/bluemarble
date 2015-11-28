var NodeManager = function(width, height, scene) {
  this.stepWidth = (width / 7) - 30;
  this.etages = [];
  this.size = 30;
  this.color = [];
  this.dataManager;
  this.width = width;
  this.height = height;
  this.nodes = [];
  this.isDataReady = false;
  this.scene = scene;

  this.setup = function(data) {
    this.isDataReady = true;
    
    this.color[0] = new THREE.Color("rgb(81, 159, 204)");
    this.color[1] = new THREE.Color("rgb(137, 147, 153)");
    this.color[2] = new THREE.Color("rgb(126, 255, 233)");
    this.color[3] = new THREE.Color("rgb(255, 199, 190)");
    this.color[4] = new THREE.Color("rgb(204, 81, 85)");
    this.color[5] = new THREE.Color("rgb(63, 127, 116)");
    this.color[6] = new THREE.Color("rgb(101, 127, 123)");
    this.color[7] = new THREE.Color("rgb(255, 232, 126)");

    var keys = Object.keys(data);
    var node_count = keys.length;

    var array = [];

    var width = this.width;
    var height = this.height;

    var scene = this.scene;

    keys.forEach(function (key) {

        var node_data = data[key];

        var width_scale_factor  = (width  * 0.035);
        var height_scale_factor = (height * 0.24);
        var y_pos_offset = -470;

        var original_post = new THREE.Vector3(
          parseFloat(node_data.pos.x),
          parseFloat(node_data.pos.y),
          0.0);

        var scaled_pos = new THREE.Vector3(
          original_post.x * width_scale_factor, 
          original_post.y * height_scale_factor + y_pos_offset,
          0.0);
        
        var scale_factor = mapRange([0.05, 0.9], [33, 30], node_data.normalized_size);
        var scaled_size = node_data.normalized_size * scale_factor;

        if (scaled_size <= 5.0){
          var fix_min_scale_factor = mapRange([0.2, 5.0], [7.0, 1.0], scaled_size);
          scaled_size *= fix_min_scale_factor;
        }

        // clamp min and max
        scaled_size = Math.min(Math.max(3.5, scaled_size), 20.0);

        // for search merge paths. - MERGEPATH_INITNODE_REF
        if (node_data.initial !== undefined){
          if (node_data.initial === 1)
            MERGEPATH_INITNODE_REF.push(node_data.name.toLowerCase());
        }

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
        var visualize_type = (node_data.custom_meanAge !== undefined) ? 0 : 1; // if custom_meanAge is not defined its 1

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
          node_data.group_cluster,
          scene,
          node_data.custom_meanAge,
          node_data.initial,
          visualize_type); //

        array.push(new_node);

        new_node.setup();
    })

    this.nodes = array; 

    if (PAGE_NUM.value === 1)
      this.toggleShowByCluster(SELECTED_CLUSTER);
  };

  this.run = function(time) {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].run(time);
    };
  };

  this.clean = function() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].clean();
    };
  }

  this.toggleNodeVisibility = function(val) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (val) {
        this.nodes[i].showNodes();
      }
      else {
        this.nodes[i].hideNodes();
      }
    };
  };

  this.toggleNodeTextVisibility = function(val) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (val) {
        this.nodes[i].showNodeTexts();
      }
      else {
        this.nodes[i].hideNodeTexts();
      }
    };
  };

  this.toggleShowByCluster = function(clusterID) {

    this.hideAll();

    for (var i = 0; i < this.nodes.length; i++) {

      var node = this.nodes[i];

      var bNodeShow = false;

      for (var j = 0; j < node.group_cluster_list.length; j++){

        var node_cluster_id = node.group_cluster_list[j];

        if (node_cluster_id == clusterID){
          bNodeShow = true;
          break;
        }  

      }

      if (bNodeShow)
        node.showNodes();
      else
        node.hideNodes();
      
    }
  };

  this.hideAll = function(){
    for (var i = 0; i < this.nodes.length; i++) {

      var node = this.nodes[i];
      node.hideNodes();

    }
  }

  this.showAll = function(){
    for (var i = 0; i < this.nodes.length; i++) {

      var node = this.nodes[i];
      node.showNodes();

    }
  }

  this.reset = function() {
    for (var i = 0; i < this.nodes.length; i++) {

      if (PAGE_NUM.value === 1){

        var node = this.nodes[i];

        if (SELECTED_CLUSTER == 'All'){
          node.reset();
          node.showNodes();
          continue;
        }

        var bNodeShow = false;

        for (var j = 0; j < node.group_cluster_list.length; j++){

          var node_cluster_id = node.group_cluster_list[j];

          if (node_cluster_id == SELECTED_CLUSTER){
            bNodeShow = true;
            break;
          }

        }

        if (bNodeShow){
          node.showNodes();
          node.reset();
        }
        else{
          node.hideNodes();
        }

      }

      else if (PAGE_NUM.value === 2){

        this.nodes[i].reset();

      }
    }
  };

};
