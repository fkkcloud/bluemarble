
angular.module('app')
.directive('appMap', function(PostsSvc, UtilSvc, $timeout, $compile) {
    // directive link function
    var link = function(scope, element, attrs) {
        var map;

        var CLOUD_MAP_ID = 'custom_style'; // map style
        
        var imagePost = {
            url: 'https://catchme.ifyoucan.com/images/pictures/IYC_Icons/IYC_Location_Icon_Small.png',
            size: new google.maps.Size(100, 100),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(1, 1)
        };

         var imageTarget = {
            url: 'http://www.clker.com/cliparts/U/P/j/M/I/i/x-mark-yellow-md.png',
            size: new google.maps.Size(100, 100),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        // map config
        //console.log('window.localStorage.latitude ', window.localStorage.latitude );

        var initialMapCenter = new google.maps.LatLng(34.06148453403353, -118.2785067220459);
        
        if (!isNaN(window.localStorage.latitude) && !isNaN(window.localStorage.longitude))
        {
            initialMapCenter = new google.maps.LatLng(window.localStorage.latitude, window.localStorage.longitude);
        }

        //console.log('window.localStorage.latitude ', window.localStorage.latitude );
        
        //console.log(initialMapCenter);

        var mapOptions = {
                center      : initialMapCenter,
                zoom        : 15,
                MapTypeId   : google.maps.MapTypeId.ROADMAP,
                scrollwheel : false,
                streetViewControl: false,
                mapTypeControl: false,
                mapTypeControlOptions: {
                      mapTypeIds: [google.maps.MapTypeId.ROADMAP, CLOUD_MAP_ID]
                    },
                mapTypeId: CLOUD_MAP_ID
            };
        
        // draw map with helper markers
        var helperMarkers = [];
        function drawHelperMarker(location){
            for (var i = 0, marker; marker = helperMarkers[i]; i++) {
                marker.setMap(null);
            }
            helperMarkers = [];
            var marker = new google.maps.Marker({
                position: location, 
                map: map,
                icon: imageTarget
            });
            helperMarkers.push(marker);
        }

        function removeHelperMarker(){
            for (var i = 0, marker; marker = helperMarkers[i]; i++) {
                marker.setMap(null);
            }
            helperMarkers = [];
        }

        function drawAndSetPlace(location)
        {
            // only enable when logged in
            if (!scope.currentUser)
                return;

            if (infoWindow)
                infoWindow.close();

            var geocoder = new google.maps.Geocoder();
            
            // broadcast location infor(lon,lat)
            scope.$emit('loc', location);

            drawHelperMarker(location);

            // broadcast place formatted_address and draw icon
            geocoder.geocode( { 'latLng': location }, function(results, status) {
                // as user clicks on the map,
                // we have to save the formatted address in $scope and
                // it will be used through posts.ctrl
                // emit broadcase 'place' and send this to application.ctrl
                try {
                    // broadcast formatted_address
                    scope.$emit('place', results[1].formatted_address);
                    
                }
                catch(err) {
                    console.log(err);
                    swal("","Location does not exists");
                    scope.$emit('place', "Location does not exists");
                }
            });
        }

         // place a marker and infoWindow
        var infoWindow;
        var markers = [];

        function drawPostMarkers() {
            var posts = undefined;
            PostsSvc.fetchAll()
            .success(function(response){
                //console.log(response);
                posts = response;

                for (var i = 0; i < posts.length; i++)
                {
                    var post = posts[i];

                    if (markers[i]){
                        if (markers[i].post._id == post._id)
                            continue;
                    }
                    
                    //if (!post.hasOwnProperty('sexLocation'))
                    //    continue;

                    var location = angular.fromJson(post.sexLocation);
                    var googleLoc = new google.maps.LatLng(location.lat, location.lon);

                    var markerOptions = {
                        position: googleLoc,
                        map: map,
                        title: "Sex",
                        //icon: imagePost
                    };

                    var marker = new google.maps.Marker(markerOptions);
                    // add marker to array
                    markers.push(
                        {
                            marker: marker,
                            post  : post
                        });

                    var parent = scope;
                    var child = parent.$new(true);

                    var openWindow = (function(marker, post) {
                        return function() {
                            // close window if not undefined

                            if (infoWindow !== void 0) {
                                infoWindow.close();
                            }

                            child.content = post.sexTarget.substring(0, 24);
                            child.age = post.userAge;

                            var html = '<div> <strong class="post-content">"' + 
                                        child.content + 
                                        '..."</strong>   <span class="post-content-age">Age -  ' + 
                                        child.age +
                                        '</span></div>';


                            var compiled = $compile(html)(child);

                            // create new window
                            var infoWindowOptions = {
                                content: compiled[0], 
                                pixelOffset: new google.maps.Size(0, 0),
                                disableAutoPan: true,
                            };
                            
                            infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                            infoWindow.open(map, marker);
                        }
                    })(marker, post);

                    openWindow();


                    // mouse over to view the post information - closure
                    google.maps.event.addListener(marker, 'click', (function(marker, post) {
                        return function() {
                            // close window if not undefined

                            if (infoWindow !== void 0) {
                                infoWindow.close();
                            }

                            child.content = post.sexTarget.substring(0, 24);
                            child.age = post.userAge;

                            var html = '<div> <strong class="post-content">"' + 
                                        child.content + 
                                        '"...</strong>   <span class="post-content-age">Age -  ' + 
                                        child.age +
                                        '</span></div>';


                            var compiled = $compile(html)(child);

                            // create new window
                            var infoWindowOptions = {
                                content: compiled[0], 
                                pixelOffset: new google.maps.Size(0, 0),
                                disableAutoPan: true,
                            };
                            
                            infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                            infoWindow.open(map, marker);
                        }
                    })(marker, post));

                    // mouse out to close the post info window
                    /*
                    google.maps.event.addListener(marker, 'mouseout', function () {
                        if (infoWindow)
                            infoWindow.close();
                    });*/
                }
            });
        }

        function removePostMarker(){
            for (var i = 0, marker; marker = markers[i]; i++) {
                marker.setMap(null);
            }
            markers = [];
        }

        function setSearchBox()
        {
            // Create the search box and link it to the UI element.
            var input = (document.getElementById('pac-input')); // @type {HTMLInputElement}  
            var currLocBtn = (document.getElementById('btn-curr'));      
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(currLocBtn);

            var searchBox = new google.maps.places.SearchBox((input)); // @type {HTMLInputElement} 

            // Listen for the event fired when the user selects an item from the
            // pick list. Retrieve the matching places for that item.
            google.maps.event.addListener(searchBox, 'places_changed', function() {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                  return;
                }

                // take only 1 spot
                var place = places[0];

                // when search happens, location will be updated as well for post
                // scope.$emit('place', place.formatted_address);
                drawAndSetPlace(place.geometry.location);

                window.localStorage.latitude = place.geometry.location.latitude;
                window.localStorage.longitude = place.geometry.location.longitude;

                map.panTo(place.geometry.location);
                //map.setZoom(16);
            });
        }

        function setClickMap()
        {
            // click event on map
            google.maps.event.addListener(map, 'click', function(event) {
                drawAndSetPlace(event.latLng);
            });
        }

        function setMoveToCurrentLocation()
        {
            // click event on map
            google.maps.event.addListener(map, 'heading_changed', function(location) {
                drawAndSetPlace(location);
            });
        }

        function setCenterChanged()
        {
            google.maps.event.addListener(map, 'center_changed', function(){
                window.localStorage.latitude = map.getCenter().lat();
                window.localStorage.longitude = map.getCenter().lng();
            })
        }
        
        function setLoadPostMarkers()
        {
            // manually reload markers
            google.maps.event.addListener(map, 'maptypeid_changed', function() {
                //removeHelperMarker();
                //removePostMarker();

                drawPostMarkers(); 
            });
        }

        function setStyleForMap()
        {
            var featureOpts = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#439aa5"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"color":"#32485c"},{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"color":"#e9dddb"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#c4e661"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#e9dddb"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#32485c"},{"weight":"0.7"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#e9dddb"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#32485c"},{"weight":"0.25"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#e9dddb"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#ef798e"},{"weight":"0.5"},{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#ef798e"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"weight":"2.06"}]},{"featureType":"transit.line","elementType":"geometry.stroke","stylers":[{"weight":"10.00"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"weight":"10.00"},{"color":"#439aa5"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#32485c"},{"weight":"0.85"}]}];

            var styledMapOptions = {
                name: 'Custom Style'
              };

            var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
            map.mapTypes.set(CLOUD_MAP_ID, customMapType);
        }

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }

            setStyleForMap();

            setLoadPostMarkers();

            // broadcast to send map to application ctrl
            scope.$emit('mapInit', map);

            setClickMap();

            setSearchBox();

            setCenterChanged();

            setMoveToCurrentLocation();

            drawPostMarkers();
        } 

        initMap();

        /*
        function getCurrLocSuccess(pos) {
            // make sure to check we are on post page with map first
            if (scope.currentPageId != scope.pageId.post)
                return;

            swal({   
                title: "We found you!",   
                text: "Do you want to move to your location?!",   
                showCancelButton: true,   
                confirmButtonColor: '#00B2EE',   
                confirmButtonText: "Yes, move me!",   
                closeOnConfirm: false ,
            }, 
            function(){  
                swal({title: "", text: "You have been moved!", timer: 800, showConfirmButton: false});

                // if user wants to move, let it happen!
                var crd = pos.coords;

                window.localStorage.latitude = crd.latitude;
                window.localStorage.longitude = crd.longitude;

                //console.log('Latitude : ' + crd.latitude);
                //console.log('Longitude: ' + crd.longitude);
                //console.log('More or less ' + crd.accuracy + ' meters.');
                var googleLoc = new google.maps.LatLng(crd.latitude, crd.longitude);

                drawAndSetPlace(googleLoc);
                
                map.panTo(googleLoc)
                map.setZoom(15);
            });
        }

        function getCurrLocError(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        // init map and place some markers, so everything start with this function.
        navigator.geolocation.getCurrentPosition(getCurrLocSuccess, getCurrLocError);

        // swal({   title: "",   text: "Getting current location..",   timer: 2000,   showConfirmButton: false });
        */
    };
    
    return {
        restrict: 'A',
        template: '<div id="map-canvas"></div>',
        replace: true,
        link: link
    };
});

