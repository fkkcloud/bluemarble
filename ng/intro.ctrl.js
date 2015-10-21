
angular.module('app')
.controller('IntroCtrl', function($rootScope, $scope, $window){
	function setVisibility(){
		$('.data-visibility').removeClass('active');
	}
	setVisibility();

	var $slide = $('.slide'),
    $slideGroup = $('.slide-group'),
    $bullet = $('.bullet');

	var slidesTotal = ($slide.length - 1),
	    current = 0,
	    isAutoSliding = false;

	$bullet.first().addClass('current');

	/* reset the div and animation */
	var resetSlides = function() {
		// reload node slide and animation
		var divClone_node = $(".slide-node").clone(); // Do this on $(document).ready(function() { ... })
		$(".slide-node").html("Loading! If you see this message for a while, please refresh the page"); // Change the content temporarily

		// Any changes to "#some_div" after this point will affect the value of divClone
		$(".slide-node").replaceWith(divClone_node); // Restore element with divClone itself
	
	  	// reload lines slide and animation
	  	var divClone_lines = $(".slide-lines").clone(); // Do this on $(document).ready(function() { ... })

		$(".slide-lines").html("Loading! If you see this message for a while, please refresh the page"); // Change the content temporarily

		// Any changes to "#some_div" after this point will affect the value of divClone
		$(".slide-lines").replaceWith(divClone_lines); // Restore element with divClone itself
	}

	var clickSlide = function() {
	  //stop auto sliding
	  window.clearInterval(autoSlide);
	  isAutoSliding = false;

	  var slideIndex = $bullet.index($(this));

	  updateIndex(slideIndex);

	  resetSlides();
	};

	var updateIndex = function(currentSlide) {
	  if(isAutoSliding) {
	    if(current === slidesTotal) {
	      current = 0;
	    } else {
	      current++;
	    }
	  } else {
	      current = currentSlide;
	  }

	  $bullet.removeClass('current');
	  $bullet.eq(current).addClass('current');

	  transition(current);
	};

	var transition = function(slidePosition) {
	    $slideGroup.animate({
	      'top': '-' + slidePosition + '00%'
	    });

	    resetSlides();
	};

	$bullet.on( 'click', clickSlide);

	var autoSlide = window.setInterval(updateIndex, 80000);

	/*
	-------------------------------------------------------------
	*/
    $('[data-num]').each(function(){
    	startLoop($(this));
  	});
 
  	function startLoop($it){
	    var cur           = 0;
	    var num           = parseInt($it.attr('data-num'));
	    var time_duration = parseInt($it.attr('time-duration'));
	    var time_delay    = parseInt($it.attr('time-delay'));

	    init_increase($it, num, cur, time_duration, time_delay);

	    function init_increase($it, num, cur, time_duration, time_delay)
	    {
	        var steps       = 100;
	        var timetotal   = time_duration;
	        var cur         = 0;
	        var steptimeout = timetotal/steps;      
	        var numlen      = (num+'').length;

	        $it.html(getHtm(0,numlen));
	        setTimeout(loop, time_delay);

	        function setValue(val)
	        {
	        	$it.html(getHtm(val,numlen));
	      	}

	      	function getFormated(n,lentotal)
	      	{
	        	var t =  ".";
	        	var i = n + "";
	        	
	        	if(i.length<lentotal)
	        	{
	          		var y = lentotal-i.length;
	          		for(var z=0;z<y;z++)
	          		{
	            		i = '0'+i;
	          		}
	        	}     
	        	
	        	var j = (j = i.length) > 2 ? j % 2 : 0;
	       		return (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{2})(?=\d)/g, "$1" + t);
	      	}

	      	function loop()
	      	{
		        cur++
		        var percent = cur/steps;
		        if (percent>=1)
		        {          
		        	setValue(parseInt(num));
		        } 
		        else 
		        {
		          	setValue(parseInt(percent*num));
		          	setTimeout(loop,steptimeout);          
	        	}
	      	}

	      	function getHtm(num,lentotal){        
	        	var targetFormated = getFormated(num,lentotal);
	        	var chars = targetFormated.split('');
	        	var htms = [];
	        	for (var i=0;i<chars.length;i++)
	        	{
	          		if (chars[i] == '.')
	          		{
	            		htms+='<span>.</span>';
	          		} 
	          		else 
	          		{          
	            		htms+='<em>'+ chars[i]+'</em>';
	          		}
	        	}
	        	return htms;
	      	}
	    }
	}
});