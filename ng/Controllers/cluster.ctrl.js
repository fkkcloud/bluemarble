
angular.module('app')
.controller('ClusterCtrl', function($rootScope, $scope, $window){

  function setPageNum(){
    PAGE_NUM.value = 1; // 1 - cluster
  }
  setPageNum();


  function setVisibility(){
    $('.data-visibility').addClass('active');
  }
  setVisibility();


  $scope.updateMeanAge = function(){
    if (FRAME.value > 420 || PAGE_NUM.value != 1)
      return;

  var newMeanAge = mapRange([0, 400.0], [38.2, 81.3], FRAME.value);
    $scope.meanAge.value = Math.ceil(newMeanAge);
    $scope.$apply();
    requestAnimationFrame($scope.updateMeanAge);
  }
  $scope.updateMeanAge();


  // reset animation.
  $('#btn-reset-clusters').click(function() {

    $scope.resetClusters();

  });

  /*
  //set initial state.
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

    if (isNaN(clusterid)){

      if (clusterid == 'Not Clustered'){
        console.log(clusterid);
        EdgeManagerCluster.toggleShowByCluster(17, true); 
      } else {
        console.log(clusterid);
        viewAllClusters();  
      }
      
      return;
    }

    console.log(clusterid);
    clearAllClusters();
    EdgeManagerCluster.toggleShowByCluster(clusterid, true);

  })

  // clear all clusters
  function clearAllClusters(){ // 지금 이게 global로 정의된 것인데, 아마도 클로쥬어 안에 넣어서, 이 파일 안에서만 가능한 local space로 옮겨야 할듯싶다.
    for (var i = 0; i < 18; i++){

      EdgeManagerCluster.toggleShowByCluster(i, false);

    }
  }

  // clear all clusters
  function viewAllClusters(){
    for (var i = 0; i < 18; i++){

      EdgeManagerCluster.toggleShowByCluster(i, true);

    }
  }

});