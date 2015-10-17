
//originals etagesPosition, etageStart, etageEnd, stepWidth
var Trajet = function(edgeStart, scaled_edgeStart, edgeEnd, scaled_edgeEnd, noCase_all, noCase_mergedPath, type, noCase_cluster, stepWidth) {

  this.original_start    = edgeStart;
  this.start             = scaled_edgeStart;
  this.original_end      = edgeEnd;
  this.end               = scaled_edgeEnd;
  this.noCase_all        = noCase_all;
  this.noCase_mergedPath = noCase_mergedPath;
  this.type              = type;
  this.noCase_cluster    = noCase_cluster;
  this.orientation       = 1;
  this.middle            = 0;
  this.state             = 1;

  this.color             = createVector(255, 255, 255);

  this.step = {
    max: 40,
    current: 0
  };

  this.setup = function() {
    this.middle = this.findMiddle();
    this.r1 = random(this.middle * 0.4, this.middle * 0.75);
    this.r2 = random(this.middle * 0.4, this.middle * 0.75);
    this.rh = random(this.middle * 0.3, this.middle * 0.45);

    var r = parseInt(random(2, 3))
    this.step.max = this.middle * r;
  };

  this.run = function() {
    this.display();
  };

  // Method to display
  this.display = function() {

    /*
    if (this.state == 0) {
      stroke(this.color.x, this.color.y, this.color.z, 20);
      fill(this.color.x, this.color.y, this.color.z, 0);
    } else if (this.state == 1) {
      stroke(this.color.x, this.color.y, this.color.z, 40);
      fill(this.color.x, this.color.y, this.color.z, 5);
    } else if (this.state == 2) {
      stroke(this.color.x, this.color.y, this.color.z, 45);
      fill(this.color.x, this.color.y, this.color.z, 5);
    }*/

    if (this.type == 0){
      var c = createVector(255, 20, 20);
      stroke(c.x, c.y, c.z, 65);
      fill(c.x, c.y, c.z, 8);
    }
    else {
      var c = createVector(255, 255, 255);
      stroke(c.x, c.y, c.z, 65);
      fill(c.x, c.y, c.z, 5);
    }

    var bezierVariation1 = this.middle - this.r1;
    var bezierVariation2 = this.middle + this.r2;
    var hauteur = this.middle + this.rh;

    if (this.start < this.end) {

      bezier(
        this.start.x, this.start.y,
        this.start.x + bezierVariation1, this.start.y - hauteur,
        this.start.x + bezierVariation2, this.start.y - hauteur,
        this.end.x, this.end.y
      );

      var t = this.step.current / this.step.max;
      var x = bezierPoint(this.start.x, this.start.x + bezierVariation1, this.start.x + bezierVariation2, this.end.x, t);
      var y = bezierPoint(this.start.y, this.start.y - hauteur, this.start.y - hauteur, this.end.y, t);

    } else {
      bezier(
        this.start.x, this.start.y,
        this.start.x - bezierVariation1, this.start.y + hauteur,
        this.start.x - bezierVariation2, this.start.y + hauteur,
        this.end.x, this.end.y
      );

      var t = this.step.current / this.step.max;
      var x = bezierPoint(this.start.x, this.start.x - bezierVariation1, this.start.x - bezierVariation2, this.end.x, t);
      var y = bezierPoint(this.start.y, this.start.y + hauteur, this.start.y + hauteur, this.end.y, t);

    }

    ellipse(x, y, 5, 5);

    if (this.step.current > this.step.max) {
      this.step.current = 0;
    }

    this.step.current++;
  }

  //Helpers
  this.findMiddle = function() {
    /*
    if (this.start < this.end) {
      var length = ((this.end - this.start) * stepWidth) / 2;
    } else {
      var length = ((this.start - this.end) * stepWidth) / 2;
    }*/
    var length = sqrt(sq(this.end.x - this.start.x) + sq(this.end.y - this.start.y));
    return length * 0.5;
  };

  this.setColor = function() {

  };

  this.setState = function(state) {
    this.state = state;
  };


};
