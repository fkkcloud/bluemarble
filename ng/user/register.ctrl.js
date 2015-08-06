angular.module('app')
.controller('RegisterCtrl', function($scope, $location, UserSvc){
	$scope.$emit('pagechange', $scope.pageId.register);

	// UserSvc서비스의 register함수에서 받은 유저정보를 - api에서 보내졌기 때문에 .data로 접근
	// 최상위 콘트롤러인 ApplicationCtrl의 $scope로 값을 보내기 위한 전파를 보낸다.
	$scope.register = function(username, password, userdob, sexpos){
		UserSvc.register(username, password, userdob, sexpos)
		.then(function (user){
			swal("OK!", "Successfully registered", "success")
			$location.path('/');
			$scope.$emit('login', user);
		},
		function(error){
			swal("Register failed!", "Username already exists", "error");
		});
	};	
});
