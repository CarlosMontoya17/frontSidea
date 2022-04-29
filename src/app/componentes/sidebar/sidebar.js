$(document).ready(function() {
	// Guardar el contenedor principal
	let containerSlider = $('#slider');

	// Guardar las secciones del slider
	let sectionSlider = containerSlider.find('.section-slider');

	// Guardar numero de secciones
	let sectionLength = sectionSlider.length;

	// Crear un contenedor interno
	containerSlider.wrapInner('<div class=" slider-inner" />');
	let containerInner = $('.slider-inner');

	// Definir el ancho del contenedor interno
	containerInner.css({
		'width': 100 * sectionLength + '%'
	});

	sectionSlider.css({
		'width': 100 / sectionLength + '%'
	});

	// Crear botones para avanzar y retroceder
	containerSlider.after('<i id="prev" class="fa fa-chevron-left arrows prev" aria-hidden="true"></i>');
	containerSlider.after('<i id="next" class="fa fa-chevron-right arrows next" aria-hidden="true"></i>');

	// Guardar los botones en variables
	let prev = $('#prev');
	let next = $('#next');

	// Envolver los botones
	next.add(prev).wrapAll('<div class="slider-nav" />');

	/*
		Crear la función para navegar entre los slides
	*/

	// Indice para moverse entre los slides
	let i = 0;

	// Escribir la función para moverse
	function moveSlider() {
		if (i == 0) {
			containerInner.css({
				'left': 0 + '%'
			});
		} 
		else if (i > 0) {
			containerInner.css({
				'left': '-' + 100 * i + '%'
			});
		}
	}

	// Validación para moverse a la siguiente imágen
	next.on('click', function moveNextSlider() {
		if (i < sectionLength - 1) {
			i++;
			moveSlider();
		}
	});

	// Validación para moverse a la anterior imágen
	prev.on('click', function movePrevSlider() {
		if (i > 0) {
			i--;
			moveSlider();
		}
	});

	// Ejecuta el slider automáticamente
	let autoSlider = setInterval(function moveAutoSlider() {
		// Si el menú esta de color negro o el slider tiene la clase stop-slider no sigue el slider en automático
		if ($('#slider').hasClass('stop-slider')) {
			clearInterval(autoSlider);
		}

		// En caso de que este posicionado en la 1ra imágen del slider se ejecuta automáticamente cada 5 segundos
		else if (i < sectionLength -1) {
			moveSlider(i++);
		}
	}, 5000);

	// Validación para cuando le den click al botón de la hamburguesa, los links del menu, al logo del menú, las flechas del slider y la flecha de la siguiente sección
	// Le agregue al slider la clase stop-slider así cuando se cumpla la condicional de la función moverAutomaticamenteSlider
	$('#arrow-down-slider, .arrows').on('click', function() {
		$('#slider').addClass('stop-slider');
	});

	// Validación para que cuando el scroll este en una posicón distinta a arriba osea a 0px el slider se detenga y deje de ser automático
	$(window).on('load scroll resize', function() {
		if ($(this).scrollTop() > 0) {
			$('#slider').addClass('stop-slider');
		}
	});

	// Si pasamos el cursor por el slider aparecen las flechas de lo contrario se ocultan
	$('#ctn-slider').hover(function() {
		$('.arrows').fadeToggle();
	});

	// Validacion para que con el gesto de dezlizar se pasen las imgs del slider
	let interactiveElements = $('#arrow-down-slider, .arrows');
	let active = 1;
	let tolerance = 100;
  
  function swipeScreen() {
  	$('#slider').on('mousedown touchstart', function(e) {
			$(this).addClass('stop-slider');
  		let touch = e.originalEvent.touches;
  		let start = touch ? touch[0].pageX : e.pageX;
  		let difference;

  		$(this).on('mousemove touchmove', function(e) {
  			let contact = e.originalEvent.touches;
  			end = contact ? contact[0].pageX : e.pageX;
  			difference = end-start;
  		});

			// On touch end
  		$(this).on('mouseup touchend', function(e) {
  			e.preventDefault();

  			// Swipe right
  			if (active < sectionLength && difference < -tolerance) {
  				next.trigger('click');
  				active += 1;
  			}

  			// Swipe left
  			if (active > 1 && difference > tolerance) {
  				prev.trigger('click');
  				active -= 1;
  			}

  			$(this).off('mousemove touchmove');
  		});
  	});
  }

  swipeScreen();

  // Prevent swipe on interactive elements
  interactiveElements.on('touchstart touchend touchup', function(e) {
  	e.stopPropagation();
  });
	
	// Eventos de teclado
	// Flecha derecha = 39
	// Flecha izquierda = 37
	// trigger es encadenar eventos, que un evento dispare otro
	$(document).on('keydown', function(e) {
		switch (e.which) {
			case 39:
			next.trigger('click');
			break;
			case 37:
			prev.trigger('click');	
			break;
		}
	});
	
	// Validación para que cuando le de click a la flecha del slider lo lleve a la siguiente sección osea servicios, contacto, quiénes somos y soporte
	$('#arrow-down-slider').on('click', function() {
    $('html').animate({
      scrollTop: $('#wallpaper').offset().top
    }, 1000);
	});

});