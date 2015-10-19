
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
	    isAutoSliding = true;

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

	var autoSlide = window.setInterval(updateIndex, 36000);
	});