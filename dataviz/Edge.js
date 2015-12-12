
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
    group_cluster,
    scene,
    custom_mean,
    visualize_type) 
{

  this.original_start    = edgeStart;
  this.start             = scaled_edgeStart;
  this.original_end      = edgeEnd;
  this.end               = scaled_edgeEnd;

  this.noCase_all        = noCase_all;
  this.noCase_mergedPath = noCase_mergedPath;
  this.noCase_cluster    = noCase_cluster;

  this.orientation       = 1;
  this.middle            = 0;

  this.mean_start        = mean_start;
  this.mean_end          = mean_end;

  this.size_start        = size_start;
  this.size_end          = size_end;

  this.line_geometries   = [];
  this.line_meshes       = [];

  this.pointer_geometries = [];
  this.pointer_meshes     = [];
  this.pointer_rotation   = [];

  this.startframes       = [];
  this.endframes         = [];

  this.source_ch         = source_ch;

  this.resetted          = false;

  this.scene             = scene;

  if (type == '0')
    this.type = 0;
  else
    this.type = 1;

  if (group_cluster === undefined)
    this.group_cluster_list     = [ NOT_CLUSTER_ID ];
  else
    this.group_cluster_list     = group_cluster;

  this.timer        = 0;
  this.currentFrame = 0; // timer per each lines

  this.custom_mean       = custom_mean;

  if (visualize_type == 0){ // debug to be true always for now - CHECK LATER

    this.trigger_delay = this.custom_mean;

  }
  else {

    var global_delay;
    if (DATATYPE.value == 'US')
      global_delay = 120;
    else 
      global_delay = 280;

    this.trigger_delay = mapRange( [45, 85], [60, 405], this.mean_start) + global_delay;
    
  }

  this.setup = function() {

    this.setupColor(this.mean_end);
    this.setupGeometry(this.start, this.end, this.trigger_delay, this.noCase_all);

  };

  this.run = function() {

    this.animate();

  };

  this.setupColor = function(mean) {

    var r, g, b;
    
    if (mean < 26) {

      r = 30;
      g = 186;
      b = 255;

    } else if (mean >= 26 && mean < 50){

      r = mapRange([26, 50], [30, 100], mean);
      g = mapRange([26, 50], [186, 100], mean);
      b = mapRange([26, 50], [255, 100], mean);

    } else if (mean >= 50 && mean < 61) {

      r = mapRange([50, 61], [100, 255], mean);
      g = mapRange([50, 61], [100, 255], mean);
      b = mapRange([50, 61], [100, 153], mean);

    } else if (mean >= 61 && mean < 73) {

      r = mapRange([61, 73], [255, 255], mean);
      g = mapRange([61, 73], [255, 80], mean);
      b = mapRange([61, 73], [153, 80], mean);

    } else {
      
      r = 255;
      g = 80;
      b = 80;

    }

    this.color = new THREE.Color( rgbToHex(r, g, b) );

  }

  this.setupPointer = function(points)
  {
      // setup triangle
      var pointer_vertices = new Float32Array( 3 * 3 );
      pointer_vertices[0] =  0.0;
      pointer_vertices[1] =  1.0;
      pointer_vertices[2] =  0.0;
      pointer_vertices[3] = -1.0;
      pointer_vertices[4] = -1.0;
      pointer_vertices[5] =  0.0;
      pointer_vertices[6] =  1.0;
      pointer_vertices[7] = -1.0;
      pointer_vertices[8] =  0.0;      
      var pointer_geo = new THREE.BufferGeometry();
      pointer_geo.addAttribute('position', new THREE.BufferAttribute(pointer_vertices, 3));
      pointer_geo.rotateZ(Math.PI);
      //pointer_geo.computeBoundingSphere();
      //pointer_geo.computeBoundingBox();

      var pointerMaterial = new THREE.MeshBasicMaterial( { color : this.color } );
      var pointer_mesh = new THREE.Mesh( pointer_geo, pointerMaterial );
      pointer_mesh.scale.set(3, 3, 3);

      this.pointer_geometries.push(pointer_geo);
      this.pointer_meshes.push(pointer_mesh);
      this.scene.add(pointer_mesh);

      var angles = [];
      var upVector = new THREE.Vector3(0.0, 1.0, 0.0);
      for (var i = 0; i < points.length; i++){

        // last points does not have forward vector so just use previous
        if (i === points.length - 1){
          angles.push(angles[i-1]);
          break;
        }

        // get angle between 2
        var v1 = new THREE.Vector3(points[i].x, points[i].y, points[i].z);
        var v2 = new THREE.Vector3(points[i+1].x, points[i+1].y, points[i+1].z);
        v2.subVectors(v1, v2);
        v2.normalize();
        var dot = upVector.dot(v2);
        var angle = Math.acos(dot);
        angles.push(angle);
      }
      this.pointer_rotation.push(angles);
  }

  this.setupGeometry = function(start, end, startframe, traffic_count)
  {
    var length_point = getLength(start, end);

    var mapped_traffic = mapRange([15000, 250000], [3, 16], traffic_count);
    
    for (var line = 0; line < mapped_traffic; line++)
    {

      // center position for curve
      var center_point = getCenterPoints(start, end);
      var reverse      = start.x > end.x ? -1.0 : 1.0;
      center_point.y  += length_point * 0.3 * mapRange([0.0, 1.0], [0.65, 1.35], Math.random()) * reverse;
      //center_point.z = length_point * 0.3 * mapRange([0.0, 1.0], [0.65, 1.35], Math.random());

      // get points for the curve
      var curve = new THREE.QuadraticBezierCurve3(start, center_point, end);
      var points = curve.getPoints( Math.ceil(length_point * 0.3) );

      // create buffer geo
      var line_geometry = new THREE.BufferGeometry();//new THREE.Geometry();
      
      // timing
      var varied_startframe = startframe + Math.ceil(Math.random() * 20) // give offset to each traffic drawings
      this.startframes.push( varied_startframe );
      this.endframes.push( varied_startframe + points.length );
      
      // color
      var r = this.color.r + mapRange([0.0, 1.0], [-0.07, 0.07], Math.random());
      var g = this.color.g + mapRange([0.0, 1.0], [-0.07, 0.07], Math.random());
      var b = this.color.b + mapRange([0.0, 1.0], [-0.07, 0.07], Math.random());
      var color = new THREE.Color();
      color.setRGB(r, g, b);
      var HSL = color.getHSL();
      color.setHSL(HSL.h, 1.4, 0.42);
      var uniforms = {
        color:     { type: "c", value: color}
      };

      // position 
      var positions = new Float32Array( points.length * 3 );
      for (var i = 0; i < points.length; i++){

        positions[i * 3]     = points[i].x;
        positions[i * 3 + 1] = points[i].y;
        positions[i * 3 + 2] = points[i].z;

      }
      line_geometry.addAttribute( 'position' , new THREE.BufferAttribute( positions, 3 ) );
      
      // alpha - vertex
      var vertexAlphas = new Float32Array( points.length );
      for (var i=0; i < points.length; i++){
  
        vertexAlphas[i] = 0.0;

      }
      line_geometry.addAttribute('vtx_alpha', new THREE.BufferAttribute( vertexAlphas , 1 ) );
      
      line_geometry.getAttribute('vtx_alpha').needsUpdate = true;

      //console.log(points.length, line_geometry.getAttribute('vtx_alpha').length, line_geometry.getAttribute('vtx_alpha'));
      
      var shaderMaterial = new THREE.ShaderMaterial( {

        //attributes:     line_geometry.custom_attributes,
        uniforms:       uniforms,
        vertexShader:   document.getElementById( 'line_vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'line_fragmentshader' ).textContent,
        //blending:       THREE.AdditiveBlending,
        //depthTest:      false
        transparent:    true

      } );

      shaderMaterial.linewidth = 1.2;
      if (visualize_type == 0)
        shaderMaterial.linewidth *= 1.35;
      
      
      //Create the final Object3d to add to the scene
      var line_mesh = new THREE.Line( line_geometry, shaderMaterial );

      this.line_geometries.push(line_geometry);
      this.line_meshes.push(line_mesh);

      // finally add to the SCENE
      this.scene.add(line_mesh);

      this.setupPointer(points);

    }
  }

  this.animate = function() 
  { 
    // resetting the animation
    if ( this.resetted ) {

      for ( var k = 0; k < this.line_geometries.length; k++ ) {

        this.line_geometries[k].getAttribute('vtx_alpha').needsUpdate = true;
        this.resetted = false;

      }

      return;

    }

    for ( var k = 0; k < this.line_geometries.length; k++ ) {
      
      if (FRAME.value < this.startframes[k]  || // before the animation is started
          FRAME.value > this.endframes[k])      // after the animation is done
      {
        this.pointer_meshes[k].position.set(99999.0, 99999.0, 99999.0);
        this.line_geometries[k].getAttribute('vtx_alpha').needsUpdate = false; 
        continue;

      }

      var i = FRAME.value - this.startframes[k];
      
      if ( i < this.line_geometries[k].getAttribute('vtx_alpha').count ) {

        // index will match the vertex count in the geo to grab each vertex's vtx_alpha attribute.
        var index = Math.floor(i);
        if (this.type === 0){

          if (index % 4 === 0)
            this.line_geometries[k].getAttribute('vtx_alpha').setX(index, 0.0);
          else
            this.line_geometries[k].getAttribute('vtx_alpha').setX(index, 0.4);

        } else {

          this.line_geometries[k].getAttribute('vtx_alpha').setX(index, 0.35);

        }
        

        // pointers
        var position = this.line_geometries[k].getAttribute('position');
        this.pointer_meshes[k].position.set(position.array[index * 3 + 0], position.array[index * 3 + 1], position.array[index * 3 + 2]);
        this.pointer_meshes[k].rotation.z = this.pointer_rotation[k][index];
      }
      
      if ( FRAME.value < this.endframes[k] ) {

        this.line_geometries[k].getAttribute('vtx_alpha').needsUpdate = true;

      }
    }
    
    //Math.ceil()
  }

  this.show = function(){

    for (var k = 0; k < this.line_meshes.length; k++){

      this.line_meshes[k].visible = true;
      this.pointer_meshes[k].visible = true;

    }

  }

  this.hide = function(){

    for (var k = 0; k < this.line_meshes.length; k++){

      this.line_meshes[k].visible = false;
      this.pointer_meshes[k].visible = false;

    }

  }

  this.reset = function(){

    for (var k = 0; k < this.line_geometries.length; k++){

      for (var index = 0; index < this.line_geometries[k].getAttribute('vtx_alpha').count; index++){

        this.line_geometries[k].getAttribute('vtx_alpha').setX(index, 0.0);

      }

    }

    this.resetted = true;

  }

};


