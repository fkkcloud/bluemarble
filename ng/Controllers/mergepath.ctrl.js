
angular.module('app')
.controller('MergePathCtrl', function($rootScope, $scope, $window){

  function setPageNum(){

    PAGE_NUM.value = 2;

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
    var array = input.split(' ');

    for (var i = 0; i < array.length; i++){

      try {
        var mergePathId = parseInt(array[i]);
        if (isNaN(mergePathId)){
          delete array[i];
        } else {
          array[i] = mergePathId;
        }
      }
      catch(err) {
        console.log(err);
        return;
      }
    }
    console.log('Show mergepathids : ', array);
    $scope.cleanMergePaths();
    SELECTED_MERGEPATHIDS = array;
    $scope.mergePathIds.value = array;
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
*/

  //set initial state.
  $('#checkbox-hide-names-mergepaths').change(function() {
      if($(this).is(":checked")) {

         for (var i = 0; i < NodeManagerMergePaths.length; i++){

          for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

            if (SELECTED_MERGEPATHIDS[j] === i)
              NodeManagerMergePaths[i].toggleNodeTextVisibility(true);

          }

         }
        
      }
      else
      {

        for (var i = 0; i < NodeManagerMergePaths.length; i++){

          for (var j = 0; j < SELECTED_MERGEPATHIDS.length; j++){

            if (SELECTED_MERGEPATHIDS[j] === i)
              NodeManagerMergePaths[i].toggleNodeTextVisibility(false);

          }

         }

      }
  });
  
});