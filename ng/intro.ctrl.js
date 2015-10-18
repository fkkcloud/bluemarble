
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

	var clickSlide = function() {
	  //stop auto sliding
	  window.clearInterval(autoSlide);
	  isAutoSliding = false;

	  var slideIndex = $bullet.index($(this));

	  updateIndex(slideIndex);

	  
	  $node = $('.node');
	  $node.removeClass('node-animation');
		setTimeout(function() {
		    $node.addClass('node-animation');
		},1);
		

		/*
	  $startNode = $('.start-node');
	  $startNode.removeClass('start-node-animation');
		setTimeout(function() {
		    $startNode.addClass('start-node-animation');
		},1);

	  $endNode = $('.end-node');
	  $endNode.removeClass('end-node-animation');
		setTimeout(function() {
		    $endNode.addClass('end-node-animation');
		},1);

		
	   $dashLines = $('.dash-lines');
	   $dashLines.removeClass('dash-lines-animation');
		setTimeout(function() {
		    $dashLines.addClass('dash-lines-animation');
		},1);

	   $path01 = $('.path01');
	   $path01.removeClass('path-animation');
		setTimeout(function() {
		    $path01.addClass('path-animation');
		},1);*/
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
	};

	$bullet.on( 'click', clickSlide);

	var autoSlide = window.setInterval(updateIndex, 6000);
	});