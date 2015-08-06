angular.module('app')
.service('PostsSvc', function($http){
	this.fetchAll = function() {
		return $http.get('/api/posts');
	};

	this.fetch = function(page, perpage){
		var url = '/api/posts/' + page + '?perpage=' + perpage;
		return $http.get(url);
	};

	this.create = function(post){
		return $http.post('/api/posts', post);
	};
});