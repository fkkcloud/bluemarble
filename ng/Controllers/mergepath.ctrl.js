
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

  function setDataGuiInitialize(){

    if ($scope.dataguiMergePathInitialized.value == true)
      return;

    $scope.dataguiMergePathInitialized.value = true;

    var mergePathUI = function() {
      this.MergePathId = 0;
      this.Replay = function() { 
        $scope.resetMergePaths(); 
      };
    };

    var text = new mergePathUI();
    var gui  = new dat.GUI();
    var gui_mergePathId = gui.add(text, 'MergePathId').min(0).step(1).max(117);
    gui.add(text, 'Replay');

    gui_mergePathId.onFinishChange(function(value) {
      SELECTED_MERGEPATHID = Math.ceil(value);
      $scope.resetMergePaths(); 
    });

  }
  setDataGuiInitialize();
  
});