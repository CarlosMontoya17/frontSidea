import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RestService } from '../historial/rest.service';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faFaceGrin } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, switchMap } from 'rxjs';
import * as CryptoJS from 'crypto-js';

//Servicios
import { ReadService } from './models/read.service';
import { DatabaseService } from '../database/database.service';

declare function showDetailsActas(comments: any): any;
declare function loader(): any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  faCheckToSlot = faCheckToSlot;
  faPeopleArrowsLeftRight = faPeopleArrowsLeftRight;
  faCertificate = faCertificate;
  Buscar = faMagnifyingGlass;
  borrar = faEraser;
  faBook = faBook;
  userToUpdateServices: any = [];
  requestsView: boolean = false;
  faRotate = faRotate;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faFileArrowDown = faFileArrowDown;
  faFaceGrin = faFaceGrin;
  tipodebusqueda: any = 'Seleccione el tipo de busqueda';
  actoRegistral: any = 'Seleccione el acto registral';
  preview: any = 0;
  entidadValue: any = 0;
  entidad: any;
  bdEstado: any;
  curp: any = '';
  nose: any;
  result: any = [];
  usuario: any = 'Usuario';
  myRol: any;
  pdfSrc: any;
  fecha_actual: any = new Date();
  fecha: any;
  cadenadigital: any;
  valorabuscar: string = "";
  usernameLocal: string = "";
  alerts: any = [];
  faCircleExclamation = faCircleExclamation;
  id: any;
  //  //

  data: any;
  mostrarLoader: any = 0;
  tokenUno: any;
  tokenDos: any;
  nombres: any;
  primerApellido: any;
  segundoApellido: any;

  ///segunda persona
  nombresSec: any;
  primerApellidoSec: any;
  segundoApellidoSec: any;

  sexo: any = "Mujer";
  fechaNacimiento: any;
  nombrePersonaDos: any;
  primerApellidoPersonaDos: any;
  segundoApellidoPersonaDos: any;

  parametro: any;
  acto: any;

  costo: any = 0;
  costoAdmin: any = 0;
  inicioCorte: any;
  finCorte: any;
  sistema: any = 0;

  datosdeenvio = [];


  estadoxRc: any;
  municipios: any = [];
  estadoSelect: any;
  municipioSelect: any;
  oficialias: any = [];

  oficialiaSelect: any;
  yearActa: any;
  numActa: any;


  showEditServicesModal: boolean = false;
  editServices: boolean = false;

  requests: any = [];
  tipodeservicio: any = 'Seleccione el servicio';
  selectable: Boolean = false;

  dataset$: Observable<any>;

  //
  allUsers: any;
  switchTranspose: boolean = false;
  valorabuscartranspose:string = "";
  newTranspose:any = [];

  constructor(private router: Router, private restservice: RestService, private readJson: ReadService, private database: DatabaseService) {
    this.dataset$ = readJson.getObtainsCards;
    this.dataset$.subscribe((data: any) => {
      // this.requests = data;
    });

    // this.dataset$.subscribe((data:any) => {
    //   this.ProcessData(data);
    //   // console.log( this.requests[0] );
    //   // console.log( "----------------------");
    //   // console.log( data );
    //   // this.requests[0] = data[0];
    // })
  }

  showModal(id: any, name: any, servicios: any) {

    this.userToUpdateServices = [id, name, servicios];
    this.showEditServicesModal = true;



  }


  rol() {
    const token = localStorage.getItem('привіт');
    const usuario = localStorage.getItem('Імякористувача');

    const un = CryptoJS.AES.decrypt(usuario || '{}', "Імякористувача");
    const UserName = un.toString(CryptoJS.enc.Utf8);
    const i = localStorage.getItem('іди');
    const is = CryptoJS.AES.decrypt(i || '{}', "іди");
    const id = is.toString(CryptoJS.enc.Utf8);

    const array = UserName.split('"');
    this.usernameLocal = array[1];

  }


  //DESINCRIPTAMOS EL TOKEN PARA OBTENER LOS DATOS Y EL ROL
  async descry() {


    var idlocal = localStorage.getItem("іди");
    var i = CryptoJS.AES.decrypt(idlocal || '{}', "іди");
    var id: any = i.toString(CryptoJS.enc.Utf8);
    this.id = id;
    this.result.push(id);
    //getmydata
    const data: any = await this.database.getmydata(id).toPromise();
    this.myRol = data.data.rol;
  }



  servicios() {
    if (this.tipodeservicio == "Seleccione el servicio") {
      Swal.fire({
        position: 'center',
        icon: "error",
        title: "Seleccione el nuevo servicio",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      let newService = "";

      switch (this.tipodeservicio) {
        case "all":
          newService = "Todos";
          break;
        case "actas":
          newService = "Sólo Actas";
          break;
        case "rfc":
          newService = "Sólo RFC";
          break;
        case "none":
          newService = "Ninguno";
          break;
        default:
          newService = "";
          break;
      }


      this.restservice.updateServicio(this.userToUpdateServices[0], this.tipodeservicio).subscribe(
        (data: any) => {

          Swal.fire({
            position: 'center',
            icon: "success",
            title: `Se actualizó el servicio para ${this.userToUpdateServices[1]} a ${newService}`,
            showConfirmButton: false,
            timer: 1500
          });

          this.reloadCurrentRoute();
        }

      );


    }




    //this.reloadCurrentRoute();

  }


  autoCompleteDate() {
    if (this.fechaNacimiento.length == 2 || this.fechaNacimiento.length == 5) {
      this.fechaNacimiento = this.fechaNacimiento + "/";
    }

  }


  onChnageEntidad(value: any) {
    this.entidadValue = value;
  }
  clearCURP() {
    this.actoRegistral = "Seleccione el acto registral";
    this.entidad = "";
    this.curp = "";
  }
  ClearCADENADIGITAL() {
    this.cadenadigital = "";

  }
  clearActoRegistral() {
    this.actoRegistral = "Seleccione el acto registral";
    this.entidad = "Seleccione la entidad de registro";
    this.nombres = "";
    this.nombresSec = "";
    this.primerApellido = "";
    this.segundoApellido = "";
    this.fechaNacimiento = "";
  }


  clearDatosdelregistrocivil() {
    this.actoRegistral = "Seleccione el acto registral";
    this.estadoxRc = "";
    this.municipioSelect = "";
    this.oficialiaSelect = "";
    this.yearActa = "";
    this.numActa = "";
    this.fechaNacimiento = "";
  }
  //CERRAMOS SESION
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }
  //SE OBTIENEN LOS MUNICIPIOS
  async obtainMunicipios() {
    this.oficialiaSelect = null;
    this.municipioSelect = null;

    this.oficialias = [];
    this.municipios = [];
    if (this.estadoxRc != undefined) {

      this.estadoSelect = this.estadoxRc;
      let name = this.estadoxRc.split("-");
      await this.readJson.readMunicipios(String(name[1]).slice(1)).subscribe(data => {
        this.municipios = data;
      });
    }
  }


  showDetails(comments: any) {
    showDetailsActas(comments + " Intente con otro tipo de busqueda");
  }


  //OBTENER SOLICITUDES ENVIADAS
  public async obtainARequests() {
    if (this.requestsView == true) {
      this.tipodebusqueda = 'Seleccione el tipo de busqueda';
    }

    this.requests = [];
    const data: any = await this.restservice.obtainActasRequest().toPromise();
    for (let i = 0; i < data.length; i++) {
      let metadata = "";
      switch (data[i].type) {
        case "CURP":

          metadata = "TIPO: " + data[i].metadata.type + "\nCURP: " + data[i].metadata.curp + "\nESTADO: " + data[i].metadata.state;
          break;
        case "Cadena Digital":
          metadata = "CADENA: " + data[i].metadata.cadena;
          break;
        case "Datos Personales":

          if (data[i].metadata.sexo != undefined) {
            metadata = "TIPO: " + data[i].metadata.type + "\nESTADO: " + data[i].metadata.state + "\nNOMBRES: " + data[i].metadata.nombre + "\n1er APELLIDO: " + data[i].metadata.primerapellido + "\n2do APELLIDO: " + data[i].metadata.segundoapelido + "\nSEXO: " + data[i].metadata.sexo + "\nFECHA NAC.: " + data[i].metadata.fecnac;

          }
          else {
            metadata = "TIPO: " + data[i].metadata.type + "\nESTADO: " + data[i].metadata.state + "\nNOMBRES (1): " + data[i].metadata.nombre + "\n1er APELLIDO (1): " + data[i].metadata.primerapellido + "\n2do APELLIDO (1): " + data[i].metadata.segundoapelido + "\nNOMBRES (2): " + data[i].metadata.snombre + "\n1er APELLIDO (2): " + data[i].metadata.sprimerapellido + "\n2do APELLIDO (2): " + data[i].metadata.ssegundoapellido;
          }
          break;
        case "Datos del Registro Civil":
          break;
        default:
          metadata = "";
          break;
      }
      this.requests.push({
        "nm": i + 1,
        "id": data[i].id,
        "type": data[i].type,
        "metadata": metadata,
        "createdAt": data[i].createdAt,
        "send": data[i].send,
        "comments": data[i].comments,
        "url": data[i].url,
        "idtranspose": data[i].idtranspose,
        "downloaded": data[i].downloaded
      });
    }



    //  console.log(this.requests);

  }

  //RECARGAMOS LA PAGINA POR SI MISMA
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  //SE OBTIENEN LAS OFICIALIAS
  async getOfic() {
    this.oficialiaSelect = null;
    this.oficialias = [];


    if (this.municipioSelect != undefined) {
      let parts = this.municipioSelect.split("-");
      let id = Number(parts[0]);
      let name = this.estadoSelect.split("-");
      await this.readJson.readOficialia(String(name[1]).slice(1), id).subscribe(data => {
        this.oficialias = data;
      });
    }

  }

  resetOficialia() {
    // this.oficialiaSelect = null;
  }


  view() {
    this.requestsView = !this.requestsView;
    this.obtainARequests();
  }

  async downloadActa(id: any, url: any) {
    if (url != null) {
      await this.restservice.getMyActa(id).subscribe(data => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(data)
        a.href = objectUrl
        a.download = url;
        a.click();
        URL.revokeObjectURL(objectUrl);
        // this.reloadCurrentRoute();
        // this.readJson.setViewCards(true);
      });
    }
  }

  curpValida(curp: any) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      validado = curp.match(re);

    if (!validado)  //Coincide con el formato general?
      return false;

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17: any) {
      //Fuente https://consultas.curp.gob.mx/CurpSP/
      var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
        lngSuma = 0.0,
        lngDigito = 0.0;
      for (var i = 0; i < 17; i++)
        lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
      lngDigito = 10 - lngSuma % 10;
      if (lngDigito == 10) return 0;
      return lngDigito;
    }

    if (validado[2] != digitoVerificador(validado[1]))
      return false;

    return true; //Validado
  }


  switchSelectable() {
    if (this.curp.length > 0) {
      this.curp = this.curp.toUpperCase();
    }
    switch (this.actoRegistral) {
      case "1": {
        this.acto = 'NACIMIENTO';
        break;
      }
      case "2": {
        this.acto = 'DEFUNCION';

        break;
      }
      case "3": {
        this.acto = 'MATRIMONIO';

        break;
      }
      case "4": {
        this.acto = 'DIVORCIO';
        break;
      }
    }
    /* Acto por curp   */
    if (this.tipodebusqueda == '1') {

      if (this.acto == "" || this.acto == undefined) {
        Swal.fire(
          {
            position: 'center',
            icon: 'error',
            title: 'Llena todos los campos',
            showConfirmButton: false,
            timer: 1500
          }
        );
      }
      else
        if (this.curp == "" || this.curp.length < 18) {


          let digit = this.curp.length;

          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: `Te hacen falta ${Math.abs(18 - Number(digit))} digitos en la CURP`,
              showConfirmButton: false,
              timer: 1500
            }
          );

        }
        else if (this.curp.length > 18) {
          let digit = this.curp.length;
          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: `Te sobran ${Math.abs(18 - Number(digit))} digitos en la CURP`,
              showConfirmButton: false,
              timer: 1500
            }
          );
        }
        else



          if (this.curpValida(this.curp)) {
            // ⬅️ Acá se comprueba
            let valido = "Válido";

            //console.log(valido);
            this.selectable = !this.selectable;

          }



          else {


            let valido = "El Formato de Curp No Es El Correcto ";
            //console.log(valido);

            Swal.fire({

              showClass: {
                popup: 'animate__animated animate__fadeInDown'


              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },

              title: "<h1 style='color:red'>" + '❗❗❗😡ERROR😡❗❗❗' + "</h1>",




              html: "<h3 style='color:back'>" + valido + "</h3>",
              imageUrl: 'assets/image1.png',
              imageWidth: 1980,
              imageHeight: 400,
              imageAlt: 'Custom image',

            })


          }


    }

    /*Cadena Digital*/

    else if (this.tipodebusqueda == '2') {
      try {
        if (this.cadenadigital == undefined || this.cadenadigital.length != 20) {
          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: 'Llena todos los campos',
              showConfirmButton: false,
              timer: 1500
            }
          );
          this.alerts = ["Ingresa todos los datos"];

          if (this.cadenadigital == 0 || this.cadenadigital.length < 20) {
            let digit = this.cadenadigital.length;
            Swal.fire(
              {
                position: 'center',
                icon: 'error',
                title: `Te hacen falta ${Math.abs(20 - Number(digit))} digito(s) en la CADENA DIGITAL`,
                showConfirmButton: false,
                timer: 1500
              }
            );
            this.alerts = [`Te hacen falta ${Math.abs(20 - Number(digit))} digito(s) en la CADENA DIGITAL`];

          } else if (this.cadenadigital.length > 20) {
            let digit = this.cadenadigital.length;
            Swal.fire(
              {
                position: 'center',
                icon: 'error',
                title: `Te sobran ${Math.abs(20 - Number(digit))} digito(s) en la CADENA DIGITAL`,
                showConfirmButton: false,
                timer: 1500
              }
            );

            this.alerts = [`Te sobran ${Math.abs(20 - Number(digit))} digito(s) en la CADENA DIGITAL`];

          }
        }
        else {

          this.selectable = !this.selectable;
        }
      }
      catch {
        Swal.fire(
          {
            position: 'center',
            icon: 'error',
            title: 'Llena todos los campos',
            showConfirmButton: false,
            timer: 1500
          }
        );
      }

    }
    else if (this.tipodebusqueda == '3') {
      if (this.acto != "MATRIMONIO" && this.acto != "DIVORCIO") {

        if (this.acto == "" || this.acto == undefined
          || this.entidad == "" || this.entidad == undefined
          || this.nombres == "" || this.nombres == undefined
          || this.sexo == "" || this.sexo == undefined
          || this.fechaNacimiento == "" || this.fechaNacimiento == undefined) {
          this.alerts = ["Ingresa todos los datos"];
          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: 'Llena todos los campos',
              showConfirmButton: false,
              timer: 1500
            }
          );
        }
        else if (this.fechaNacimiento == "" || this.fechaNacimiento.length < 10) {
          let digit = this.fechaNacimiento.length;

          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: `Te hacen falta ${Math.abs(10 - Number(digit))} digitos en la Fecha de Nacimiento`,
              showConfirmButton: false,
              timer: 1500
            }
          );

        }
        else if (this.fechaNacimiento.length > 10) {
          let digit = this.fechaNacimiento.length;
          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: `Te sobran ${Math.abs(10 - Number(digit))} digitos en la Fecha de Nacimiento`,
              showConfirmButton: false,
              timer: 1500
            }
          );
        }
        else {
          try {
            var fechas = this.fechaNacimiento.toString().split("-");
            this.selectable = !this.selectable;

          } catch (error) {
            this.alerts = ["Ingresa todos los datos"];
            Swal.fire(
              {
                position: 'center',
                icon: 'error',
                title: 'Llena todos los campos',
                showConfirmButton: false,
                timer: 1500
              }
            );
          }

        }
      }
      else {
        if (this.acto == "" || this.acto == undefined) {
          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: 'Llena todos los campos',
              showConfirmButton: false,
              timer: 1500
            }
          );
        }
        else if (this.curp == "" || this.curp.length < 18) {


          let digit = this.curp.length;

          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: `Te hacen falta ${Math.abs(18 - Number(digit))} digitos en la CURP`,
              showConfirmButton: false,
              timer: 1500
            }
          );

        }
        else if (this.curp.length > 18) {
          let digit = this.curp.length;
          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: `Te sobran ${Math.abs(18 - Number(digit))} digitos en la CURP`,
              showConfirmButton: false,
              timer: 1500
            }
          );
        }
        else {
          this.selectable = !this.selectable;
        }
      }
    }



  }

  //BUSCAR POR CURP
  async buscar(pref: string) {
    switch (this.actoRegistral) {
      case "1": {
        this.acto = 'NACIMIENTO';
        break;
      }
      case "2": {
        this.acto = 'DEFUNCION';

        break;
      }
      case "3": {
        this.acto = 'MATRIMONIO';

        break;
      }
      case "4": {
        this.acto = 'DIVORCIO';
        break;
      }
    }

    let datosdeenvio = [];
    if (this.tipodebusqueda == '1') {
      if (this.curp.length == 18 && this.acto != undefined && this.acto != "") {
        datosdeenvio.push(
          {
            "type": "CURP",
            "metadata": { "type": this.acto, "state": this.entidad, "curp": this.curp.toUpperCase() },
            "preferences": pref
          }
        );
      }
    }
    else if (this.tipodebusqueda == '2') {
      try {
        if (this.cadenadigital != undefined || this.cadenadigital.length == 20) {
          datosdeenvio.push(
            {
              "type": "Cadena Digital",
              "metadata": { "cadena": this.cadenadigital },
              "preferences": pref
            }
          );
        }
      }
      catch {
        Swal.fire(
          {
            position: 'center',
            icon: 'error',
            title: 'Llena todos los campos',
            showConfirmButton: false,
            timer: 1500
          }
        );
      }
    }


    else if (this.tipodebusqueda == '3') {
      if (this.acto != "MATRIMONIO" && this.acto != "DIVORCIO") {
        try {
          var fechas = this.fechaNacimiento.toString().split("-");
          datosdeenvio.push(
            {
              "type": "Datos Personales",
              "metadata": {
                "type": this.acto, "state": this.entidad,
                "nombre": this.nombres.toUpperCase(), "primerapellido": this.primerApellido.toUpperCase(),
                "segundoapelido": this.segundoApellido.toUpperCase(),
                "sexo": this.sexo,
                "fecnac": fechas
              },
              "preferences": pref
            }
          );
        } catch (error) {
          this.alerts = ["Ingresa todos los datos"];
          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: 'Llena todos los campos',
              showConfirmButton: false,
              timer: 1500
            }
          );
        }
      }
      else {
        if (this.actoRegistral == "" || this.actoRegistral == undefined
          || this.entidad == "" || this.entidad == undefined
          || this.nombres == "" || this.nombres == undefined
          || this.primerApellido == "" || this.primerApellido == undefined

          || this.nombresSec == "" || this.nombresSec == undefined
          || this.primerApellidoSec == "" || this.primerApellidoSec == undefined
          || this.segundoApellidoSec == "" || this.segundoApellidoSec == undefined) {
          Swal.fire(
            {
              position: 'center',
              icon: 'error',
              title: 'Llena todos los campos',
              showConfirmButton: false,
              timer: 1500
            }
          );

        }
        else
          if (this.curp.length == 18 && this.acto != undefined && this.acto != "") {
            datosdeenvio.push(
              {
                "type": "Datos Personales",
                "metadata": {
                  "type": this.acto,
                  "state": this.entidad,
                  "nombre": this.nombres.toUpperCase(),
                  "primerapellido": this.primerApellido.toUpperCase(),
                  "segundoapelido": this.segundoApellido.toUpperCase(),
                  "snombre": this.nombresSec.toUpperCase(),
                  "sprimerapellido": this.primerApellidoSec.toUpperCase(),
                  "ssegundoapellido": this.segundoApellidoSec.toUpperCase()
                },
                "preferences": pref
              }
            );
          }
          else {
            try {
              datosdeenvio.push(
                {
                  "type": "Datos Personales",
                  "metadata": {
                    "type": this.acto,
                    "state": this.entidad,
                    "nombre": this.nombres.toUpperCase(),
                    "primerapellido": this.primerApellido.toUpperCase(),
                    "segundoapelido": this.segundoApellido.toUpperCase(),
                    "snombre": this.nombresSec.toUpperCase(),
                    "sprimerapellido": this.primerApellidoSec.toUpperCase(),
                    "ssegundoapellido": this.segundoApellidoSec.toUpperCase()
                  },
                  "preferences": pref
                }
              );
            } catch (error) {
              this.alerts = ["Ingresa todos los datos"];
              Swal.fire(
                {
                  position: 'center',
                  icon: 'error',
                  title: 'Llena todos los campos',
                  showConfirmButton: false,
                  timer: 1500
                }
              );

            }
          }

      }
    }
    // else if (this.tipodebusqueda == '4') {
    //   datosdeenvio.push(
    //     {
    //       "type": "Datos del Registro civil",
    //       "metadata": {
    //         "type": this.acto, "state": this.estadoSelect,
    //         "municipio": this.nombres.toUpperCase(), "primerapellido": this.primerApellido.toUpperCase(),
    //         "segundoapellido": this.segundoApellido.toUpperCase(),
    //         "sexo": this.sexo,
    //         "fecnac": fechas[2] + "/" + fechas[1] + "/" + fechas[0]
    //       }
    //     }
    //   );
    // }



    if (datosdeenvio.length != 0) {
      this.restservice.SolicitudactasporCurp(datosdeenvio[0]).subscribe((data: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Datos enviados ',
          showConfirmButton: false,
          timer: 1500
        })
        this.reloadCurrentRoute();
        this.readJson.setViewCards(false);
      });
    }



  }


  obtainAllUsers(id:any) {
    //getuser
    this.switchTranspose = !this.switchTranspose;


    if (this.switchTranspose == true) {
      this.newTranspose = id;


      this.restservice.getuser().subscribe((data: any) =>  {
        this.allUsers = data;

      });
    }
    else{
      this.allUsers = [];
    }

  }


  reAsignarActas(idProvider:any){
    this.switchTranspose = false;
    this.restservice.reAsignarActa(this.newTranspose, idProvider, "actas").subscribe((data:any) => {
      Swal.fire(
        {
          position: 'center',
          icon: 'success',
          title: 'Re-Asignado',
          showConfirmButton: false,
          timer: 1500
        }
      );

      this.reloadCurrentRoute();
    }, (error:any) => {
      Swal.fire(
        {
          position: 'center',
          icon: 'error',
          title: 'Contacte al equipo de soporte',
          showConfirmButton: false,
          timer: 1500
        }
      );
      this.reloadCurrentRoute();
    });


  }

  clearAllVariables() {
    this.acto = undefined;
    this.entidad = undefined;
  }

  onChangeCurp(curp: any) {
    if (curp.length == 18) {
      this.curp = curp;
      var res = curp.charAt(11) + curp.charAt(12)
      switch (res.toUpperCase()) {
        case 'AS': {
          this.entidadValue = 1;
          this.entidad = 'AGUASCALIENTES';
          this.bdEstado = 'n0';
          this.nose = "1";
          break;
        }
        case 'BC': {
          this.entidadValue = 2;
          this.entidad = 'BAJA CALIFORNIA';
          this.bdEstado = 'n1';
          this.nose = "2";
          break;
        }
        case 'BS': {
          this.entidadValue = 3;
          this.entidad = 'BAJA CALIFORNIA SUR';
          this.bdEstado = 'n2';
          this.nose = "3";
          break;
        }
        case 'CC': {
          this.entidadValue = 4;
          this.entidad = 'CAMPECHE';
          this.bdEstado = 'n3';
          this.nose = "4";
          break;
        }
        case "CS": {
          this.entidadValue = 7;
          this.entidad = 'CHIAPAS';
          this.bdEstado = 'n4';
          this.nose = "5";
          break;
        }
        case 'CH': {
          this.entidadValue = 8;
          this.entidad = 'CHIHUAHUA';
          this.bdEstado = 'n5';
          this.nose = "6";
          break;
        }
        case 'DF': {
          this.entidadValue = 9;
          this.entidad = 'DISTRITO FEDERAL';
          this.bdEstado = 'n6';
          this.nose = "7";
          break;
        }
        case 'CL': {
          this.entidadValue = 5;
          this.entidad = 'COAHUILA DE ZARAGOZA';
          this.bdEstado = 'n7';
          this.nose = "8";
          break;
        }
        case 'CM': {
          this.entidadValue = 6;
          this.entidad = 'COLIMA';
          this.bdEstado = 'n8';
          this.nose = "9";
          break;
        }
        case 'DG': {
          this.entidadValue = 10;
          this.entidad = 'DURANGO';
          this.bdEstado = 'n9';
          this.nose = "10";
          break;
        }
        case 'GT': {
          this.entidadValue = 11;
          this.entidad = 'GUANAJUATO';
          this.bdEstado = 'n10';
          this.nose = "11";
          break;
        }
        case 'GR': {
          this.entidadValue = 12;
          this.entidad = 'GUERRERO';
          this.bdEstado = 'n11';
          this.nose = "12";
          break;
        }
        case 'HG': {
          this.entidadValue = 13;
          this.entidad = 'HIDALGO';
          this.bdEstado = 'n12';
          this.nose = "13";
          break;
        }
        case 'JC': {
          this.entidadValue = 14;
          this.entidad = 'JALISCO';
          this.bdEstado = 'n13';
          this.nose = "14";
          break;
        }
        case 'MC': {
          this.entidadValue = 15;
          this.entidad = 'MEXICO';
          this.bdEstado = 'n14';
          this.nose = "15";
          break;
        }
        case 'MN': {
          this.entidadValue = 16;
          this.entidad = 'MICHOACAN';
          this.bdEstado = 'n15';
          this.nose = "16";
          break;
        }
        case 'MS': {
          this.entidadValue = 17;
          this.entidad = 'MORELOS';
          this.bdEstado = 'n16';
          this.nose = "17";
          break;
        }
        case 'NT': {
          this.entidadValue = 18;
          this.entidad = 'NAYARIT';
          this.bdEstado = 'n17';
          this.nose = "18";
          break;
        }
        case 'NL': {
          this.entidadValue = 19;
          this.entidad = 'NUEVO LEON';
          this.bdEstado = 'n18';
          this.nose = "19";
          break;
        }
        case 'OC': {
          this.entidadValue = 20;
          this.entidad = 'OAXACA';
          this.bdEstado = 'n19';
          this.nose = "20";
          break;
        }
        case 'PL': {
          this.entidadValue = 21;
          this.entidad = 'PUEBLA';
          this.bdEstado = 'n20';
          this.nose = "21";
          break;
        }
        case 'QT': {
          this.entidadValue = 22;
          this.entidad = 'QUERETARO';
          this.bdEstado = 'n21';
          this.nose = "22";
          break;
        }
        case 'QR': {
          this.entidadValue = 23;
          this.entidad = 'QUINTANA ROO';
          this.bdEstado = 'n22';
          this.nose = "23";
          break;
        }
        case 'SP': {
          this.entidadValue = 24;
          this.entidad = 'SAN LUIS POTOSI';
          this.bdEstado = 'n23';
          this.nose = "24";
          break;
        }
        case 'SL': {
          this.entidadValue = 25;
          this.entidad = 'SINALOA';
          this.bdEstado = 'n24';
          this.nose = "25";
          break;
        }
        case 'SR': {
          this.entidadValue = 26;
          this.entidad = 'SONORA';
          this.bdEstado = 'n25';
          this.nose = "26";
          break;
        }
        case 'TC': {
          this.entidadValue = 27;
          this.entidad = 'TABASCO';
          this.bdEstado = 'n26';
          this.nose = "27";
          break;
        }
        case 'TS': {
          this.entidadValue = 28;
          this.entidad = 'TAMAULIPAS';
          this.bdEstado = 'n27';
          this.nose = "28";
          break;
        }
        case 'TL': {
          this.entidadValue = 29;
          this.entidad = 'TLAXCALA';
          this.bdEstado = 'n28';
          this.nose = "29";
          break;
        }
        case 'VZ': {
          this.entidadValue = 30;
          this.entidad = 'VERACRUZ';
          this.bdEstado = 'n29';
          this.nose = "30";
          break;
        }
        case 'YN': {
          this.entidadValue = 31;
          this.entidad = 'YUCATAN';
          this.bdEstado = 'n30';
          this.nose = "31";
          break;
        }
        case 'ZS': {
          this.entidadValue = 32;
          this.entidad = 'ZACATECAS';
          this.bdEstado = 'n31';
          this.nose = "32";
          break;
        }
        default: {
          this.entidadValue = 39;
          this.entidad = 'NACIDO EN EL EXTRANJERO';
          this.bdEstado = 'n32';
          this.nose = "33";
          break;
        }
      }
    } else {
      this.entidad = 'Entidad de registro';
    }
  }
  administrar() {
    this.router.navigateByUrl("/administrar");
  }
  historial() {
    this.router.navigateByUrl("/historial");
  }
  onChange(event: any) {
    if (this.requestsView == true) {
      this.requestsView = false;
    }
    this.tipodebusqueda = event;
    // console.log(event);
  }
  onChangeTwo(event: any) {

    this.actoRegistral = event;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('привіт');
    if (!token) {
      this.router.navigateByUrl('/login');
    }

    this.descry();
    this.requestsView = this.readJson.getViewCards();
    if (this.requestsView == true) {
      this.obtainARequests();
    }
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('Імякористувача') || '{}', "Імякористувача");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName?.split('"');
    this.usuario = arreglo[1];

  }




}

