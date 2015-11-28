
angular.module('app')
.controller('MergePathCtrl', function($rootScope, $scope, $window){

  function setPageNum(){

    PAGE_NUM.value = 2;
    //$scope.resetMergePaths();
    
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

    $scope.mergePathIds.value = MERGEPATH_INITNODE_REF[input];
    $scope.$apply();

    $scope.resetMergePaths();

  })

  //set initial state.
  /*
  $('#checkbox-hide-nodes-mergepaths').change(function() {
      if($(this).is(":checked")) {

         for (var i = 0; i < NodeManagerMergePaths.length; i++){

          for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

            if (SELECTED_MERGEPATHIDS[j] === i)
              NodeManagerMergePaths[i].toggleNodeVisibility(true);

          }
          
         }
        
      }
      else
      {

        for (var i = 0; i < NodeManagerMergePaths.length; i++){

          for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

            if (SELECTED_MERGEPATHIDS[j] === i)
              NodeManagerMergePaths[i].toggleNodeVisibility(false);

          }

         }

      }
  });

  //set initial state.
  $('#checkbox-hide-names-mergepaths').change(function() {
      if($(this).is(":checked")) {

        NodeManagerMergePaths[SELECTED_MERGEPATHID].toggleNodeTextVisibility(true);
        
      }
      else
      {

        NodeManagerMergePaths[SELECTED_MERGEPATHID].toggleNodeTextVisibility(false);

          }

         }

      }
  });
*/
  
});