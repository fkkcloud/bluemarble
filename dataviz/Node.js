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
    group_cluster) 
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

  // node color by chapter
  if (this.ch == '99'){
    this.color                    = new THREE.Color(node_color[0]);
  }
  else{
    this.color                    = new THREE.Color(node_color[this.ch]);
    var HSL = this.color.getHSL();
    this.color.setHSL(HSL.h, 1.0, 0.42);
  }

  this.show                       = true;

  this.timer = 0;

  var delay_time = mapRange([45, 85], [60, 405], this.node_meanAge_cluster); // 1000, 16000
  var delay_time_delta = mapRange([45, 85], [15, 135], this.node_meanAge_cluster); // 100, 2000
  var d = new Date(); /* except */

  this.trigger_delay = delay_time - delay_time_delta; //d.getTime() + delay_time - delay_time_delta; // trigger time

  this.anim_duration = 2400;

  this.setupColor = function(mean) {
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
    var rgb = "rgb(" + Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b) + ")";
    this.stroke_color = new THREE.Color(rgb);

    var HSL = this.stroke_color.getHSL();
    this.stroke_color.setHSL(HSL.h, 1.0, 0.42);
  }

  this.setup = function() {

    this.setupColor(this.node_meanAge_all);
   
    var size_multiplier_die = mapRange([0, 1], [1.5, 2.75], this.originalSize)
    var size_multiplier     = mapRange([0, 1], [1.5, 3], this.originalSize);

    if (this.node_type == 'die')
    {
      this.strokeWidth = size_multiplier_die;
      this.segments = 4;
    }
    else
    {
      this.segments = Math.ceil(this.size);
      this.strokeWidth = size_multiplier;
    }

    // Circle
    var radius = this.size,
      segments = this.segments,
      circle_border_material = new THREE.LineBasicMaterial( { color: this.stroke_color } ),
      circle_material        = new THREE.MeshBasicMaterial( { color: this.color } ),
      circle_border_geometry = new THREE.CircleGeometry( radius, segments ),
      circle_geometry        = new THREE.CircleGeometry( radius, segments )

    circle_border_geometry.vertices.shift();    
    circle_border_material.linewidth = this.strokeWidth;

    var circle_shaded = new THREE.Mesh( circle_geometry, circle_material );        
    var circle_outline = new THREE.Line( circle_border_geometry, circle_border_material );

    this.node = new THREE.Object3D();
    this.node.add(circle_shaded);
    this.node.add(circle_outline);
    this.node.position = new THREE.Vector3(this.pos.x, this.pos.y, 0.1);
    this.node.scale.set(0.0, 0.0, 0.0);

    SCENE.add(this.node); 
  };

  this.run = function() {
    if (this.show) // hide
    {
      if (FRAME < this.trigger_delay)
        return;

      if (this.timer <= 1) {
        this.timer += 0.01;
        this.node.scale.set(this.timer, this.timer, this.timer);
      }
    }
  };

};