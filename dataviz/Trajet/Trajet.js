
//originals etagesPosition, etageStart, etageEnd, stepWidth
var Trajet = function(edgeStart, 
    scaled_edgeStart, 
    edgeEnd, 
    scaled_edgeEnd, 
    noCase_all, 
    noCase_mergedPath, 
    type, 
    noCase_cluster, 
    mean_start, 
    mean_end,
    size_start,
    size_end,
    source_ch,
    group_cluster,
    stepWidth) 
{

  this.original_start    = edgeStart;
  this.start             = scaled_edgeStart;
  this.original_end      = edgeEnd;
  this.end               = scaled_edgeEnd;

  this.noCase_all        = noCase_all;
  this.noCase_mergedPath = noCase_mergedPath;
  this.noCase_cluster    = noCase_cluster;

  this.type              = type;
  this.orientation       = 1;
  this.middle            = 0;

  this.mean_start        = mean_start;
  this.mean_end          = mean_end;

  this.size_start        = size_start;
  this.size_end          = size_end;

  if (source_ch == 'undefined' || !source_ch){
    this.source_ch     = 15; // if there is no group, trimmed, it is 15;
  }
  else {
    this.source_ch   = source_ch;
  }

  if (group_cluster == 'undefined' || !group_cluster){
    this.group_cluster     = 17; // if there is no group, trimmed, it is 17;
  }
  else {
    this.group_cluster     = group_cluster;
  }

  this.show = 1;

  this.step = {
    max: 40,
    current: 0
  };

  this.setup = function() {
    var multiplier_x = map(this.size_start, 0, 1, 0.6, 1.6);
    var multiplier_y = map(this.size_end, 0, 1, 4, 5);

    // half dist between 2 nodes
    this.middle = this.findHalfLength(); 
    var prev_mid = this.middle;
    this.middle = map(this.middle, 0, 4000, 50, 520)

    // start node x varient
    this.r1 = random(this.middle * 0.175, this.middle * 0.275) * this.size_start * multiplier_x; 
    // end node x varient
    this.r2 = random(this.middle * 0.175, this.middle * 0.275) * this.size_end * multiplier_x; 

    // start node y varient
    this.rh1 = random(this.middle * 0.275, this.middle * 0.375) * this.size_start * multiplier_y; 
    // end node y varient
    this.rh2 = random(this.middle * 0.275, this.middle * 0.375) * this.size_end * multiplier_y; 

    // step animation
    var r = parseInt(random(2, 3))
    this.step.max = this.middle * r;

    var r, g, b;
    if (this.mean_end >= 55 && this.mean_end < 66){
      r = map(this.mean_end, 58, 65, 30, 255);
      g = map(this.mean_end, 58, 65, 186, 255);
      b = map(this.mean_end, 58, 65, 255, 153);
    } else if (this.mean_end >= 66) {
      r = map(this.mean_end, 65, 75, 255, 255);
      g = map(this.mean_end, 65, 75, 255, 80);
      b = map(this.mean_end, 65, 75, 153, 80);
    } else if (this.mean_end < 55) {
      r = 30;
      g = 186;
      b = 255;
    }
    this.color = createVector(r, g, b);
  };

  this.run = function() {
    this.display();
  };

  // Method to display
  this.display = function() {

    if (this.show){
      stroke(this.color.x, this.color.y, this.color.z, 125);
      fill(this.color.x, this.color.y, this.color.z, 20);

      var x_varient1 = this.r1;
      var x_varient2 = this.r2;

      var hauteur1 = this.rh1;
      var hauteur2 = this.rh2;

      if (this.start.x < this.end.x) {

        bezier(
          this.start.x, this.start.y,
          this.start.x + x_varient1, this.start.y - hauteur1,//this.start.x - bezierVariation1, this.start.y + hauteur,
          this.end.x   - x_varient2, this.end.y   - hauteur2,//this.start.x - bezierVariation2, this.start.y + hauteur,
          this.end.x, this.end.y
        );

        /*
        var t = this.step.current / this.step.max;
        var x = bezierPoint(this.start.x, this.start.x + bezierVariation1, this.start.x + bezierVariation2, this.end.x, t);
        var y = bezierPoint(this.start.y, this.start.y - hauteur, this.start.y - hauteur, this.end.y, t);*/

      } else {
        bezier(
          this.start.x, this.start.y,
          this.start.x - x_varient1, this.start.y + hauteur1,//this.start.x - bezierVariation1, this.start.y + hauteur,
          this.end.x   + x_varient2, this.end.y   + hauteur2,//this.start.x - bezierVariation2, this.start.y + hauteur,
          this.end.x, this.end.y
        );

        /*
        var t = this.step.current / this.step.max;
        var x = bezierPoint(this.start.x, this.start.x - bezierVariation1, this.start.x - bezierVariation2, this.end.x, t);
        var y = bezierPoint(this.start.y, this.start.y + hauteur, this.start.y + hauteur, this.end.y, t);*/

      }

      /*ellipse(x, y, 5, 5);

      if (this.step.current > this.step.max) {
        this.step.current = 0;
      }

      this.step.current++;*/
    }
    else {
      // dont show anything
    }
    
  }

  //Helpers
  this.findHalfLength = function() {
    /*
    if (this.start < this.end) {
      var length = ((this.end - this.start) * stepWidth) / 2;
    } else {
      var length = ((this.start - this.end) * stepWidth) / 2;
    }*/
    var length = sqrt(sq(this.end.x - this.start.x) + sq(this.end.y - this.start.y));
    return length * 0.5;
  };


  this.setState = function(state) {
    this.state = state;
  };


};
