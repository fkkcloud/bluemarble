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
    group_cluster_list,
    scene,
    custom_mean,
    initial,
    visualize_type) 
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

  if (group_cluster_list === undefined)
    this.group_cluster_list     = [ NOT_CLUSTER_ID ];
  else
    this.group_cluster_list     = group_cluster_list;

  this.timer                    = 0;

  this.custom_mean              = custom_mean;

  this.initial                  = initial;

  if (visualize_type == 0){ // debug to be true always for now - CHECK LATER

    this.trigger_delay          = this.custom_mean;

  }
  else{

    var global_delay;
    if (DATATYPE.value == 'US')
      global_delay = 120;
    else 
      global_delay = 160;

    this.trigger_delay          = mapRange( [35, 85], [-100, 365], this.node_meanAge_all ) + global_delay;

  }

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
    
    /*
     0~25세정도(?) 파랑
     26~49세      파랑~회색의 중간색상
     50~60세      노랑
     61~72세      주황(오렌지)
     73~ 이상      빨강
    */
    // node border color by mean

    var r, g, b;

    if (mean < 26) {

      r = 30;
      g = 186;
      b = 255;

    } else if (mean >= 26 && mean < 50){

      r = mapRange([26, 50], [30, 100], mean);
      g = mapRange([26, 50], [186, 100], mean);
      b = mapRange([26, 50], [255, 100], mean);

    } else if (mean >= 50 && mean < 61) {

      r = mapRange([50, 61], [100, 255], mean);
      g = mapRange([50, 61], [100, 255], mean);
      b = mapRange([50, 61], [100, 153], mean);

    } else if (mean >= 61 && mean < 73) {

      r = mapRange([61, 73], [255, 255], mean);
      g = mapRange([61, 73], [255, 80], mean);
      b = mapRange([61, 73], [153, 80], mean);

    } else {

      r = 255;
      g = 80;
      b = 80;

    }

    this.stroke_color = new THREE.Color( rgbToHex(r, g, b) );

    var HSL = this.stroke_color.getHSL();
    this.stroke_color.setHSL(HSL.h, 1.0, 0.42);
  }

  this.setupNodeMaterial = function() {

    // reset tween color material
    var circle_material         = new THREE.MeshBasicMaterial( { color: new THREE.Color('#FFFFFF') } ); 
    this.circle_shaded.material = circle_material;

    var target_color     = { r : this.color.r, g : this.color.g, b : this.color.b };
    var tween_node_color = new TWEEN.Tween(circle_material.color)
    .to(target_color, 3000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(function(){
      circle_material.color.setRGB(this.r, this.g, this.b);
    })
    this.tween_node_color = tween_node_color;

  }

  this.setup = function() {

    // settings for node mesh
    var radius_mult = 1.0;

    if (visualize_type == 0) // bigger node size for mergepath
      radius_mult = 1.25;

    var radius = this.size * radius_mult;

    var segments;
    if (this.node_type == 'die'){
      segments = 4;
    }
    else{
      segments = Math.ceil(this.size);

      if (visualize_type == 0) // if its for mergepath, need more resolution
        segments *= 3;
    }

    // geo creations
    var circle_geometry = new THREE.CircleGeometry( radius, segments );

    // buffer geo creations
    this.buffered_circle_geometry = new THREE.BufferGeometry().fromGeometry(circle_geometry);
    
    // materials
    this.setupColor(this.node_meanAge_all);

    var circle_material         = new THREE.MeshBasicMaterial( { color: new THREE.Color('#FFFFFF') } ); 
    var circle_border_material  = new THREE.MeshBasicMaterial( { color: this.stroke_color } );

    // mesh creations
    this.circle_shaded          = new THREE.Mesh( this.buffered_circle_geometry, circle_material ); 
    this.circle_border_shaded   = new THREE.Mesh( this.buffered_circle_geometry, circle_border_material );

    this.setupNodeMaterial();

    // set border width
    var size_stroke_die = mapRange([0, 1], [1.65,  1.25],  this.originalSize);
    var size_stroke     = mapRange([0, 1], [1.575, 1.175], this.originalSize);
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
    this.circle_shaded.position.z         = z_depth;
    this.circle_border_shaded.position.z  = z_depth + border_z_offset;

    this.createNode();
    this.createNodeEffects();

    this.createNodeText();
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
    this.tween_node_scale    = new TWEEN.Tween(node.scale)
    .to(target_scale, 3000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(function(){
      node.scale.set(this.target_size, this.target_size, this.target_size);
    });

    // initial rotation values
    node.rotation.z += Math.PI * 0.25;

    this.node = node;
    this.node.node_color = this.color;
    this.node.node_size  = mapRange([0, 1], [2.0, 1.05], this.originalSize);
    this.scene.add(this.node);

  }

  this.createNodeEffects = function() {

    // remove the old node_effect meshes
    if (this.node_effects !== undefined){
      for (var m = 0; m < this.node_effects.length; m++)
        this.scene.remove(this.node_effects[m]);  
    }
    
    // create node mesh
    var node_effect1 = new THREE.Object3D();
    //var node_effect2 = new THREE.Object3D();
    //var node_effect3 = new THREE.Object3D();

    this.node_effects = [node_effect1] //, node_effect2, node_effect3]; // for performance using only 1 circle

    this.tween_node_effects = [];

    for (var m = 0; m < this.node_effects.length; m++){
      
      var node_effect = this.node_effects[m];

      var circle_effects_material = new THREE.MeshBasicMaterial( { color: this.color, transparent: true, opacity: 1.0 } );

      this.circle_effects_shaded = new THREE.Mesh( this.buffered_circle_geometry, circle_effects_material );

      node_effect.add(this.circle_effects_shaded);

      // set position nodes meshes
      node_effect.position   = new THREE.Vector3();
      node_effect.position.x = this.pos.x;
      node_effect.position.y = this.pos.y;
      node_effect.position.z = -0.1 * m -0.2;

      // set scale for nodes initial
      node_effect.scale.set(0.001, 0.001, 0.001);

      // set repeat source
      var repeat_count = 0;
      if (visualize_type == 0 && this.initial > 0)
        repeat_count = Infinity;

      // set tween for scale
      var fx_scale    = { size : 8.0 };
      var tween_node_fx_scale    = new TWEEN.Tween(node_effect.scale)
      .to(fx_scale, 2500)
      .easing(TWEEN.Easing.Circular.Out)
      .onUpdate(function(){
        node_effect.scale.set(this.size, this.size, this.size);
      })
      .repeat(repeat_count)
      .delay(m * 300);
      this.tween_node_effects.push(tween_node_fx_scale);

      // set tween alpha material
      var fx_opacity = { 'opacity' : 0.0 };
      var tween_node_fx_opacity    = new TWEEN.Tween(circle_effects_material)
      .to(fx_opacity, 2500)
      .easing(TWEEN.Easing.Circular.Out)
      .repeat(repeat_count)
      .delay(m * 300);
      this.tween_node_effects.push(tween_node_fx_opacity);

      this.scene.add(node_effect);
    }

  }

  this.createNodeText = function() {

    this.scene.remove(this.nodeText);

    // generate text
    // create a canvas element
    var desiredWidthInCSSPixels  = 512;
    var desiredHeightInCSSPixels = 64;
    
    var canvasText = document.createElement('canvas');

    //canvasText.width  = desiredWidthInCSSPixels;
    //canvasText.height = desiredHeightInCSSPixels;
 
    // set the display size of the canvas.
    canvasText.style.width = desiredWidthInCSSPixels + "px";
    canvasText.style.height = desiredHeightInCSSPixels + "px";
     
    // set the size of the drawingBuffer
    var devicePixelRatio = window.devicePixelRatio || 1;
    var width_scale = Math.max(Math.min(mapRange([6, 34], [24, 12], this.name.length), 24), 12);

    canvasText.width = desiredWidthInCSSPixels * devicePixelRatio;
    canvasText.height = desiredHeightInCSSPixels * devicePixelRatio;

    /*
    // context text upper bar
    var ctxTextUpperBar = canvasText.getContext("2d");
    ctxTextUpperBar.rect(0, 40, 10, 8);
    var colorString = 'rgba(' + Math.floor(this.color.r * 255) + ',' + Math.floor(this.color.g * 255) + ',' + Math.floor(this.color.b * 255) + ',' + 1.0 + ')';
    ctxTextUpperBar.fillStyle = colorString;
    ctxTextUpperBar.fill();
    */

    // context text box
    var ctxTextBox = canvasText.getContext("2d");
    ctxTextBox.rect(0, canvasText.height * 0.625, this.name.length * width_scale, canvasText.height * 0.2);
    ctxTextBox.fillStyle="rgba(40,30,40,1.0)";
    ctxTextBox.fill();

    // context text
    var ctxText2d = canvasText.getContext('2d');
    ctxText2d.font = "24px Lato";
    ctxText2d.fillStyle = "rgba(190,190,200,1.0)";
    ctxText2d.fillText(this.name + ' : ' + Math.ceil(this.node_meanAge_mergedPath), 0, canvasText.height * 0.8);
      
    // canvas contents will be used for a texture
    var texture1 = new THREE.Texture(canvasText);
    var maxAnisotropy = renderer.getMaxAnisotropy();
    texture1.needsUpdate = true;
    texture1.anisotropy = maxAnisotropy;
    texture1.magfilter = THREE.LinearFilter;

    var basicMaterial = new THREE.MeshBasicMaterial( {map: texture1 } );
    basicMaterial.transparent = true;
    basicMaterial.opacity = 0.0;
    
    var textMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(canvasText.width, canvasText.height),
        basicMaterial
      );
    
    var x_offset = canvasText.width * 0.5 - this.size;
    textMesh.position.x = this.pos.x + x_offset;

    var y_offset = Math.max(24 * devicePixelRatio, this.size * devicePixelRatio * 1.8);
    textMesh.position.y = this.pos.y + y_offset;
    textMesh.position.z = 5.0;

    // set tween alpha material
    var target_opacity1 = { 'opacity' : 0.6 };
    this.tween_text_opacity_to1   = new TWEEN.Tween(basicMaterial)
    .to(target_opacity1, 3500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onComplete(function(){
      basicMaterial.opacity = 0.0;
    })

    this.nodeText  = textMesh;
    this.node.text = this.nodeText;
    this.scene.add(this.nodeText);

  }

  this.run = function(time) {

    if (FRAME.value < this.trigger_delay)
      return;

    var update_disable_time = 2.2; // this value is for perfomance - not to run this function after certain time - WIP

    var node_initial_in_mergepath = (visualize_type == 0 && this.initial > 0);

    if (this.timer <= update_disable_time || node_initial_in_mergepath ) {

      this.timer += 0.01;

      if (this.timer == 0.01){

        this.tween_node_scale.start();
        this.tween_node_color.start();

        for (var k = 0; k < this.tween_node_effects.length; k++){
          this.tween_node_effects[k].start();
        }

        this.tween_text_opacity_to1.start(); 

      }

      this.tween_node_scale.update(time);
      this.tween_node_color.update(time);

      for (var k = 0; k < this.tween_node_effects.length; k++){
        this.tween_node_effects[k].update(time);
      }

      this.tween_text_opacity_to1.update(time);

    }

  };

  this.showNodes = function(){

    this.node.visible = true;
    this.nodeText.visible = true;

    for(var i = 0,il = this.node.children.length;i<il;i++){

      this.node.children[i].visible = true;

    }

    for (var i = 0; i < this.node_effects.length; i++){

      this.node_effects[i].visible = true;

    }

  }

  this.hideNodes = function(){

    this.node.visible = false;
    this.nodeText.visible = false;

    for(var i = 0,il = this.node.children.length;i<il;i++){

      this.node.children[i].visible = false;

    }

    for (var i = 0; i < this.node_effects.length; i++){

      this.node_effects[i].visible = false;

    }

  }

  this.hideNodeTexts = function(){

    this.nodeText.visible = false;

  }

  this.showNodeTexts = function(){

    this.nodeText.visible = true;
    
  }

  this.clean = function() {

    // remove the old node_effect meshes
    if (this.node_effects !== undefined){
      for (var m = 0; m < this.node_effects.length; m++)
        this.scene.remove(this.node_effects[m]);  
    }
    
  }

  this.reset = function() {

    // reset timer
    this.timer = 0.0;

    // createNode() will remove the previous mesh and create new one with new tween animation
    this.createNode();
    this.createNodeEffects();

    // createNodeText() will remove the previous mesh and create new one with new tween animation
    this.createNodeText();

    this.setupNodeMaterial(); // reset tween material animation
  }

};