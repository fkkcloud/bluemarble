
angular.module('app')
.controller('DataVizCtrl', function($rootScope, $scope, $window){
	function setVisibility(){
		$('.data-visibility').addClass('active');
	}
	setVisibility();
});