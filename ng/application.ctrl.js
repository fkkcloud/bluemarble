
angular.module('app')
.controller('ApplicationCtrl', function($rootScope, $scope, $window){
	$scope.meanAge = { value : 0 };
	$scope.mergePathIds = { value : [0]};

	// as resize, re-init datas
	$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
	    this.resizeTO = setTimeout(function() {
	        $(this).trigger('resizeEnd');
	    }, 200);
	});

	$(window).bind('resizeEnd', function() {
	    //do something, window hasn't changed size in 500ms
	    location.reload();
	});


	$scope.resetClusters = function(){
      	FRAME.value    = 0;
      	PAGE_NUM.value = 1;

      	$scope.meanAge = 48.0;

      	TWEEN.removeAll(); // reset tween animations

      	EdgeManagerCluster.reset();
      	NodeManagerCluster.reset();
	}

	$scope.cleanMergePaths = function(){

		// turn off nodes and edges except mergePathId
		for (var i = 0; i < NodeManagerMergePaths.length; i++){

			for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

				if (SELECTED_MERGEPATHIDS[j] == i){
					NodeManagerMergePaths[i].clean();
				}

			}

		}
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
	      	 location.reload();

	      };

	      this.HideNodes = false;

	      this.HideNames = false;

	    };

	    RENDEROPTIONS 	= new renderOptionsUI();
	    var gui  		= new dat.GUI();

	    var ClustersGrp = gui.addFolder('Clusters');
		var ClusterHideNodes = ClustersGrp.add(RENDEROPTIONS, 'HideNodes');

		var MergePathGrp = gui.addFolder('MergePaths');
		var MergePathHideNodes = MergePathGrp.add(RENDEROPTIONS, 'HideNodes');
		var MergePathHideNames = MergePathGrp.add(RENDEROPTIONS, 'HideNames');

	    ClusterHideNodes.onFinishChange(function(val) {
	    	if (val == true) {
		        NodeManagerCluster.toggleNodeVisibility(false);
	    	}
	    	else {
		        NodeManagerCluster.toggleNodeVisibility(true);
	    	}
	    });

	   	MergePathHideNodes.onFinishChange(function(val) {
	    	if (val == true) {
	        	for (var i = 0; i < NodeManagerMergePaths.length; i++){

		          for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

		            if (SELECTED_MERGEPATHIDS[j] === i)
		              NodeManagerMergePaths[i].toggleNodeVisibility(false);

		          }
		          
		        }
	    	}
	    	else {
	        	for (var i = 0; i < NodeManagerMergePaths.length; i++){

		          for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

		            if (SELECTED_MERGEPATHIDS[j] === i)
		              NodeManagerMergePaths[i].toggleNodeVisibility(true);

		          }

		        }
		    }
	    });

	    MergePathHideNames.onFinishChange(function(val) {
	    	if (val == true) {
	    		for (var i = 0; i < NodeManagerMergePaths.length; i++){

		          for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

		            if (SELECTED_MERGEPATHIDS[j] === i)
		              NodeManagerMergePaths[i].toggleNodeTextVisibility(false);

		          }
		        }
	    	}
	    	else {
	    		for (var i = 0; i < NodeManagerMergePaths.length; i++){

		          for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

		            if (SELECTED_MERGEPATHIDS[j] === i)
		              NodeManagerMergePaths[i].toggleNodeTextVisibility(true);

		          }
		        }
	    	}
	    });

	    gui.add(RENDEROPTIONS, 'Restart');

	}
  	setDataGuiInitialize();
});