function validateLogin(){
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;
	if(username.length>3) {
		if(password.length>2){
			document.getElementById("error-user").style.display = 'none';
			document.getElementById("error-password").style.display = 'none';
	   		return true;
	  	}else{
	  		document.getElementById("error-user").style.display = 'none';
	  		document.getElementById("error-password").style.display = 'block';
	  		return false;
	  	}
	} else {
		document.getElementById("error-password").style.display = 'none';
		document.getElementById("error-user").style.display = 'block';
		return false;
	}
}

function validarCurp(){
    var curp = document.getElementById('curp').value
	if(curp.length==18){
		document.getElementById("error-curp").style.display = 'none';
		return true;
	}else{
		document.getElementById("error-curp").style.display = 'block';
		return false;
	}
}
function validarCurpManual(){
    var curp = document.getElementById('curp1').value
	if(curp.length==18){
		document.getElementById("error-curp1").style.display = 'none';
		return true;
	}else{
		document.getElementById("error-curp1").style.display = 'block';
		return false;
	}
}

function validarActoRegistral(tipoActa){
	if(tipoActa!='Seleccione el acto registral'){
		document.getElementById("error-acto").style.display = 'none';
		return true;
	}else{
		document.getElementById("error-acto").style.display = 'block';
		return false;
	}
}

function validarActoRegistralManual(tipoActa){
	if(tipoActa!='Seleccione el acto registral'){
		document.getElementById("error-acto").style.display = 'none';
		return true;
	}else{
		document.getElementById("error-acto").style.display = 'block';
		return false;
	}
}

function validarAmbasPersonas(entidad){
	if(entidad!=0){
		document.getElementById("error-estado").style.display = 'none';
		if (document.getElementById("nombrePersonalMatrimonio").value != "") {
			document.getElementById("error-primeraPersonaNombres").style.display = 'none';
			if (document.getElementById("apellidoPMatrimonio").value != "") {
				document.getElementById("error-primeraPersonaApellidoP").style.display = 'none';
				if (document.getElementById("apellidoMatrimonio").value != "") {
					document.getElementById("error-primeraPersonaApellidoM").style.display = 'none';
					if (document.getElementById("nombrePersonalMatrimonio2").value != "") {
						document.getElementById("error-nombreSegundaPersona").style.display = 'none';
						if (document.getElementById("apellidoPMatrimonio2").value != "") {
							document.getElementById("error-apellidoSegundaPersona").style.display = 'none';
							if (document.getElementById("apellidoMatrimonio2").value != "") {
								document.getElementById("error-apellidoMSegundaPersona").style.display = 'none';
								return true;
							}else{
								document.getElementById("error-apellidoMSegundaPersona").style.display = 'block';
								return false;
							}
						}else{
							document.getElementById("error-apellidoSegundaPersona").style.display = 'block';
							return false;
						}
					}else{
						document.getElementById("error-nombreSegundaPersona").style.display = 'block';
						return false;
					}
				}else{
					document.getElementById("error-primeraPersonaApellidoM").style.display = 'block';
					return false;
				}
			}else{
				document.getElementById("error-primeraPersonaApellidoP").style.display = 'block';
				return false;
			}
		}else{
			document.getElementById("error-primeraPersonaNombres").style.display = 'block';
			return false;
		}
	}else{
		document.getElementById("error-estado").style.display = 'block';
		return false;
	}
	
}








function validarPrimeraPersona(entidad) {
	if(entidad!=0){
		document.getElementById("error-estado").style.display = 'none';
		if (document.getElementById("nombrePersonal").value != "") {
			document.getElementById("error-nombrePersonal").style.display = 'none';
			if (document.getElementById("apellidoP").value != "") {
				document.getElementById("error-apellidoPersonal").style.display = 'none';
				if (document.getElementById("apellidoM").value != "") {
					document.getElementById("error-segundoPersonal").style.display = 'none';
					if (document.getElementById('flexRadioDefault1').checked || document.getElementById('flexRadioDefault2').checked){
						document.getElementById("error-sexo").style.display = 'none';
						var fecha = document.getElementById("fechadeNacimiento").value;
						if (fecha.length == 0) {
							document.getElementById("error-fecha").style.display = 'block';
							return false;
						}else{
							document.getElementById("error-fecha").style.display = 'none';
							return true;
						}
					}else{
						document.getElementById("error-sexo").style.display = 'block';
						return false;
					}
				}else{
					document.getElementById("error-segundoPersonal").style.display = 'block';
					return false;
				}
			}else{
				document.getElementById("error-apellidoPersonal").style.display = 'block';
				return false;
			}
		}else{
			document.getElementById("error-nombrePersonal").style.display = 'block';
			return false;
		}
	}else{
		document.getElementById("error-estado").style.display = 'block';
		return false;
	}
}

function validarAmbasPersonasManual(entidad){
	if(entidad!=0){
		document.getElementById("error-estado").style.display = 'none';
		if (document.getElementById("nombrePersonalMatrimonio").value != "") {
			document.getElementById("error-primeraPersonaNombres").style.display = 'none';
			if (document.getElementById("apellidoPMatrimonio").value != "") {
				document.getElementById("error-primeraPersonaApellidoP").style.display = 'none';
				if (document.getElementById("apellidoMatrimonio").value != "") {
					document.getElementById("error-primeraPersonaApellidoM").style.display = 'none';
					if (document.getElementById("nombrePersonalMatrimonio2").value != "") {
						document.getElementById("error-nombreSegundaPersona").style.display = 'none';
						if (document.getElementById("apellidoPMatrimonio2").value != "") {
							document.getElementById("error-apellidoSegundaPersona").style.display = 'none';
							if (document.getElementById("apellidoMatrimonio2").value != "") {
								document.getElementById("error-apellidoMSegundaPersona").style.display = 'none';
								return true;
							}else{
								document.getElementById("error-apellidoMSegundaPersona").style.display = 'block';
								return false;
							}
						}else{
							document.getElementById("error-apellidoSegundaPersona").style.display = 'block';
							return false;
						}
					}else{
						document.getElementById("error-nombreSegundaPersona").style.display = 'block';
						return false;
					}
				}else{
					document.getElementById("error-primeraPersonaApellidoM").style.display = 'block';
					return false;
				}
			}else{
				document.getElementById("error-primeraPersonaApellidoP").style.display = 'block';
				return false;
			}
		}else{
			document.getElementById("error-primeraPersonaNombres").style.display = 'block';
			return false;
		}
	}else{
		document.getElementById("error-estado").style.display = 'block';
		return false;
	}
	
}

function validarPrimeraPersonaManual(entidad) {
	if(entidad!=0){
		document.getElementById("error-estado").style.display = 'none';
		if (document.getElementById("nombrePersonal").value != "") {
			document.getElementById("error-nombrePersonal").style.display = 'none';
			if (document.getElementById("apellidoP").value != "") {
				document.getElementById("error-apellidoPersonal").style.display = 'none';
				if (document.getElementById("apellidoM").value != "") {
					document.getElementById("error-segundoPersonal").style.display = 'none';
					if (document.getElementById('flexRadioDefault1').checked || document.getElementById('flexRadioDefault2').checked){
						document.getElementById("error-sexo").style.display = 'none';
						var fecha = document.getElementById("fechadeNacimiento").value;
						if (fecha.length == 0) {
							document.getElementById("error-fecha").style.display = 'block';
							return false;
						}else{
							document.getElementById("error-fecha").style.display = 'none';
							return true;
						}
					}else{
						document.getElementById("error-sexo").style.display = 'block';
						return false;
					}
				}else{
					document.getElementById("error-segundoPersonal").style.display = 'block';
					return false;
				}
			}else{
				document.getElementById("error-apellidoPersonal").style.display = 'block';
				return false;
			}
		}else{
			document.getElementById("error-nombrePersonal").style.display = 'block';
			return false;
		}
	}else{
		document.getElementById("error-estado").style.display = 'block';
		return false;
	}
}
