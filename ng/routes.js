
angular.module('app')
.config(function ($routeProvider){
	$routeProvider
	.when('/', 
		{
			controller: 'PostsCtrl', 
			templateUrl: '/templates/posts.html'
		})
	.when('/register', 
		{
			controller: 'RegisterCtrl',
			templateUrl: '/templates/register.html'
		})
	.when('/login',
		{
			controller: 'LoginCtrl',
			templateUrl: '/templates/login.html'
		})
	.when('/account',
		{
			controller: 'AccountCtrl',
			templateUrl: '/templates/account.html'
		})
	.when('/privacy',
		{
			controller: 'AccountCtrl',
			templateUrl: '/templates/policy.html'
		})
	.when('/aboutus',
		{
			controller: 'AccountCtrl',
			templateUrl: '/templates/aboutus.html'
		})
	.when('/contact',
		{
			controller: 'AccountCtrl',
			templateUrl: '/templates/contactus.html'
		})
	// Redirect to the root page.
	
	.otherwise(
		{
   			redirectTo: '/'
		});
});
