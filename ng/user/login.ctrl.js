angular.module('app')
.controller('LoginCtrl', function($rootScope, $scope, $location, UserSvc){
	$scope.$emit('pagechange', $scope.pageId.login);

	// UserSvc서비스의 login함수에서 받은 유저정보를
	// 최상위 콘트롤러인 ApplicationCtrl의 $scope로 값을 보내기 위한 전파를 보낸다.
	$scope.login = function(username, password){
		UserSvc.login(username, password)
		.then(function (user){
			$location.path('/');
			$rootScope.$emit('login', user);
		},
		function (error){
			swal("Log-in failed!", "Password/ID wrong", "error");
		});
		/* or it can be this
		.catch(function (){
			alert("ID or Password is wrong.");
		});
		*/
	};
});
