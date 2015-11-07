
angular.module('app')
.controller('DataVizCtrl', function($rootScope, $scope, $window){

	function setVisibility(){
		$('.data-visibility').addClass('active');
	}
	setVisibility();

/*
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
CLUSTER
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
*/

   	//set initial state.
    $('#checkbox_c_all').change(function() {
    	var toggleVal = $(this).is(":checked");
		$('#checkbox_c0').prop('checked', toggleVal);
		$('#checkbox_c0').trigger('change');
		$('#checkbox_c1').prop('checked', toggleVal);
		$('#checkbox_c1').trigger('change');
		$('#checkbox_c2').prop('checked', toggleVal);
		$('#checkbox_c2').trigger('change');
		$('#checkbox_c3').prop('checked', toggleVal); 
		$('#checkbox_c3').trigger('change');
		$('#checkbox_c4').prop('checked', toggleVal);
		$('#checkbox_c4').trigger('change');
		$('#checkbox_c5').prop('checked', toggleVal);
		$('#checkbox_c5').trigger('change');
		$('#checkbox_c6').prop('checked', toggleVal);
		$('#checkbox_c6').trigger('change');
		$('#checkbox_c7').prop('checked', toggleVal); 
		$('#checkbox_c7').trigger('change');
		$('#checkbox_c8').prop('checked', toggleVal);
		$('#checkbox_c8').trigger('change');
		$('#checkbox_c9').prop('checked', toggleVal);
		$('#checkbox_c9').trigger('change');
		$('#checkbox_c10').prop('checked', toggleVal);
		$('#checkbox_c10').trigger('change');
		$('#checkbox_c11').prop('checked', toggleVal); 
		$('#checkbox_c11').trigger('change');
		$('#checkbox_c12').prop('checked', toggleVal);
		$('#checkbox_c12').trigger('change');
		$('#checkbox_c13').prop('checked', toggleVal);
		$('#checkbox_c13').trigger('change');
		$('#checkbox_c14').prop('checked', toggleVal);
		$('#checkbox_c14').trigger('change');
		$('#checkbox_c15').prop('checked', toggleVal); 
		$('#checkbox_c15').trigger('change');
		$('#checkbox_c16').prop('checked', toggleVal); 
		$('#checkbox_c16').trigger('change');
		$('#checkbox_c17').prop('checked', toggleVal); 
		$('#checkbox_c17').trigger('change');    	
    });

    //set initial state.
    $('#checkbox_c0').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(0, true);
          //etageManager.toggleShowByCluster(0, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(0, false);
          //etageManager.toggleShowByCluster(0, false);
        }
    });

        //set initial state.
    $('#checkbox_c1').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(1, true);
          //etageManager.toggleShowByCluster(1, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(1, false);
          //etageManager.toggleShowByCluster(1, false);
        }
    });
        //set initial state.
    $('#checkbox_c2').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(2, true);
          //etageManager.toggleShowByCluster(2, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(2, false);
          //etageManager.toggleShowByCluster(2, false);
        }
    });
        //set initial state.
    $('#checkbox_c3').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(3, true);
          //etageManager.toggleShowByCluster(3, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(3, false);
          //etageManager.toggleShowByCluster(3, false);
        }
    });
        //set initial state.
    $('#checkbox_c4').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(4, true);
          //etageManager.toggleShowByCluster(4, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(4, false);
          //etageManager.toggleShowByCluster(4, false);
        }
    });

        //set initial state.
    $('#checkbox_c5').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(5, true);
          //etageManager.toggleShowByCluster(5, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(5, false);
          //etageManager.toggleShowByCluster(5, false);
        }
    });

            //set initial state.
    $('#checkbox_c6').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(6, true);
          //etageManager.toggleShowByCluster(6, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(6, false);
          //etageManager.toggleShowByCluster(6, false);
        }
    });

            //set initial state.
    $('#checkbox_c7').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(7, true);
          //etageManager.toggleShowByCluster(7, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(7, false);
          //etageManager.toggleShowByCluster(7, false);
        }
    });

            //set initial state.
    $('#checkbox_c8').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(8, true);
          //etageManager.toggleShowByCluster(8, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(8, false);
          //etageManager.toggleShowByCluster(8, false);
        }
    });

            //set initial state.
    $('#checkbox_c9').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(9, true);
          //etageManager.toggleShowByCluster(9, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(9, false);
          //etageManager.toggleShowByCluster(9, false);
        }
    });

            //set initial state.
    $('#checkbox_c10').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(10, true);
          //etageManager.toggleShowByCluster(10, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(10, false);
          //etageManager.toggleShowByCluster(10, false);
        }
    });

            //set initial state.
    $('#checkbox_c11').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(11, true);
          //etageManager.toggleShowByCluster(11, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(11, false);
          //etageManager.toggleShowByCluster(11, false);
        }
    });

            //set initial state.
    $('#checkbox_c12').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(12, true);
          //etageManager.toggleShowByCluster(12, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(12, false);
          //etageManager.toggleShowByCluster(12, false);
        }
    });

            //set initial state.
    $('#checkbox_c13').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(13, true);
          //etageManager.toggleShowByCluster(13, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(13, false);
          //etageManager.toggleShowByCluster(13, false);
        }
    });

            //set initial state.
    $('#checkbox_c14').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(14, true);
          //etageManager.toggleShowByCluster(14, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(14, false);
          //etageManager.toggleShowByCluster(14, false);
        }
    });
                //set initial state.
    $('#checkbox_c15').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(15, true);
          //etageManager.toggleShowByCluster(15, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(15, false);
          //etageManager.toggleShowByCluster(15, false);
        }
    });
                //set initial state.
    $('#checkbox_c16').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(16, true);
          //etageManager.toggleShowByCluster(16, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(16, false);
          //etageManager.toggleShowByCluster(16, false);
        }
    });

                    //set initial state.
    $('#checkbox_c17').change(function() {
      console.log("checkbox!");
        if($(this).is(":checked")) {
          trajetManager.toggleShowByCluster(17, true);
          //etageManager.toggleShowByCluster(17, true);
        }
        else
        {
          trajetManager.toggleShowByCluster(17, false);
          //etageManager.toggleShowByCluster(17, false);
        }
    });

});