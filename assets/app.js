angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$rootScope","$scope","$window",function(t,o,e){}]),angular.module("app").controller("DataVizCtrl",["$rootScope","$scope","$window",function(t,o,e){function r(){$(".data-visibility").addClass("active")}r()}]),angular.module("app").controller("IntroCtrl",["$rootScope","$scope","$window",function(t,o,e){function r(){$(".data-visibility").removeClass("active")}r();var n=$(".slide"),a=$(".slide-group"),l=$(".bullet"),i=n.length-1,c=0,u=!1;l.first().addClass("current");var d=function(){window.clearInterval(v),u=!1;var t=l.index($(this));p(t)},p=function(t){u?c===i?c=0:c++:c=t,l.removeClass("current"),l.eq(c).addClass("current"),s(c)},s=function(t){a.animate({top:"-"+t+"00%"})};l.on("click",d);var v=window.setInterval(p,6e3)}]),angular.module("app").config(["$routeProvider",function(t){t.when("/dataviz",{templateUrl:"/templates/dataviz.html",controller:"DataVizCtrl"}).when("/intro",{templateUrl:"/templates/intro.html",controller:"IntroCtrl"}).otherwise({redirectTo:"/intro"})}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJkYXRhdml6LmN0cmwuanMiLCJpbnRyby5jdHJsLmpzIiwicm91dGVzLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb250cm9sbGVyIiwiJHJvb3RTY29wZSIsIiRzY29wZSIsIiR3aW5kb3ciLCJzZXRWaXNpYmlsaXR5IiwiJCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCIkc2xpZGUiLCIkc2xpZGVHcm91cCIsIiRidWxsZXQiLCJzbGlkZXNUb3RhbCIsImxlbmd0aCIsImN1cnJlbnQiLCJpc0F1dG9TbGlkaW5nIiwiZmlyc3QiLCJjbGlja1NsaWRlIiwid2luZG93IiwiY2xlYXJJbnRlcnZhbCIsImF1dG9TbGlkZSIsInNsaWRlSW5kZXgiLCJpbmRleCIsInRoaXMiLCJ1cGRhdGVJbmRleCIsImN1cnJlbnRTbGlkZSIsImVxIiwidHJhbnNpdGlvbiIsInNsaWRlUG9zaXRpb24iLCJhbmltYXRlIiwidG9wIiwib24iLCJzZXRJbnRlcnZhbCIsImNvbmZpZyIsIiRyb3V0ZVByb3ZpZGVyIiwid2hlbiIsInRlbXBsYXRlVXJsIiwib3RoZXJ3aXNlIiwicmVkaXJlY3RUbyJdLCJtYXBwaW5ncyI6IkFBQ0FBLFFBQUFDLE9BQUEsT0FDQSxZQ0RBRCxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsbUJBQUEsYUFBQSxTQUFBLFVBQUEsU0FBQUMsRUFBQUMsRUFBQUMsT0NEQUwsUUFBQUMsT0FBQSxPQUNBQyxXQUFBLGVBQUEsYUFBQSxTQUFBLFVBQUEsU0FBQUMsRUFBQUMsRUFBQUMsR0FDQSxRQUFBQyxLQUNBQyxFQUFBLG9CQUFBQyxTQUFBLFVBRUFGLE9DTEFOLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxhQUFBLGFBQUEsU0FBQSxVQUFBLFNBQUFDLEVBQUFDLEVBQUFDLEdBQ0EsUUFBQUMsS0FDQUMsRUFBQSxvQkFBQUUsWUFBQSxVQUVBSCxHQUVBLElBQUFJLEdBQUFILEVBQUEsVUFDQUksRUFBQUosRUFBQSxnQkFDQUssRUFBQUwsRUFBQSxXQUVBTSxFQUFBSCxFQUFBSSxPQUFBLEVBQ0FDLEVBQUEsRUFDQUMsR0FBQSxDQUVBSixHQUFBSyxRQUFBVCxTQUFBLFVBRUEsSUFBQVUsR0FBQSxXQUVBQyxPQUFBQyxjQUFBQyxHQUNBTCxHQUFBLENBRUEsSUFBQU0sR0FBQVYsRUFBQVcsTUFBQWhCLEVBQUFpQixNQUVBQyxHQUFBSCxJQUdBRyxFQUFBLFNBQUFDLEdBQ0FWLEVBQ0FELElBQUFGLEVBQ0FFLEVBQUEsRUFFQUEsSUFHQUEsRUFBQVcsRUFHQWQsRUFBQUgsWUFBQSxXQUNBRyxFQUFBZSxHQUFBWixHQUFBUCxTQUFBLFdBRUFvQixFQUFBYixJQUdBYSxFQUFBLFNBQUFDLEdBQ0FsQixFQUFBbUIsU0FDQUMsSUFBQSxJQUFBRixFQUFBLFFBSUFqQixHQUFBb0IsR0FBQSxRQUFBZCxFQUVBLElBQUFHLEdBQUFGLE9BQUFjLFlBQUFSLEVBQUEsUUNwREF6QixRQUFBQyxPQUFBLE9BQ0FpQyxRQUFBLGlCQUFBLFNBQUFDLEdBQ0FBLEVBQ0FDLEtBQUEsWUFFQUMsWUFBQSwwQkFDQW5DLFdBQUEsZ0JBRUFrQyxLQUFBLFVBRUFDLFlBQUEsd0JBQ0FuQyxXQUFBLGNBRUFvQyxXQUVBQyxXQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcblx0J25nUm91dGUnLFxuXSk7XG4iLCJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ0FwcGxpY2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHdpbmRvdyl7XG5cbn0pOyIsIlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignRGF0YVZpekN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICR3aW5kb3cpe1xuXHRmdW5jdGlvbiBzZXRWaXNpYmlsaXR5KCl7XG5cdFx0JCgnLmRhdGEtdmlzaWJpbGl0eScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0fVxuXHRzZXRWaXNpYmlsaXR5KCk7XG59KTsiLCJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ0ludHJvQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHdpbmRvdyl7XG5cdGZ1bmN0aW9uIHNldFZpc2liaWxpdHkoKXtcblx0XHQkKCcuZGF0YS12aXNpYmlsaXR5JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHR9XG5cdHNldFZpc2liaWxpdHkoKTtcblxuXHR2YXIgJHNsaWRlID0gJCgnLnNsaWRlJyksXG4gICAgJHNsaWRlR3JvdXAgPSAkKCcuc2xpZGUtZ3JvdXAnKSxcbiAgICAkYnVsbGV0ID0gJCgnLmJ1bGxldCcpO1xuXG5cdHZhciBzbGlkZXNUb3RhbCA9ICgkc2xpZGUubGVuZ3RoIC0gMSksXG5cdCAgICBjdXJyZW50ID0gMCxcblx0ICAgIGlzQXV0b1NsaWRpbmcgPSBmYWxzZTtcblxuXHQkYnVsbGV0LmZpcnN0KCkuYWRkQ2xhc3MoJ2N1cnJlbnQnKTtcblxuXHR2YXIgY2xpY2tTbGlkZSA9IGZ1bmN0aW9uKCkge1xuXHQgIC8vc3RvcCBhdXRvIHNsaWRpbmdcblx0ICB3aW5kb3cuY2xlYXJJbnRlcnZhbChhdXRvU2xpZGUpO1xuXHQgIGlzQXV0b1NsaWRpbmcgPSBmYWxzZTtcblxuXHQgIHZhciBzbGlkZUluZGV4ID0gJGJ1bGxldC5pbmRleCgkKHRoaXMpKTtcblxuXHQgIHVwZGF0ZUluZGV4KHNsaWRlSW5kZXgpO1xuXHR9O1xuXG5cdHZhciB1cGRhdGVJbmRleCA9IGZ1bmN0aW9uKGN1cnJlbnRTbGlkZSkge1xuXHQgIGlmKGlzQXV0b1NsaWRpbmcpIHtcblx0ICAgIGlmKGN1cnJlbnQgPT09IHNsaWRlc1RvdGFsKSB7XG5cdCAgICAgIGN1cnJlbnQgPSAwO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgY3VycmVudCsrO1xuXHQgICAgfVxuXHQgIH0gZWxzZSB7XG5cdCAgICAgIGN1cnJlbnQgPSBjdXJyZW50U2xpZGU7XG5cdCAgfVxuXG5cdCAgJGJ1bGxldC5yZW1vdmVDbGFzcygnY3VycmVudCcpO1xuXHQgICRidWxsZXQuZXEoY3VycmVudCkuYWRkQ2xhc3MoJ2N1cnJlbnQnKTtcblxuXHQgIHRyYW5zaXRpb24oY3VycmVudCk7XG5cdH07XG5cblx0dmFyIHRyYW5zaXRpb24gPSBmdW5jdGlvbihzbGlkZVBvc2l0aW9uKSB7XG5cdCAgICAkc2xpZGVHcm91cC5hbmltYXRlKHtcblx0ICAgICAgJ3RvcCc6ICctJyArIHNsaWRlUG9zaXRpb24gKyAnMDAlJ1xuXHQgICAgfSk7XG5cdH07XG5cblx0JGJ1bGxldC5vbiggJ2NsaWNrJywgY2xpY2tTbGlkZSk7XG5cblx0dmFyIGF1dG9TbGlkZSA9IHdpbmRvdy5zZXRJbnRlcnZhbCh1cGRhdGVJbmRleCwgNjAwMCk7XG5cdH0pOyIsIlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcil7XG5cdCRyb3V0ZVByb3ZpZGVyXG5cdC53aGVuKCcvZGF0YXZpeicsIFxuXHRcdHtcblx0XHRcdHRlbXBsYXRlVXJsOiAnL3RlbXBsYXRlcy9kYXRhdml6Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0RhdGFWaXpDdHJsJ1xuXHRcdH0pXG5cdC53aGVuKCcvaW50cm8nLCBcblx0XHR7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvaW50cm8uaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnSW50cm9DdHJsJ1xuXHRcdH0pXG5cdC5vdGhlcndpc2UoXG5cdFx0e1xuICAgXHRcdFx0cmVkaXJlY3RUbzogJy9pbnRybydcblx0XHR9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9