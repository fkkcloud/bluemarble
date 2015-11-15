
angular.module('app')
.controller('ApplicationCtrl', function($rootScope, $scope, $window){
	$scope.dataguiMergePathInitialized = {
		value : false
	};

	$scope.resetClusters = function(){
      	FRAME.value = 0;
      	$scope.meanAge = 48.0;
      	TWEEN.removeAll(); // reset tween animations
      	EdgeManagerCluster.reset();
      	NodeManagerCluster.reset();
	}

	$scope.resetMergePaths = function(){
		FRAME.value = 0;
		TWEEN.removeAll(); // reset tween animations
      	EdgeManagerCluster.reset();
      	NodeManagerCluster.reset();

      	// turn off edges except mergePathId
		for (var i = 0; i < EdgeManagerMergePaths.length; i++){

			EdgeManagerMergePaths[i].reset();

		}

		// turn off nodes except mergePathId
		for (var i = 0; i < NodeManagerMergePaths.length; i++){

			NodeManagerMergePaths[i].reset();

		}
	}
});