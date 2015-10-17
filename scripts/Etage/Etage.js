var Etage = function(id, originalPos, scaledPos, originalSize, scaledSize, node_type, ch, name, node_meanAge_all, node_meanAge_mergedPath, group_mergePath, node_meanAge_cluster, group_cluster) {
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
  this.group_mergePath          = group_mergePath;
  this.node_meanAge_cluster     = node_meanAge_cluster;
  this.group_cluster            = group_cluster;

  // node color by chapter
  if (this.ch == '99')
    this.color                    = color(node_color[0]);
  else
    this.color                    = color(node_color[this.ch]);

  this.state                    = 1;

  this.setup = function() {
    //this.color = createVector(244, 220, 255);
  };

  this.run = function() {
    this.update();
    this.display();
  };

  // Method to display
  this.display = function() {

    if (this.state == 0) 
    {
      stroke(0);
      fill(51);
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    } 
    else if (this.state == 1) 
    {
      var temp_color = createVector(255, 255, 255);
      if (this.node_type == 'die')
      {
        strokeWeight(0.8);
        stroke(temp_color.x, temp_color.y, temp_color.z);
        fill(this.color);
        rect(this.pos.x, this.pos.y, this.size, this.size)
        fill(0);
      }
      else{
        strokeWeight(1);
        stroke(temp_color.x, temp_color.y, temp_color.z);
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

  this.getColor = function() {
    return this.color;
  };

  this.getState = function() {
    return this.state;
  };

  this.setState = function(newState) {
    this.state = newState;
  };

};