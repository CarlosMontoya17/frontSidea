function swalOk(mensaje){
	Swal.fire({
	  position: 'center',
	  icon: 'success',
	  title: mensaje,
	  showConfirmButton: false,
	  timer: 1000
	})
}

function swalOkPago(mensaje){
	Swal.fire({
	  position: 'center',
	  icon: 'success',
	  title: mensaje,
	  showConfirmButton: false,
	  timer: 3200
	})
}

function swalError(mensaje){
	Swal.fire({
	  position: 'center',
	  icon: 'error',
	  title: mensaje,
	  showConfirmButton: false,
	  timer: 2500
	})
}

function swalErrorWhats(acta, dato){
	Swal.fire({
	  title: 'El acta no se encuentra en el sistema',
	  text: "Puedes pedir una busqueda personalizada por Whatsapp",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  cancelButtonText: 'Cancelar',
	  confirmButtonText: 'Busqueda personalizada'
	}).then((result) => {
		if(result.isConfirmed){
			window.open("https://api.whatsapp.com/send?phone=529931784422&text= Solictito%20búsqueda%20de%20acta%20de%20"+acta+",%20"+ dato);
		}
	})
}

function swalErrorWhatsDP(acta, nombres, primerApellido, segundoApellido, sexo, fechaNacimiento, entidad){
	Swal.fire({
	  title: 'El acta no se encuentra en el sistema',
	  text: "Puedes pedir una busqueda personalizada por Whatsapp",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  cancelButtonText: 'Cancelar',
	  confirmButtonText: 'Busqueda personalizada'
	}).then((result) => {
		if(result.isConfirmed){
			window.open("https://api.whatsapp.com/send?phone=529931784422&text= Solictito%20búsqueda%20de%20acta%20de:%20"+acta+"%0A"+nombres+'%20'+primerApellido+'%20'+segundoApellido+'%0A'+fechaNacimiento+'%0A'+sexo+'%0A'+entidad);
		}
	})
}

function swalErrorWhatsDP2(acta, nombres, primerApellido, segundoApellido, nombre2, primerApellido2, segundoApellido2, entidad){
	Swal.fire({
	  title: 'El acta no se encuentra en el sistema',
	  text: "Puedes pedir una busqueda personalizada por Whatsapp",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  cancelButtonText: 'Cancelar',
	  confirmButtonText: 'Busqueda personalizada'
	}).then((result) => {
		if(result.isConfirmed){
			window.open("https://api.whatsapp.com/send?phone=529931784422&text= Solictito%20búsqueda%20de%20acta%20de:%20"+acta+"%0A"+nombres+'%20'+primerApellido+'%20'+segundoApellido+'%0A'+nombre2+'%20'+primerApellido2+'%20'+segundoApellido2+'%0A'+entidad);
		}
	})
}

function swalDelete(id, path) {
	Swal.fire({
		title: 'Estas seguro?',
		text: "No podras revertir esta opcion!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, borrar'
	  }).then((result) => {
			if (result.isConfirmed) {
			  window.angularComponentReferenceDeleteImg.zone.run(function() {return window.angularComponentReferenceDeleteImg.loadAngularFunction(id, path);});
			}
	  })
}