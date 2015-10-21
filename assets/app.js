angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$rootScope","$scope","$window",function(e,t,n){}]),angular.module("app").controller("DataVizCtrl",["$rootScope","$scope","$window",function(e,t,n){function r(){$(".data-visibility").addClass("active")}r()}]),angular.module("app").controller("IntroCtrl",["$rootScope","$scope","$window",function(e,t,n){function r(){$(".data-visibility").removeClass("active")}r();var a=$(".slide"),o=$(".slide-group"),l=$(".bullet"),i=a.length-1,s=0,c=!1;l.first().addClass("current");var u=function(){var e=$(".slide-node").clone();$(".slide-node").html("Loading! If you see this message for a while, please refresh the page"),$(".slide-node").replaceWith(e);var t=$(".slide-lines").clone();$(".slide-lines").html("Loading! If you see this message for a while, please refresh the page"),$(".slide-lines").replaceWith(t)},d=function(){window.clearInterval(f),c=!1;var e=l.index($(this));p(e),u()},p=function(e){c?s===i?s=0:s++:s=e,l.removeClass("current"),l.eq(s).addClass("current"),m(s)},m=function(e){o.animate({top:"-"+e+"00%"}),u()};l.on("click",d);var f=window.setInterval(p,8e4)}]),angular.module("app").controller("NumberCtrl",["$rootScope","$scope","$window",function(e,t,n){function r(e){function t(e,t,n,r,a){function o(t){e.html(s(t,p))}function l(e,t){var n=".",r=e+"";if(r.length<t)for(var a=t-r.length,o=0;a>o;o++)r="0"+r;var l=(l=r.length)>2?l%2:0;return(l?r.substr(0,l)+n:"")+r.substr(l).replace(/(\d{2})(?=\d)/g,"$1"+n)}function i(){n++;var e=n/c;e>=1?o(parseInt(t)):(o(parseInt(e*t)),setTimeout(i,d))}function s(e,t){for(var n=l(e,t),r=n.split(""),a=[],o=0;o<r.length;o++)a+="."==r[o]?"<span>.</span>":"<em>"+r[o]+"</em>";return a}var c=100,u=r,n=0,d=u/c,p=(t+"").length;e.html(s(0,p)),setTimeout(i,a)}var n=0,r=parseInt(e.attr("data-num")),a=parseInt(e.attr("time-duration")),o=parseInt(e.attr("time-delay"));t(e,r,n,a,o)}$("[data-num]").each(function(){r($(this))})}]),angular.module("app").config(["$routeProvider",function(e){e.when("/dataviz",{templateUrl:"/templates/dataviz.html",controller:"DataVizCtrl"}).when("/intro",{templateUrl:"/templates/intro.html",controller:"IntroCtrl"}).otherwise({redirectTo:"/intro"})}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJkYXRhdml6LmN0cmwuanMiLCJpbnRyby5jdHJsLmpzIiwibnVtYmVyLmN0cmwuanMiLCJyb3V0ZXMuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkcm9vdFNjb3BlIiwiJHNjb3BlIiwiJHdpbmRvdyIsInNldFZpc2liaWxpdHkiLCIkIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIiRzbGlkZSIsIiRzbGlkZUdyb3VwIiwiJGJ1bGxldCIsInNsaWRlc1RvdGFsIiwibGVuZ3RoIiwiY3VycmVudCIsImlzQXV0b1NsaWRpbmciLCJmaXJzdCIsInJlc2V0U2xpZGVzIiwiZGl2Q2xvbmVfbm9kZSIsImNsb25lIiwiaHRtbCIsInJlcGxhY2VXaXRoIiwiZGl2Q2xvbmVfbGluZXMiLCJjbGlja1NsaWRlIiwid2luZG93IiwiY2xlYXJJbnRlcnZhbCIsImF1dG9TbGlkZSIsInNsaWRlSW5kZXgiLCJpbmRleCIsInRoaXMiLCJ1cGRhdGVJbmRleCIsImN1cnJlbnRTbGlkZSIsImVxIiwidHJhbnNpdGlvbiIsInNsaWRlUG9zaXRpb24iLCJhbmltYXRlIiwidG9wIiwib24iLCJzZXRJbnRlcnZhbCIsInN0YXJ0TG9vcCIsIiRpdCIsImluaXRfaW5jcmVhc2UiLCJudW0iLCJjdXIiLCJ0aW1lX2R1cmF0aW9uIiwidGltZV9kZWxheSIsInNldFZhbHVlIiwidmFsIiwiZ2V0SHRtIiwibnVtbGVuIiwiZ2V0Rm9ybWF0ZWQiLCJuIiwibGVudG90YWwiLCJ0IiwiaSIsInkiLCJ6IiwiaiIsInN1YnN0ciIsInJlcGxhY2UiLCJsb29wIiwicGVyY2VudCIsInN0ZXBzIiwicGFyc2VJbnQiLCJzZXRUaW1lb3V0Iiwic3RlcHRpbWVvdXQiLCJ0YXJnZXRGb3JtYXRlZCIsImNoYXJzIiwic3BsaXQiLCJodG1zIiwidGltZXRvdGFsIiwiYXR0ciIsImVhY2giLCJjb25maWciLCIk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REEsR0FBQVAsR0FBQSxJQUNBUSxFQUFBMUIsRUFDQUQsRUFBQSxFQUNBc0IsRUFBQUssRUFBQVIsRUFDQWIsR0FBQVAsRUFBQSxJQUFBN0IsTUFFQTJCLEdBQUFwQixLQUFBNEIsRUFBQSxFQUFBQyxJQUNBZSxXQUFBSixFQUFBZixHQWhCQSxHQUFBRixHQUFBLEVBQ0FELEVBQUFxQixTQUFBdkIsRUFBQStCLEtBQUEsYUFDQTNCLEVBQUFtQixTQUFBdkIsRUFBQStCLEtBQUEsa0JBQ0ExQixFQUFBa0IsU0FBQXZCLEVBQUErQixLQUFBLGNBRUE5QixHQUFBRCxFQUFBRSxFQUFBQyxFQUFBQyxFQUFBQyxHQVZBdkMsRUFBQSxjQUFBa0UsS0FBQSxXQUNBakMsRUFBQWpDLEVBQUF1QixZQ0hBOUIsUUFBQUMsT0FBQSxPQUNBeUUsUUFBQSxpQkFBQSxTQUFBQyxHQUNBQSxFQUNBQyxLQUFBLFlBRUFDLFlBQUEsMEJBQ0EzRSxXQUFBLGdCQUVBMEUsS0FBQSxVQUVBQyxZQUFBLHdCQUNBM0UsV0FBQSxjQUVBNEUsV0FFQUMsV0FBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG5cdCduZ1JvdXRlJyxcbl0pO1xuIiwiXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkN0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICR3aW5kb3cpe1xuXG59KTsiLCJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ0RhdGFWaXpDdHJsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkd2luZG93KXtcblx0ZnVuY3Rpb24gc2V0VmlzaWJpbGl0eSgpe1xuXHRcdCQoJy5kYXRhLXZpc2liaWxpdHknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdH1cblx0c2V0VmlzaWJpbGl0eSgpO1xufSk7IiwiXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdJbnRyb0N0cmwnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICR3aW5kb3cpe1xuXHRmdW5jdGlvbiBzZXRWaXNpYmlsaXR5KCl7XG5cdFx0JCgnLmRhdGEtdmlzaWJpbGl0eScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0fVxuXHRzZXRWaXNpYmlsaXR5KCk7XG5cblx0dmFyICRzbGlkZSA9ICQoJy5zbGlkZScpLFxuICAgICRzbGlkZUdyb3VwID0gJCgnLnNsaWRlLWdyb3VwJyksXG4gICAgJGJ1bGxldCA9ICQoJy5idWxsZXQnKTtcblxuXHR2YXIgc2xpZGVzVG90YWwgPSAoJHNsaWRlLmxlbmd0aCAtIDEpLFxuXHQgICAgY3VycmVudCA9IDAsXG5cdCAgICBpc0F1dG9TbGlkaW5nID0gZmFsc2U7XG5cblx0JGJ1bGxldC5maXJzdCgpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cblx0LyogcmVzZXQgdGhlIGRpdiBhbmQgYW5pbWF0aW9uICovXG5cdHZhciByZXNldFNsaWRlcyA9IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHJlbG9hZCBub2RlIHNsaWRlIGFuZCBhbmltYXRpb25cblx0XHR2YXIgZGl2Q2xvbmVfbm9kZSA9ICQoXCIuc2xpZGUtbm9kZVwiKS5jbG9uZSgpOyAvLyBEbyB0aGlzIG9uICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkgeyAuLi4gfSlcblx0XHQkKFwiLnNsaWRlLW5vZGVcIikuaHRtbChcIkxvYWRpbmchIElmIHlvdSBzZWUgdGhpcyBtZXNzYWdlIGZvciBhIHdoaWxlLCBwbGVhc2UgcmVmcmVzaCB0aGUgcGFnZVwiKTsgLy8gQ2hhbmdlIHRoZSBjb250ZW50IHRlbXBvcmFyaWx5XG5cblx0XHQvLyBBbnkgY2hhbmdlcyB0byBcIiNzb21lX2RpdlwiIGFmdGVyIHRoaXMgcG9pbnQgd2lsbCBhZmZlY3QgdGhlIHZhbHVlIG9mIGRpdkNsb25lXG5cdFx0JChcIi5zbGlkZS1ub2RlXCIpLnJlcGxhY2VXaXRoKGRpdkNsb25lX25vZGUpOyAvLyBSZXN0b3JlIGVsZW1lbnQgd2l0aCBkaXZDbG9uZSBpdHNlbGZcblx0XG5cdCAgXHQvLyByZWxvYWQgbGluZXMgc2xpZGUgYW5kIGFuaW1hdGlvblxuXHQgIFx0dmFyIGRpdkNsb25lX2xpbmVzID0gJChcIi5zbGlkZS1saW5lc1wiKS5jbG9uZSgpOyAvLyBEbyB0aGlzIG9uICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkgeyAuLi4gfSlcblxuXHRcdCQoXCIuc2xpZGUtbGluZXNcIikuaHRtbChcIkxvYWRpbmchIElmIHlvdSBzZWUgdGhpcyBtZXNzYWdlIGZvciBhIHdoaWxlLCBwbGVhc2UgcmVmcmVzaCB0aGUgcGFnZVwiKTsgLy8gQ2hhbmdlIHRoZSBjb250ZW50IHRlbXBvcmFyaWx5XG5cblx0XHQvLyBBbnkgY2hhbmdlcyB0byBcIiNzb21lX2RpdlwiIGFmdGVyIHRoaXMgcG9pbnQgd2lsbCBhZmZlY3QgdGhlIHZhbHVlIG9mIGRpdkNsb25lXG5cdFx0JChcIi5zbGlkZS1saW5lc1wiKS5yZXBsYWNlV2l0aChkaXZDbG9uZV9saW5lcyk7IC8vIFJlc3RvcmUgZWxlbWVudCB3aXRoIGRpdkNsb25lIGl0c2VsZlxuXHR9XG5cblx0dmFyIGNsaWNrU2xpZGUgPSBmdW5jdGlvbigpIHtcblx0ICAvL3N0b3AgYXV0byBzbGlkaW5nXG5cdCAgd2luZG93LmNsZWFySW50ZXJ2YWwoYXV0b1NsaWRlKTtcblx0ICBpc0F1dG9TbGlkaW5nID0gZmFsc2U7XG5cblx0ICB2YXIgc2xpZGVJbmRleCA9ICRidWxsZXQuaW5kZXgoJCh0aGlzKSk7XG5cblx0ICB1cGRhdGVJbmRleChzbGlkZUluZGV4KTtcblxuXHQgIHJlc2V0U2xpZGVzKCk7XG5cdH07XG5cblx0dmFyIHVwZGF0ZUluZGV4ID0gZnVuY3Rpb24oY3VycmVudFNsaWRlKSB7XG5cdCAgaWYoaXNBdXRvU2xpZGluZykge1xuXHQgICAgaWYoY3VycmVudCA9PT0gc2xpZGVzVG90YWwpIHtcblx0ICAgICAgY3VycmVudCA9IDA7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBjdXJyZW50Kys7XG5cdCAgICB9XG5cdCAgfSBlbHNlIHtcblx0ICAgICAgY3VycmVudCA9IGN1cnJlbnRTbGlkZTtcblx0ICB9XG5cblx0ICAkYnVsbGV0LnJlbW92ZUNsYXNzKCdjdXJyZW50Jyk7XG5cdCAgJGJ1bGxldC5lcShjdXJyZW50KS5hZGRDbGFzcygnY3VycmVudCcpO1xuXG5cdCAgdHJhbnNpdGlvbihjdXJyZW50KTtcblx0fTtcblxuXHR2YXIgdHJhbnNpdGlvbiA9IGZ1bmN0aW9uKHNsaWRlUG9zaXRpb24pIHtcblx0ICAgICRzbGlkZUdyb3VwLmFuaW1hdGUoe1xuXHQgICAgICAndG9wJzogJy0nICsgc2xpZGVQb3NpdGlvbiArICcwMCUnXG5cdCAgICB9KTtcblxuXHQgICAgcmVzZXRTbGlkZXMoKTtcblx0fTtcblxuXHQkYnVsbGV0Lm9uKCAnY2xpY2snLCBjbGlja1NsaWRlKTtcblxuXHR2YXIgYXV0b1NsaWRlID0gd2luZG93LnNldEludGVydmFsKHVwZGF0ZUluZGV4LCA4MDAwMCk7XG5cbn0pOyIsIlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignTnVtYmVyQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJHdpbmRvdyl7XG4gICAgJCgnW2RhdGEtbnVtXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICBcdHN0YXJ0TG9vcCgkKHRoaXMpKTtcbiAgXHR9KTtcbiBcbiAgXHRmdW5jdGlvbiBzdGFydExvb3AoJGl0KXtcblx0ICAgIHZhciBjdXIgICAgICAgICAgID0gMDtcblx0ICAgIHZhciBudW0gICAgICAgICAgID0gcGFyc2VJbnQoJGl0LmF0dHIoJ2RhdGEtbnVtJykpO1xuXHQgICAgdmFyIHRpbWVfZHVyYXRpb24gPSBwYXJzZUludCgkaXQuYXR0cigndGltZS1kdXJhdGlvbicpKTtcblx0ICAgIHZhciB0aW1lX2RlbGF5ICAgID0gcGFyc2VJbnQoJGl0LmF0dHIoJ3RpbWUtZGVsYXknKSk7XG5cblx0ICAgIGluaXRfaW5jcmVhc2UoJGl0LCBudW0sIGN1ciwgdGltZV9kdXJhdGlvbiwgdGltZV9kZWxheSk7XG5cblx0ICAgIGZ1bmN0aW9uIGluaXRfaW5jcmVhc2UoJGl0LCBudW0sIGN1ciwgdGltZV9kdXJhdGlvbiwgdGltZV9kZWxheSlcblx0ICAgIHtcblx0ICAgICAgICB2YXIgc3RlcHMgICAgICAgPSAxMDA7XG5cdCAgICAgICAgdmFyIHRpbWV0b3RhbCAgID0gdGltZV9kdXJhdGlvbjtcblx0ICAgICAgICB2YXIgY3VyICAgICAgICAgPSAwO1xuXHQgICAgICAgIHZhciBzdGVwdGltZW91dCA9IHRpbWV0b3RhbC9zdGVwczsgICAgICBcblx0ICAgICAgICB2YXIgbnVtbGVuICAgICAgPSAobnVtKycnKS5sZW5ndGg7XG5cblx0ICAgICAgICAkaXQuaHRtbChnZXRIdG0oMCxudW1sZW4pKTtcblx0ICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIHRpbWVfZGVsYXkpO1xuXG5cdCAgICAgICAgZnVuY3Rpb24gc2V0VmFsdWUodmFsKVxuXHQgICAgICAgIHtcblx0ICAgICAgICBcdCRpdC5odG1sKGdldEh0bSh2YWwsbnVtbGVuKSk7XG5cdCAgICAgIFx0fVxuXG5cdCAgICAgIFx0ZnVuY3Rpb24gZ2V0Rm9ybWF0ZWQobixsZW50b3RhbClcblx0ICAgICAgXHR7XG5cdCAgICAgICAgXHR2YXIgdCA9ICBcIi5cIjtcblx0ICAgICAgICBcdHZhciBpID0gbiArIFwiXCI7XG5cdCAgICAgICAgXHRcblx0ICAgICAgICBcdGlmKGkubGVuZ3RoPGxlbnRvdGFsKVxuXHQgICAgICAgIFx0e1xuXHQgICAgICAgICAgXHRcdHZhciB5ID0gbGVudG90YWwtaS5sZW5ndGg7XG5cdCAgICAgICAgICBcdFx0Zm9yKHZhciB6PTA7ejx5O3orKylcblx0ICAgICAgICAgIFx0XHR7XG5cdCAgICAgICAgICAgIFx0XHRpID0gJzAnK2k7XG5cdCAgICAgICAgICBcdFx0fVxuXHQgICAgICAgIFx0fSAgICAgXG5cdCAgICAgICAgXHRcblx0ICAgICAgICBcdHZhciBqID0gKGogPSBpLmxlbmd0aCkgPiAyID8gaiAlIDIgOiAwO1xuXHQgICAgICAgXHRcdHJldHVybiAoaiA/IGkuc3Vic3RyKDAsIGopICsgdCA6IFwiXCIpICsgaS5zdWJzdHIoaikucmVwbGFjZSgvKFxcZHsyfSkoPz1cXGQpL2csIFwiJDFcIiArIHQpO1xuXHQgICAgICBcdH1cblxuXHQgICAgICBcdGZ1bmN0aW9uIGxvb3AoKVxuXHQgICAgICBcdHtcblx0XHQgICAgICAgIGN1cisrXG5cdFx0ICAgICAgICB2YXIgcGVyY2VudCA9IGN1ci9zdGVwcztcblx0XHQgICAgICAgIGlmIChwZXJjZW50Pj0xKVxuXHRcdCAgICAgICAgeyAgICAgICAgICBcblx0XHQgICAgICAgIFx0c2V0VmFsdWUocGFyc2VJbnQobnVtKSk7XG5cdFx0ICAgICAgICB9IFxuXHRcdCAgICAgICAgZWxzZSBcblx0XHQgICAgICAgIHtcblx0XHQgICAgICAgICAgXHRzZXRWYWx1ZShwYXJzZUludChwZXJjZW50Km51bSkpO1xuXHRcdCAgICAgICAgICBcdHNldFRpbWVvdXQobG9vcCxzdGVwdGltZW91dCk7ICAgICAgICAgIFxuXHQgICAgICAgIFx0fVxuXHQgICAgICBcdH1cblxuXHQgICAgICBcdGZ1bmN0aW9uIGdldEh0bShudW0sbGVudG90YWwpeyAgICAgICAgXG5cdCAgICAgICAgXHR2YXIgdGFyZ2V0Rm9ybWF0ZWQgPSBnZXRGb3JtYXRlZChudW0sbGVudG90YWwpO1xuXHQgICAgICAgIFx0dmFyIGNoYXJzID0gdGFyZ2V0Rm9ybWF0ZWQuc3BsaXQoJycpO1xuXHQgICAgICAgIFx0dmFyIGh0bXMgPSBbXTtcblx0ICAgICAgICBcdGZvciAodmFyIGk9MDtpPGNoYXJzLmxlbmd0aDtpKyspXG5cdCAgICAgICAgXHR7XG5cdCAgICAgICAgICBcdFx0aWYgKGNoYXJzW2ldID09ICcuJylcblx0ICAgICAgICAgIFx0XHR7XG5cdCAgICAgICAgICAgIFx0XHRodG1zKz0nPHNwYW4+Ljwvc3Bhbj4nO1xuXHQgICAgICAgICAgXHRcdH0gXG5cdCAgICAgICAgICBcdFx0ZWxzZSBcblx0ICAgICAgICAgIFx0XHR7ICAgICAgICAgIFxuXHQgICAgICAgICAgICBcdFx0aHRtcys9JzxlbT4nKyBjaGFyc1tpXSsnPC9lbT4nO1xuXHQgICAgICAgICAgXHRcdH1cblx0ICAgICAgICBcdH1cblx0ICAgICAgICBcdHJldHVybiBodG1zO1xuXHQgICAgICBcdH1cblx0ICAgIH1cblx0fVxufSk7IiwiXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKXtcblx0JHJvdXRlUHJvdmlkZXJcblx0LndoZW4oJy9kYXRhdml6JywgXG5cdFx0e1xuXHRcdFx0dGVtcGxhdGVVcmw6ICcvdGVtcGxhdGVzL2RhdGF2aXouaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnRGF0YVZpekN0cmwnXG5cdFx0fSlcblx0LndoZW4oJy9pbnRybycsIFxuXHRcdHtcblx0XHRcdHRlbXBsYXRlVXJsOiAnL3RlbXBsYXRlcy9pbnRyby5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdJbnRyb0N0cmwnXG5cdFx0fSlcblx0Lm90aGVyd2lzZShcblx0XHR7XG4gICBcdFx0XHRyZWRpcmVjdFRvOiAnL2ludHJvJ1xuXHRcdH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=