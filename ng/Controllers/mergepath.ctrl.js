angular.module('app')
.controller('MergePathCtrl', function($rootScope, $scope, $window){

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
            console.log('selected disease for', lowerCasedDiseaseName, ' is id:', i);
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
    
    console.log(input);

    $scope.mergePathIds.value = MERGEPATH_INITNODE_REF[input];
    $scope.$apply();

    $scope.resetMergePaths();

  })

});