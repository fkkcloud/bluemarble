
angular.module('app')
.controller('ClusterCtrl', function($rootScope, $scope, $window){

  function setPageNum(){
    PAGE_NUM.value = 1; // 1 - cluster

    if (bCanvasLoaded)
      $('#options-clusters').css('visibility', 'visible');
  }
  setPageNum();


  $('#clusterid').val(SELECTED_CLUSTER);


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

    $scope.setClusterID(clusterid);

  })

  // clear all clusters
  function clearAllClusters(){ // 지금 이게 global로 정의된 것인데, 아마도 클로쥬어 안에 넣어서, 이 파일 안에서만 가능한 local space로 옮겨야 할듯싶다.
    for (var i = 0; i < 18; i++){

      EdgeManagerCluster.hideAll();
      NodeManagerCluster.hideAll();

    }
  }

  // clear all clusters
  function viewAllClusters(){
    for (var i = 0; i < 18; i++){

      EdgeManagerCluster.showAll();
      NodeManagerCluster.showAll();

    }
  }

});