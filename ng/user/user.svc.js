angular.module('app')
.service('UserSvc', function($http, $rootScope){
	var svc = this;

	// svc.token (this.token) 값으로 /api/user 를 호출
	svc.getUser = function(){
		return $http.get('/api/users', 
		{
			headers: {'X-Auth': $http.defaults.headers.common['X-Auth'] }
			//headers: {'X-Auth': $http.defaults.headers.common['X-Auth']}
		})
		.then(function(response){
			return response.data;  // - api에서 보내졌기 때문에 .data로 접근
		},
		function(err){
			currentUser = undefined;
		});
	};

	// designed to be called when application launched
	// for the persons who refreshed the page but did not logout --> it will be still logged in!
	svc.remainLogin = function(){
		console.log("Token:", localStorage.getItem('token'));
		console.log("Application has been launched")
		if (window.localStorage.getItem('token') != 'undefined')
		{
			$http.defaults.headers.common['X-Auth'] = window.localStorage.getItem('token');

			console.log("Remain Login in process..")
			var user;
			svc.getUser()
			.then(function(user){
				$rootScope.$emit('login', user);
			},
			function(err){
				console.log(err);
				currentUser = undefined;
			});
		}
	};

	svc.changePassword = function(newPassword, password){
		return $http.get('/api/users', 
		{
			headers: {'X-Auth': $http.defaults.headers.common['X-Auth'] }
		})
		.then(function(user){
			return $http.post('/api/users/password_change', 
			{
				password    : password,
				newPassword : newPassword,
				username    : user.data.userName
			});
		});
	};

	// session 을 이용해서, 패스워드가 일치하는지 검사하고,
	// 일치하면 받은 jwt encoded된 username, 즉 토큰을 가지고,
	// val이라는 변수에 넣고, 이것의 데이터를 svc.token에도 저장하고,
	// svc.getUser함수를 호출한다.
	svc.login = function(username, password){
		return $http.post('/api/sessions', 
		{
			username: username, 
			password: password
		})
		.then(function (response){
			window.localStorage.token = response.data; // api에서 보냈기때문에, .data로 접근 - TODO
			$http.defaults.headers.common['X-Auth'] = response.data; // 모든 요청에 대해 해당 헤더를 전역으로 붙임.
			return svc.getUser();
		})
	};

	svc.register = function(username, password, userdob, sexpos){
		return $http.post('/api/users', 
		{
			userName: username,
			password: password,
			userdob : userdob,
			sexPos  : sexpos
		})
		.then(function (){
			return svc.login(username, password);
		});
	};

	svc.logout = function(){
		window.localStorage.longitude = undefined;
		window.localStorage.latitude = undefined;
		window.localStorage.token = undefined;
		$http.defaults.headers.common['X-Auth'] = undefined; // 모든 요청에 대해 해당 헤더를 전역으로 붙임.
	}
});