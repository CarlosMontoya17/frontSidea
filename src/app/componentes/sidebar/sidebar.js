function onclick(){
	$('#menu li a').on('click', function(){
		$('li a.activo').removeClass('activo');
		$(this).addClass('activo');
	});
	
}