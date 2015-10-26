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

  this.setup = function() {

    var r = map(this.node_meanAge_all, 50, 80, 30, 255);
    var g = map(this.node_meanAge_all, 50, 80, 186, 30);
    var b = map(this.node_meanAge_all, 50, 80, 255, 30);
    this.stroke_color = createVector(r, g, b);

    if (this.node_type == 'die')
    {
      this.strokeWidth = this.originalSize * 3;
    }
    else
    {
      this.strokeWidth = this.originalSize * 2;
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
      if (this.node_type == 'die')
      {
        
        strokeWeight(this.strokeWidth);
        stroke(this.stroke_color.x, this.stroke_color.y, this.stroke_color.z);

        fill(this.color);
        rect(this.pos.x, this.pos.y, this.size, this.size)
        fill(0);
      }
      else{
        
        strokeWeight(this.strokeWidth);
        stroke(this.stroke_color.x, this.stroke_color.y, this.stroke_color.z);

        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
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