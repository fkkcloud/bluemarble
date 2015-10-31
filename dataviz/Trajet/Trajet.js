
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

  this.timer = 0;
  this.currentFrame = 0; // timer per each lines

  var delay_time = map(this.mean_start, 45, 85, 60, 405); // 1000, 16000
  this.trigger_delay = delay_time;

  this.setup = function() {
      this.setupLineHeight();

      this.setupColor();

      this.setupCacheAnimation();
  };

  this.run = function() {
    this.display();
  };

  // Method to display
  this.display = function() {

    if (this.show){
      this.drawEdge();
    }
    else {
      // dont show anything
    }
  }

  this.setupCacheAnimation = function() {
    // traffic counts
    this.traffic_counts = 1;//map(this.noCase_all, 0, 10000000, 1, 5);

    // calculate traffic points data
    this.traffic_t3_data = [];
    for (var i = 0; i < this.traffic_counts; i++){
      this.traffic_t3_data.push([]);
    }
    this.traffic_t1_data = [];
    for (var i = 0; i < this.traffic_counts; i++){
      this.traffic_t1_data.push([]);
    }
    this.traffic_points_data = [];
    for (var i = 0; i < this.traffic_counts; i++){
      this.traffic_points_data.push([]);
    }

    var t1, t2, t3;

    var line_type_var = !(this.type == 0) ? 0.85 : 0.1;

    var type_multiplier = !(this.type == 0) ? 1.5 : 1.0;
    
    // save for 100 frames
    this.maxFrame = 99;
    for (var i = 1; i <= this.maxFrame + 1; i++)
    {
      for (var line_id = 0; line_id < this.traffic_counts; line_id++){

      var curveHelpPoint = this.getCurvePoint(this.start, this.end, this.line_height * type_multiplier + line_id * 10, true);

      t1 = p5.Vector.lerp(this.start, curveHelpPoint, i * 0.01);
      t2 = p5.Vector.lerp(curveHelpPoint, this.end, i * 0.01);
      t3 = p5.Vector.lerp(t1, t2, i * 0.01);

      this.traffic_t1_data[line_id].push(t1);
      this.traffic_t3_data[line_id].push(t3);
      }
    }
  }

  this.setupLineHeight = function() {
    this.middle = this.findHalfLength(); 
    this.middle = map(this.middle, 0, 4000, 50, 520);
    this.line_height = map(this.middle, 0, 2000, 8, 740);
  }

  this.setupColor = function() {
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
  }

  //Helpers
  this.findHalfLength = function() {
    var length = sqrt(sq(this.end.x - this.start.x) + sq(this.end.y - this.start.y));
    return length * 0.5;
  };

  this.drawEdge = function() {

    if (GLOBAL_FRAME < this.trigger_delay)
      return;

    var line_type_var = !(this.type == 0) ? 0.85 : 0.1;
    
    if (this.currentFrame < this.maxFrame) {
      this.currentFrame += 1;
    }

    if (this.timer < 1) {
      this.timer += 0.01;
    }
    
    for (var line_id = 0; line_id < this.traffic_counts; line_id++)
    {
        if (this.type == 1)
        {
          var t1 = this.traffic_t1_data[line_id][this.currentFrame];
          var t3 = this.traffic_t3_data[line_id][this.currentFrame];

          stroke(this.color.x, this.color.y, this.color.z, 84);
          fill(this.color.x, this.color.y, this.color.z, 2);
          strokeWeight(line_type_var);

          beginShape();
          vertex(this.start.x, this.start.y);
          bezierVertex(t1.x, t1.y, t3.x, t3.y, t3.x, t3.y);
          vertex(t3.x, t3.y);
          endShape();
        }
        else if (this.type == 0)
        {
          for (var j = 0; j < this.currentFrame; j++)
          {
            stroke(this.color.x, this.color.y, this.color.z, 100);
            noFill();
            strokeWeight(line_type_var * 14);

            var mod = j % 4;
            if (mod === 0 && j > 0 && j < this.maxFrame -1) 
            {
              var prev_x = this.traffic_t3_data[line_id][j-1].x;
              var prev_y = this.traffic_t3_data[line_id][j-1].y;
              var curr_x = this.traffic_t3_data[line_id][j].x;
              var curr_y = this.traffic_t3_data[line_id][j].y;
              line(prev_x, prev_y, curr_x, curr_y);
            }
            else if (j === 0 || this.j === this.frame -1) 
            {
              var curr_x = this.traffic_t3_data[line_id][j].x;
              var curr_y = this.traffic_t3_data[line_id][j].y;
              point(curr_x, curr_y);
            }
          }
        }

    }

  }



  /*
  @p1 - start position
  @p2 - end position
  @height - how far it will be away from the ground vector
  @direction - whether it will go up or down from the ground vector
  */
  this.getCurvePoint = function(p1, p2, height, direction) {
    var side = direction < 1 ? 1 : -1;
    
    var midPoint = createVector((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5, 0);
    
    var groundVector  = createVector(p1.x-p2.x, p1.y-p2.y, 0);
    groundVector.normalize();
    
    var upVector = createVector(0, 0, 1);
    
    var resVector = p5.Vector.cross(groundVector, upVector);
    resVector.mult(height * side);
    
    return p5.Vector.add(resVector, midPoint);
  }

};


