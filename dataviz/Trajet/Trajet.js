
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

  // traffic counts
  this.traffic_counts = 1;//map(this.noCase_all, 0, 1000000, 1, 10);

  // calculate traffic points data
  this.traffic_points_data = [];
  for (var i = 0; i < this.traffic_counts; i++){
    this.traffic_points_data.push([]);
  }

  this.timer = 0; // timer per each lines

  var delay_time = map(this.mean_start, 45, 85, 60, 405); // 1000, 16000
  var d = new Date(); /* except */
  this.trigger_delay = delay_time;//d.getTime() + delay_time; // trigger time

  this.setup = function() {
    var multiplier_x = map(this.size_start, 0, 1, 0.6, 1.6);
    var multiplier_y = map(this.size_end, 0, 1, 4, 5);

    // half dist between 2 nodes
    this.middle = this.findHalfLength(); 
    var prev_mid = this.middle;
    this.middle = map(this.middle, 0, 4000, 50, 520);

    this.line_height = map(this.middle, 0, 4000, 40, 540);

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
      this.drawEdge();
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


  /*
    @start              - start position
    @end                - end position
    @lines_mem          - to store the line information per edge traffics
    @start_milli_sec    - when it will start to draw line - trigger in milliseconds
    @line_type 1        - solid, 
               0        - dashed
  */
  this.drawEdge = function() {
    /*
    var d = new Date();
    var now = d.getTime();
    
    if (now < this.trigger_delay)
      return;
    */

    if (frame < this.trigger_delay)
      return;

    var t1, t2, t3;

    var line_type_var = !(this.type == 0) ? 0.85 : 0.1;

    var type_multiplier = !(this.type == 0) ? 1.5 : 1.0;
    
    if (this.timer <= 1) {
      this.timer += 0.01;
    }
    
    for (var line_id = 0; line_id < this.traffic_counts; line_id++){


      var curveHelpPoint = this.getCurvePoint(this.start, this.end, this.line_height * type_multiplier + line_id * 10, true);

      t1 = p5.Vector.lerp(this.start, curveHelpPoint, this.timer);
      t2 = p5.Vector.lerp(curveHelpPoint, this.end, this.timer);
      t3 = p5.Vector.lerp(t1, t2, this.timer);

      this.traffic_points_data[line_id].push(t3);
      
      for (var i=0; i < this.traffic_points_data[line_id].length; i++) 
      {
        
        if (this.type == 1)
        {
          stroke(this.color.x, this.color.y, this.color.z, 4);
          noFill();
          strokeWeight(line_type_var);
          beginShape();
          vertex(this.start.x, this.start.y);
          bezierVertex(t1.x, t1.y, t3.x, t3.y, t3.x, t3.y);
          vertex(t3.x, t3.y);
          endShape();
        }
        
        /*
        if (this.type === 1)
        {
          stroke(this.color.x, this.color.y, this.color.z, 40);
          noFill();
          strokeWeight(line_type_var * 20);
          if (i > 0 && i < this.traffic_points_data[line_id].length -1) 
          {
            line(this.traffic_points_data[line_id][i-1].x, this.traffic_points_data[line_id][i-1].y, this.traffic_points_data[line_id][i].x, this.traffic_points_data[line_id][i].y);
          }
          else if (i === 0 || i === this.traffic_points_data[line_id].length -1) 
          {
            point(this.traffic_points_data[line_id][i].x, this.traffic_points_data[line_id][i].y);
          }
        } 
        */
        else if (this.type == 0)
        {
          stroke(this.color.x, this.color.y, this.color.z, 100);
          noFill();
          strokeWeight(line_type_var * 20);
          var mod = i % 4;
          if (mod === 0 && i > 0 && i < this.traffic_points_data[line_id].length -1) 
          {
            line(this.traffic_points_data[line_id][i-1].x, this.traffic_points_data[line_id][i-1].y, this.traffic_points_data[line_id][i].x, this.traffic_points_data[line_id][i].y);
          }
          else if (i === 0 || i === this.traffic_points_data[line_id].length -1) 
          {
            point(this.traffic_points_data[line_id][i].x, this.traffic_points_data[line_id][i].y);
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
