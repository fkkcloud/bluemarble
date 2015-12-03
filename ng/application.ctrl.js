angular.module('app')
.controller('ApplicationCtrl', function($rootScope, $scope, $window){

	$scope.meanAge = { value : 0 };
	$scope.mergePathIds = { value : "acute myocardial infarction"};

	$scope.getMenuShow = function(){
		return $scope.show_menu;
	}

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

	$scope.clusterids = [
      {value: 1, displayName: '1'},
      {value: 2, displayName: '2'},
      {value: 3, displayName: '3'},
      {value: 4, displayName: '4'},
      {value: 5, displayName: '5'},
      {value: 6, displayName: '6'},
      {value: 7, displayName: '7'},
      {value: 8, displayName: '8'},
      {value: 9, displayName: '9'},
      {value: 10, displayName: '10'},
      {value: 11, displayName: '11'},
      {value: 12, displayName: '12'},
      {value: 13, displayName: '13'},
      {value: 14, displayName: '14'},
      {value: 15, displayName: '15'},
      {value: 16, displayName: '16'},
      {value: 17, displayName: 'Not Clustered'},
      {value: 18, displayName: 'All'}
  	];



	$scope.cleanMergePaths = function(){

		NodeManagerMergePaths[SELECTED_MERGEPATHID].clean();

	}

	$scope.resetMergePaths = function(){
		FRAME.value    = 0;
		PAGE_NUM.value = 2;

		TWEEN.removeAll(); // reset tween animations

		NodeManagerMergePaths[SELECTED_MERGEPATHID].reset();
		EdgeManagerMergePaths[SELECTED_MERGEPATHID].reset();

	}

	$scope.resetClusters = function(){

      	FRAME.value    = 0;
      	PAGE_NUM.value = 1;

      	$scope.meanAge.value = 0;

      	TWEEN.removeAll(); // reset tween animations

      	EdgeManagerCluster.reset();
      	NodeManagerCluster.reset();

      	$scope.setClusterID(SELECTED_CLUSTER);

      	$scope.updateMeanAge();
	
	}

	$scope.setClusterID = function(clusterid){

	    SELECTED_CLUSTER = clusterid;

	    if (clusterid == NOT_CLUSTER_ID){

	        SELECTED_CLUSTER = NOT_CLUSTER_ID;
	        
	        clearAllClusters();
	        EdgeManagerCluster.toggleShowByCluster(NOT_CLUSTER_ID);
	        NodeManagerCluster.toggleShowByCluster(NOT_CLUSTER_ID);

	        return;

	    }

	    if (clusterid == ALL_CLUSTER_ID){

	        viewAllClusters(); 

	        return; 

	    }

	    clearAllClusters();
	    EdgeManagerCluster.toggleShowByCluster(SELECTED_CLUSTER);
	    NodeManagerCluster.toggleShowByCluster(SELECTED_CLUSTER);
	}

	// clear all clusters
  	function clearAllClusters(){ // 지금 이게 global로 정의된 것인데, 아마도 클로쥬어 안에 넣어서, 이 파일 안에서만 가능한 local space로 옮겨야 할듯싶다.
	    for (var i = 0; i < 18; i++){

	      EdgeManagerCluster.hideAll();
	      NodeManagerCluster.hideAll();

	    }
	}

	// clear all clusters
	function viewAllClusters(){
	    for (var i = 0; i < 18; i++){

	      EdgeManagerCluster.showAll();
	      NodeManagerCluster.showAll();

	    }
	}

	$scope.updateMeanAge = function(){
	    if (FRAME.value > 620 || PAGE_NUM.value != 1)
	      return;

	    var newMeanAge = mapRange([0, 620.0], [35.4, 90.5], FRAME.value);
	    $scope.meanAge.value = Math.ceil(newMeanAge);
	    $scope.$apply();
	    requestAnimationFrame($scope.updateMeanAge);
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

	      this.Data      = 'US';
	    };

	    RENDEROPTIONS 	= new renderOptionsUI();
	    var gui  		= new dat.GUI();

	    var DataType         = gui.add(RENDEROPTIONS, 'Data', [ 'US', 'KOR' ] );

	    var ClustersGrp      = gui.addFolder('Clusters');
		var ClusterHideNodes = ClustersGrp.add(RENDEROPTIONS, 'HideNodes');

		var MergePathGrp       = gui.addFolder('MergePaths');
		var MergePathHideNodes = MergePathGrp.add(RENDEROPTIONS, 'HideNodes');
		var MergePathHideNames = MergePathGrp.add(RENDEROPTIONS, 'HideNames');

		DataType.onFinishChange(function(val) {
			if (val == 'US'){
				dataManager.start('US');
				$scope.clusterids = [
			      {value: 1, displayName: '1'},
			      {value: 2, displayName: '2'},
			      {value: 3, displayName: '3'},
			      {value: 4, displayName: '4'},
			      {value: 5, displayName: '5'},
			      {value: 6, displayName: '6'},
			      {value: 7, displayName: '7'},
			      {value: 8, displayName: '8'},
			      {value: 9, displayName: '9'},
			      {value: 10, displayName: '10'},
			      {value: 11, displayName: '11'},
			      {value: 12, displayName: '12'},
			      {value: 13, displayName: '13'},
			      {value: 14, displayName: '14'},
			      {value: 15, displayName: '15'},
			      {value: 16, displayName: '16'},
			      {value: 17, displayName: 'Not Clustered'},
			      {value: 18, displayName: 'All'}
			  	];
			  	if (PAGE_NUM.value == 1) 
			  		$scope.resetClusters();
			  	else if (PAGE_NUM.value == 2)
			  		$scope.resetMergePaths(); 
			}
			else if (val == 'KOR'){
				dataManager.start('KOR');
				$scope.clusterids = [
			      {value: 0, displayName: '0'},
			      {value: 1, displayName: '1'},
			      {value: 2, displayName: '2'},
			      {value: 3, displayName: 'Not Clustered'},
			      {value: 4, displayName: 'All'}
			  	];
			  	if (PAGE_NUM.value == 1) 
			  		$scope.resetClusters();
			  	else if (PAGE_NUM.value == 2)
			  		$scope.resetMergePaths();  
			}
		})

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

	    $(gui.domElement).find(">ul").toggleClass("closed"); // dat.gui default to be closed

	}
  	setDataGuiInitialize();
});