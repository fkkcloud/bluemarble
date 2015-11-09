
angular.module('app')
.controller('ApplicationCtrl', function($rootScope, $scope, $window){
	$scope.resetDataViz = function(){
		FRAME = 0;
      	EdgeManager.reset();
      	NodeManager.reset();
	}
});