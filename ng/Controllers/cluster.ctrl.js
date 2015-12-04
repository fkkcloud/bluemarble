
angular.module('app')
.controller('ClusterCtrl', function($rootScope, $scope, $window){

  function setPageNum(){
    PAGE_NUM.value = 1; // 1 - cluster

    if (bCanvasLoaded)
      $('#options-clusters').css('visibility', 'visible');
  }
  setPageNum();

  $scope.selectedid = { value : SELECTED_CLUSTER };


  function setVisibility(){
    $('.data-visibility').addClass('active');
  }
  setVisibility();


  // reset animation.
  $('#btn-reset-clusters').click(function() {

    $scope.resetClusters();

  });


  $scope.updateMeanAge();
  /*
  //set initial state.  example of check box event
  $('#checkbox-hide-nodes-clusters').change(function() {
      if($(this).is(":checked")) {
        NodeManagerCluster.toggleNodeVisibility(true);
      }
      else
      {
        NodeManagerCluster.toggleNodeVisibility(false);
      }
  });
  */

  $('#clusterid').change(function(){

    var clusterid = $('#clusterid').val();

    SELECTED_CLUSTER = clusterid;

    $scope.setClusterID(clusterid);

  })


});