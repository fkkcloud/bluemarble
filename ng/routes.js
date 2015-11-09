
angular.module('app')
.config(function ($routeProvider){
	$routeProvider
	.when('/dataviz', 
		{
			templateUrl: '/templates/dataviz.html',
			controller: 'DataVizCtrl'
		})
	.when('/intro', 
		{
			templateUrl: '/templates/intro.html',
			controller: 'IntroCtrl'
		})
	.otherwise(
		{
   			redirectTo: '/intro'
		});

});
