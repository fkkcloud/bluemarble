var Etage = function(id, 
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
  if (this.ch == '99')
    this.color                    = color(node_color[0]);
  else
    this.color                    = color(node_color[this.ch]);

  this.show                       = true;

  this.timer = 0; // timer per each lines

  var delay_time = map(this.node_meanAge_cluster, 45, 85, 60, 405); // 1000, 16000
  var delay_time_delta = map(this.node_meanAge_cluster, 45, 85, 15, 135); // 100, 2000
  var d = new Date(); /* except */

  this.trigger_delay = delay_time - delay_time_delta; //d.getTime() + delay_time - delay_time_delta; // trigger time

  this.anim_duration = 2400;

  this.setup = function() {

    var r, g, b;
    if (this.node_meanAge_all >= 55 && this.node_meanAge_all < 66){
      r = map(this.node_meanAge_all, 58, 65, 30, 255);
      g = map(this.node_meanAge_all, 58, 65, 186, 255);
      b = map(this.node_meanAge_all, 58, 65, 255, 153);
    } else if (this.node_meanAge_all >= 66) {
      r = map(this.node_meanAge_all, 65, 75, 255, 255);
      g = map(this.node_meanAge_all, 65, 75, 255, 80);
      b = map(this.node_meanAge_all, 65, 75, 153, 80);
    } else if (this.node_meanAge_all < 55) {
      r = 30;
      g = 186;
      b = 255;
    }
    this.stroke_color = createVector(r, g, b);

    var size_multiplier_die = map(this.originalSize, 0, 1, 1.5, 2.75)
    var size_multiplier     = map(this.originalSize, 0, 1, 1.5, 3);

    if (this.node_type == 'die')
    {
      this.strokeWidth = size_multiplier_die;
    }
    else
    {
      this.strokeWidth = size_multiplier;
    }
  };

  this.run = function() {
    this.update();
    this.display();
  };

  // Method to display
  this.display = function() {

    if (!this.show) // hide
    {
      //
    } 
    else // show
    {
      /*
      var d = new Date();
      var now = d.getTime();
      
      if (now < this.trigger_delay)
        return;
      */

      if (GLOBAL_FRAME < this.trigger_delay)
        return;

      if (this.timer <= 1) {
        this.timer += 0.01;
      }

      var size_mult = this.timer;
      if (size_mult > 1.0)
        size_mult = 1.0;

      if (this.node_type == 'die')
      {
        strokeWeight(this.strokeWidth * size_mult);
        stroke(this.stroke_color.x, this.stroke_color.y, this.stroke_color.z);

        fill(this.color);
        rect(this.pos.x - this.size * 0.5, this.pos.y - this.size * 0.5, this.size * size_mult, this.size * size_mult)
        //scale(size_mult);
        fill(0);
      }
      else{
        
        strokeWeight(this.strokeWidth * size_mult);
        stroke(this.stroke_color.x, this.stroke_color.y, this.stroke_color.z);

        fill(this.color);
        ellipse(this.pos.x , this.pos.y, this.size * size_mult, this.size * size_mult);
        //scale(size_mult);
        fill(0);
        //text('test', this.pos.x - 3, this.pos.y + 4);  
      }
    }
  };

  this.update = function() {

  };

  //getters 
  this.setPosition = function(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  };

  //setters
  this.getPosition = function() {
    return this.pos;
  }
};