
angular.module('app')
.controller('IntroCtrl', function($rootScope, $scope, $window){
	function setVisibility(){
		$('.data-visibility').removeClass('active');
	}
	setVisibility();
});