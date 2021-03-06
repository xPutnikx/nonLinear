$(document).ready(function(){
	$('#interval_help').popover();

	$('label.error').hide();

	$('#solution_div').hide();

	$('#collapseOne').collapse("hide");

	$('#clear_button').click(function(){
		$('#equation_field').val("");
		$('#interval_input').val("");
		$('#interval label.error').hide();
		$('#solution').text("");
		$('#solution_div').hide();
	})

	$('#interval_input').focusout(function(){
		var re = new RegExp(/\[( *)?-?\d+(\.\d+)?( *)?,( *)?-?\d+(\.\d+)?( *)?\]+/);
		console.log($(this).val());
		if($(this).val().match(re))
		{
			console.log('success');
			$('#interval label.error').hide();
			$('#interval').removeClass('error');
		}
		else{
			$('#interval label.error').show();
			$('#interval').addClass('error');
		}

	})
	$('#solve_button').click(function(){
		console.log($('#equation_field').val());
		if($('#equation_field').val().length == 0 ){
			$('#equation_field').focus();
			return;
		}
		if($('#interval_input').val().length == 0){
			$('#interval_input').focus();
			return;
		}
		if($('#interval label.error').css('display')=='none'){
			var str = {input: $('#equation_field').val() };
			$.ajax({
				type:'POST',
				dataType: 'json',
				url: '/non_linear/solveEquation',
				data: str,
				success: function(data){
				if(data.result=="success"){
					$('#solution_div').removeClass("alert-success").removeClass("alert-error");
					$('#solution_div').addClass("alert-"+data.result).show();
				}else{
					$('#solution_div').removeClass("alert-error").removeClass("alert-error");
					$('#solution_div').addClass("alert-"+data.result).show();
				}	
	            
	            console.log(data.solution);
	            $('#solution').text(data.solution);
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown){
	            console.log(XMLHttpRequest.readyState);
	            console.log(XMLHttpRequest.status);
	            console.log(textStatus);
	            console.log(errorThrown);
	        }
			})
		}
	})

	$('#second_variant').click(function(){
			var first = $('#first_variant').text();
			var second = $(this).text();
			$(this).text(first);
			$('#first_variant').text(second);
			$('#first_variant').append('<span class="caret"></span>');
		});
	function validate(){
		var value=$('textarea').val();
	}
})
