
function addUserModal(rol){
  var data = [];
  var html = '<hr> <br> <form id="addUser"> <div class="form-group">' +
      '<input type="text" name="nombre"  placeholder="Nombre de usuario" class="form-control"></div>'+
      '<input type="password" name="contraseña"  placeholder="Contraseña" class="form-control"></div><br>'+
              '<div class="form-group">'+
                '<select class="form-select" id="rol">'+
                  '<option selected hidden>Selecciona un rol</option>';
  if(rol ==0){
    html = html + '<option value="ejecutivo">Ejecutivo</option>' +
    '</select>'+        
              '</div></form>';
  }else if(rol ==1){
    html = html + '<option value="cliente">Cliente</option>'+
                '</select>'+        
              '</div></form>'+
              '<input type="number" name="telefono"  placeholder="Tipo" class="form-control"></div><br>';
  }
	Swal.fire({
    title: 'Agregar Usuario',
    html:    html,
    confirmButtonText: 'Agregar',
    preConfirm: () => {
      var proceed = true;
      $('#addUser input').each(function() {
        if(!$(this).val()){
          proceed = false;    
        }else{
          data.push($(this).val());
        }
      });
      if(!proceed){
        data = [];
        Swal.showValidationMessage(
          `Debes completar todos los campos.`
        )
      }else if(document.getElementById("rol").value=='Selecciona un rol'){
        data = [];
        Swal.showValidationMessage(
          `Elige un rol para continuar.`
        )
      }
      else{
        data.push(document.getElementById("rol").value);
        window.angularComponentReferenceAdd.zone.run(function() {return window.angularComponentReferenceAdd.loadAngularFunction(data);});
      }
    }  
  })  
}

function editUserModal(usuario){
  var data = [];
  data.push(usuario.id)
  Swal.fire({
    title: 'Editar Usuario',
    html: '<hr>  <form id="editUser"> <div class="form-group">' +
    '<p style="text-align: left;">Nombre:</p>'+
    '<input style="margin-top: -14px;" type="text" name="nombre"  placeholder="Nombre de usuario" value="'+usuario.usuario+'" class="form-control"></div>'+
          
    '<p style="text-align: left;">Telefono:</p>'+
    '<input style="margin-top: -14px;" type="number" name="telefono"  placeholder="Teléfono" value="'+usuario.telefono+'" class="form-control"></div><br>'+   
    '</div></form>',
    confirmButtonText: 'Actualizar',
    preConfirm: () => {
      var proceed = true;
      $('#editUser input').each(function() {
        if(!$(this).val()){
          proceed = false;    
        }else{
          data.push($(this).val());
        }
      });
      if(!proceed){
        data = [];
        Swal.showValidationMessage(
          `Debes completar todos los campos.`
        )
      }else{
        window.angularComponentReferenceEdit.zone.run(function() {return window.angularComponentReferenceEdit.loadAngularFunction(data);});
      }
    }  
  }) 
}

function limiteActasModal(id, limiteActas){
  c
  data.push(id)
  Swal.fire({
    title: 'Editar limite de actas',
    html: '<hr>  <form id="limiteActas"> <div class="form-group">' +
    '<p style="text-align: left;">Limite de actas:</p>'+
    '<input style="margin-top: -14px;" type="number" name="limiteActas"  placeholder="Limite de actas" value="'+limiteActas+'" class="form-control"></div>'+
    '</div></form>',
    confirmButtonText: 'Actualizar',
    preConfirm: () => {
      var proceed = true;
      $('#limiteActas input').each(function() {
        if(!$(this).val()){
          proceed = false;    
        }else{
          data.push($(this).val());
        }
      });
      if(!proceed){
        data = [];
        Swal.showValidationMessage(
        `Debes completar todos los campos.`
      )}else{
        window.angularComponentReferenceLimiteActas.zone.run(function() {return window.angularComponentReferenceLimiteActas.loadAngularFunction(data);});
      }
    }
  })
}

function deleteUserModal(id){
  Swal.fire({
      title: 'Estás seguro que quieres eliminar al usuario?',
      text: "No podrás revertir esta accián!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.angularComponentReferenceDelete.zone.run(function() {return window.angularComponentReferenceDelete.loadAngularFunction(id);});
      }
  })
}

function changeStatusUserModal(id, status){
  if(status==1){
    var msg = 'El usuario no podrá acceder al sistema!'
    var msgBtn = 'Si, inhabilitar usuario!'
    status = 0;
  }else{
    var msg = 'El usuario volverá a tener acceso al sistema!'
    var msgBtn = 'Si, habilitar usuario!'
    status = 1;
  }
  Swal.fire({
      title: 'Estás seguro que quieres cambiar el status del usuario?',
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: msgBtn,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.angularComponentReferenceChangeStatus.zone.run(function() {return window.angularComponentReferenceChangeStatus.loadAngularFunction(id, status);});
      }
  })
}

function pagoManualModal(id, idEjecutivo){
  var data = [];
  var html = '<hr><form id="pagoManual"> <div class="form-group">' +
  '<label>Ingrese la cantidad que se descontara al saldo, si es deudor, validaremos su estado</label>'+
  '<input type="number" name="pagoManual"  placeholder="Cantidad" class="form-control"></div><br>'+    
  '</div></form>';
  Swal.fire({
      title: 'Pago Manual',
      html: html,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
      var proceed = true;
      $('#pagoManual input').each(function() {
        if(!$(this).val()){
          proceed = false;    
        }else{
          data.push($(this).val());
        }
      });
      if(!proceed){
        data = [];
        Swal.showValidationMessage(
        `Debes completar todos los campos.`
      )}else{
        window.angularComponentReferencePagoManual.zone.run(function() {return window.angularComponentReferencePagoManual.loadAngularFunction(id, idEjecutivo, data);});
      }
    }
      
  })

}

function listadePrecios(id, data) {
  var data2 = [];
  var body=
  '<hr> <br> <form id="listaDePrecios"" > <div class="form-group">' +
  '<h2>NACIMIENTO</h2>'+
  '<label for="Name">Aguascalientes</label>'+
  '<input type="number" name="estado1"  placeholder="AGUASCALIENTES" value="'+data.precios.n0+'" class="form-control"></div>'+
  '<label for="Name">Baja California</label>'+
  '<input type="number" name="estado2"  placeholder="BAJA CALIFORNIA" value="'+data.precios.n1+'" class="form-control"></div><br>'+
  '<label for="Name">Baja California Sur</label>'+
  '<input type="number" name="estado3"  placeholder="BAJA CALIFORNIA SUR" value="'+data.precios.n2+'" class="form-control"></div><br>'+
  '<label for="Name">Campeche</label>'+
  '<input type="number" name="estado4"  placeholder="CAMPECHE" value="'+data.precios.n3+'" class="form-control"></div><br>'+
  '<label for="Name">Chiapas</label>'+
  '<input type="number" name="estado5"  placeholder="CHIAPAS" value="'+data.precios.n4+'" class="form-control"></div><br>'+
  '<label for="Name">Chihuahua</label>'+
  '<input type="number" name="estado6"  placeholder="CHIHUAHUA" value="'+data.precios.n5+'" class="form-control"></div><br>'+
  '<label for="Name">Distrito Federal</label>'+
  '<input type="number" name="estado7"  placeholder="DISTRITO FEDERAL" value="'+data.precios.n6+'" class="form-control"></div><br>'+
  '<label for="Name">Coahuila de Zaragoza</label>'+
  '<input type="number" name="estado8"  placeholder="COAHUILA DE ZARAGOZA" value="'+data.precios.n7+'" class="form-control"></div><br>'+
  '<label for="Name">Colima</label>'+
  '<input type="number" name="estado9"  placeholder="COLIMA" value="'+data.precios.n8+'" class="form-control"></div><br>'+
  '<label for="Name">Durango</label>'+
  '<input type="number" name="estado10"  placeholder="DURANGO" value="'+data.precios.n9+'" class="form-control"></div><br>'+
  '<label for="Name">Guanajuato</label>'+
  '<input type="number" name="estado11"  placeholder="GUANAJUATO" value="'+data.precios.n10+'" class="form-control"></div><br>'+
  '<label for="Name">Guerrero</label>'+
  '<input type="number" name="estado12"  placeholder="GUERRERO" value="'+data.precios.n11+'" class="form-control"></div><br>'+
  '<label for="Name">Hidalgo</label>'+
  '<input type="number" name="estado13"  placeholder="HIDALGO" value="'+data.precios.n12+'" class="form-control"></div><br>'+
  '<label for="Name">Jalisco</label>'+
  '<input type="number" name="estado14"  placeholder="JALISCO" value="'+data.precios.n13+'" class="form-control"></div><br>'+
  '<label for="Name">Estado de Mexico</label>'+
  '<input type="number" name="estado15"  placeholder="ESTADO DE MEXICO" value="'+data.precios.n14+'" class="form-control"></div><br>'+
  '<label for="Name">Michoacan</label>'+
  '<input type="number" name="estado16"  placeholder="MICHOACAN" value="'+data.precios.n15+'" class="form-control"></div><br>'+
  '<label for="Name">Morelos</label>'+
  '<input type="number" name="estado17"  placeholder="MORELOS" value="'+data.precios.n16+'" class="form-control"></div><br>'+
  '<label for="Name">Nayarit</label>'+
  '<input type="number" name="estado18"  placeholder="NAYARIT" value="'+data.precios.n17+'" class="form-control"></div><br>'+
  '<label for="Name">Nuevo Leon</label>'+
  '<input type="number" name="estado19"  placeholder="NUEVO LEON" value="'+data.precios.n18+'" class="form-control"></div><br>'+
  '<label for="Name">Oaxaca</label>'+
  '<input type="number" name="estado20"  placeholder="OAXACA" value="'+data.precios.n19+'" class="form-control"></div><br>'+
  '<label for="Name">Puebla</label>'+
  '<input type="number" name="estado21"  placeholder="PUEBLA" value="'+data.precios.n20+'" class="form-control"></div><br>'+
  '<label for="Name">Queretaro</label>'+
  '<input type="number" name="estado22"  placeholder="QUERETARO" value="'+data.precios.n21+'" class="form-control"></div><br>'+
  '<label for="Name">Quintana Roo</label>'+
  '<input type="number" name="estado23"  placeholder="QUINTANA ROO" value="'+data.precios.n22+'" class="form-control"></div><br>'+
  '<label for="Name">San Luis Potosi</label>'+
  '<input type="number" name="estado24"  placeholder="SAN LUIS POTOSI" value="'+data.precios.n23+'" class="form-control"></div><br>'+
  '<label for="Name">Sinaloa</label>'+
  '<input type="number" name="estado25"  placeholder="SINALOA" value="'+data.precios.n24+'" class="form-control"></div><br>'+
  '<label for="Name">Sonora</label>'+
  '<input type="number" name="estado26"  placeholder="SONORA" value="'+data.precios.n25+'" class="form-control"></div><br>'+
  '<label for="Name">Tabasco</label>'+
  '<input type="number" name="estado27"  placeholder="TABASCO" value="'+data.precios.n26+'" class="form-control"></div><br>'+
  '<label for="Name">Tamaulipas</label>'+
  '<input type="number" name="estado28"  placeholder="TAMAULIPAS" value="'+data.precios.n27+'" class="form-control"></div><br>'+
  '<label for="Name">Tlaxcala</label>'+
  '<input type="number" name="estado29"  placeholder="TLAXCALA" value="'+data.precios.n28+'" class="form-control"></div><br>'+
  '<label for="Name">Veracruz</label>'+
  '<input type="number" name="estado30"  placeholder="VERACRUZ" value="'+data.precios.n29+'" class="form-control"></div><br>'+
  '<label for="Name">Yucatan</label>'+
  '<input type="number" name="estado31"  placeholder="YUCATAN" value="'+data.precios.n30+'" class="form-control"></div><br>'+
  '<label for="Name">Zacatecas</label>'+
  '<input type="number" name="estado32"  placeholder="ZACATECAS" value="'+data.precios.n31+'" class="form-control"></div><br>'+
  '<label for="Name">Nacidos en el extranjero</label>'+
  '<input type="number" name="estado33gir m"  placeholder="NACIDO EN EL EXTRANJERO" value="'+data.precios.n32+'" class="form-control"></div><br>'+
  '<h2>DEFUNCION</h2>'+
  '<input type="number" name="defuncionActa"  placeholder="" value="'+data.precios.n33+'" class="form-control"></div>'+
  '<h2>MATRIMONIO</h2>'+
  '<input type="number" name="matrimonioActa" value="'+data.precios.n34+'"  placeholder="" class="form-control"></div>'+
  '<h2>DIVORCIO</h2>'+
  '<input type="number" name="divorcioActa"  placeholder="" value="'+data.precios.n35+'" class="form-control"></div>'+
  '<h2>CORRECIONES DE CURP</h2>'+
  '<input type="number" name="defuncionActa"  placeholder="" value="'+data.precios.n36+'" class="form-control"></div>'+
  '<h2>HOMONIMIAS</h2>'+
  '<input type="number" name="defuncionActa"  placeholder="" value="'+data.precios.n37+'" class="form-control"></div>'+
  '<br>'+
  '<h2>ALTAS DE CURP PRIMERA VEZ</h2>'+
  '<input type="number" name="defuncionActa"  placeholder="" value="'+data.precios.n38+'" class="form-control"></div>'+
  '<br>'+
  '<h2>CONSTANCIAS DE INHABILITACION (SOLO CHIAPAS)</h2>'+
  '<input type="number" name="defuncionActa"  placeholder="" value="'+data.precios.n39+'" class="form-control"></div>'+
  '<br>'+
  '<h2>CONSTANCIAS DE SITUACION FISCAL</h2>'+
  '<input type="number" name="defuncionActa"  placeholder="" value="'+data.precios.n40+'" class="form-control"></div>'+
    '<div class="form-group">';

  Swal.fire({
    title: 'Actualizar Precios',
    html: body,
    width: 700,
    icon: 'info',
    showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar!',
      cancelButtonText: 'Cancelar',
    preConfirm: () => {
      var proceed = true;
      $('#listaDePrecios input').each(function() {
        if(!$(this).val()){
          proceed = false;    
        }else{
          data2.push($(this).val());
        }
      });
      if(!proceed){
        data2 = [];
        Swal.showValidationMessage(
        `Debes completar todos los campos.`
      )}else{
        window.angularComponentReferenceListaPrecios.zone.run(function() {return window.angularComponentReferenceListaPrecios.loadAngularFunction(id, data2, data);});
      }
    } 
  })
}
function comprobante2(comprobante) {
  Swal.fire({
    title: 'Comprobante',
    imageUrl: 'https://actasalinstante.com:3031/comprobantes/'+comprobante+'.jpg',
    imageAlt: 'Custom image',
  })
}

function addSubcliente(id, IdEjecutivo){
  var data = [];
  var html = '<hr> <br> <form id="addSubcliente"> <div class="form-group">' +
  '<input type="text" name="nombre"  placeholder="Nombre de usuario" class="form-control"></div>'+
  '<input type="password" name="contraseña"  placeholder="Contraseña" class="form-control"></div><br>'+
  '<input type="number" name="telefono"  placeholder="Teléfono" class="form-control"></div><br>';
  Swal.fire({
    title: 'Subcliente',
    html:    html,
    confirmButtonText: 'Agregar',
    preConfirm: () => {
      var proceed = true;
      $('#addSubcliente input').each(function() {
        if(!$(this).val()){
          proceed = false;    
        }else{
          data.push($(this).val());
        }
      });
      if(!proceed){
        data = [];
        Swal.showValidationMessage(
          `Debes completar todos los campos.`
        )
      }
      else{
        window.angularComponentReferenceAddSubCliente.zone.run(function() {return window.angularComponentReferenceAddSubCliente.loadAngularFunction(data, id, IdEjecutivo);});
      }
    }    
  })  
}