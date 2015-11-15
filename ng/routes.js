
angular.module('app')
.config(function ($routeProvider){
	$routeProvider
	.when('/mergepaths', 
		{
			templateUrl: '/templates/mergepaths.html',
			controller: 'MergePathCtrl'
		})
	.when('/clusters', 
		{
			templateUrl: '/templates/clusters.html',
			controller: 'ClusterCtrl'
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
