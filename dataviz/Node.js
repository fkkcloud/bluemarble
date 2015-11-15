var Node = function(id, 
    originalPos, 
    scaledPos, 
    originalSize, 
    scaledSize, 
    node_type, 
    ch, 
    name, 
    node_meanAge_all, 
    node_meanAge_mergedPath, 
    group_mergePath, 
    node_meanAge_cluster, 
    group_cluster,
    scene,
    custom_mean) 
{

  this.id                       = id;
  this.node_type                = node_type;
  
  this.originalPos              = originalPos;
  this.pos                      = scaledPos;

  this.originalSize             = originalSize;
  this.size                     = scaledSize;

  this.ch                       = ch;
  this.name                     = name;

  this.node_meanAge_all         = node_meanAge_all;
  this.node_meanAge_mergedPath  = node_meanAge_mergedPath;
  this.node_meanAge_cluster     = node_meanAge_cluster;

  this.group_mergePath          = group_mergePath;
  this.group_cluster            = group_cluster;

  this.timer                    = 0;

  this.custom_mean              = custom_mean;

  var mapValue;
  if (this.custom_mean == undefined){

    mapValue = this.node_meanAge_all;

  }
  else{

    mapValue = this.custom_mean;

  }

  this.trigger_delay            = mapRange([35, 85], [-100, 365], mapValue);

  this.scene                    = scene;

  this.setupColor = function(mean) {
    
    // node color by chapter
    if (this.ch == '99'){

      this.color = new THREE.Color(node_color[0]);

    }
    else{

      this.color = new THREE.Color(node_color[this.ch]);
      var HSL = this.color.getHSL();
      this.color.setHSL(HSL.h, 1.0, 0.42);

    }
    
    // node border color by mean
    var r, g, b;
    if (mean >= 55 && mean < 68){

      r = mapRange([58, 68], [30, 255], mean);
      g = mapRange([58, 68], [186, 255], mean);
      b = mapRange([58, 68], [255, 153], mean);

    } else if (mean >= 68) {

      r = mapRange([67, 75], [255, 255], mean);
      g = mapRange([67, 75], [255, 80], mean);
      b = mapRange([67, 75], [153, 80], mean);

    } else if (mean < 55) {

      r = 30;
      g = 186;
      b = 255;

    }

    this.stroke_color = new THREE.Color( rgbToHex(r, g, b) );

    var HSL = this.stroke_color.getHSL();
    this.stroke_color.setHSL(HSL.h, 1.0, 0.42);
  }

  this.setup = function() {

    // settings for node mesh
    var radius = this.size;
    var segments;
    if (this.node_type == 'die')
      segments = 4;
    else
      segments = Math.ceil(this.size);

    // geo creations
    var circle_geometry = new THREE.CircleGeometry( radius, segments );

    // buffer geo creations
    var buffered_circle_geometry = new THREE.BufferGeometry().fromGeometry(circle_geometry);
    
    // materials
    this.setupColor(this.node_meanAge_all);
    var circle_material        = new THREE.MeshBasicMaterial( { color: new THREE.Color('#FFFFFF') } ); 
    var circle_border_material = new THREE.MeshBasicMaterial( { color: this.stroke_color } );

    // set tween color material
    var target_color    = { r : this.color.r, g : this.color.g, b : this.color.b };
    this.tween_color    = new TWEEN.Tween(circle_material.color)
    .to(target_color, 3000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(function(){
      circle_material.color.setRGB(this.r, this.g, this.b);
    });

    // mesh creations
    this.circle_shaded         = new THREE.Mesh( buffered_circle_geometry, circle_material ); 
    this.circle_border_shaded  = new THREE.Mesh( buffered_circle_geometry, circle_border_material );

    // set border width
    var size_stroke_die = mapRange([0, 1], [1.35,  1.25],  this.originalSize);
    var size_stroke     = mapRange([0, 1], [1.275, 1.175], this.originalSize);
    if (this.node_type =='die'){

      this.circle_border_shaded.scale.set(size_stroke_die, size_stroke_die, size_stroke_die);  

    }
    else {

      this.circle_border_shaded.scale.set(size_stroke, size_stroke, size_stroke); 

    }

    // set z-depth per nodes
    var border_z_offset = -0.025;
    var z_depth         = mapRange([0, 1], [2.5, 0.65], this.originalSize);

    // apply z-depth
    this.circle_shaded.position.z        = z_depth;
    this.circle_border_shaded.position.z = z_depth + border_z_offset;

    this.createNode();
  };

  this.createNode = function() {
    this.scene.remove(this.node);

    // create node mesh
    var node = new THREE.Object3D();
    
    // add node meshes
    node.add(this.circle_border_shaded);
    node.add(this.circle_shaded);

    // set position nodes meshes
    node.position = new THREE.Vector3();
    node.position.x = this.pos.x;
    node.position.y = this.pos.y;
    node.position.z = 0.1;

    // set scale for nodes initial
    node.scale.set(0.001, 0.001, 0.001);

    // set tween for scale
    var target_scale    = {target_size : 1.0 };
    this.tween_scale    = new TWEEN.Tween(node.scale)
    .to(target_scale, 3000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(function(){
      node.scale.set(this.target_size, this.target_size, this.target_size);
    });

    // initial rotation values
    node.rotation.z += Math.PI * 0.25;

    this.node = node;
    this.scene.add(this.node);

  }

  this.run = function(time) {

    if (FRAME.value < this.trigger_delay)
      return;

    if (this.timer <= 1) {

      this.timer += 0.01;

      if (this.timer == 0.01){

        this.tween_scale.start();
        this.tween_color.start();

      }

      this.tween_scale.update(time);
      this.tween_color.update(time);

      //this.material.color.set();
      //this.node.scale.set(this.timer, this.timer, this.timer);

    }

  };

  this.show = function(){

    this.node.visible = true;

    for(var i = 0,il = this.node.children.length;i<il;i++){

      this.node.children[i].visible = true;

    }

  }

  this.hide = function(){

    this.node.visible = false;

    for(var i = 0,il = this.node.children.length;i<il;i++){

      this.node.children[i].visible = false;

    }

  }

  this.reset = function() {
    this.timer = 0.0;

    this.createNode();

    // reset tween color material
    var circle_material         = new THREE.MeshBasicMaterial( { color: new THREE.Color('#FFFFFF') } ); 
    this.circle_shaded.material = circle_material;

    var target_color    = { r : this.color.r, g : this.color.g, b : this.color.b };
    this.tween_color    = new TWEEN.Tween(circle_material.color)
    .to(target_color, 3000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(function(){
      circle_material.color.setRGB(this.r, this.g, this.b);
    });

  }

};