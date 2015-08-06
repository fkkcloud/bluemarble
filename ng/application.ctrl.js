
angular.module('app')
.controller('ApplicationCtrl', function($rootScope, $scope, $window, UserSvc){
	$scope.pageId = { 
		post     : 0,
		register : 1,
		login    : 2,
		account  : 3, 
	};

	$scope.navCollapsed = true;
	$scope.collapse = function(){
		$scope.navCollapsed = true;
	};

	/* move to current location */
	$scope.moveToCurrentLocation = function(){
		function getCurrLocSuccess(pos) {
            /* make sure to check we are on post page with map first */
            if ($scope.currentPageId != $scope.pageId.post)
                return;

            var crd = pos.coords;

            window.localStorage.latitude = crd.latitude;
            window.localStorage.longitude = crd.longitude;

            //console.log('Latitude : ' + crd.latitude);
            //console.log('Longitude: ' + crd.longitude);
            //console.log('More or less ' + crd.accuracy + ' meters.');
            var googleLoc = new google.maps.LatLng(crd.latitude, crd.longitude);

            google.maps.event.trigger($scope.map, 'heading_changed', googleLoc);
            
            $scope.map.panTo(googleLoc)
            $scope.map.setZoom(15);
        }

        function getCurrLocError(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        /* init map and place some markers, so everything start with this function. */
        navigator.geolocation.getCurrentPosition(getCurrLocSuccess, getCurrLocError);

        swal({   title: "",   text: "Moving to current location..",   timer: 1500,   showConfirmButton: false });
	};

	$scope.logout = function(){
		$scope.collapse();

		$scope.currentUser = undefined;

		UserSvc.logout();

		swal('',"Successfully logged out");
	};

	/* using rootScope so that UserSvc can emit a broadcast */
	$rootScope.$on('login', function(_, user){
		$scope.currentUser = user;
	});

	$scope.$on('loc', function(_, location){
		console.log(location);
		var lat = location.lat();
		var lon = location.lng();
		$scope.postLocation = {
			lat: lat,
			lon: lon
		};
		console.log($scope.postLocation);
	});

	$scope.$on('pagechange', function(_, pageId){
		$scope.currentPageId = pageId;
	});

	$scope.$on('place', function(_, place){
		// Forcing the update with $apply() method on $scope
		// problem related note: http://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-AngularJS
		if(!$scope.$$phase) { // check if a $digest is already in progress by checking $scope.$$phase.
			$scope.$apply(function(){
					$scope.sexPlaceAutocompleted = place;
				}
			);
		}

	});

	$scope.$on('mapInit', function(_, map){
		$scope.map = map;
	});

	UserSvc.remainLogin();
});