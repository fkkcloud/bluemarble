angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$rootScope","$scope","$window",function(e,c,o){}]),angular.module("app").controller("DataVizCtrl",["$rootScope","$scope","$window",function(e,c,o){function t(){$(".data-visibility").addClass("active")}t(),$("#checkbox_c_all").change(function(){var e=$(this).is(":checked");$("#checkbox_c0").prop("checked",e),$("#checkbox_c0").trigger("change"),$("#checkbox_c1").prop("checked",e),$("#checkbox_c1").trigger("change"),$("#checkbox_c2").prop("checked",e),$("#checkbox_c2").trigger("change"),$("#checkbox_c3").prop("checked",e),$("#checkbox_c3").trigger("change"),$("#checkbox_c4").prop("checked",e),$("#checkbox_c4").trigger("change"),$("#checkbox_c5").prop("checked",e),$("#checkbox_c5").trigger("change"),$("#checkbox_c6").prop("checked",e),$("#checkbox_c6").trigger("change"),$("#checkbox_c7").prop("checked",e),$("#checkbox_c7").trigger("change"),$("#checkbox_c8").prop("checked",e),$("#checkbox_c8").trigger("change"),$("#checkbox_c9").prop("checked",e),$("#checkbox_c9").trigger("change"),$("#checkbox_c10").prop("checked",e),$("#checkbox_c10").trigger("change"),$("#checkbox_c11").prop("checked",e),$("#checkbox_c11").trigger("change"),$("#checkbox_c12").prop("checked",e),$("#checkbox_c12").trigger("change"),$("#checkbox_c13").prop("checked",e),$("#checkbox_c13").trigger("change"),$("#checkbox_c14").prop("checked",e),$("#checkbox_c14").trigger("change"),$("#checkbox_c15").prop("checked",e),$("#checkbox_c15").trigger("change"),$("#checkbox_c16").prop("checked",e),$("#checkbox_c16").trigger("change"),$("#checkbox_c17").prop("checked",e),$("#checkbox_c17").trigger("change")}),$("#checkbox_c0").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(0,!0):trajetManager.toggleShowByCluster(0,!1)}),$("#checkbox_c1").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(1,!0):trajetManager.toggleShowByCluster(1,!1)}),$("#checkbox_c2").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(2,!0):trajetManager.toggleShowByCluster(2,!1)}),$("#checkbox_c3").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(3,!0):trajetManager.toggleShowByCluster(3,!1)}),$("#checkbox_c4").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(4,!0):trajetManager.toggleShowByCluster(4,!1)}),$("#checkbox_c5").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(5,!0):trajetManager.toggleShowByCluster(5,!1)}),$("#checkbox_c6").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(6,!0):trajetManager.toggleShowByCluster(6,!1)}),$("#checkbox_c7").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(7,!0):trajetManager.toggleShowByCluster(7,!1)}),$("#checkbox_c8").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(8,!0):trajetManager.toggleShowByCluster(8,!1)}),$("#checkbox_c9").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(9,!0):trajetManager.toggleShowByCluster(9,!1)}),$("#checkbox_c10").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(10,!0):trajetManager.toggleShowByCluster(10,!1)}),$("#checkbox_c11").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(11,!0):trajetManager.toggleShowByCluster(11,!1)}),$("#checkbox_c12").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(12,!0):trajetManager.toggleShowByCluster(12,!1)}),$("#checkbox_c13").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(13,!0):trajetManager.toggleShowByCluster(13,!1)}),$("#checkbox_c14").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(14,!0):trajetManager.toggleShowByCluster(14,!1)}),$("#checkbox_c15").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(15,!0):trajetManager.toggleShowByCluster(15,!1)}),$("#checkbox_c16").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(16,!0):trajetManager.toggleShowByCluster(16,!1)}),$("#checkbox_c17").change(function(){console.log("checkbox!"),$(this).is(":checked")?trajetManager.toggleShowByCluster(17,!0):trajetManager.toggleShowByCluster(17,!1)})}]),angular.module("app").controller("IntroCtrl",["$rootScope","$scope","$window",function(e,c,o){function t(){$(".data-visibility").removeClass("active")}t();var r=$(".slide"),a=$(".slide-group"),n=$(".bullet"),h=r.length-1,g=0,l=!1;n.first().addClass("current");var s=function(){var e=$(".slide-node").clone();$(".slide-node").html("Loading! If you see this message for a while, please refresh the page"),$(".slide-node").replaceWith(e);var c=$(".slide-lines").clone();$(".slide-lines").html("Loading! If you see this message for a while, please refresh the page"),$(".slide-lines").replaceWith(c)},i=function(){window.clearInterval(d),l=!1;var e=n.index($(this));k(e),s()},k=function(e){l?g===h?g=0:g++:g=e,n.removeClass("current"),n.eq(g).addClass("current"),u(g)},u=function(e){a.animate({top:"-"+e+"00%"}),s()};n.on("click",i);var d=window.setInterval(k,8e4)}]),angular.module("app").controller("NumberCtrl",["$rootScope","$scope","$window",function(e,c,o){function t(e){function c(e,c,o,t,r,a){function n(c){e.html(l(c,u))}function h(e,c){var o=".",t=e+"";if(t.length<c)for(var r=c-t.length,n=0;r>n;n++)t="0"+t;if(3==a){var h=(h=t.length)>3?h%3:0;return(h?t.substr(0,h)+o:"")+t.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+o)}if(4==a){var h=(h=t.length)>4?h%4:0;return(h?t.substr(0,h)+o:"")+t.substr(h).replace(/(\d{4})(?=\d)/g,"$1"+o)}var h=(h=t.length)>2?h%2:0;return(h?t.substr(0,h)+o:"")+t.substr(h).replace(/(\d{2})(?=\d)/g,"$1"+o)}function g(){o++;var e=o/s;e>=1?n(parseInt(c)):(n(parseInt(e*c)),setTimeout(g,k))}function l(e,c){for(var o=h(e,c),t=o.split(""),r=[],a=0;a<t.length;a++)r+="."==t[a]?"<span>.</span>":"<span>"+t[a]+"</span>";return r}var s=100,i=t,o=0,k=i/s,u=(c+"").length;e.html(l(0,u)),setTimeout(g,r)}var o=0,t=parseInt(e.attr("data-num")),r=parseInt(e.attr("time-duration")),a=parseInt(e.attr("time-delay")),n=parseInt(e.attr("format-info"));c(e,t,o,r,a,n)}$("[data-num]").each(function(){t($(this))})}]),angular.module("app").config(["$routeProvider",function(e){e.when("/dataviz",{templateUrl:"/templates/dataviz.html",controller:"DataVizCtrl"}).when("/intro",{templateUrl:"/templates/intro.html",controller:"IntroCtrl"}).otherwise({redirectTo:"/intro"})}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJkYXRhdml6LmN0cmwuanMiLCJpbnRyby5jdHJsLmpzIiwibnVtYmVyLmN0cmwuanMiLCJyb3V0ZXMuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkcm9vdFNjb3BlIiwiJHNjb3BlIiwiJHdpbmRvdyIsInNldFZpc2liaWxpdHkiLCIkIiwiYWRkQ2xhc3MiLCJjaGFuZ2UiLCJ0b2dnbGVWYWwiLCJ0aGlzIiwiaXMiLCJwcm9wIiwidHJpZ2dlciIsImNvbnNvbGUiLCJsb2ciLCJ0cmFqZXRNYW5hZ2VyIiwidG9nZ2xlU2hvd0J5Q2x1c3RlciIsInJlbW92ZUNsYXNzIiwiJHNsaWRlIiwiJHNsaWRlR3JvdXAiLCIkYnVsbGV0Iiwic2xpZGVzVG90YWwiLCJsZW5ndGgiLCJjdXJyZW50IiwiaXNBdXRvU2xpZGluZyIsImZpcnN0IiwicmVzZXRTbGlkZXMiLCJkaXZDbG9uZV9ub2RlIiwiY2xvbmUiLCJodG1sIiwicmVwbGFjZVdpdGgiLCJkaXZDbG9uZV9saW5lcyIsImNsaWNrU2xpZGUiLCJ3aW5kb3ciLCJjbGVhckludGVydmFsIiwiYXV0b1NsaWRlIiwic2xpZGVJbmRleCIsImluZGV4IiwidXBkYXRlSW5kZXgiLCJjdXJyZW50U2xpZGUiLCJlcSIsInRyYW5zaXRpb24iLCJzbGlkZVBvc2l0aW9uIiwiYW5pbWF0ZSIsInRvcCIsIm9uIiwic2V0SW50ZXJ2YWwiLCJzdGFydExvb3AiLCIkaXQiLCJpbml0X2luY3JlYXNlIiwibnVtIiwiY3VyIiwidGltZV9kdXJhdGlvbiIsInRpbWVfZGVsYXkiLCJmb3JtYXRfaW5mbyIsInNldFZhbHVlIiwidmFsIiwiZ2V0SHRtIiwibnVtbGVuIiwiZ2V0Rm9ybWF0ZWQiLCJuIiwibGVudG90YWwiLCJ0IiwiaSIsInkiLCJ6IiwiaiIsInN1YnN0ciIsInJlcGxhY2UiLCJsb29wIiwicGVyY2VudCIsInN0ZXBzIiwicGFyc2VJbnQiLCJzZXRUaW1lb3V0Iiwic3RlcHRpbWVvdXQiLCJ0YXJnZXRGb3JtYXRlZCIsImNoYXJzIiwic3BsaXQiLCJodG1zIiwidGltZXRvdGFsIiwiYXR0ciIsImVhY2giLCJjb25maWciLCIkcm91dGVQcm92aWRlciIsIndoZW4iLCJ0ZW1wbGF0ZVVybCIsIm90aGVyd2lzZSIsInJlZGlyZWN0VG8iXSwibWFwcGluZ3MiOiJBQUNBQSxRQUFBQyxPQUFBLE9BQ0EsWUNEQUQsUUFBQUMsT0FBQSxPQUNBQyxXQUFBLG1CQUFBLGFBQUEsU0FBQSxVQUFBLFNBQUFDLEVBQUFDLEVBQUFDLE9DREFMLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxlQUFBLGFBQUEsU0FBQSxVQUFBLFNBQUFDLEVBQUFDLEVBQUFDLEdBRUEsUUFBQUMsS0FDQUMsRUFBQSxvQkFBQUMsU0FBQSxVQUVBRixJQVdBQyxFQUFBLG1CQUFBRSxPQUFBLFdBQ0EsR0FBQUMsR0FBQUgsRUFBQUksTUFBQUMsR0FBQSxXQUNBTCxHQUFBLGdCQUFBTSxLQUFBLFVBQUFILEdBQ0FILEVBQUEsZ0JBQUFPLFFBQUEsVUFDQVAsRUFBQSxnQkFBQU0sS0FBQSxVQUFBSCxHQUNBSCxFQUFBLGdCQUFBTyxRQUFBLFVBQ0FQLEVBQUEsZ0JBQUFNLEtBQUEsVUFBQUgsR0FDQUgsRUFBQSxnQkFBQU8sUUFBQSxVQUNBUCxFQUFBLGdCQUFBTSxLQUFBLFVBQUFILEdBQ0FILEVBQUEsZ0JBQUFPLFFBQUEsVUFDQVAsRUFBQSxnQkFBQU0sS0FBQSxVQUFBSCxHQUNBSCxFQUFBLGdCQUFBTyxRQUFBLFVBQ0FQLEVBQUEsZ0JBQUFNLEtBQUEsVUFBQUgsR0FDQUgsRUFBQSxnQkFBQU8sUUFBQSxVQUNBUCxFQUFBLGdCQUFBTSxLQUFBLFVBQUFILEdBQ0FILEVBQUEsZ0JBQUFPLFFBQUEsVUFDQVAsRUFBQSxnQkFBQU0sS0FBQSxVQUFBSCxHQUNBSCxFQUFBLGdCQUFBTyxRQUFBLFVBQ0FQLEVBQUEsZ0JBQUFNLEtBQUEsVUFBQUgsR0FDQUgsRUFBQSxnQkFBQU8s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LFNBQUF4QixFQUFBZ0MsS0FBQSxrQkFDQTNCLEVBQUFtQixTQUFBeEIsRUFBQWdDLEtBQUEsZUFDQTFCLEVBQUFrQixTQUFBeEIsRUFBQWdDLEtBQUEsZUFFQS9CLEdBQUFELEVBQUFFLEVBQUFDLEVBQUFDLEVBQUFDLEVBQUFDLEdBWEFqRCxFQUFBLGNBQUE0RSxLQUFBLFdBQ0FsQyxFQUFBMUMsRUFBQUksWUNIQVgsUUFBQUMsT0FBQSxPQUNBbUYsUUFBQSxpQkFBQSxTQUFBQyxHQUNBQSxFQUNBQyxLQUFBLFlBRUFDLFlBQUEsMEJBQ0FyRixXQUFBLGdCQUVBb0YsS0FBQSxVQUVBQyxZQUFBLHdCQUNBckYsV0FBQSxjQUVBc0YsV0FFQUMsV0FBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG5cdCduZ1JvdXRlJyxcbl0pO1xuIiwiXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICR3aW5kb3cpe1xuXG59KTsiLCJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ0RhdGFWaXpDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkd2luZG93KXtcblxuXHRmdW5jdGlvbiBzZXRWaXNpYmlsaXR5KCl7XG5cdFx0JCgnLmRhdGEtdmlzaWJpbGl0eScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0fVxuXHRzZXRWaXNpYmlsaXR5KCk7XG5cbi8qXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5DTFVTVEVSXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4qL1xuXG4gICBcdC8vc2V0IGluaXRpYWwgc3RhdGUuXG4gICAgJCgnI2NoZWNrYm94X2NfYWxsJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgIFx0dmFyIHRvZ2dsZVZhbCA9ICQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKTtcblx0XHQkKCcjY2hlY2tib3hfYzAnKS5wcm9wKCdjaGVja2VkJywgdG9nZ2xlVmFsKTtcblx0XHQkKCcjY2hlY2tib3hfYzAnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHQkKCcjY2hlY2tib3hfYzEnKS5wcm9wKCdjaGVja2VkJywgdG9nZ2xlVmFsKTtcblx0XHQkKCcjY2hlY2tib3hfYzEnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHQkKCcjY2hlY2tib3hfYzInKS5wcm9wKCdjaGVja2VkJywgdG9nZ2xlVmFsKTtcblx0XHQkKCcjY2hlY2tib3hfYzInKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHQkKCcjY2hlY2tib3hfYzMnKS5wcm9wKCdjaGVja2VkJywgdG9nZ2xlVmFsKTsgXG5cdFx0JCgnI2NoZWNrYm94X2MzJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0JCgnI2NoZWNrYm94X2M0JykucHJvcCgnY2hlY2tlZCcsIHRvZ2dsZVZhbCk7XG5cdFx0JCgnI2NoZWNrYm94X2M0JykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0JCgnI2NoZWNrYm94X2M1JykucHJvcCgnY2hlY2tlZCcsIHRvZ2dsZVZhbCk7XG5cdFx0JCgnI2NoZWNrYm94X2M1JykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0JCgnI2NoZWNrYm94X2M2JykucHJvcCgnY2hlY2tlZCcsIHRvZ2dsZVZhbCk7XG5cdFx0JCgnI2NoZWNrYm94X2M2JykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0JCgnI2NoZWNrYm94X2M3JykucHJvcCgnY2hlY2tlZCcsIHRvZ2dsZVZhbCk7IFxuXHRcdCQoJyNjaGVja2JveF9jNycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdCQoJyNjaGVja2JveF9jOCcpLnByb3AoJ2NoZWNrZWQnLCB0b2dnbGVWYWwpO1xuXHRcdCQoJyNjaGVja2JveF9jOCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdCQoJyNjaGVja2JveF9jOScpLnByb3AoJ2NoZWNrZWQnLCB0b2dnbGVWYWwpO1xuXHRcdCQoJyNjaGVja2JveF9jOScpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdCQoJyNjaGVja2JveF9jMTAnKS5wcm9wKCdjaGVja2VkJywgdG9nZ2xlVmFsKTtcblx0XHQkKCcjY2hlY2tib3hfYzEwJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0JCgnI2NoZWNrYm94X2MxMScpLnByb3AoJ2NoZWNrZWQnLCB0b2dnbGVWYWwpOyBcblx0XHQkKCcjY2hlY2tib3hfYzExJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0JCgnI2NoZWNrYm94X2MxMicpLnByb3AoJ2NoZWNrZWQnLCB0b2dnbGVWYWwpO1xuXHRcdCQoJyNjaGVja2JveF9jMTInKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHQkKCcjY2hlY2tib3hfYzEzJykucHJvcCgnY2hlY2tlZCcsIHRvZ2dsZVZhbCk7XG5cdFx0JCgnI2NoZWNrYm94X2MxMycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdCQoJyNjaGVja2JveF9jMTQnKS5wcm9wKCdjaGVja2VkJywgdG9nZ2xlVmFsKTtcblx0XHQkKCcjY2hlY2tib3hfYzE0JykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0JCgnI2NoZWNrYm94X2MxNScpLnByb3AoJ2NoZWNrZWQnLCB0b2dnbGVWYWwpOyBcblx0XHQkKCcjY2hlY2tib3hfYzE1JykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0JCgnI2NoZWNrYm94X2MxNicpLnByb3AoJ2NoZWNrZWQnLCB0b2dnbGVWYWwpOyBcblx0XHQkKCcjY2hlY2tib3hfYzE2JykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0JCgnI2NoZWNrYm94X2MxNycpLnByb3AoJ2NoZWNrZWQnLCB0b2dnbGVWYWwpOyBcblx0XHQkKCcjY2hlY2tib3hfYzE3JykudHJpZ2dlcignY2hhbmdlJyk7ICAgIFx0XG4gICAgfSk7XG5cbiAgICAvL3NldCBpbml0aWFsIHN0YXRlLlxuICAgICQoJyNjaGVja2JveF9jMCcpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tib3ghXCIpO1xuICAgICAgICBpZigkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcbiAgICAgICAgICB0cmFqZXRNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMCwgdHJ1ZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICB0cmFqZXRNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMCwgZmFsc2UpO1xuICAgICAgICAgIC8vZXRhZ2VNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAgICAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgICAkKCcjY2hlY2tib3hfYzEnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNoZWNrYm94IVwiKTtcbiAgICAgICAgaWYoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDEsIHRydWUpO1xuICAgICAgICAgIC8vZXRhZ2VNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDEsIGZhbHNlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDEsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICAgICAvL3NldCBpbml0aWFsIHN0YXRlLlxuICAgICQoJyNjaGVja2JveF9jMicpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tib3ghXCIpO1xuICAgICAgICBpZigkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcbiAgICAgICAgICB0cmFqZXRNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMiwgdHJ1ZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICB0cmFqZXRNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMiwgZmFsc2UpO1xuICAgICAgICAgIC8vZXRhZ2VNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgICAgIC8vc2V0IGluaXRpYWwgc3RhdGUuXG4gICAgJCgnI2NoZWNrYm94X2MzJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCFcIik7XG4gICAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigzLCB0cnVlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDMsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigzLCBmYWxzZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigzLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAgICAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgICAkKCcjY2hlY2tib3hfYzQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNoZWNrYm94IVwiKTtcbiAgICAgICAgaWYoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDQsIHRydWUpO1xuICAgICAgICAgIC8vZXRhZ2VNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoNCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDQsIGZhbHNlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgICAgIC8vc2V0IGluaXRpYWwgc3RhdGUuXG4gICAgJCgnI2NoZWNrYm94X2M1JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCFcIik7XG4gICAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3Rlcig1LCB0cnVlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3Rlcig1LCBmYWxzZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3Rlcig1LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICAgICAgICAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgICAkKCcjY2hlY2tib3hfYzYnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNoZWNrYm94IVwiKTtcbiAgICAgICAgaWYoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDYsIHRydWUpO1xuICAgICAgICAgIC8vZXRhZ2VNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoNiwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDYsIGZhbHNlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDYsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgICAgICAgICAvL3NldCBpbml0aWFsIHN0YXRlLlxuICAgICQoJyNjaGVja2JveF9jNycpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tib3ghXCIpO1xuICAgICAgICBpZigkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcbiAgICAgICAgICB0cmFqZXRNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoNywgdHJ1ZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3Rlcig3LCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICB0cmFqZXRNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoNywgZmFsc2UpO1xuICAgICAgICAgIC8vZXRhZ2VNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoNywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAgICAgICAgIC8vc2V0IGluaXRpYWwgc3RhdGUuXG4gICAgJCgnI2NoZWNrYm94X2M4JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCFcIik7XG4gICAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3Rlcig4LCB0cnVlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDgsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3Rlcig4LCBmYWxzZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3Rlcig4LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICAgICAgICAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgICAkKCcjY2hlY2tib3hfYzknKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNoZWNrYm94IVwiKTtcbiAgICAgICAgaWYoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDksIHRydWUpO1xuICAgICAgICAgIC8vZXRhZ2VNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoOSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDksIGZhbHNlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgICAgICAgICAvL3NldCBpbml0aWFsIHN0YXRlLlxuICAgICQoJyNjaGVja2JveF9jMTAnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNoZWNrYm94IVwiKTtcbiAgICAgICAgaWYoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDEwLCB0cnVlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDEwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICB0cmFqZXRNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMTAsIGZhbHNlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDEwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICAgICAgICAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgICAkKCcjY2hlY2tib3hfYzExJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCFcIik7XG4gICAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxMSwgdHJ1ZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDExLCBmYWxzZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxMSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAgICAgICAgIC8vc2V0IGluaXRpYWwgc3RhdGUuXG4gICAgJCgnI2NoZWNrYm94X2MxMicpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tib3ghXCIpO1xuICAgICAgICBpZigkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcbiAgICAgICAgICB0cmFqZXRNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMTIsIHRydWUpO1xuICAgICAgICAgIC8vZXRhZ2VNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMTIsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxMiwgZmFsc2UpO1xuICAgICAgICAgIC8vZXRhZ2VNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMTIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgICAgICAgICAvL3NldCBpbml0aWFsIHN0YXRlLlxuICAgICQoJyNjaGVja2JveF9jMTMnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNoZWNrYm94IVwiKTtcbiAgICAgICAgaWYoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDEzLCB0cnVlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDEzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICB0cmFqZXRNYW5hZ2VyLnRvZ2dsZVNob3dCeUNsdXN0ZXIoMTMsIGZhbHNlKTtcbiAgICAgICAgICAvL2V0YWdlTWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDEzLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICAgICAgICAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgICAkKCcjY2hlY2tib3hfYzE0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCFcIik7XG4gICAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNCwgdHJ1ZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDE0LCBmYWxzZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgICAgICAgICAgICAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgICAkKCcjY2hlY2tib3hfYzE1JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCFcIik7XG4gICAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNSwgdHJ1ZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDE1LCBmYWxzZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgICAgICAgICAgICAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgICAkKCcjY2hlY2tib3hfYzE2JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCFcIik7XG4gICAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNiwgdHJ1ZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNiwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDE2LCBmYWxzZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgaW5pdGlhbCBzdGF0ZS5cbiAgICAkKCcjY2hlY2tib3hfYzE3JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja2JveCFcIik7XG4gICAgICAgIGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuICAgICAgICAgIHRyYWpldE1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNywgdHJ1ZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgdHJhamV0TWFuYWdlci50b2dnbGVTaG93QnlDbHVzdGVyKDE3LCBmYWxzZSk7XG4gICAgICAgICAgLy9ldGFnZU1hbmFnZXIudG9nZ2xlU2hvd0J5Q2x1c3RlcigxNywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pOyIsIlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignSW50cm9DdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkd2luZG93KXtcblx0ZnVuY3Rpb24gc2V0VmlzaWJpbGl0eSgpe1xuXHRcdCQoJy5kYXRhLXZpc2liaWxpdHknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdH1cblx0c2V0VmlzaWJpbGl0eSgpO1xuXG5cdHZhciAkc2xpZGUgPSAkKCcuc2xpZGUnKSxcbiAgICAkc2xpZGVHcm91cCA9ICQoJy5zbGlkZS1ncm91cCcpLFxuICAgICRidWxsZXQgPSAkKCcuYnVsbGV0Jyk7XG5cblx0dmFyIHNsaWRlc1RvdGFsID0gKCRzbGlkZS5sZW5ndGggLSAxKSxcblx0ICAgIGN1cnJlbnQgPSAwLFxuXHQgICAgaXNBdXRvU2xpZGluZyA9IGZhbHNlO1xuXG5cdCRidWxsZXQuZmlyc3QoKS5hZGRDbGFzcygnY3VycmVudCcpO1xuXG5cdC8qIHJlc2V0IHRoZSBkaXYgYW5kIGFuaW1hdGlvbiAqL1xuXHR2YXIgcmVzZXRTbGlkZXMgPSBmdW5jdGlvbigpIHtcblx0XHQvLyByZWxvYWQgbm9kZSBzbGlkZSBhbmQgYW5pbWF0aW9uXG5cdFx0dmFyIGRpdkNsb25lX25vZGUgPSAkKFwiLnNsaWRlLW5vZGVcIikuY2xvbmUoKTsgLy8gRG8gdGhpcyBvbiAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgLi4uIH0pXG5cdFx0JChcIi5zbGlkZS1ub2RlXCIpLmh0bWwoXCJMb2FkaW5nISBJZiB5b3Ugc2VlIHRoaXMgbWVzc2FnZSBmb3IgYSB3aGlsZSwgcGxlYXNlIHJlZnJlc2ggdGhlIHBhZ2VcIik7IC8vIENoYW5nZSB0aGUgY29udGVudCB0ZW1wb3JhcmlseVxuXG5cdFx0Ly8gQW55IGNoYW5nZXMgdG8gXCIjc29tZV9kaXZcIiBhZnRlciB0aGlzIHBvaW50IHdpbGwgYWZmZWN0IHRoZSB2YWx1ZSBvZiBkaXZDbG9uZVxuXHRcdCQoXCIuc2xpZGUtbm9kZVwiKS5yZXBsYWNlV2l0aChkaXZDbG9uZV9ub2RlKTsgLy8gUmVzdG9yZSBlbGVtZW50IHdpdGggZGl2Q2xvbmUgaXRzZWxmXG5cdFxuXHQgIFx0Ly8gcmVsb2FkIGxpbmVzIHNsaWRlIGFuZCBhbmltYXRpb25cblx0ICBcdHZhciBkaXZDbG9uZV9saW5lcyA9ICQoXCIuc2xpZGUtbGluZXNcIikuY2xvbmUoKTsgLy8gRG8gdGhpcyBvbiAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgLi4uIH0pXG5cblx0XHQkKFwiLnNsaWRlLWxpbmVzXCIpLmh0bWwoXCJMb2FkaW5nISBJZiB5b3Ugc2VlIHRoaXMgbWVzc2FnZSBmb3IgYSB3aGlsZSwgcGxlYXNlIHJlZnJlc2ggdGhlIHBhZ2VcIik7IC8vIENoYW5nZSB0aGUgY29udGVudCB0ZW1wb3JhcmlseVxuXG5cdFx0Ly8gQW55IGNoYW5nZXMgdG8gXCIjc29tZV9kaXZcIiBhZnRlciB0aGlzIHBvaW50IHdpbGwgYWZmZWN0IHRoZSB2YWx1ZSBvZiBkaXZDbG9uZVxuXHRcdCQoXCIuc2xpZGUtbGluZXNcIikucmVwbGFjZVdpdGgoZGl2Q2xvbmVfbGluZXMpOyAvLyBSZXN0b3JlIGVsZW1lbnQgd2l0aCBkaXZDbG9uZSBpdHNlbGZcblx0fVxuXG5cdHZhciBjbGlja1NsaWRlID0gZnVuY3Rpb24oKSB7XG5cdCAgLy9zdG9wIGF1dG8gc2xpZGluZ1xuXHQgIHdpbmRvdy5jbGVhckludGVydmFsKGF1dG9TbGlkZSk7XG5cdCAgaXNBdXRvU2xpZGluZyA9IGZhbHNlO1xuXG5cdCAgdmFyIHNsaWRlSW5kZXggPSAkYnVsbGV0LmluZGV4KCQodGhpcykpO1xuXG5cdCAgdXBkYXRlSW5kZXgoc2xpZGVJbmRleCk7XG5cblx0ICByZXNldFNsaWRlcygpO1xuXHR9O1xuXG5cdHZhciB1cGRhdGVJbmRleCA9IGZ1bmN0aW9uKGN1cnJlbnRTbGlkZSkge1xuXHQgIGlmKGlzQXV0b1NsaWRpbmcpIHtcblx0ICAgIGlmKGN1cnJlbnQgPT09IHNsaWRlc1RvdGFsKSB7XG5cdCAgICAgIGN1cnJlbnQgPSAwO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgY3VycmVudCsrO1xuXHQgICAgfVxuXHQgIH0gZWxzZSB7XG5cdCAgICAgIGN1cnJlbnQgPSBjdXJyZW50U2xpZGU7XG5cdCAgfVxuXG5cdCAgJGJ1bGxldC5yZW1vdmVDbGFzcygnY3VycmVudCcpO1xuXHQgICRidWxsZXQuZXEoY3VycmVudCkuYWRkQ2xhc3MoJ2N1cnJlbnQnKTtcblxuXHQgIHRyYW5zaXRpb24oY3VycmVudCk7XG5cdH07XG5cblx0dmFyIHRyYW5zaXRpb24gPSBmdW5jdGlvbihzbGlkZVBvc2l0aW9uKSB7XG5cdCAgICAkc2xpZGVHcm91cC5hbmltYXRlKHtcblx0ICAgICAgJ3RvcCc6ICctJyArIHNsaWRlUG9zaXRpb24gKyAnMDAlJ1xuXHQgICAgfSk7XG5cblx0ICAgIHJlc2V0U2xpZGVzKCk7XG5cdH07XG5cblx0JGJ1bGxldC5vbiggJ2NsaWNrJywgY2xpY2tTbGlkZSk7XG5cblx0dmFyIGF1dG9TbGlkZSA9IHdpbmRvdy5zZXRJbnRlcnZhbCh1cGRhdGVJbmRleCwgODAwMDApO1xuXG59KTsiLCJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ051bWJlckN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICR3aW5kb3cpe1xuICAgICQoJ1tkYXRhLW51bV0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgXHRzdGFydExvb3AoJCh0aGlzKSk7XG4gIFx0fSk7XG4gXG4gIFx0ZnVuY3Rpb24gc3RhcnRMb29wKCRpdCl7XG5cdCAgICB2YXIgY3VyICAgICAgICAgICA9IDA7XG5cdCAgICB2YXIgbnVtICAgICAgICAgICA9IHBhcnNlSW50KCRpdC5hdHRyKCdkYXRhLW51bScpKTtcblx0ICAgIHZhciB0aW1lX2R1cmF0aW9uID0gcGFyc2VJbnQoJGl0LmF0dHIoJ3RpbWUtZHVyYXRpb24nKSk7XG5cdCAgICB2YXIgdGltZV9kZWxheSAgICA9IHBhcnNlSW50KCRpdC5hdHRyKCd0aW1lLWRlbGF5JykpO1xuXHQgICAgdmFyIGZvcm1hdF9pbmZvICAgPSBwYXJzZUludCgkaXQuYXR0cignZm9ybWF0LWluZm8nKSk7XG5cblx0ICAgIGluaXRfaW5jcmVhc2UoJGl0LCBudW0sIGN1ciwgdGltZV9kdXJhdGlvbiwgdGltZV9kZWxheSwgZm9ybWF0X2luZm8pO1xuXG5cdCAgICBmdW5jdGlvbiBpbml0X2luY3JlYXNlKCRpdCwgbnVtLCBjdXIsIHRpbWVfZHVyYXRpb24sIHRpbWVfZGVsYXksIGZvcm1hdF9pbmZvKVxuXHQgICAge1xuXHQgICAgICAgIHZhciBzdGVwcyAgICAgICA9IDEwMDtcblx0ICAgICAgICB2YXIgdGltZXRvdGFsICAgPSB0aW1lX2R1cmF0aW9uO1xuXHQgICAgICAgIHZhciBjdXIgICAgICAgICA9IDA7XG5cdCAgICAgICAgdmFyIHN0ZXB0aW1lb3V0ID0gdGltZXRvdGFsL3N0ZXBzOyAgICAgIFxuXHQgICAgICAgIHZhciBudW1sZW4gICAgICA9IChudW0rJycpLmxlbmd0aDtcblxuXHQgICAgICAgICRpdC5odG1sKGdldEh0bSgwLG51bWxlbikpO1xuXHQgICAgICAgIHNldFRpbWVvdXQobG9vcCwgdGltZV9kZWxheSk7XG5cblx0ICAgICAgICBmdW5jdGlvbiBzZXRWYWx1ZSh2YWwpXG5cdCAgICAgICAge1xuXHQgICAgICAgIFx0JGl0Lmh0bWwoZ2V0SHRtKHZhbCxudW1sZW4pKTtcblx0ICAgICAgXHR9XG5cblx0ICAgICAgXHRmdW5jdGlvbiBnZXRGb3JtYXRlZChuLGxlbnRvdGFsKVxuXHQgICAgICBcdHtcblx0ICAgICAgICBcdHZhciB0ID0gIFwiLlwiO1xuXHQgICAgICAgIFx0dmFyIGkgPSBuICsgXCJcIjtcblx0ICAgICAgICBcdFxuXHQgICAgICAgIFx0aWYoaS5sZW5ndGg8bGVudG90YWwpXG5cdCAgICAgICAgXHR7XG5cdCAgICAgICAgICBcdFx0dmFyIHkgPSBsZW50b3RhbC1pLmxlbmd0aDtcblx0ICAgICAgICAgIFx0XHRmb3IodmFyIHo9MDt6PHk7eisrKVxuXHQgICAgICAgICAgXHRcdHtcblx0ICAgICAgICAgICAgXHRcdGkgPSAnMCcraTtcblx0ICAgICAgICAgIFx0XHR9XG5cdCAgICAgICAgXHR9ICAgICBcblx0ICAgICAgICBcdFxuXHQgICAgICAgIFx0aWYgKGZvcm1hdF9pbmZvID09IDMpe1xuXHQgICAgICAgIFx0XHR2YXIgaiA9IChqID0gaS5sZW5ndGgpID4gMyA/IGogJSAzIDogMDtcblx0ICAgICAgIFx0XHRcdHJldHVybiAoaiA/IGkuc3Vic3RyKDAsIGopICsgdCA6IFwiXCIpICsgaS5zdWJzdHIoaikucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csIFwiJDFcIiArIHQpO1xuXHQgICAgICAgIFx0fVxuXHQgICAgICAgIFx0aWYgKGZvcm1hdF9pbmZvID09IDQpe1xuXHQgICAgICAgIFx0XHR2YXIgaiA9IChqID0gaS5sZW5ndGgpID4gNCA/IGogJSA0IDogMDtcblx0ICAgICAgIFx0XHRcdHJldHVybiAoaiA/IGkuc3Vic3RyKDAsIGopICsgdCA6IFwiXCIpICsgaS5zdWJzdHIoaikucmVwbGFjZSgvKFxcZHs0fSkoPz1cXGQpL2csIFwiJDFcIiArIHQpO1xuXHQgICAgICAgIFx0fVxuXHQgICAgICAgIFx0ZWxzZSB7XG5cdCAgICAgICAgXHRcdHZhciBqID0gKGogPSBpLmxlbmd0aCkgPiAyID8gaiAlIDIgOiAwO1xuXHQgICAgICAgXHRcdFx0cmV0dXJuIChqID8gaS5zdWJzdHIoMCwgaikgKyB0IDogXCJcIikgKyBpLnN1YnN0cihqKS5yZXBsYWNlKC8oXFxkezJ9KSg/PVxcZCkvZywgXCIkMVwiICsgdCk7XG5cdCAgICAgICAgXHR9XG5cdCAgICAgICAgXHRcblx0ICAgICAgXHR9XG5cblx0ICAgICAgXHRmdW5jdGlvbiBsb29wKClcblx0ICAgICAgXHR7XG5cdFx0ICAgICAgICBjdXIrK1xuXHRcdCAgICAgICAgdmFyIHBlcmNlbnQgPSBjdXIvc3RlcHM7XG5cdFx0ICAgICAgICBpZiAocGVyY2VudD49MSlcblx0XHQgICAgICAgIHsgICAgICAgICAgXG5cdFx0ICAgICAgICBcdHNldFZhbHVlKHBhcnNlSW50KG51bSkpO1xuXHRcdCAgICAgICAgfSBcblx0XHQgICAgICAgIGVsc2UgXG5cdFx0ICAgICAgICB7XG5cdFx0ICAgICAgICAgIFx0c2V0VmFsdWUocGFyc2VJbnQocGVyY2VudCpudW0pKTtcblx0XHQgICAgICAgICAgXHRzZXRUaW1lb3V0KGxvb3Asc3RlcHRpbWVvdXQpOyAgICAgICAgICBcblx0ICAgICAgICBcdH1cblx0ICAgICAgXHR9XG5cblx0ICAgICAgXHRmdW5jdGlvbiBnZXRIdG0obnVtLGxlbnRvdGFsKXsgICAgICAgIFxuXHQgICAgICAgIFx0dmFyIHRhcmdldEZvcm1hdGVkID0gZ2V0Rm9ybWF0ZWQobnVtLGxlbnRvdGFsKTtcblx0ICAgICAgICBcdHZhciBjaGFycyA9IHRhcmdldEZvcm1hdGVkLnNwbGl0KCcnKTtcblx0ICAgICAgICBcdHZhciBodG1zID0gW107XG5cdCAgICAgICAgXHRmb3IgKHZhciBpPTA7aTxjaGFycy5sZW5ndGg7aSsrKVxuXHQgICAgICAgIFx0e1xuXHQgICAgICAgICAgXHRcdGlmIChjaGFyc1tpXSA9PSAnLicpXG5cdCAgICAgICAgICBcdFx0e1xuXHQgICAgICAgICAgICBcdFx0aHRtcys9JzxzcGFuPi48L3NwYW4+Jztcblx0ICAgICAgICAgIFx0XHR9IFxuXHQgICAgICAgICAgXHRcdGVsc2UgXG5cdCAgICAgICAgICBcdFx0eyAgICAgICAgICBcblx0ICAgICAgICAgICAgXHRcdGh0bXMrPSc8c3Bhbj4nK2NoYXJzW2ldKyc8L3NwYW4+Jztcblx0ICAgICAgICAgIFx0XHR9XG5cdCAgICAgICAgXHR9XG5cdCAgICAgICAgXHRyZXR1cm4gaHRtcztcblx0ICAgICAgXHR9XG5cdCAgICB9XG5cdH1cbn0pOyIsIlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcil7XG5cdCRyb3V0ZVByb3ZpZGVyXG5cdC53aGVuKCcvZGF0YXZpeicsIFxuXHRcdHtcblx0XHRcdHRlbXBsYXRlVXJsOiAnL3RlbXBsYXRlcy9kYXRhdml6Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0RhdGFWaXpDdHJsJ1xuXHRcdH0pXG5cdC53aGVuKCcvaW50cm8nLCBcblx0XHR7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvaW50cm8uaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnSW50cm9DdHJsJ1xuXHRcdH0pXG5cdC5vdGhlcndpc2UoXG5cdFx0e1xuICAgXHRcdFx0cmVkaXJlY3RUbzogJy9pbnRybydcblx0XHR9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9