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

  if (this.custom_mean == undefined){ // debug to be true always for now - CHECK LATER

    this.trigger_delay          = mapRange([35, 85], [-100, 365], this.node_meanAge_all);

  }
  else{

    this.trigger_delay          = this.custom_mean;

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

    // mesh creations
    this.circle_shaded         = new THREE.Mesh( buffered_circle_geometry, circle_material ); 
    this.circle_border_shaded  = new THREE.Mesh( buffered_circle_geometry, circle_border_material );

    this.setupNodeMaterial();

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

    if (this.custom_mean > 0)
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
    this.scene.add(this.node);

  }

  this.createNodeText = function() {

    this.scene.remove(this.nodeText);

    var maxAnisotropy = renderer.getMaxAnisotropy();

    // generate text
    // create a canvas element
    var desiredWidthInCSSPixels  = 512;
    var desiredHeightInCSSPixels = 32;
    
    var canvasText = document.createElement('canvas');

    canvasText.width  = desiredWidthInCSSPixels;
    canvasText.height = desiredHeightInCSSPixels;
     
    // context text upper bar
    var ctxTextUpperBar = canvasText.getContext("2d");
    ctxTextUpperBar.rect(0, 10, this.name.length * 12, 4);
    var colorString = 'rgba(' + Math.floor(this.color.r * 255) + ',' + Math.floor(this.color.g * 255) + ',' + Math.floor(this.color.b * 255) + ',' + 0.6 + ')';
    ctxTextUpperBar.fillStyle = colorString;
    ctxTextUpperBar.fill();

    // context text box
    var ctxTextBox = canvasText.getContext("2d");
    ctxTextBox.rect(0, 16, this.name.length * 12, 16);
    ctxTextBox.fillStyle="rgba(10,1,10,0.3)";
    ctxTextBox.fill();

    // context text
    var ctxText2d = canvasText.getContext('2d');
    ctxText2d.font = "20px Lato";
    ctxText2d.fillStyle = "rgba(190,190,200,0.95)";
    ctxText2d.fillText(this.name, 0, canvasText.height);
      
    // canvas contents will be used for a texture
    var texture1 = new THREE.Texture(canvasText) 
    var maxAnisotropy = renderer.getMaxAnisotropy();
    texture1.needsUpdate = true;
    texture1.anisotropy = maxAnisotropy;

    var basicMaterial = new THREE.MeshBasicMaterial( {map: texture1 } );
    basicMaterial.transparent = true;
    basicMaterial.opacity = 0.0;
    
    var textMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(canvasText.width, canvasText.height),
        basicMaterial
      );
    
    var x_offset = canvasText.width * 0.5 - this.size;
    textMesh.position.x = this.pos.x + x_offset;

    var y_offset = Math.max(24, this.size * 2);
    textMesh.position.y = this.pos.y + y_offset;
    textMesh.position.z = 10.0;

    // set tween alpha material
    var target_opacity = { 'alpha' : 1.0 };
    this.tween_text_opacity    = new TWEEN.Tween(basicMaterial)
    .to(target_opacity, 3000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(function(){
      basicMaterial.opacity = this.alpha;
    });

    this.nodeText  = textMesh;
    this.scene.add(this.nodeText);

  }

  this.run = function(time) {

    if (FRAME.value < this.trigger_delay)
      return;

    if (this.timer <= 1) {

      this.timer += 0.01;

      if (this.timer == 0.01){

        this.tween_node_scale.start();
        this.tween_node_color.start();
        if (this.custom_mean > 0)
          this.tween_text_opacity.start();

      }

      this.tween_node_scale.update(time);
      this.tween_node_color.update(time);
      if (this.custom_mean > 0)
        this.tween_text_opacity.update(time);

    }

  };

  this.showNodes = function(){

    this.node.visible = true;

    for(var i = 0,il = this.node.children.length;i<il;i++){

      this.node.children[i].visible = true;

    }
  }

  this.hideNodes = function(){

    this.node.visible = false;

    for(var i = 0,il = this.node.children.length;i<il;i++){

      this.node.children[i].visible = false;

    }
  }

  this.hideNodeTexts = function(){

    this.nodeText.visible = false;

  }

  this.showNodeTexts = function(){

    this.nodeText.visible = true;
    
  }

  this.reset = function() {

    // reset timer
    this.timer = 0.0;

    // createNode() will remove the previous mesh and create new one with new tween animation
    this.createNode();

    // createNodeText() will remove the previous mesh and create new one with new tween animation
    if (this.custom_mean > 0)
      this.createNodeText();

    this.setupNodeMaterial(); // reset tween material animation
  }

};