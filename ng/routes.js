
angular.module('app')
.config(function ($routeProvider){
	$routeProvider
	.when('/', 
		{
			templateUrl: '/templates/dataviz.html'
		})
	.otherwise(
		{
   			redirectTo: '/'
		});
});
