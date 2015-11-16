
angular.module('app')
.controller('ApplicationCtrl', function($rootScope, $scope, $window){
	$scope.meanAge = { value : 0 };
	$scope.mergePathIds = { value : [0]};


	$scope.resetClusters = function(){
      	FRAME.value    = 0;
      	PAGE_NUM.value = 1;

      	$scope.meanAge = 48.0;

      	TWEEN.removeAll(); // reset tween animations

      	EdgeManagerCluster.reset();
      	NodeManagerCluster.reset();
	}


	$scope.resetMergePaths = function(){
		FRAME.value    = 0;
		PAGE_NUM.value = 2;

		TWEEN.removeAll(); // reset tween animations

		// turn off nodes and edges except mergePathId
		for (var i = 0; i < NodeManagerMergePaths.length; i++){

			for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

				if (SELECTED_MERGEPATHIDS[j] == i){
					NodeManagerMergePaths[i].reset();
					EdgeManagerMergePaths[i].reset();
				}

			}

		}
	}


	function setDataGuiInitialize(){

	    var renderOptionsUI = function() {

	      this.AdditiveColor = true;

	      this.Restart = function() { 

	      	 // restart the page
	      	 console.log("restart the web page");

	      };

	    };

	    var renderOptions 	= new renderOptionsUI();
	    var gui  			= new dat.GUI();

	    var gui_additiveColor = gui.add(renderOptions, 'AdditiveColor');
	    gui_additiveColor.onFinishChange(function(val) {
	    	if (val === true)
	    		RenderParams.AdditiveColor = true;
	    	else
	    		RenderParams.AdditiveColor = false;
	    	/*
	      	if (PAGE_NUM.value === 1)
	        	$scope.resetClusters(); 
	        else if (PAGE_NUM.value === 2)
	        	$scope.resetMergePaths();
	        */
	    });

	    gui.add(renderOptions, 'Restart');

	}
  	setDataGuiInitialize();
});