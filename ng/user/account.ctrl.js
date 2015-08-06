angular.module('app')
.controller('AccountCtrl', function($scope, $location, UserSvc){
	/* emit broadcast for current pageId */
	$scope.$emit('pagechange', $scope.pageId.account);

	$scope.changePassword = function(newPassword, password){
		UserSvc.changePassword(newPassword, password)
		.then(
			function(){
				swal('', "Password have been changed", "success");
				$location.path('/');
			},
			function(err){
				if (err.status == 401)
				{
					swal('', "Original password is wrong.", "error");	
				}
				else
				{
					swal('', "Can not change password.","error");
				}
			}
		);
	};
});