angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$rootScope","$scope","$window",function(e,a,l){function t(){EdgeManagerCluster.hideAll(),NodeManagerCluster.hideAll()}function s(){EdgeManagerCluster.showAll(),NodeManagerCluster.showAll()}function i(){var e=function(){this.AdditiveColor=!0,this.Restart=function(){location.reload()},this.HideNodes=!1,this.HideNames=!1,this.Data="US"};RENDEROPTIONS=new e;var l=new dat.GUI,t=l.add(RENDEROPTIONS,"Data",["US","KOR"]),s=l.addFolder("Clusters"),i=s.add(RENDEROPTIONS,"HideNodes"),r=s.add(RENDEROPTIONS,"HideNames"),n=l.addFolder("MergePaths"),o=n.add(RENDEROPTIONS,"HideNodes"),u=n.add(RENDEROPTIONS,"HideNames");t.onFinishChange(function(e){"US"==e?(dataManager.start("US"),a.clusterids=[{value:1,displayName:"1"},{value:2,displayName:"2"},{value:3,displayName:"3"},{value:4,displayName:"4"},{value:5,displayName:"5"},{value:6,displayName:"6"},{value:7,displayName:"7"},{value:8,displayName:"8"},{value:9,displayName:"9"},{value:10,displayName:"10"},{value:11,displayName:"11"},{value:12,displayName:"12"},{value:13,displayName:"13"},{value:14,displayName:"14"},{value:15,displayName:"15"},{value:16,displayName:"16"},{value:17,displayName:"Not Clustered"},{value:18,displayName:"All"}],1==PAGE_NUM.value?a.resetClusters():2==PAGE_NUM.value&&a.resetMergePaths(),a.mergePathIds.value="acute myocardial infarction",a.$apply()):"KOR"==e&&(dataManager.start("KOR"),a.clusterids=[{value:0,displayName:"0"},{value:1,displayName:"1"},{value:2,displayName:"2"},{value:3,displayName:"Not Clustered"},{value:4,displayName:"All"}],1==PAGE_NUM.value?a.resetClusters():2==PAGE_NUM.value&&a.resetMergePaths(),a.mergePathIds.value="chronic viral hepatitis",a.$apply())}),i.onFinishChange(function(e){NodeManagerCluster.toggleNodeVisibilityByCluster(1==e?!1:!0)}),r.onFinishChange(function(e){NodeManagerCluster.toggleNodeTextVisibilityByCluster(1==e?!1:!0)}),o.onFinishChange(function(e){NodeManagerMergePaths[SELECTED_MERGEPATHID].toggleNodeVisibility(1==e?!1:!0)}),u.onFinishChange(function(e){NodeManagerMergePaths[SELECTED_MERGEPATHID].toggleNodeTextVisibility(1==e?!1:!0)}),l.add(RENDEROPTIONS,"Restart")}a.meanAge={value:0},a.mergePathIds={value:"acute myocardial infarction"},a.getMenuShow=function(){return a.show_menu},$(window).resize(function(){this.resizeTO&&clearTimeout(this.resizeTO),this.resizeTO=setTimeout(function(){$(this).trigger("resizeEnd")},200)}),$(window).bind("resizeEnd",function(){location.reload()}),a.clusterids=[{value:1,displayName:"1"},{value:2,displayName:"2"},{value:3,displayName:"3"},{value:4,displayName:"4"},{value:5,displayName:"5"},{value:6,displayName:"6"},{value:7,displayName:"7"},{value:8,displayName:"8"},{value:9,displayName:"9"},{value:10,displayName:"10"},{value:11,displayName:"11"},{value:12,displayName:"12"},{value:13,displayName:"13"},{value:14,displayName:"14"},{value:15,displayName:"15"},{value:16,displayName:"16"},{value:17,displayName:"Not Clustered"},{value:18,displayName:"All"}],a.cleanMergePaths=function(){NodeManagerMergePaths[SELECTED_MERGEPATHID].clean()},a.resetMergePaths=function(){FRAME.value=0,PAGE_NUM.value=2,TWEEN.removeAll(),NodeManagerMergePaths[SELECTED_MERGEPATHID].reset(),EdgeManagerMergePaths[SELECTED_MERGEPATHID].reset()},a.resetClusters=function(){FRAME.value=0,PAGE_NUM.value=1,a.meanAge.value=0,TWEEN.removeAll(),EdgeManagerCluster.reset(),NodeManagerCluster.reset(),a.setClusterID(SELECTED_CLUSTER),a.updateMeanAge()},a.setClusterID=function(e){return SELECTED_CLUSTER=e,e==NOT_CLUSTER_ID?(SELECTED_CLUSTER=NOT_CLUSTER_ID,t(),EdgeManagerCluster.toggleShowByCluster(NOT_CLUSTER_ID),void NodeManagerCluster.toggleShowByCluster(NOT_CLUSTER_ID)):e==ALL_CLUSTER_ID?(SELECTED_CLUSTER=ALL_CLUSTER_ID,t(),void s()):(t(),EdgeManagerCluster.toggleShowByCluster(SELECTED_CLUSTER),void NodeManagerCluster.toggleShowByCluster(SELECTED_CLUSTER))},a.updateMeanAge=function(){if(!(FRAME.value>620||1!=PAGE_NUM.value)){var e=mapRange([0,620],[35.4,90.5],FRAME.value);a.meanAge.value=Math.ceil(e),a.$apply(),requestAnimationFrame(a.updateMeanAge)}},i()}]),angular.module("app").config(["$routeProvider",function(e){e.when("/mergepaths",{templateUrl:"/templates/mergepaths.html",controller:"MergePathCtrl"}).when("/clusters",{templateUrl:"/templates/clusters.html",controller:"ClusterCtrl"}).when("/intro",{templateUrl:"/templates/intro.html",controller:"IntroCtrl"}).otherwise({redirectTo:"/intro"})}]),angular.module("app").controller("ClusterCtrl",["$rootScope","$scope","$window",function(e,a,l){function t(){PAGE_NUM.value=1,bCanvasLoaded&&$("#options-clusters").css("visibility","visible")}function s(){$(".data-visibility").addClass("active")}t(),a.selectedid={value:SELECTED_CLUSTER},s(),$("#btn-reset-clusters").click(function(){a.resetClusters()}),a.updateMeanAge(),$("#clusterid").change(function(){var e=$("#clusterid").val();SELECTED_CLUSTER=e,a.setClusterID(e)})}]),angular.module("app").controller("IntroCtrl",["$rootScope","$scope","$window",function(e,a,l){function t(){PAGE_NUM.value=0}function s(){$(".data-visibility").removeClass("active")}t(),s()}]),angular.module("app").controller("MergePathCtrl",["$rootScope","$scope","$window",function(e,a,l){function t(){PAGE_NUM.value=2,bCanvasLoaded&&$("#options-mergepaths").css("visibility","visible")}function s(){$(".data-visibility").addClass("active")}t(),s(),$("#btn-reset-mergepaths").click(function(){a.resetMergePaths()}),$("#btn-run-mergepaths").click(function(){var e=document.getElementById("textinfo-mergepathids").value;try{var l=parseInt(e);if(isNaN(l))for(var t=e.toLowerCase(),s=0;s<MERGEPATH_INITNODE_REF.length;s++){var i=MERGEPATH_INITNODE_REF[s];if(i==t){e=s,console.log("selected disease for",t," is id:",s);break}}}catch(r){return void console.log(r)}a.cleanMergePaths(),SELECTED_MERGEPATHID=e,console.log(e),a.mergePathIds.value=MERGEPATH_INITNODE_REF[e],a.$apply(),a.resetMergePaths()})}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJyb3V0ZXMuanMiLCJDb250cm9sbGVycy9jbHVzdGVyLmN0cmwuanMiLCJDb250cm9sbGVycy9pbnRyby5jdHJsLmpzIiwiQ29udHJvbGxlcnMvbWVyZ2VwYXRoLmN0cmwuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkcm9vdFNjb3BlIiwiJHNjb3BlIiwiJHdpbmRvdyIsImNsZWFyQWxsQ2x1c3RlcnMiLCJFZGdlTWFuYWdlckNsdXN0ZXIiLCJoaWRlQWxsIiwiTm9kZU1hbmFnZXJDbHVzdGVyIiwidmlld0FsbENsdXN0ZXJzIiwic2hvd0FsbCIsInNldERhdGFHdWlJbml0aWFsaXplIiwicmVuZGVyT3B0aW9uc1VJIiwidGhpcyIsIkFkZGl0aXZlQ29sb3IiLCJSZXN0YXJ0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJIaWRlTm9kZXMiLCJIaWRlTmFtZXMiLCJEYXRhIiwiUkVOREVST1BUSU9OUyIsImd1aSIsImRhdCIsIkdVSSIsIkRhdGFUeXBlIiwiYWRkIiwiQ2x1c3RlcnNHcnAiLCJhZGRGb2xkZXIiLCJDbHVzdGVySGlkZU5vZGVzIiwiQ2x1c3RlckhpZGVOYW1lcyIsIk1lcmdlUGF0aEdycCIsIk1lcmdlUGF0aEhpZGVOb2RlcyIsIk1lcmdlUGF0aEhpZGVOYW1lcyIsIm9uRmluaXNoQ2hhbmdlIiwidmFsIiwiZGF0YU1hbmFnZXIiLCJzdGFydCIsImNsdXN0ZXJpZHMiLCJ2YWx1ZSIsImRpc3BsYXlOYW1lIiwiUEFHRV9OVU0iLCJyZXNldENsdXN0ZXJzIiwicmVzZXRNZXJnZVBhdGhzIiwibWVyZ2VQYXRoSWRzIiwiJGFwcGx5IiwidG9nZ2xlTm9kZVZpc2liaWxpdHlCeUNsdXN0ZXIiLCJ0b2dnbGVOb2RlVGV4dFZpc2liaWxpdHlCeUNsdXN0ZXIiLCJOb2RlTWFuYWdlck1lcmdlUGF0aHMiLCJTRUxFQ1RFRF9NRVJHRVBBVEhJRCIsInRvZ2dsZU5vZGVWaXNpYmlsaXR5IiwidG9nZ2xlTm9kZVRleHRWaXNpYmlsaXR5IiwibWVhbkFnZSIsImdldE1lbnVTaG93Iiwic2hvd19tZW51IiwiJCIsIndpbmRvdyIsInJlc2l6ZSIsInJlc2l6ZVRPIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInRyaWdnZXIiLCJiaW5kIiwiY2xlYW5NZXJnZVBhdGhzIiwiY2xlYW4iLCJGUkFNRSIsIlRXRUVOIiwicmVtb3ZlQWxsIiwicmVzZXQiLCJFZGdlTWFuYWdlck1lcmdlUGF0aHMiLCJzZXRDbHVzdGVySUQiLCJTRUxFQ1RFRF9DTFVTVEVSIiwidXBkYXRlTWVhbkFnZSIsImNsdXN0ZXJpZCIsIk5PVF9DTFVTVEVSX0lEIiwidG9nZ2xlU2hvd0J5Q2x1c3RlciIsIkFMTF9DTFVTVEVSX0lEIiwibmV3TWVhbkFnZSIsIm1hcFJhbmdlIiwiTWF0aCIsImNlaWwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjb25maWciLCIkcm91dGVQcm92aWRlciIsIndoZW4iLCJ0ZW1wbGF0ZVVybCIsIm90aGVyd2lzZSIsInJlZGlyZWN0VG8iLCJzZXRQYWdlTnVtIiwiYkNhbnZhc0xvYWRlZCIsImNzcyIsInNldFZpc2liaWxpdHkiLCJhZGRDbGFzcyIsInNlbGVjdGVkaWQiLCJjbGljayIsImNoYW5nZSIsInJlbW92ZUNsYXNzIiwiaW5wdXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibWVyZ2VQYXRoSWQiLCJwYXJzZUludCIsImlzTmFOIiwibG93ZXJDYXNlZERpc2Vhc2VOYW1lIiwidG9Mb3dlckNhc2UiLCJpIiwiTUVSR0VQQVRIX0lOSVROT0RFX1JFRiIsImxlbmd0aCIsIm5hbWUiLCJjb25zb2xlIiwibG9nIiwiZXJyIl0sIm1hcHBpbmdzIjoiQUFDQUEsUUFBQUMsT0FBQSxPQUNBLFlDRkFELFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxtQkFBQSxhQUFBLFNBQUEsVUFBQSxTQUFBQyxFQUFBQyxFQUFBQyxHQWlIQSxRQUFBQyxLQUVBQyxtQkFBQUMsVUFDQUMsbUJBQUFELFVBS0EsUUFBQUUsS0FFQUgsbUJBQUFJLFVBQ0FGLG1CQUFBRSxVQWNBLFFBQUFDLEtBRUEsR0FBQUMsR0FBQSxXQUVBQyxLQUFBQyxlQUFBLEVBRUFELEtBQUFFLFFBQUEsV0FHQUMsU0FBQUMsVUFJQUosS0FBQUssV0FBQSxFQUVBTCxLQUFBTSxXQUFBLEVBRUFOLEtBQUFPLEtBQUEsS0FHQUMsZUFBQSxHQUFBVCxFQUNBLElBQUFVLEdBQUEsR0FBQUMsS0FBQUMsSUFFQUMsRUFBQUgsRUFBQUksSUFBQUwsY0FBQSxRQUFBLEtBQUEsUUFFQU0sRUFBQUwsRUFBQU0sVUFBQSxZQUNBQyxFQUFBRixFQUFBRCxJQUFBTCxjQUFBLGFBQ0FTLEVBQUFILEVBQUFELElBQUFMLGNBQUEsYUFFQVUsRUFBQVQsRUFBQU0sVUFBQSxjQUNBSSxFQUFBRCxFQUFBTCxJQUFBTCxjQUFBLGFBQ0FZLEVBQUFGLEVBQUFMLElBQUFMLGNBQUEsWUFFQUksR0FBQVMsZUFBQSxTQUFBQyxHQUNBLE1BQUFBLEdBRUFDLFlBQUFDLE1BQUEsTUFDQWxDLEVBQUFtQyxhQUNBQyxNQUFBLEVBQUFDLFlBQUEsTUFDQUQsTUFBQSxFQUFBQyxZQUFBLE1BQ0FELE1BQUEsRUFBQUMsWUFBQSxNQUNBRCxNQUFBLEVBQUFDLFlBQUEsTUFDQUQsTUFBQSxFQUFBQyxZQUFBLE1BQ0FELE1BQUEsRUFBQUMsWUFBQSxNQUNBRCxNQUFBLEVBQUFDLFlBQUEsTUFDQUQsTUFBQSxFQUFBQyxZQUFBLE1BQ0FELE1BQUEsRUFBQUMsWUFBQSxNQUNBRCxNQUFBLEdBQUFDLFlBQUEsT0FDQUQsTUFBQSxHQUFBQyxZQUFBLE9BQ0FELE1BQUEsR0FBQUMsWUFBQSxPQUNBRCxNQUFBLEdBQUFDLFlBQUEsT0FDQUQsTUFBQSxHQUFBQyxZQUFBLE9BQ0FELE1BQUEsR0FBQUMsWUFBQSxPQUNBRCxNQUFBLEdBQUFDLFlBQUEsT0FDQUQsTUFBQSxHQUFBQyxZQUFBLGtCQUNBRCxNQUFBLEdBQUFDLFlBQUEsUUFFQSxHQUFBQyxTQUFBRixNQUNBcEMsRUFBQXVDLGdCQUVBLEdBQUFELFNBQUFGLE9BQ0FwQyxFQUFBd0Msa0JBRUF4QyxFQUFBeUMsYUFBQUwsTUFBQSw4QkFDQXBDLEVBQUEwQyxVQUVBLE9BQUFWLElBQ0FDLFlBQUFDLE1BQUEsT0FDQWxDLEVBQUFtQyxhQUNBQyxNQUFBLEVBQUFDLFlBQUEsTUFDQUQsTUFBQSxFQUFBQyxZQUFBLE1BQ0FELE1BQUEsRUFBQUMsWUFBQSxNQUNBRCxNQUFBLEVBQUFDLFlBQUEsa0JBQ0FELE1BQUEsRUFBQUMsWUFBQSxRQUVBLEdBQUFDLFNBQUFGLE1BQ0FwQyxFQUFBdUMsZ0JBRUEsR0FBQUQsU0FBQUYsT0FDQXBDLEVBQUF3QyxrQkFFQXhDLEVBQUF5QyxhQUFBTCxNQUFBLDBCQUNBcEMsRUFBQTBDLFlBSUFoQixFQUFBSyxlQUFBLFNBQUFDLEdBRUEzQixtQkFBQXNDLDhCQURBLEdBQUFYLEdBQ0EsR0FHQSxLQUlBTCxFQUFBSSxlQUFBLFNBQUFDLEdBRUEzQixtQkFBQXVDLGtDQURBLEdBQUFaLEdBQ0EsR0FHQSxLQUlBSCxFQUFBRSxlQUFBLFNBQUFDLEdBR0FhLHNCQUFBQyxzQkFBQUMscUJBRkEsR0FBQWYsR0FFQSxHQUtBLEtBS0FGLEVBQUFDLGVBQUEsU0FBQUMsR0FHQWEsc0JBQUFDLHNCQUFBRSx5QkFGQSxHQUFBaEIsR0FFQSxHQUtBLEtBS0FiLEVBQUFJLElBQUFMLGNBQUEsV0ExUUFsQixFQUFBaUQsU0FBQWIsTUFBQSxHQUNBcEMsRUFBQXlDLGNBQUFMLE1BQUEsK0JBRUFwQyxFQUFBa0QsWUFBQSxXQUNBLE1BQUFsRCxHQUFBbUQsV0FJQUMsRUFBQUMsUUFBQUMsT0FBQSxXQUNBNUMsS0FBQTZDLFVBQUFDLGFBQUE5QyxLQUFBNkMsVUFDQTdDLEtBQUE2QyxTQUFBRSxXQUFBLFdBQ0FMLEVBQUExQyxNQUFBZ0QsUUFBQSxjQUNBLE9BR0FOLEVBQUFDLFFBQUFNLEtBQUEsWUFBQSxXQUVBOUMsU0FBQUMsV0FHQWQsRUFBQW1DLGFBQ0FDLE1BQUEsRUFBQUMsWUFBQSxNQUNBRCxNQUFBLEVBQUFDLFlBQUEsTUFDQUQsTUFBQSxFQUFBQyxZQUFBLE1BQ0FELE1BQUEsRUFBQUMsWUFBQSxNQUNBRCxNQUFBLEVBQUFDLFlBQUEsTUFDQUQsTUFBQSxFQUFBQyxZQUFBLE1BQ0FELE1BQUEsRUFBQUMsWUFBQSxNQUNBRCxNQUFBLEVBQUFDLFlBQUEsTUFDQUQsTUFBQSxFQUFBQyxZQUFBLE1BQ0FELE1BQUEsR0FBQUMsWUFBQSxPQUNBRCxNQUFBLEdBQUFDLFlBQUEsT0FDQUQsTUFBQSxHQUFBQyxZQUFBLE9BQ0FELE1BQUEsR0FBQUMsWUFBQSxPQUNBRCxNQUFBLEdBQUFDLFlBQUEsT0FDQUQsTUFBQSxHQUFBQyxZQUFBLE9BQ0FELE1BQUEsR0FBQUMsWUFBQSxPQUNBRCxNQUFBLEdBQUFDLFlBQUEsa0JBQ0FELE1BQUEsR0FBQUMsWUFBQSxRQUtBckMsRUFBQTRELGdCQUFBLFdBRUFmLHNCQUFBQyxzQkFBQWUsU0FJQTdELEVBQUF3QyxnQkFBQSxXQUNBc0IsTUFBQTFCLE1BQUEsRUFDQUUsU0FBQUYsTUFBQSxFQUVBMkIsTUFBQUMsWUFFQW5CLHNCQUFBQyxzQkFBQW1CLFFBQ0FDLHNCQUFBcEIsc0JBQUFtQixTQUlBakUsRUFBQXVDLGNBQUEsV0FFQXVCLE1BQUExQixNQUFBLEVBQ0FFLFNBQUFGLE1BQUEsRUFFQXBDLEVBQUFpRCxRQUFBYixNQUFBLEVBRUEyQixNQUFBQyxZQUVBN0QsbUJBQUE4RCxRQUNBNUQsbUJBQUE0RCxRQUVBakUsRUFBQW1FLGFBQUFDLGtCQUVBcEUsRUFBQXFFLGlCQUlBckUsRUFBQW1FLGFBQUEsU0FBQUcsR0FJQSxNQUZBRixrQkFBQUUsRUFFQUEsR0FBQUMsZ0JBRUFILGlCQUFBRyxlQUVBckUsSUFDQUMsbUJBQUFxRSxvQkFBQUQsb0JBQ0FsRSxvQkFBQW1FLG9CQUFBRCxpQkFNQUQsR0FBQUcsZ0JBRUFMLGlCQUFBSyxlQUVBdkUsUUFDQUksT0FNQUosSUFDQUMsbUJBQUFxRSxvQkFBQUosc0JBQ0EvRCxvQkFBQW1FLG9CQUFBSixvQkFtQkFwRSxFQUFBcUUsY0FBQSxXQUNBLEtBQUFQLE1BQUExQixNQUFBLEtBQUEsR0FBQUUsU0FBQUYsT0FBQSxDQUdBLEdBQUFzQyxHQUFBQyxVQUFBLEVBQUEsTUFBQSxLQUFBLE1BQUFiLE1BQUExQixNQUNBcEMsR0FBQWlELFFBQUFiLE1BQUF3QyxLQUFBQyxLQUFBSCxHQUNBMUUsRUFBQTBDLFNBQ0FvQyxzQkFBQTlFLEVBQUFxRSxpQkEwSUE3RCxPQ2pSQVosUUFBQUMsT0FBQSxPQUNBa0YsUUFBQSxpQkFBQSxTQUFBQyxHQUNBQSxFQUNBQyxLQUFBLGVBRUFDLFlBQUEsNkJBQ0FwRixXQUFBLGtCQUVBbUYsS0FBQSxhQUVBQyxZQUFBLDJCQUNBcEYsV0FBQSxnQkFFQW1GLEtBQUEsVUFFQUMsWUFBQSx3QkFDQXBGLFdBQUEsY0FFQXFGLFdBRUFDLFdBQUEsY0NwQkF4RixRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsZUFBQSxhQUFBLFNBQUEsVUFBQSxTQUFBQyxFQUFBQyxFQUFBQyxHQUVBLFFBQUFvRixLQUNBL0MsU0FBQUYsTUFBQSxFQUVBa0QsZUFDQWxDLEVBQUEscUJBQUFtQyxJQUFBLGFBQUEsV0FPQSxRQUFBQyxLQUNBcEMsRUFBQSxvQkFBQXFDLFNBQUEsVUFOQUosSUFFQXJGLEVBQUEwRixZQUFBdEQsTUFBQWdDLGtCQU1Bb0IsSUFJQXBDLEVBQUEsdUJBQUF1QyxNQUFBLFdBRUEzRixFQUFBdUMsa0JBS0F2QyxFQUFBcUUsZ0JBY0FqQixFQUFBLGNBQUF3QyxPQUFBLFdBRUEsR0FBQXRCLEdBQUFsQixFQUFBLGNBQUFwQixLQUVBb0Msa0JBQUFFLEVBRUF0RSxFQUFBbUUsYUFBQUcsUUNoREExRSxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsYUFBQSxhQUFBLFNBQUEsVUFBQSxTQUFBQyxFQUFBQyxFQUFBQyxHQUVBLFFBQUFvRixLQUNBL0MsU0FBQUYsTUFBQSxFQUtBLFFBQUFvRCxLQUNBcEMsRUFBQSxvQkFBQXlDLFlBQUEsVUFKQVIsSUFNQUcsT0NaQTVGLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxpQkFBQSxhQUFBLFNBQUEsVUFBQSxTQUFBQyxFQUFBQyxFQUFBQyxHQUVBLFFBQUFvRixLQUVBL0MsU0FBQUYsTUFBQSxFQUdBa0QsZUFDQWxDLEVBQUEsdUJBQUFtQyxJQUFBLGFBQUEsV0FLQSxRQUFBQyxLQUVBcEMsRUFBQSxvQkFBQXFDLFNBQUEsVUFKQUosSUFPQUcsSUFJQXBDLEVBQUEseUJBQUF1QyxNQUFBLFdBRUEzRixFQUFBd0Msb0JBS0FZLEVBQUEsdUJBQUF1QyxNQUFBLFdBRUEsR0FBQUcsR0FBQUMsU0FBQUMsZUFBQSx5QkFBQTVELEtBR0EsS0FFQSxHQUFBNkQsR0FBQUMsU0FBQUosRUFDQSxJQUFBSyxNQUFBRixHQUlBLElBQUEsR0FGQUcsR0FBQU4sRUFBQU8sY0FFQUMsRUFBQSxFQUFBQSxFQUFBQyx1QkFBQUMsT0FBQUYsSUFBQSxDQUVBLEdBQUFHLEdBQUFGLHVCQUFBRCxFQUVBLElBQUFHLEdBQUFMLEVBQUEsQ0FFQU4sRUFBQVEsRUFDQUksUUFBQUMsSUFBQSx1QkFBQVAsRUFBQSxVQUFBRSxFQUNBLFNBUUEsTUFBQU0sR0FFQSxXQURBRixTQUFBQyxJQUFBQyxHQUlBNUcsRUFBQTRELGtCQUVBZCxxQkFBQWdELEVBRUFZLFFBQUFDLElBQUFiLEdBRUE5RixFQUFBeUMsYUFBQUwsTUFBQW1FLHVCQUFBVCxHQUNBOUYsRUFBQTBDLFNBRUExQyxFQUFBd0MiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuXHQnbmdSb3V0ZScsXG5dKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ0FwcGxpY2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHdpbmRvdyl7XG5cblx0JHNjb3BlLm1lYW5BZ2UgPSB7IHZhbHVlIDogMCB9O1xuXHQkc2NvcGUubWVyZ2VQYXRoSWRzID0geyB2YWx1ZSA6IFwiYWN1dGUgbXlvY2FyZGlhbCBpbmZhcmN0aW9uXCJ9O1xuXG5cdCRzY29wZS5nZXRNZW51U2hvdyA9IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuICRzY29wZS5zaG93X21lbnU7XG5cdH1cblxuXHQvLyBhcyByZXNpemUsIHJlLWluaXQgZGF0YXNcblx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLnJlc2l6ZVRPKSBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUTyk7XG5cdCAgICB0aGlzLnJlc2l6ZVRPID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ3Jlc2l6ZUVuZCcpO1xuXHQgICAgfSwgMjAwKTtcblx0fSk7XG5cblx0JCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZUVuZCcsIGZ1bmN0aW9uKCkge1xuXHQgICAgLy9kbyBzb21ldGhpbmcsIHdpbmRvdyBoYXNuJ3QgY2hhbmdlZCBzaXplIGluIDUwMG1zXG5cdCAgICBsb2NhdGlvbi5yZWxvYWQoKTtcblx0fSk7XG5cblx0JHNjb3BlLmNsdXN0ZXJpZHMgPSBbXG4gICAgICB7dmFsdWU6IDEsIGRpc3BsYXlOYW1lOiAnMSd9LFxuICAgICAge3ZhbHVlOiAyLCBkaXNwbGF5TmFtZTogJzInfSxcbiAgICAgIHt2YWx1ZTogMywgZGlzcGxheU5hbWU6ICczJ30sXG4gICAgICB7dmFsdWU6IDQsIGRpc3BsYXlOYW1lOiAnNCd9LFxuICAgICAge3ZhbHVlOiA1LCBkaXNwbGF5TmFtZTogJzUnfSxcbiAgICAgIHt2YWx1ZTogNiwgZGlzcGxheU5hbWU6ICc2J30sXG4gICAgICB7dmFsdWU6IDcsIGRpc3BsYXlOYW1lOiAnNyd9LFxuICAgICAge3ZhbHVlOiA4LCBkaXNwbGF5TmFtZTogJzgnfSxcbiAgICAgIHt2YWx1ZTogOSwgZGlzcGxheU5hbWU6ICc5J30sXG4gICAgICB7dmFsdWU6IDEwLCBkaXNwbGF5TmFtZTogJzEwJ30sXG4gICAgICB7dmFsdWU6IDExLCBkaXNwbGF5TmFtZTogJzExJ30sXG4gICAgICB7dmFsdWU6IDEyLCBkaXNwbGF5TmFtZTogJzEyJ30sXG4gICAgICB7dmFsdWU6IDEzLCBkaXNwbGF5TmFtZTogJzEzJ30sXG4gICAgICB7dmFsdWU6IDE0LCBkaXNwbGF5TmFtZTogJzE0J30sXG4gICAgICB7dmFsdWU6IDE1LCBkaXNwbGF5TmFtZTogJzE1J30sXG4gICAgICB7dmFsdWU6IDE2LCBkaXNwbGF5TmFtZTogJzE2J30sXG4gICAgICB7dmFsdWU6IDE3LCBkaXNwbGF5TmFtZTogJ05vdCBDbHVzdGVyZWQnfSxcbiAgICAgIHt2YWx1ZTogMTgsIGRpc3BsYXlOYW1lOiAnQWxsJ31cbiAgXHRdO1xuXG5cblxuXHQkc2NvcGUuY2xlYW5NZXJnZVBhdGhzID0gZnVuY3Rpb24oKXtcblxuXHRcdE5vZGVNYW5hZ2VyTWVyZ2VQYXRoc1tTRUxFQ1RFRF9NRVJHRVBBVEhJRF0uY2xlYW4oKTtcblxuXHR9XG5cblx0JHNjb3BlLnJlc2V0TWVyZ2VQYXRocyA9IGZ1bmN0aW9uKCl7XG5cdFx0RlJBTUUudmFsdWUgICAgPSAwO1xuXHRcdFBBR0VfTlVNLnZhbHVlID0gMjtcblxuXHRcdFRXRUVOLnJlbW92ZUFsbCgpOyAvLyByZXNldCB0d2VlbiBhbmltYXRpb25zXG5cblx0XHROb2RlTWFuYWdlck1lcmdlUGF0aHNbU0VMRUNURURfTUVSR0VQQVRISURdLnJlc2V0KCk7XG5cdFx0RWRnZU1hbmFnZXJNZXJnZVBhdGhzW1NFTEVDVEVEX01FUkdFUEFUSElEXS5yZXNldCgpO1xuXG5cdH1cblxuXHQkc2NvcGUucmVzZXRDbHVzdGVycyA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgIFx0RlJBTUUudmFsdWUgICAgPSAwO1xuICAgICAgXHRQQUdFX05VTS52YWx1ZSA9IDE7XG5cbiAgICAgIFx0JHNjb3BlLm1lYW5BZ2UudmFsdWUgPSAwO1xuXG4gICAgICBcdFRXRUVOLnJlbW92ZUFsbCgpOyAvLyByZXNldCB0d2VlbiBhbmltYXRpb25zXG5cbiAgICAgIFx0RWRnZU1hbmFnZXJDbHVzdGVyLnJlc2V0KCk7XG4gICAgICBcdE5vZGVNYW5hZ2VyQ2x1c3Rlci5yZXNldCgpO1xuXG4gICAgICBcdCRzY29wZS5zZXRDbHVzdGVySUQoU0VMRUNURURfQ0xVU1RFUik7XG5cbiAgICAgIFx0JHNjb3BlLnVwZGF0ZU1lYW5BZ2UoKTtcblx0XG5cdH1cblxuXHQkc2NvcGUuc2V0Q2x1c3RlcklEID0gZnVuY3Rpb24oY2x1c3RlcmlkKXtcblxuXHQgICAgU0VMRUNURURfQ0xVU1RFUiA9IGNsdXN0ZXJpZDtcblxuXHQgICAgaWYgKGNsdXN0ZXJpZCA9PSBOT1RfQ0xVU1RFUl9JRCl7XG5cblx0ICAgICAgICBTRUxFQ1RFRF9DTFVTVEVSID0gTk9UX0NMVVNURVJfSUQ7XG5cdCAgICAgICAgXG5cdCAgICAgICAgY2xlYXJBbGxDbHVzdGVycygpO1xuXHQgICAgICAgIEVkZ2VNYW5hZ2VyQ2x1c3Rlci50b2dnbGVTaG93QnlDbHVzdGVyKE5PVF9DTFVTVEVSX0lEKTtcblx0ICAgICAgICBOb2RlTWFuYWdlckNsdXN0ZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcihOT1RfQ0xVU1RFUl9JRCk7XG5cblx0ICAgICAgICByZXR1cm47XG5cblx0ICAgIH1cblxuXHQgICAgaWYgKGNsdXN0ZXJpZCA9PSBBTExfQ0xVU1RFUl9JRCl7XG5cblx0ICAgIFx0U0VMRUNURURfQ0xVU1RFUiA9IEFMTF9DTFVTVEVSX0lEO1xuXG5cdCAgICBcdGNsZWFyQWxsQ2x1c3RlcnMoKTtcblx0ICAgICAgICB2aWV3QWxsQ2x1c3RlcnMoKTsgXG5cblx0ICAgICAgICByZXR1cm47IFxuXG5cdCAgICB9XG5cblx0ICAgIGNsZWFyQWxsQ2x1c3RlcnMoKTtcblx0ICAgIEVkZ2VNYW5hZ2VyQ2x1c3Rlci50b2dnbGVTaG93QnlDbHVzdGVyKFNFTEVDVEVEX0NMVVNURVIpO1xuXHQgICAgTm9kZU1hbmFnZXJDbHVzdGVyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoU0VMRUNURURfQ0xVU1RFUik7XG5cdH1cblxuXHQvLyBjbGVhciBhbGwgY2x1c3RlcnNcbiAgXHRmdW5jdGlvbiBjbGVhckFsbENsdXN0ZXJzKCl7IC8vIOyngOq4iCDsnbTqsowgZ2xvYmFs66GcIOygleydmOuQnCDqsoPsnbjrjbAsIOyVhOuniOuPhCDtgbTroZzspazslrQg7JWI7JeQIOuEo+yWtOyEnCwg7J20IO2MjOydvCDslYjsl5DshJzrp4wg6rCA64ql7ZWcIGxvY2FsIHNwYWNl66GcIOyYruqyqOyVvCDtlaDrk6/si7bri6QuXG5cbiAgICAgIFx0RWRnZU1hbmFnZXJDbHVzdGVyLmhpZGVBbGwoKTtcbiAgICAgIFx0Tm9kZU1hbmFnZXJDbHVzdGVyLmhpZGVBbGwoKTtcblxuXHR9XG5cblx0Ly8gY2xlYXIgYWxsIGNsdXN0ZXJzXG5cdGZ1bmN0aW9uIHZpZXdBbGxDbHVzdGVycygpe1xuXG5cdCAgICBFZGdlTWFuYWdlckNsdXN0ZXIuc2hvd0FsbCgpO1xuXHQgICAgTm9kZU1hbmFnZXJDbHVzdGVyLnNob3dBbGwoKTtcblxuXHR9XG5cblx0JHNjb3BlLnVwZGF0ZU1lYW5BZ2UgPSBmdW5jdGlvbigpe1xuXHQgICAgaWYgKEZSQU1FLnZhbHVlID4gNjIwIHx8IFBBR0VfTlVNLnZhbHVlICE9IDEpXG5cdCAgICAgIHJldHVybjtcblxuXHQgICAgdmFyIG5ld01lYW5BZ2UgPSBtYXBSYW5nZShbMCwgNjIwLjBdLCBbMzUuNCwgOTAuNV0sIEZSQU1FLnZhbHVlKTtcblx0ICAgICRzY29wZS5tZWFuQWdlLnZhbHVlID0gTWF0aC5jZWlsKG5ld01lYW5BZ2UpO1xuXHQgICAgJHNjb3BlLiRhcHBseSgpO1xuXHQgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCRzY29wZS51cGRhdGVNZWFuQWdlKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldERhdGFHdWlJbml0aWFsaXplKCl7XG5cblx0ICAgIHZhciByZW5kZXJPcHRpb25zVUkgPSBmdW5jdGlvbigpIHtcblxuXHQgICAgICB0aGlzLkFkZGl0aXZlQ29sb3IgPSB0cnVlO1xuXG5cdCAgICAgIHRoaXMuUmVzdGFydCA9IGZ1bmN0aW9uKCkgeyBcblxuXHQgICAgICBcdCAvLyByZXN0YXJ0IHRoZSBwYWdlXG5cdCAgICAgIFx0IGxvY2F0aW9uLnJlbG9hZCgpO1xuXG5cdCAgICAgIH07XG5cblx0ICAgICAgdGhpcy5IaWRlTm9kZXMgPSBmYWxzZTtcblxuXHQgICAgICB0aGlzLkhpZGVOYW1lcyA9IGZhbHNlO1xuXG5cdCAgICAgIHRoaXMuRGF0YSAgICAgID0gJ1VTJztcblx0ICAgIH07XG5cblx0ICAgIFJFTkRFUk9QVElPTlMgXHQ9IG5ldyByZW5kZXJPcHRpb25zVUkoKTtcblx0ICAgIHZhciBndWkgIFx0XHQ9IG5ldyBkYXQuR1VJKCk7XG5cblx0ICAgIHZhciBEYXRhVHlwZSAgICAgICAgID0gZ3VpLmFkZChSRU5ERVJPUFRJT05TLCAnRGF0YScsIFsgJ1VTJywgJ0tPUicgXSApO1xuXG5cdCAgICB2YXIgQ2x1c3RlcnNHcnAgICAgICA9IGd1aS5hZGRGb2xkZXIoJ0NsdXN0ZXJzJyk7XG5cdFx0dmFyIENsdXN0ZXJIaWRlTm9kZXMgICA9IENsdXN0ZXJzR3JwLmFkZChSRU5ERVJPUFRJT05TLCAnSGlkZU5vZGVzJyk7XG5cdFx0dmFyIENsdXN0ZXJIaWRlTmFtZXMgICA9IENsdXN0ZXJzR3JwLmFkZChSRU5ERVJPUFRJT05TLCAnSGlkZU5hbWVzJyk7XG5cblx0XHR2YXIgTWVyZ2VQYXRoR3JwICAgICAgID0gZ3VpLmFkZEZvbGRlcignTWVyZ2VQYXRocycpO1xuXHRcdHZhciBNZXJnZVBhdGhIaWRlTm9kZXMgPSBNZXJnZVBhdGhHcnAuYWRkKFJFTkRFUk9QVElPTlMsICdIaWRlTm9kZXMnKTtcblx0XHR2YXIgTWVyZ2VQYXRoSGlkZU5hbWVzID0gTWVyZ2VQYXRoR3JwLmFkZChSRU5ERVJPUFRJT05TLCAnSGlkZU5hbWVzJyk7XG5cblx0XHREYXRhVHlwZS5vbkZpbmlzaENoYW5nZShmdW5jdGlvbih2YWwpIHtcblx0XHRcdGlmICh2YWwgPT0gJ1VTJyl7XG5cblx0XHRcdFx0ZGF0YU1hbmFnZXIuc3RhcnQoJ1VTJyk7XG5cdFx0XHRcdCRzY29wZS5jbHVzdGVyaWRzID0gW1xuXHRcdFx0ICAgICAge3ZhbHVlOiAxLCBkaXNwbGF5TmFtZTogJzEnfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogMiwgZGlzcGxheU5hbWU6ICcyJ30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDMsIGRpc3BsYXlOYW1lOiAnMyd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiA0LCBkaXNwbGF5TmFtZTogJzQnfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogNSwgZGlzcGxheU5hbWU6ICc1J30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDYsIGRpc3BsYXlOYW1lOiAnNid9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiA3LCBkaXNwbGF5TmFtZTogJzcnfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogOCwgZGlzcGxheU5hbWU6ICc4J30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDksIGRpc3BsYXlOYW1lOiAnOSd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAxMCwgZGlzcGxheU5hbWU6ICcxMCd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAxMSwgZGlzcGxheU5hbWU6ICcxMSd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAxMiwgZGlzcGxheU5hbWU6ICcxMid9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAxMywgZGlzcGxheU5hbWU6ICcxMyd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAxNCwgZGlzcGxheU5hbWU6ICcxNCd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAxNSwgZGlzcGxheU5hbWU6ICcxNSd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAxNiwgZGlzcGxheU5hbWU6ICcxNid9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAxNywgZGlzcGxheU5hbWU6ICdOb3QgQ2x1c3RlcmVkJ30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDE4LCBkaXNwbGF5TmFtZTogJ0FsbCd9XG5cdFx0XHQgIFx0XTtcblx0XHRcdCAgXHRpZiAoUEFHRV9OVU0udmFsdWUgPT0gMSkge1xuXHRcdFx0ICBcdFx0JHNjb3BlLnJlc2V0Q2x1c3RlcnMoKTtcblx0XHRcdCAgXHR9XG5cdFx0XHQgIFx0ZWxzZSBpZiAoUEFHRV9OVU0udmFsdWUgPT0gMil7XG5cdFx0XHQgIFx0XHQkc2NvcGUucmVzZXRNZXJnZVBhdGhzKCk7XG5cdFx0XHQgIFx0fVxuXHRcdFx0ICBcdCRzY29wZS5tZXJnZVBhdGhJZHMudmFsdWUgID0gXCJhY3V0ZSBteW9jYXJkaWFsIGluZmFyY3Rpb25cIjtcblx0XHRcdCAgXHQkc2NvcGUuJGFwcGx5KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh2YWwgPT0gJ0tPUicpe1xuXHRcdFx0XHRkYXRhTWFuYWdlci5zdGFydCgnS09SJyk7XG5cdFx0XHRcdCRzY29wZS5jbHVzdGVyaWRzID0gW1xuXHRcdFx0ICAgICAge3ZhbHVlOiAwLCBkaXNwbGF5TmFtZTogJzAnfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogMSwgZGlzcGxheU5hbWU6ICcxJ30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDIsIGRpc3BsYXlOYW1lOiAnMid9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAzLCBkaXNwbGF5TmFtZTogJ05vdCBDbHVzdGVyZWQnfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogNCwgZGlzcGxheU5hbWU6ICdBbGwnfVxuXHRcdFx0ICBcdF07XG5cdFx0XHQgIFx0aWYgKFBBR0VfTlVNLnZhbHVlID09IDEpe1xuXHRcdFx0ICBcdFx0JHNjb3BlLnJlc2V0Q2x1c3RlcnMoKTtcblx0XHRcdCAgXHR9XG5cdFx0XHQgIFx0ZWxzZSBpZiAoUEFHRV9OVU0udmFsdWUgPT0gMil7XG5cdFx0XHQgIFx0XHQkc2NvcGUucmVzZXRNZXJnZVBhdGhzKCk7ICBcblx0XHRcdCAgXHR9XG5cdFx0XHQgIFx0JHNjb3BlLm1lcmdlUGF0aElkcy52YWx1ZSAgPSBcImNocm9uaWMgdmlyYWwgaGVwYXRpdGlzXCI7XG5cdFx0XHQgIFx0JHNjb3BlLiRhcHBseSgpO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0ICAgIENsdXN0ZXJIaWRlTm9kZXMub25GaW5pc2hDaGFuZ2UoZnVuY3Rpb24odmFsKSB7XG5cdCAgICBcdGlmICh2YWwgPT0gdHJ1ZSkge1xuXHRcdCAgICAgICAgTm9kZU1hbmFnZXJDbHVzdGVyLnRvZ2dsZU5vZGVWaXNpYmlsaXR5QnlDbHVzdGVyKGZhbHNlKTtcblx0ICAgIFx0fVxuXHQgICAgXHRlbHNlIHtcblx0XHQgICAgICAgIE5vZGVNYW5hZ2VyQ2x1c3Rlci50b2dnbGVOb2RlVmlzaWJpbGl0eUJ5Q2x1c3Rlcih0cnVlKTtcblx0ICAgIFx0fVxuXHQgICAgfSk7XG5cblx0ICAgIENsdXN0ZXJIaWRlTmFtZXMub25GaW5pc2hDaGFuZ2UoZnVuY3Rpb24odmFsKSB7XG5cdCAgICBcdGlmICh2YWwgPT0gdHJ1ZSkge1xuXHRcdCAgICAgICAgTm9kZU1hbmFnZXJDbHVzdGVyLnRvZ2dsZU5vZGVUZXh0VmlzaWJpbGl0eUJ5Q2x1c3RlcihmYWxzZSk7XG5cdCAgICBcdH1cblx0ICAgIFx0ZWxzZSB7XG5cdFx0ICAgICAgICBOb2RlTWFuYWdlckNsdXN0ZXIudG9nZ2xlTm9kZVRleHRWaXNpYmlsaXR5QnlDbHVzdGVyKHRydWUpO1xuXHQgICAgXHR9XG5cdCAgICB9KTtcblxuXHQgICBcdE1lcmdlUGF0aEhpZGVOb2Rlcy5vbkZpbmlzaENoYW5nZShmdW5jdGlvbih2YWwpIHtcblx0ICAgIFx0aWYgKHZhbCA9PSB0cnVlKSB7XG5cblx0XHQgICAgICAgIE5vZGVNYW5hZ2VyTWVyZ2VQYXRoc1tTRUxFQ1RFRF9NRVJHRVBBVEhJRF0udG9nZ2xlTm9kZVZpc2liaWxpdHkoZmFsc2UpO1xuXG5cdCAgICBcdH1cblx0ICAgIFx0ZWxzZSB7XG5cblx0XHQgICAgICAgIE5vZGVNYW5hZ2VyTWVyZ2VQYXRoc1tTRUxFQ1RFRF9NRVJHRVBBVEhJRF0udG9nZ2xlTm9kZVZpc2liaWxpdHkodHJ1ZSk7XG5cblx0XHQgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIE1lcmdlUGF0aEhpZGVOYW1lcy5vbkZpbmlzaENoYW5nZShmdW5jdGlvbih2YWwpIHtcblx0ICAgIFx0aWYgKHZhbCA9PSB0cnVlKSB7XG5cblx0XHQgICAgICAgIE5vZGVNYW5hZ2VyTWVyZ2VQYXRoc1tTRUxFQ1RFRF9NRVJHRVBBVEhJRF0udG9nZ2xlTm9kZVRleHRWaXNpYmlsaXR5KGZhbHNlKTtcblxuXHQgICAgXHR9XG5cdCAgICBcdGVsc2Uge1xuXG5cdFx0ICAgICAgICBOb2RlTWFuYWdlck1lcmdlUGF0aHNbU0VMRUNURURfTUVSR0VQQVRISURdLnRvZ2dsZU5vZGVUZXh0VmlzaWJpbGl0eSh0cnVlKTtcblxuXHQgICAgXHR9XG5cdCAgICB9KTtcblxuXHQgICAgZ3VpLmFkZChSRU5ERVJPUFRJT05TLCAnUmVzdGFydCcpO1xuXG5cdCAgICAvLyQoZ3VpLmRvbUVsZW1lbnQpLmZpbmQoXCI+dWxcIikudG9nZ2xlQ2xhc3MoXCJjbG9zZWRcIik7IC8vIGRhdC5ndWkgZGVmYXVsdCB0byBiZSBjbG9zZWRcblxuXHR9XG4gIFx0c2V0RGF0YUd1aUluaXRpYWxpemUoKTtcbn0pOyIsIlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcil7XG5cdCRyb3V0ZVByb3ZpZGVyXG5cdC53aGVuKCcvbWVyZ2VwYXRocycsIFxuXHRcdHtcblx0XHRcdHRlbXBsYXRlVXJsOiAnL3RlbXBsYXRlcy9tZXJnZXBhdGhzLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ01lcmdlUGF0aEN0cmwnXG5cdFx0fSlcblx0LndoZW4oJy9jbHVzdGVycycsIFxuXHRcdHtcblx0XHRcdHRlbXBsYXRlVXJsOiAnL3RlbXBsYXRlcy9jbHVzdGVycy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdDbHVzdGVyQ3RybCdcblx0XHR9KVxuXHQud2hlbignL2ludHJvJywgXG5cdFx0e1xuXHRcdFx0dGVtcGxhdGVVcmw6ICcvdGVtcGxhdGVzL2ludHJvLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0ludHJvQ3RybCdcblx0XHR9KVxuXHQub3RoZXJ3aXNlKFxuXHRcdHtcbiAgIFx0XHRcdHJlZGlyZWN0VG86ICcvaW50cm8nXG5cdFx0fSk7XG5cbn0pO1xuIiwiXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdDbHVzdGVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHdpbmRvdyl7XG5cbiAgZnVuY3Rpb24gc2V0UGFnZU51bSgpe1xuICAgIFBBR0VfTlVNLnZhbHVlID0gMTsgLy8gMSAtIGNsdXN0ZXJcblxuICAgIGlmIChiQ2FudmFzTG9hZGVkKVxuICAgICAgJCgnI29wdGlvbnMtY2x1c3RlcnMnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICB9XG4gIHNldFBhZ2VOdW0oKTtcblxuICAkc2NvcGUuc2VsZWN0ZWRpZCA9IHsgdmFsdWUgOiBTRUxFQ1RFRF9DTFVTVEVSIH07XG5cblxuICBmdW5jdGlvbiBzZXRWaXNpYmlsaXR5KCl7XG4gICAgJCgnLmRhdGEtdmlzaWJpbGl0eScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgfVxuICBzZXRWaXNpYmlsaXR5KCk7XG5cblxuICAvLyByZXNldCBhbmltYXRpb24uXG4gICQoJyNidG4tcmVzZXQtY2x1c3RlcnMnKS5jbGljayhmdW5jdGlvbigpIHtcblxuICAgICRzY29wZS5yZXNldENsdXN0ZXJzKCk7XG5cbiAgfSk7XG5cblxuICAkc2NvcGUudXBkYXRlTWVhbkFnZSgpO1xuICAvKlxuICAvL3NldCBpbml0aWFsIHN0YXRlLiAgZXhhbXBsZSBvZiBjaGVjayBib3ggZXZlbnRcbiAgJCgnI2NoZWNrYm94LWhpZGUtbm9kZXMtY2x1c3RlcnMnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICBpZigkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcbiAgICAgICAgTm9kZU1hbmFnZXJDbHVzdGVyLnRvZ2dsZU5vZGVWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICBOb2RlTWFuYWdlckNsdXN0ZXIudG9nZ2xlTm9kZVZpc2liaWxpdHkoZmFsc2UpO1xuICAgICAgfVxuICB9KTtcbiAgKi9cblxuICAkKCcjY2x1c3RlcmlkJykuY2hhbmdlKGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgY2x1c3RlcmlkID0gJCgnI2NsdXN0ZXJpZCcpLnZhbCgpO1xuXG4gICAgU0VMRUNURURfQ0xVU1RFUiA9IGNsdXN0ZXJpZDtcblxuICAgICRzY29wZS5zZXRDbHVzdGVySUQoY2x1c3RlcmlkKTtcblxuICB9KVxuXG5cbn0pOyIsIlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignSW50cm9DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkd2luZG93KXtcblxuXHRmdW5jdGlvbiBzZXRQYWdlTnVtKCl7XG4gICAgXHRQQUdFX05VTS52YWx1ZSA9IDA7XG4gIFx0fVxuICBcdHNldFBhZ2VOdW0oKTtcblxuXG5cdGZ1bmN0aW9uIHNldFZpc2liaWxpdHkoKXtcblx0XHQkKCcuZGF0YS12aXNpYmlsaXR5JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHR9XG5cdHNldFZpc2liaWxpdHkoKTtcblxufSk7IiwiXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdNZXJnZVBhdGhDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkd2luZG93KXtcblxuICBmdW5jdGlvbiBzZXRQYWdlTnVtKCl7XG5cbiAgICBQQUdFX05VTS52YWx1ZSA9IDI7XG4gICAgLy8kc2NvcGUucmVzZXRNZXJnZVBhdGhzKCk7XG4gICAgXG4gICAgaWYgKGJDYW52YXNMb2FkZWQpXG4gICAgICAkKCcjb3B0aW9ucy1tZXJnZXBhdGhzJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblxuICB9XG4gIHNldFBhZ2VOdW0oKTtcblxuICBmdW5jdGlvbiBzZXRWaXNpYmlsaXR5KCl7XG5cbiAgICAkKCcuZGF0YS12aXNpYmlsaXR5JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gIH1cbiAgc2V0VmlzaWJpbGl0eSgpO1xuXG5cbiAgLy8gcmVzZXQgYW5pbWF0aW9uLlxuICAkKCcjYnRuLXJlc2V0LW1lcmdlcGF0aHMnKS5jbGljayhmdW5jdGlvbigpIHtcblxuICAgICRzY29wZS5yZXNldE1lcmdlUGF0aHMoKTsgXG5cbiAgfSk7XG5cblxuICAkKCcjYnRuLXJ1bi1tZXJnZXBhdGhzJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRpbmZvLW1lcmdlcGF0aGlkc1wiKS52YWx1ZTtcblxuICAgIC8vIGRlYWwgd2l0aCBpbnB1dCB0byBmaW5kIG1lcmdlcGF0aCFcbiAgICB0cnkge1xuXG4gICAgICB2YXIgbWVyZ2VQYXRoSWQgPSBwYXJzZUludChpbnB1dCk7XG4gICAgICBpZiAoaXNOYU4obWVyZ2VQYXRoSWQpKXtcblxuICAgICAgICB2YXIgbG93ZXJDYXNlZERpc2Vhc2VOYW1lID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1FUkdFUEFUSF9JTklUTk9ERV9SRUYubGVuZ3RoOyBpKyspe1xuXG4gICAgICAgICAgdmFyIG5hbWUgPSBNRVJHRVBBVEhfSU5JVE5PREVfUkVGW2ldO1xuXG4gICAgICAgICAgaWYgKG5hbWUgPT0gbG93ZXJDYXNlZERpc2Vhc2VOYW1lKXtcblxuICAgICAgICAgICAgaW5wdXQgPSBpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbGVjdGVkIGRpc2Vhc2UgZm9yJywgbG93ZXJDYXNlZERpc2Vhc2VOYW1lLCAnIGlzIGlkOicsIGkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICB9IFxuXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgJHNjb3BlLmNsZWFuTWVyZ2VQYXRocygpO1xuXG4gICAgU0VMRUNURURfTUVSR0VQQVRISUQgPSBpbnB1dDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhpbnB1dCk7XG5cbiAgICAkc2NvcGUubWVyZ2VQYXRoSWRzLnZhbHVlID0gTUVSR0VQQVRIX0lOSVROT0RFX1JFRltpbnB1dF07XG4gICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgJHNjb3BlLnJlc2V0TWVyZ2VQYXRocygpO1xuXG4gIH0pXG5cbiAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgLypcbiAgJCgnI2NoZWNrYm94LWhpZGUtbm9kZXMtbWVyZ2VwYXRocycpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuXG4gICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE5vZGVNYW5hZ2VyTWVyZ2VQYXRocy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IFNFTEVDVEVEX01FUkdFUEFUSElEUy5sZW5ndGg7IGorKyl7XG5cbiAgICAgICAgICAgIGlmIChTRUxFQ1RFRF9NRVJHRVBBVEhJRFNbal0gPT09IGkpXG4gICAgICAgICAgICAgIE5vZGVNYW5hZ2VyTWVyZ2VQYXRoc1tpXS50b2dnbGVOb2RlVmlzaWJpbGl0eSh0cnVlKTtcblxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9XG4gICAgICBlbHNlXG4gICAgICB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBOb2RlTWFuYWdlck1lcmdlUGF0aHMubGVuZ3RoOyBpKyspe1xuXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBTRUxFQ1RFRF9NRVJHRVBBVEhJRFMubGVuZ3RoOyBqKyspe1xuXG4gICAgICAgICAgICBpZiAoU0VMRUNURURfTUVSR0VQQVRISURTW2pdID09PSBpKVxuICAgICAgICAgICAgICBOb2RlTWFuYWdlck1lcmdlUGF0aHNbaV0udG9nZ2xlTm9kZVZpc2liaWxpdHkoZmFsc2UpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICB9XG5cbiAgICAgIH1cbiAgfSk7XG5cbiAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgJCgnI2NoZWNrYm94LWhpZGUtbmFtZXMtbWVyZ2VwYXRocycpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuXG4gICAgICAgIE5vZGVNYW5hZ2VyTWVyZ2VQYXRoc1tTRUxFQ1RFRF9NRVJHRVBBVEhJRF0udG9nZ2xlTm9kZVRleHRWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICBcbiAgICAgIH1cbiAgICAgIGVsc2VcbiAgICAgIHtcblxuICAgICAgICBOb2RlTWFuYWdlck1lcmdlUGF0aHNbU0VMRUNURURfTUVSR0VQQVRISURdLnRvZ2dsZU5vZGVUZXh0VmlzaWJpbGl0eShmYWxzZSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgIH1cblxuICAgICAgfVxuICB9KTtcbiovXG4gIFxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9