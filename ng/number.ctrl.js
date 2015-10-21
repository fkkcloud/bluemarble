
angular.module('app')
.controller('NumberCtrl', function($rootScope, $scope, $window){
    $('[data-num]').each(function(){
    	startLoop($(this));
  	});
 
  	function startLoop($it){
	    var cur           = 0;
	    var num           = parseInt($it.attr('data-num'));
	    var time_duration = parseInt($it.attr('time-duration'));
	    var time_delay    = parseInt($it.attr('time-delay'));

	    init_increase($it, num, cur, time_duration, time_delay);

	    function init_increase($it, num, cur, time_duration, time_delay)
	    {
	        var steps       = 100;
	        var timetotal   = time_duration;
	        var cur         = 0;
	        var steptimeout = timetotal/steps;      
	        var numlen      = (num+'').length;

	        $it.html(getHtm(0,numlen));
	        setTimeout(loop, time_delay);

	        function setValue(val)
	        {
	        	$it.html(getHtm(val,numlen));
	      	}

	      	function getFormated(n,lentotal)
	      	{
	        	var t =  ".";
	        	var i = n + "";
	        	
	        	if(i.length<lentotal)
	        	{
	          		var y = lentotal-i.length;
	          		for(var z=0;z<y;z++)
	          		{
	            		i = '0'+i;
	          		}
	        	}     
	        	
	        	var j = (j = i.length) > 2 ? j % 2 : 0;
	       		return (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{2})(?=\d)/g, "$1" + t);
	      	}

	      	function loop()
	      	{
		        cur++
		        var percent = cur/steps;
		        if (percent>=1)
		        {          
		        	setValue(parseInt(num));
		        } 
		        else 
		        {
		          	setValue(parseInt(percent*num));
		          	setTimeout(loop,steptimeout);          
	        	}
	      	}

	      	function getHtm(num,lentotal){        
	        	var targetFormated = getFormated(num,lentotal);
	        	var chars = targetFormated.split('');
	        	var htms = [];
	        	for (var i=0;i<chars.length;i++)
	        	{
	          		if (chars[i] == '.')
	          		{
	            		htms+='<span>.</span>';
	          		} 
	          		else 
	          		{          
	            		htms+='<em>'+ chars[i]+'</em>';
	          		}
	        	}
	        	return htms;
	      	}
	    }
	}
});