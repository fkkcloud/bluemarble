angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$rootScope","$scope","$window",function(e,a,l){function t(){EdgeManagerCluster.hideAll(),NodeManagerCluster.hideAll()}function s(){EdgeManagerCluster.showAll(),NodeManagerCluster.showAll()}function i(){var e=function(){this.AdditiveColor=!0,this.Restart=function(){location.reload()},this.HideNodes=!1,this.HideNames=!1,this.Data="US"};RENDEROPTIONS=new e;var l=new dat.GUI,t=l.add(RENDEROPTIONS,"Data",["US","KOR"]),s=l.addFolder("Clusters"),i=s.add(RENDEROPTIONS,"HideNodes"),r=s.add(RENDEROPTIONS,"HideNames"),n=l.addFolder("MergePaths"),u=n.add(RENDEROPTIONS,"HideNodes"),o=n.add(RENDEROPTIONS,"HideNames");t.onFinishChange(function(e){"US"==e?(dataManager.start("US"),a.clusterids=[{value:1,displayName:"1"},{value:2,displayName:"2"},{value:3,displayName:"3"},{value:4,displayName:"4"},{value:5,displayName:"5"},{value:6,displayName:"6"},{value:7,displayName:"7"},{value:8,displayName:"8"},{value:9,displayName:"9"},{value:10,displayName:"10"},{value:11,displayName:"11"},{value:12,displayName:"12"},{value:13,displayName:"13"},{value:14,displayName:"14"},{value:15,displayName:"15"},{value:16,displayName:"16"},{value:17,displayName:"Not Clustered"},{value:18,displayName:"All"}],1==PAGE_NUM.value?a.resetClusters():2==PAGE_NUM.value&&a.resetMergePaths(),a.mergePathIds.value="acute myocardial infarction",a.$apply()):"KOR"==e&&(dataManager.start("KOR"),a.clusterids=[{value:0,displayName:"0"},{value:1,displayName:"1"},{value:2,displayName:"2"},{value:3,displayName:"Not Clustered"},{value:4,displayName:"All"}],1==PAGE_NUM.value?a.resetClusters():2==PAGE_NUM.value&&a.resetMergePaths(),a.mergePathIds.value="chronic viral hepatitis",a.$apply())}),i.onFinishChange(function(e){NodeManagerCluster.toggleNodeVisibilityByCluster(1==e?!1:!0)}),r.onFinishChange(function(e){NodeManagerCluster.toggleNodeTextVisibilityByCluster(1==e?!1:!0)}),u.onFinishChange(function(e){NodeManagerMergePaths[SELECTED_MERGEPATHID].toggleNodeVisibility(1==e?!1:!0)}),o.onFinishChange(function(e){NodeManagerMergePaths[SELECTED_MERGEPATHID].toggleNodeTextVisibility(1==e?!1:!0)}),l.add(RENDEROPTIONS,"Restart")}a.meanAge={value:0},a.mergePathIds={value:"acute myocardial infarction"},a.getMenuShow=function(){return a.show_menu},$(window).resize(function(){this.resizeTO&&clearTimeout(this.resizeTO),this.resizeTO=setTimeout(function(){$(this).trigger("resizeEnd")},200)}),$(window).bind("resizeEnd",function(){location.reload()}),a.clusterids=[{value:1,displayName:"1"},{value:2,displayName:"2"},{value:3,displayName:"3"},{value:4,displayName:"4"},{value:5,displayName:"5"},{value:6,displayName:"6"},{value:7,displayName:"7"},{value:8,displayName:"8"},{value:9,displayName:"9"},{value:10,displayName:"10"},{value:11,displayName:"11"},{value:12,displayName:"12"},{value:13,displayName:"13"},{value:14,displayName:"14"},{value:15,displayName:"15"},{value:16,displayName:"16"},{value:17,displayName:"Not Clustered"},{value:18,displayName:"All"}],a.cleanMergePaths=function(){NodeManagerMergePaths[SELECTED_MERGEPATHID].clean()},a.resetMergePaths=function(){FRAME.value=0,PAGE_NUM.value=2,TWEEN.removeAll(),NodeManagerMergePaths[SELECTED_MERGEPATHID].reset(),EdgeManagerMergePaths[SELECTED_MERGEPATHID].reset()},a.resetClusters=function(){FRAME.value=0,PAGE_NUM.value=1,a.meanAge.value=0,TWEEN.removeAll(),EdgeManagerCluster.reset(),NodeManagerCluster.reset(),a.setClusterID(SELECTED_CLUSTER),a.updateMeanAge()},a.setClusterID=function(e){return SELECTED_CLUSTER=e,e==NOT_CLUSTER_ID?(SELECTED_CLUSTER=NOT_CLUSTER_ID,t(),EdgeManagerCluster.toggleShowByCluster(NOT_CLUSTER_ID),void NodeManagerCluster.toggleShowByCluster(NOT_CLUSTER_ID)):e==ALL_CLUSTER_ID?(SELECTED_CLUSTER=ALL_CLUSTER_ID,t(),void s()):(t(),EdgeManagerCluster.toggleShowByCluster(SELECTED_CLUSTER),void NodeManagerCluster.toggleShowByCluster(SELECTED_CLUSTER))},a.updateMeanAge=function(){if(!(FRAME.value>620||1!=PAGE_NUM.value)){var e=mapRange([0,620],[35.4,90.5],FRAME.value);a.meanAge.value=Math.ceil(e),a.$apply(),requestAnimationFrame(a.updateMeanAge)}},i()}]),angular.module("app").config(["$routeProvider",function(e){e.when("/mergepaths",{templateUrl:"/templates/mergepaths.html",controller:"MergePathCtrl"}).when("/clusters",{templateUrl:"/templates/clusters.html",controller:"ClusterCtrl"}).when("/intro",{templateUrl:"/templates/intro.html",controller:"IntroCtrl"}).otherwise({redirectTo:"/intro"})}]),angular.module("app").controller("ClusterCtrl",["$rootScope","$scope","$window",function(e,a,l){function t(){PAGE_NUM.value=1,bCanvasLoaded&&$("#options-clusters").css("visibility","visible")}function s(){$(".data-visibility").addClass("active")}t(),a.selectedid={value:SELECTED_CLUSTER},s(),$("#btn-reset-clusters").click(function(){a.resetClusters()}),a.updateMeanAge(),$("#clusterid").change(function(){var e=$("#clusterid").val();SELECTED_CLUSTER=e,a.setClusterID(e)})}]),angular.module("app").controller("IntroCtrl",["$rootScope","$scope","$window",function(e,a,l){function t(){PAGE_NUM.value=0}function s(){$(".data-visibility").removeClass("active")}t(),s()}]),angular.module("app").controller("MergePathCtrl",["$rootScope","$scope","$window",function(e,a,l){function t(e){return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function s(){PAGE_NUM.value=2,bCanvasLoaded&&$("#options-mergepaths").css("visibility","visible")}function i(){$(".data-visibility").addClass("active")}a.diseases=MERGEPATH_INITNODE_REF,a.search="";var r;a.$watch("search",function(e){r=new RegExp("\\b"+t(e),"i")}),a.filterBySearch=function(e){return a.search?r.test(e):!1},a.runName=function(e){var l=e;a.search=l},s(),i(),$("#btn-reset-mergepaths").click(function(){a.resetMergePaths()}),$("#btn-run-mergepaths").click(function(){var e=document.getElementById("textinfo-mergepathids").value;try{var l=parseInt(e);if(isNaN(l))for(var t=e.toLowerCase(),s=0;s<MERGEPATH_INITNODE_REF.length;s++){var i=MERGEPATH_INITNODE_REF[s];if(i==t){e=s;break}}}catch(r){return void console.log(r)}a.cleanMergePaths(),SELECTED_MERGEPATHID=e,a.mergePathIds.value=MERGEPATH_INITNODE_REF[e],a.$apply(),a.resetMergePaths()})}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJyb3V0ZXMuanMiLCJDb250cm9sbGVycy9jbHVzdGVyLmN0cmwuanMiLCJDb250cm9sbGVycy9pbnRyby5jdHJsLmpzIiwiQ29udHJvbGxlcnMvbWVyZ2VwYXRoLmN0cmwuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkcm9vdFNjb3BlIiwiJHNjb3BlIiwiJHdpbmRvdyIsImNsZWFyQWxsQ2x1c3RlcnMiLCJFZGdlTWFuYWdlckNsdXN0ZXIiLCJoaWRlQWxsIiwiTm9kZU1hbmFnZXJDbHVzdGVyIiwidmlld0FsbENsdXN0ZXJzIiwic2hvd0FsbCIsInNldERhdGFHdWlJbml0aWFsaXplIiwicmVuZGVyT3B0aW9uc1VJIiwidGhpcyIsIkFkZGl0aXZlQ29sb3IiLCJSZXN0YXJ0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJIaWRlTm9kZXMiLCJIaWRlTmFtZXMiLCJEYXRhIiwiUkVOREVST1BUSU9OUyIsImd1aSIsImRhdCIsIkdVSSIsIkRhdGFUeXBlIiwiYWRkIiwiQ2x1c3RlcnNHcnAiLCJhZGRGb2xkZXIiLCJDbHVzdGVySGlkZU5vZGVzIiwiQ2x1c3RlckhpZGVOYW1lcyIsIk1lcmdlUGF0aEdycCIsIk1lcmdlUGF0aEhpZGVOb2RlcyIsIk1lcmdlUGF0aEhpZGVOYW1lcyIsIm9uRmluaXNoQ2hhbmdlIiwidmFsIiwiZGF0YU1hbmFnZXIiLCJzdGFydCIsImNsdXN0ZXJpZHMiLCJ2YWx1ZSIsImRpc3BsYXlOYW1lIiwiUEFHRV9OVU0iLCJyZXNldENsdXN0ZXJzIiwicmVzZXRNZXJnZVBhdGhzIiwibWVyZ2VQYXRoSWRzIiwiJGFwcGx5IiwidG9nZ2xlTm9kZVZpc2liaWxpdHlCeUNsdXN0ZXIiLCJ0b2dnbGVOb2RlVGV4dFZpc2liaWxpdHlCeUNsdXN0ZXIiLCJOb2RlTWFuYWdlck1lcmdlUGF0aHMiLCJTRUxFQ1RFRF9NRVJHRVBBVEhJRCIsInRvZ2dsZU5vZGVWaXNpYmlsaXR5IiwidG9nZ2xlTm9kZVRleHRWaXNpYmlsaXR5IiwibWVhbkFnZSIsImdldE1lbnVTaG93Iiwic2hvd19tZW51IiwiJCIsIndpbmRvdyIsInJlc2l6ZSIsInJlc2l6ZVRPIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInRyaWdnZXIiLCJiaW5kIiwiY2xlYW5NZXJnZVBhdGhzIiwiY2xlYW4iLCJGUkFNRSIsIlRXRUVOIiwicmVtb3ZlQWxsIiwicmVzZXQiLCJFZGdlTWFuYWdlck1lcmdlUGF0aHMiLCJzZXRDbHVzdGVySUQiLCJTRUxFQ1RFRF9DTFVTVEVSIiwidXBkYXRlTWVhbkFnZSIsImNsdXN0ZXJpZCIsIk5PVF9DTFVTVEVSX0lEIiwidG9nZ2xlU2hvd0J5Q2x1c3RlciIsIkFMTF9DTFVTVEVSX0lEIiwibmV3TWVhbkFnZSIsIm1hcFJhbmdlIiwiTWF0aCIsImNlaWwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjb25maWciLCIkcm91dGVQcm92aWRlciIsIndoZW4iLCJ0ZW1wbGF0ZVVybCIsIm90aGVyd2lzZSIsInJlZGlyZWN0VG8iLCJzZXRQYWdlTnVtIiwiYkNhbnZhc0xvYWRlZCIsImNzcyIsInNldFZpc2liaWxpdHkiLCJhZGRDbGFzcyIsInNlbGVjdGVkaWQiLCJjbGljayIsImNoYW5nZSIsInJlbW92ZUNsYXNzIiwiZXNjYXBlUmVnRXhwIiwic3RyaW5nIiwicmVwbGFjZSIsImRpc2Vhc2VzIiwiTUVSR0VQQVRIX0lOSVROT0RFX1JFRiIsInNlYXJjaCIsInJlZ2V4IiwiJHdhdGNoIiwiUmVnRXhwIiwiZmlsdGVyQnlTZWFyY2giLCJuYW1lIiwidGVzdCIsInJ1bk5hbWUiLCJkaXNlYXNlIiwiaW5wdXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibWVyZ2VQYXRoSWQiLCJwYXJzZUludCIsImlzTmFOIiwibG93ZXJDYXNlZERpc2Vhc2VOYW1lIiwidG9Mb3dlckNhc2UiLCJpIiwibGVuZ3RoIiwiZXJyIiwiY29uc29sZSIsImxvZyJd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QUlBdEgsRUFBQTRELGtCQUVBZCxxQkFBQThELEVBSUE1RyxFQUFBeUMsYUFBQUwsTUFBQThELHVCQUFBVSxHQUNBNUcsRUFBQTBDLFNBRUExQyxFQUFBd0MiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuXHQnbmdSb3V0ZScsXG5dKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ0FwcGxpY2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHdpbmRvdyl7XG5cblx0JHNjb3BlLm1lYW5BZ2UgPSB7IHZhbHVlIDogMCB9O1xuXHQkc2NvcGUubWVyZ2VQYXRoSWRzID0geyB2YWx1ZSA6IFwiYWN1dGUgbXlvY2FyZGlhbCBpbmZhcmN0aW9uXCJ9O1xuXG5cdCRzY29wZS5nZXRNZW51U2hvdyA9IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuICRzY29wZS5zaG93X21lbnU7XG5cdH1cblxuXHQvLyBhcyByZXNpemUsIHJlLWluaXQgZGF0YXNcblx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLnJlc2l6ZVRPKSBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUTyk7XG5cdCAgICB0aGlzLnJlc2l6ZVRPID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ3Jlc2l6ZUVuZCcpO1xuXHQgICAgfSwgMjAwKTtcblx0fSk7XG5cblx0JCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZUVuZCcsIGZ1bmN0aW9uKCkge1xuXHQgICAgLy9kbyBzb21ldGhpbmcsIHdpbmRvdyBoYXNuJ3QgY2hhbmdlZCBzaXplIGluIDUwMG1zXG5cdCAgICBsb2NhdGlvbi5yZWxvYWQoKTtcblx0fSk7XG5cblx0JHNjb3BlLmNsdXN0ZXJpZHMgPSBbXG4gICAgICB7dmFsdWU6IDEsIGRpc3BsYXlOYW1lOiAnMSd9LFxuICAgICAge3ZhbHVlOiAyLCBkaXNwbGF5TmFtZTogJzInfSxcbiAgICAgIHt2YWx1ZTogMywgZGlzcGxheU5hbWU6ICczJ30sXG4gICAgICB7dmFsdWU6IDQsIGRpc3BsYXlOYW1lOiAnNCd9LFxuICAgICAge3ZhbHVlOiA1LCBkaXNwbGF5TmFtZTogJzUnfSxcbiAgICAgIHt2YWx1ZTogNiwgZGlzcGxheU5hbWU6ICc2J30sXG4gICAgICB7dmFsdWU6IDcsIGRpc3BsYXlOYW1lOiAnNyd9LFxuICAgICAge3ZhbHVlOiA4LCBkaXNwbGF5TmFtZTogJzgnfSxcbiAgICAgIHt2YWx1ZTogOSwgZGlzcGxheU5hbWU6ICc5J30sXG4gICAgICB7dmFsdWU6IDEwLCBkaXNwbGF5TmFtZTogJzEwJ30sXG4gICAgICB7dmFsdWU6IDExLCBkaXNwbGF5TmFtZTogJzExJ30sXG4gICAgICB7dmFsdWU6IDEyLCBkaXNwbGF5TmFtZTogJzEyJ30sXG4gICAgICB7dmFsdWU6IDEzLCBkaXNwbGF5TmFtZTogJzEzJ30sXG4gICAgICB7dmFsdWU6IDE0LCBkaXNwbGF5TmFtZTogJzE0J30sXG4gICAgICB7dmFsdWU6IDE1LCBkaXNwbGF5TmFtZTogJzE1J30sXG4gICAgICB7dmFsdWU6IDE2LCBkaXNwbGF5TmFtZTogJzE2J30sXG4gICAgICB7dmFsdWU6IDE3LCBkaXNwbGF5TmFtZTogJ05vdCBDbHVzdGVyZWQnfSxcbiAgICAgIHt2YWx1ZTogMTgsIGRpc3BsYXlOYW1lOiAnQWxsJ31cbiAgXHRdO1xuXG5cdCRzY29wZS5jbGVhbk1lcmdlUGF0aHMgPSBmdW5jdGlvbigpe1xuXG5cdFx0Tm9kZU1hbmFnZXJNZXJnZVBhdGhzW1NFTEVDVEVEX01FUkdFUEFUSElEXS5jbGVhbigpO1xuXG5cdH1cblxuXHQkc2NvcGUucmVzZXRNZXJnZVBhdGhzID0gZnVuY3Rpb24oKXtcblx0XHRGUkFNRS52YWx1ZSAgICA9IDA7XG5cdFx0UEFHRV9OVU0udmFsdWUgPSAyO1xuXG5cdFx0VFdFRU4ucmVtb3ZlQWxsKCk7IC8vIHJlc2V0IHR3ZWVuIGFuaW1hdGlvbnNcblxuXHRcdE5vZGVNYW5hZ2VyTWVyZ2VQYXRoc1tTRUxFQ1RFRF9NRVJHRVBBVEhJRF0ucmVzZXQoKTtcblx0XHRFZGdlTWFuYWdlck1lcmdlUGF0aHNbU0VMRUNURURfTUVSR0VQQVRISURdLnJlc2V0KCk7XG5cblx0fVxuXG5cdCRzY29wZS5yZXNldENsdXN0ZXJzID0gZnVuY3Rpb24oKXtcblxuICAgICAgXHRGUkFNRS52YWx1ZSAgICA9IDA7XG4gICAgICBcdFBBR0VfTlVNLnZhbHVlID0gMTtcblxuICAgICAgXHQkc2NvcGUubWVhbkFnZS52YWx1ZSA9IDA7XG5cbiAgICAgIFx0VFdFRU4ucmVtb3ZlQWxsKCk7IC8vIHJlc2V0IHR3ZWVuIGFuaW1hdGlvbnNcblxuICAgICAgXHRFZGdlTWFuYWdlckNsdXN0ZXIucmVzZXQoKTtcbiAgICAgIFx0Tm9kZU1hbmFnZXJDbHVzdGVyLnJlc2V0KCk7XG5cbiAgICAgIFx0JHNjb3BlLnNldENsdXN0ZXJJRChTRUxFQ1RFRF9DTFVTVEVSKTtcblxuICAgICAgXHQkc2NvcGUudXBkYXRlTWVhbkFnZSgpO1xuXHRcblx0fVxuXG5cdCRzY29wZS5zZXRDbHVzdGVySUQgPSBmdW5jdGlvbihjbHVzdGVyaWQpe1xuXG5cdCAgICBTRUxFQ1RFRF9DTFVTVEVSID0gY2x1c3RlcmlkO1xuXG5cdCAgICBpZiAoY2x1c3RlcmlkID09IE5PVF9DTFVTVEVSX0lEKXtcblxuXHQgICAgICAgIFNFTEVDVEVEX0NMVVNURVIgPSBOT1RfQ0xVU1RFUl9JRDtcblx0ICAgICAgICBcblx0ICAgICAgICBjbGVhckFsbENsdXN0ZXJzKCk7XG5cdCAgICAgICAgRWRnZU1hbmFnZXJDbHVzdGVyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoTk9UX0NMVVNURVJfSUQpO1xuXHQgICAgICAgIE5vZGVNYW5hZ2VyQ2x1c3Rlci50b2dnbGVTaG93QnlDbHVzdGVyKE5PVF9DTFVTVEVSX0lEKTtcblxuXHQgICAgICAgIHJldHVybjtcblxuXHQgICAgfVxuXG5cdCAgICBpZiAoY2x1c3RlcmlkID09IEFMTF9DTFVTVEVSX0lEKXtcblxuXHQgICAgXHRTRUxFQ1RFRF9DTFVTVEVSID0gQUxMX0NMVVNURVJfSUQ7XG5cblx0ICAgIFx0Y2xlYXJBbGxDbHVzdGVycygpO1xuXHQgICAgICAgIHZpZXdBbGxDbHVzdGVycygpOyBcblxuXHQgICAgICAgIHJldHVybjsgXG5cblx0ICAgIH1cblxuXHQgICAgY2xlYXJBbGxDbHVzdGVycygpO1xuXHQgICAgRWRnZU1hbmFnZXJDbHVzdGVyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoU0VMRUNURURfQ0xVU1RFUik7XG5cdCAgICBOb2RlTWFuYWdlckNsdXN0ZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcihTRUxFQ1RFRF9DTFVTVEVSKTtcblx0fVxuXG5cdC8vIGNsZWFyIGFsbCBjbHVzdGVyc1xuICBcdGZ1bmN0aW9uIGNsZWFyQWxsQ2x1c3RlcnMoKXsgLy8g7KeA6riIIOydtOqyjCBnbG9iYWzroZwg7KCV7J2Y65CcIOqyg+yduOuNsCwg7JWE66eI64+EIO2BtOuhnOylrOyWtCDslYjsl5Ag64Sj7Ja07IScLCDsnbQg7YyM7J28IOyViOyXkOyEnOunjCDqsIDriqXtlZwgbG9jYWwgc3BhY2XroZwg7Jiu6rKo7JW8IO2VoOuTr+yLtuuLpC5cblxuICAgICAgXHRFZGdlTWFuYWdlckNsdXN0ZXIuaGlkZUFsbCgpO1xuICAgICAgXHROb2RlTWFuYWdlckNsdXN0ZXIuaGlkZUFsbCgpO1xuXG5cdH1cblxuXHQvLyBjbGVhciBhbGwgY2x1c3RlcnNcblx0ZnVuY3Rpb24gdmlld0FsbENsdXN0ZXJzKCl7XG5cblx0ICAgIEVkZ2VNYW5hZ2VyQ2x1c3Rlci5zaG93QWxsKCk7XG5cdCAgICBOb2RlTWFuYWdlckNsdXN0ZXIuc2hvd0FsbCgpO1xuXG5cdH1cblxuXHQkc2NvcGUudXBkYXRlTWVhbkFnZSA9IGZ1bmN0aW9uKCl7XG5cdCAgICBpZiAoRlJBTUUudmFsdWUgPiA2MjAgfHwgUEFHRV9OVU0udmFsdWUgIT0gMSlcblx0ICAgICAgcmV0dXJuO1xuXG5cdCAgICB2YXIgbmV3TWVhbkFnZSA9IG1hcFJhbmdlKFswLCA2MjAuMF0sIFszNS40LCA5MC41XSwgRlJBTUUudmFsdWUpO1xuXHQgICAgJHNjb3BlLm1lYW5BZ2UudmFsdWUgPSBNYXRoLmNlaWwobmV3TWVhbkFnZSk7XG5cdCAgICAkc2NvcGUuJGFwcGx5KCk7XG5cdCAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoJHNjb3BlLnVwZGF0ZU1lYW5BZ2UpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0RGF0YUd1aUluaXRpYWxpemUoKXtcblxuXHQgICAgdmFyIHJlbmRlck9wdGlvbnNVSSA9IGZ1bmN0aW9uKCkge1xuXG5cdCAgICAgIHRoaXMuQWRkaXRpdmVDb2xvciA9IHRydWU7XG5cblx0ICAgICAgdGhpcy5SZXN0YXJ0ID0gZnVuY3Rpb24oKSB7IFxuXG5cdCAgICAgIFx0IC8vIHJlc3RhcnQgdGhlIHBhZ2Vcblx0ICAgICAgXHQgbG9jYXRpb24ucmVsb2FkKCk7XG5cblx0ICAgICAgfTtcblxuXHQgICAgICB0aGlzLkhpZGVOb2RlcyA9IGZhbHNlO1xuXG5cdCAgICAgIHRoaXMuSGlkZU5hbWVzID0gZmFsc2U7XG5cblx0ICAgICAgdGhpcy5EYXRhICAgICAgPSAnVVMnO1xuXHQgICAgfTtcblxuXHQgICAgUkVOREVST1BUSU9OUyBcdD0gbmV3IHJlbmRlck9wdGlvbnNVSSgpO1xuXHQgICAgdmFyIGd1aSAgXHRcdD0gbmV3IGRhdC5HVUkoKTtcblxuXHQgICAgdmFyIERhdGFUeXBlICAgICAgICAgPSBndWkuYWRkKFJFTkRFUk9QVElPTlMsICdEYXRhJywgWyAnVVMnLCAnS09SJyBdICk7XG5cblx0ICAgIHZhciBDbHVzdGVyc0dycCAgICAgID0gZ3VpLmFkZEZvbGRlcignQ2x1c3RlcnMnKTtcblx0XHR2YXIgQ2x1c3RlckhpZGVOb2RlcyAgID0gQ2x1c3RlcnNHcnAuYWRkKFJFTkRFUk9QVElPTlMsICdIaWRlTm9kZXMnKTtcblx0XHR2YXIgQ2x1c3RlckhpZGVOYW1lcyAgID0gQ2x1c3RlcnNHcnAuYWRkKFJFTkRFUk9QVElPTlMsICdIaWRlTmFtZXMnKTtcblxuXHRcdHZhciBNZXJnZVBhdGhHcnAgICAgICAgPSBndWkuYWRkRm9sZGVyKCdNZXJnZVBhdGhzJyk7XG5cdFx0dmFyIE1lcmdlUGF0aEhpZGVOb2RlcyA9IE1lcmdlUGF0aEdycC5hZGQoUkVOREVST1BUSU9OUywgJ0hpZGVOb2RlcycpO1xuXHRcdHZhciBNZXJnZVBhdGhIaWRlTmFtZXMgPSBNZXJnZVBhdGhHcnAuYWRkKFJFTkRFUk9QVElPTlMsICdIaWRlTmFtZXMnKTtcblxuXHRcdERhdGFUeXBlLm9uRmluaXNoQ2hhbmdlKGZ1bmN0aW9uKHZhbCkge1xuXHRcdFx0aWYgKHZhbCA9PSAnVVMnKXtcblxuXHRcdFx0XHRkYXRhTWFuYWdlci5zdGFydCgnVVMnKTtcblx0XHRcdFx0JHNjb3BlLmNsdXN0ZXJpZHMgPSBbXG5cdFx0XHQgICAgICB7dmFsdWU6IDEsIGRpc3BsYXlOYW1lOiAnMSd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAyLCBkaXNwbGF5TmFtZTogJzInfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogMywgZGlzcGxheU5hbWU6ICczJ30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDQsIGRpc3BsYXlOYW1lOiAnNCd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiA1LCBkaXNwbGF5TmFtZTogJzUnfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogNiwgZGlzcGxheU5hbWU6ICc2J30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDcsIGRpc3BsYXlOYW1lOiAnNyd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiA4LCBkaXNwbGF5TmFtZTogJzgnfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogOSwgZGlzcGxheU5hbWU6ICc5J30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDEwLCBkaXNwbGF5TmFtZTogJzEwJ30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDExLCBkaXNwbGF5TmFtZTogJzExJ30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDEyLCBkaXNwbGF5TmFtZTogJzEyJ30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDEzLCBkaXNwbGF5TmFtZTogJzEzJ30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDE0LCBkaXNwbGF5TmFtZTogJzE0J30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDE1LCBkaXNwbGF5TmFtZTogJzE1J30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDE2LCBkaXNwbGF5TmFtZTogJzE2J30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDE3LCBkaXNwbGF5TmFtZTogJ05vdCBDbHVzdGVyZWQnfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogMTgsIGRpc3BsYXlOYW1lOiAnQWxsJ31cblx0XHRcdCAgXHRdO1xuXHRcdFx0ICBcdGlmIChQQUdFX05VTS52YWx1ZSA9PSAxKSB7XG5cdFx0XHQgIFx0XHQkc2NvcGUucmVzZXRDbHVzdGVycygpO1xuXHRcdFx0ICBcdH1cblx0XHRcdCAgXHRlbHNlIGlmIChQQUdFX05VTS52YWx1ZSA9PSAyKXtcblx0XHRcdCAgXHRcdCRzY29wZS5yZXNldE1lcmdlUGF0aHMoKTtcblx0XHRcdCAgXHR9XG5cdFx0XHQgIFx0JHNjb3BlLm1lcmdlUGF0aElkcy52YWx1ZSAgPSBcImFjdXRlIG15b2NhcmRpYWwgaW5mYXJjdGlvblwiO1xuXHRcdFx0ICBcdCRzY29wZS4kYXBwbHkoKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHZhbCA9PSAnS09SJyl7XG5cdFx0XHRcdGRhdGFNYW5hZ2VyLnN0YXJ0KCdLT1InKTtcblx0XHRcdFx0JHNjb3BlLmNsdXN0ZXJpZHMgPSBbXG5cdFx0XHQgICAgICB7dmFsdWU6IDAsIGRpc3BsYXlOYW1lOiAnMCd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiAxLCBkaXNwbGF5TmFtZTogJzEnfSxcblx0XHRcdCAgICAgIHt2YWx1ZTogMiwgZGlzcGxheU5hbWU6ICcyJ30sXG5cdFx0XHQgICAgICB7dmFsdWU6IDMsIGRpc3BsYXlOYW1lOiAnTm90IENsdXN0ZXJlZCd9LFxuXHRcdFx0ICAgICAge3ZhbHVlOiA0LCBkaXNwbGF5TmFtZTogJ0FsbCd9XG5cdFx0XHQgIFx0XTtcblx0XHRcdCAgXHRpZiAoUEFHRV9OVU0udmFsdWUgPT0gMSl7XG5cdFx0XHQgIFx0XHQkc2NvcGUucmVzZXRDbHVzdGVycygpO1xuXHRcdFx0ICBcdH1cblx0XHRcdCAgXHRlbHNlIGlmIChQQUdFX05VTS52YWx1ZSA9PSAyKXtcblx0XHRcdCAgXHRcdCRzY29wZS5yZXNldE1lcmdlUGF0aHMoKTsgIFxuXHRcdFx0ICBcdH1cblx0XHRcdCAgXHQkc2NvcGUubWVyZ2VQYXRoSWRzLnZhbHVlICA9IFwiY2hyb25pYyB2aXJhbCBoZXBhdGl0aXNcIjtcblx0XHRcdCAgXHQkc2NvcGUuJGFwcGx5KCk7XG5cdFx0XHR9XG5cdFx0fSlcblxuXHQgICAgQ2x1c3RlckhpZGVOb2Rlcy5vbkZpbmlzaENoYW5nZShmdW5jdGlvbih2YWwpIHtcblx0ICAgIFx0aWYgKHZhbCA9PSB0cnVlKSB7XG5cdFx0ICAgICAgICBOb2RlTWFuYWdlckNsdXN0ZXIudG9nZ2xlTm9kZVZpc2liaWxpdHlCeUNsdXN0ZXIoZmFsc2UpO1xuXHQgICAgXHR9XG5cdCAgICBcdGVsc2Uge1xuXHRcdCAgICAgICAgTm9kZU1hbmFnZXJDbHVzdGVyLnRvZ2dsZU5vZGVWaXNpYmlsaXR5QnlDbHVzdGVyKHRydWUpO1xuXHQgICAgXHR9XG5cdCAgICB9KTtcblxuXHQgICAgQ2x1c3RlckhpZGVOYW1lcy5vbkZpbmlzaENoYW5nZShmdW5jdGlvbih2YWwpIHtcblx0ICAgIFx0aWYgKHZhbCA9PSB0cnVlKSB7XG5cdFx0ICAgICAgICBOb2RlTWFuYWdlckNsdXN0ZXIudG9nZ2xlTm9kZVRleHRWaXNpYmlsaXR5QnlDbHVzdGVyKGZhbHNlKTtcblx0ICAgIFx0fVxuXHQgICAgXHRlbHNlIHtcblx0XHQgICAgICAgIE5vZGVNYW5hZ2VyQ2x1c3Rlci50b2dnbGVOb2RlVGV4dFZpc2liaWxpdHlCeUNsdXN0ZXIodHJ1ZSk7XG5cdCAgICBcdH1cblx0ICAgIH0pO1xuXG5cdCAgIFx0TWVyZ2VQYXRoSGlkZU5vZGVzLm9uRmluaXNoQ2hhbmdlKGZ1bmN0aW9uKHZhbCkge1xuXHQgICAgXHRpZiAodmFsID09IHRydWUpIHtcblxuXHRcdCAgICAgICAgTm9kZU1hbmFnZXJNZXJnZVBhdGhzW1NFTEVDVEVEX01FUkdFUEFUSElEXS50b2dnbGVOb2RlVmlzaWJpbGl0eShmYWxzZSk7XG5cblx0ICAgIFx0fVxuXHQgICAgXHRlbHNlIHtcblxuXHRcdCAgICAgICAgTm9kZU1hbmFnZXJNZXJnZVBhdGhzW1NFTEVDVEVEX01FUkdFUEFUSElEXS50b2dnbGVOb2RlVmlzaWJpbGl0eSh0cnVlKTtcblxuXHRcdCAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgTWVyZ2VQYXRoSGlkZU5hbWVzLm9uRmluaXNoQ2hhbmdlKGZ1bmN0aW9uKHZhbCkge1xuXHQgICAgXHRpZiAodmFsID09IHRydWUpIHtcblxuXHRcdCAgICAgICAgTm9kZU1hbmFnZXJNZXJnZVBhdGhzW1NFTEVDVEVEX01FUkdFUEFUSElEXS50b2dnbGVOb2RlVGV4dFZpc2liaWxpdHkoZmFsc2UpO1xuXG5cdCAgICBcdH1cblx0ICAgIFx0ZWxzZSB7XG5cblx0XHQgICAgICAgIE5vZGVNYW5hZ2VyTWVyZ2VQYXRoc1tTRUxFQ1RFRF9NRVJHRVBBVEhJRF0udG9nZ2xlTm9kZVRleHRWaXNpYmlsaXR5KHRydWUpO1xuXG5cdCAgICBcdH1cblx0ICAgIH0pO1xuXG5cdCAgICBndWkuYWRkKFJFTkRFUk9QVElPTlMsICdSZXN0YXJ0Jyk7XG5cblx0ICAgIC8vJChndWkuZG9tRWxlbWVudCkuZmluZChcIj51bFwiKS50b2dnbGVDbGFzcyhcImNsb3NlZFwiKTsgLy8gZGF0Lmd1aSBkZWZhdWx0IHRvIGJlIGNsb3NlZFxuXG5cdH1cbiAgXHRzZXREYXRhR3VpSW5pdGlhbGl6ZSgpO1xufSk7IiwiXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKXtcblx0JHJvdXRlUHJvdmlkZXJcblx0LndoZW4oJy9tZXJnZXBhdGhzJywgXG5cdFx0e1xuXHRcdFx0dGVtcGxhdGVVcmw6ICcvdGVtcGxhdGVzL21lcmdlcGF0aHMuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnTWVyZ2VQYXRoQ3RybCdcblx0XHR9KVxuXHQud2hlbignL2NsdXN0ZXJzJywgXG5cdFx0e1xuXHRcdFx0dGVtcGxhdGVVcmw6ICcvdGVtcGxhdGVzL2NsdXN0ZXJzLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0NsdXN0ZXJDdHJsJ1xuXHRcdH0pXG5cdC53aGVuKCcvaW50cm8nLCBcblx0XHR7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvaW50cm8uaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnSW50cm9DdHJsJ1xuXHRcdH0pXG5cdC5vdGhlcndpc2UoXG5cdFx0e1xuICAgXHRcdFx0cmVkaXJlY3RUbzogJy9pbnRybydcblx0XHR9KTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdDbHVzdGVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHdpbmRvdyl7XG5cbiAgZnVuY3Rpb24gc2V0UGFnZU51bSgpe1xuICAgIFBBR0VfTlVNLnZhbHVlID0gMTsgLy8gMSAtIGNsdXN0ZXJcblxuICAgIGlmIChiQ2FudmFzTG9hZGVkKVxuICAgICAgJCgnI29wdGlvbnMtY2x1c3RlcnMnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICB9XG4gIHNldFBhZ2VOdW0oKTtcblxuICAkc2NvcGUuc2VsZWN0ZWRpZCA9IHsgdmFsdWUgOiBTRUxFQ1RFRF9DTFVTVEVSIH07XG5cblxuICBmdW5jdGlvbiBzZXRWaXNpYmlsaXR5KCl7XG4gICAgJCgnLmRhdGEtdmlzaWJpbGl0eScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgfVxuICBzZXRWaXNpYmlsaXR5KCk7XG5cbiAgLy8gcmVzZXQgYW5pbWF0aW9uLlxuICAkKCcjYnRuLXJlc2V0LWNsdXN0ZXJzJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cbiAgICAkc2NvcGUucmVzZXRDbHVzdGVycygpO1xuXG4gIH0pO1xuXG4gICRzY29wZS51cGRhdGVNZWFuQWdlKCk7XG5cbiAgJCgnI2NsdXN0ZXJpZCcpLmNoYW5nZShmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNsdXN0ZXJpZCA9ICQoJyNjbHVzdGVyaWQnKS52YWwoKTtcblxuICAgIFNFTEVDVEVEX0NMVVNURVIgPSBjbHVzdGVyaWQ7XG5cbiAgICAkc2NvcGUuc2V0Q2x1c3RlcklEKGNsdXN0ZXJpZCk7XG5cbiAgfSlcblxuXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdJbnRyb0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICR3aW5kb3cpe1xuXG5cdGZ1bmN0aW9uIHNldFBhZ2VOdW0oKXtcbiAgICBcdFBBR0VfTlVNLnZhbHVlID0gMDtcbiAgXHR9XG4gIFx0c2V0UGFnZU51bSgpO1xuXG5cdGZ1bmN0aW9uIHNldFZpc2liaWxpdHkoKXtcblx0XHQkKCcuZGF0YS12aXNpYmlsaXR5JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHR9XG5cdHNldFZpc2liaWxpdHkoKTtcblxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignTWVyZ2VQYXRoQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHdpbmRvdyl7XG5cbiAgLyogU0VBUkNIIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZyl7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8XFxbXFxdXFwvXFxcXF0pL2csIFwiXFxcXCQxXCIpO1xuICB9XG5cbiAgLy9jb25zb2xlLmxvZyhNRVJHRVBBVEhfSU5JVE5PREVfUkVGKTtcbiAgJHNjb3BlLmRpc2Vhc2VzID0gTUVSR0VQQVRIX0lOSVROT0RFX1JFRjtcblxuICAkc2NvcGUuc2VhcmNoID0gJyc7XG4gIFxuICB2YXIgcmVnZXg7XG5cbiAgJHNjb3BlLiR3YXRjaCgnc2VhcmNoJywgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmVnZXggPSBuZXcgUmVnRXhwKCdcXFxcYicgKyBlc2NhcGVSZWdFeHAodmFsdWUpLCAnaScpO1xuICB9KTtcbiAgICBcbiAgJHNjb3BlLmZpbHRlckJ5U2VhcmNoID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKCEkc2NvcGUuc2VhcmNoKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gcmVnZXgudGVzdChuYW1lKTtcbiAgfTtcblxuICAkc2NvcGUucnVuTmFtZSA9IGZ1bmN0aW9uKGRpc2Vhc2Upe1xuICAgIC8vY29uc29sZS5sb2coJ2luIGRpc2Vhc2U6JywgZGlzZWFzZSk7XG4gICAgdmFyIG5hbWUgPSBkaXNlYXNlO1xuICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0aW5mby1tZXJnZXBhdGhpZHNcIikudmFsdWUgPSBuYW1lO1xuICAgICRzY29wZS5zZWFyY2ggPSBuYW1lO1xuICB9XG5cbiAgLyogRU5EIE9GIFNFQVJDSCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIGZ1bmN0aW9uIHNldFBhZ2VOdW0oKXtcblxuICAgIFBBR0VfTlVNLnZhbHVlID0gMjtcbiAgICBpZiAoYkNhbnZhc0xvYWRlZClcbiAgICAgICQoJyNvcHRpb25zLW1lcmdlcGF0aHMnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXG4gIH1cbiAgc2V0UGFnZU51bSgpO1xuXG4gIGZ1bmN0aW9uIHNldFZpc2liaWxpdHkoKXtcblxuICAgICQoJy5kYXRhLXZpc2liaWxpdHknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgfVxuICBzZXRWaXNpYmlsaXR5KCk7XG5cbiAgLy8gcmVzZXQgYW5pbWF0aW9uLlxuICAkKCcjYnRuLXJlc2V0LW1lcmdlcGF0aHMnKS5jbGljayhmdW5jdGlvbigpIHtcblxuICAgICRzY29wZS5yZXNldE1lcmdlUGF0aHMoKTsgXG5cbiAgfSk7XG5cbiAgJCgnI2J0bi1ydW4tbWVyZ2VwYXRocycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0aW5mby1tZXJnZXBhdGhpZHNcIikudmFsdWU7XG5cbiAgICAvLyBkZWFsIHdpdGggaW5wdXQgdG8gZmluZCBtZXJnZXBhdGghXG4gICAgdHJ5IHtcblxuICAgICAgdmFyIG1lcmdlUGF0aElkID0gcGFyc2VJbnQoaW5wdXQpO1xuICAgICAgaWYgKGlzTmFOKG1lcmdlUGF0aElkKSl7XG5cbiAgICAgICAgdmFyIGxvd2VyQ2FzZWREaXNlYXNlTmFtZSA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBNRVJHRVBBVEhfSU5JVE5PREVfUkVGLmxlbmd0aDsgaSsrKXtcblxuICAgICAgICAgIHZhciBuYW1lID0gTUVSR0VQQVRIX0lOSVROT0RFX1JFRltpXTtcblxuICAgICAgICAgIGlmIChuYW1lID09IGxvd2VyQ2FzZWREaXNlYXNlTmFtZSl7XG5cbiAgICAgICAgICAgIGlucHV0ID0gaTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NlbGVjdGVkIGRpc2Vhc2UgZm9yJywgbG93ZXJDYXNlZERpc2Vhc2VOYW1lLCAnIGlzIGlkOicsIGkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICB9IFxuXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgJHNjb3BlLmNsZWFuTWVyZ2VQYXRocygpO1xuXG4gICAgU0VMRUNURURfTUVSR0VQQVRISUQgPSBpbnB1dDtcbiAgICBcbiAgICAvL2NvbnNvbGUubG9nKGlucHV0KTtcblxuICAgICRzY29wZS5tZXJnZVBhdGhJZHMudmFsdWUgPSBNRVJHRVBBVEhfSU5JVE5PREVfUkVGW2lucHV0XTtcbiAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAkc2NvcGUucmVzZXRNZXJnZVBhdGhzKCk7XG5cbiAgfSlcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9