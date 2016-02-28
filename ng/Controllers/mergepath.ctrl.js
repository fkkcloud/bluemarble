angular.module('app')
.controller('MergePathCtrl', function($rootScope, $scope, $window){

  /* SEARCH ----------------------------------------------------------------- */

  function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  //console.log(MERGEPATH_INITNODE_REF);
  $scope.diseases = MERGEPATH_INITNODE_REF;

  $scope.search = '';
  
  var regex;

  $scope.$watch('search', function (value) {
    regex = new RegExp('\\b' + escapeRegExp(value), 'i');
  });
    
  $scope.filterBySearch = function(name) {
      if (!$scope.search) return false;
      return regex.test(name);
  };

  $scope.runName = function(disease){
    //console.log('in disease:', disease);
    var name = disease;
    //document.getElementById("textinfo-mergepathids").value = name;
    $scope.search = name;
  }

  /* END OF SEARCH ----------------------------------------------------------------- */

  function setPageNum(){

    PAGE_NUM.value = 2;
    if (bCanvasLoaded)
      $('#options-mergepaths').css('visibility', 'visible');

  }
  setPageNum();

  function setVisibility(){

    $('.data-visibility').addClass('active');

  }
  setVisibility();

  // reset animation.
  $('#btn-reset-mergepaths').click(function() {

    $scope.resetMergePaths(); 

  });

  $('#btn-run-mergepaths').click(function() {

    var input = document.getElementById("textinfo-mergepathids").value;

    // deal with input to find mergepath!
    try {

      var mergePathId = parseInt(input);
      if (isNaN(mergePathId)){

        var lowerCasedDiseaseName = input.toLowerCase();

        for (var i = 0; i < MERGEPATH_INITNODE_REF.length; i++){

          var name = MERGEPATH_INITNODE_REF[i];

          if (name == lowerCasedDiseaseName){

            input = i;
            //console.log('selected disease for', lowerCasedDiseaseName, ' is id:', i);
            break;

          } 

        }

      }
    }
    catch(err) {
      console.log(err);
      return;
    }

    $scope.cleanMergePaths();

    SELECTED_MERGEPATHID = input;
    
    //console.log(input);

    $scope.mergePathIds.value = MERGEPATH_INITNODE_REF[input];
    $scope.$apply();

    $scope.resetMergePaths();

  })

});