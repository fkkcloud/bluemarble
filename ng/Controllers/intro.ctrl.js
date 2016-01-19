angular.module('app')
.controller('IntroCtrl', function($rootScope, $scope, $window){

	function setPageNum(){
    	PAGE_NUM.value = 0;
  	}
  	setPageNum();


	function setVisibility(){
		$('.data-visibility').removeClass('active');
	}
	setVisibility();

});