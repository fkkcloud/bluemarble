
//originals etagesPosition, etageStart, etageEnd
var Edge = function(edgeStart, 
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
    group_cluster) 
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

  this.line_geometries   = [];

  this.source_ch   = source_ch;

  if (group_cluster == 'undefined' || !group_cluster)
    this.group_cluster     = 17; // if there is no group, trimmed, it is 17;
  else
    this.group_cluster     = group_cluster;

  this.show = 1;

  this.timer = 0;
  this.currentFrame = 0; // timer per each lines

  var delay_time = mapRange([45, 85], [60, 405], this.mean_start); // 1000, 16000
  this.trigger_delay = delay_time;

  this.setup = function() {

      this.setupColor(this.mean_end);

      this.setupGeometry(this.start, this.end, this.trigger_delay, this.noCase_all);
  };

  this.run = function() {
    if (this.show)
      this.update();
  };

  this.setupColor = function(mean) {
    var r, g, b;
    if (mean >= 55 && mean < 66){
      r = mapRange([58, 65], [30, 255], mean);
      g = mapRange([58, 65], [186, 255], mean);
      b = mapRange([58, 65], [255, 153], mean);
    } else if (mean >= 66) {
      r = mapRange([65, 75], [255, 255], mean);
      g = mapRange([65, 75], [255, 80], mean);
      b = mapRange([65, 75], [153, 80], mean);
    } else if (mean < 55) {
      r = 30;
      g = 186;
      b = 255;
    }
    var rgb = "rgb(" + Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b) + ")";
    this.color = new THREE.Color(rgb);
  }

  this.setupGeometry = function(start, end, startframe, traffic_count)
  {    
    var center_point = getCenterPoints(start, end);
    var length_point = getLength(start, end);

    var mapped_traffic = 1;//mapRange([0, 20000], [1, 10], traffic_count);
    
    for (var line = 0; line < mapped_traffic; line++)
    {
      center_point.y = length_point * 0.2 * mapRange([0.0, 1.0], [0.75, 1.25], Math.random()) * -1;
      var curve = new THREE.QuadraticBezierCurve3(start, center_point, end);
      
      var line_geometry = new THREE.Geometry();
      line_geometry.vertices = curve.getPoints( Math.ceil(length_point * 0.3) );
      
      line_geometry.custom_startframe = startframe + Math.ceil(Math.random() * 20); // give offset to each traffic drawings
      line_geometry.custom_endframe = line_geometry.custom_startframe + line_geometry.vertices.length
      
      var uniforms = {
        color:     { type: "c", value: this.color }
      };
      
      var vertexAlphas = [];
      for (var i=0; i < line_geometry.vertices.length; i++){
        var a = 0.0;
        vertexAlphas.push(a);
      }
      
      line_geometry.custom_attributes = {
        vtx_alpha: {
          type: 'f',
          value: vertexAlphas
        }
      };
      
      line_geometry.custom_attributes.vtx_alpha.needsUpdate = true;
      
      var shaderMaterial = new THREE.ShaderMaterial( {
        attributes:     line_geometry.custom_attributes,
        uniforms:       uniforms,
        vertexShader:   document.getElementById( 'line_vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'line_fragmentshader' ).textContent,
        //blending:       THREE.AdditiveBlending,
        //depthTest:      false
        //transparent:    true
      });
      shaderMaterial.linewidth = 0.3;
      
      //Create the final Object3d to add to the scene
      var line_mesh = new THREE.Line( line_geometry, shaderMaterial );

      this.line_geometries.push(line_geometry);

      SCENE.add(line_mesh);
    }
  }

  this.update = function() 
  { 
    for (var k = 0; k < this.line_geometries.length; k++){
      
      if (FRAME < this.line_geometries[k].custom_startframe  || // before the animation is started
        FRAME > this.line_geometries[k].custom_endframe)      // after the animation is done
      {
        this.line_geometries[k].custom_attributes.vtx_alpha.needsUpdate = false; 
        continue;
      }
      
      var i = FRAME - this.line_geometries[k].custom_startframe;
      
      if (i < this.line_geometries[k].vertices.length){
        var index = Math.floor(i);
        this.line_geometries[k].custom_attributes.vtx_alpha.value[index] = 1.0;
      }
      
      if (FRAME < this.line_geometries[k].custom_endframe)
        this.line_geometries[k].custom_attributes.vtx_alpha.needsUpdate = true;
    }
    
    //Math.ceil()
  }

};


