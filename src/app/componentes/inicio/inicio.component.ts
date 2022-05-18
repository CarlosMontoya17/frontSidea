import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RestService } from '../historial/rest.service';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


//Servicios
import { ReadService } from './models/read.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  Buscar = faMagnifyingGlass;
  borrar = faEraser;

  tipodebusqueda: any = 'Seleccione el tipo de busqueda';
  actoRegistral: any = '  Seleccione el acto registral';
  preview: any = 0;
  entidadValue: any = 0;
  entidad: any = 'Entidad registro';
  bdEstado: any;
  curp: any = '';
  nose: any;
  result: any = [];
  usuario: any = 'Usuario';

  pdfSrc: any;
  fecha_actual: any = new Date();
  fecha: any;
  cadenadigital:any;






  data: any;
  mostrarLoader: any = 0;
  tokenUno: any;
  tokenDos: any;
  nombres: any;
  primerApellido: any;
  segundoApellido: any;
  sexo: any;
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


  estadoxRc:any;
  municipios:any = []

  constructor(private router: Router, private restservice: RestService, private readJson:ReadService) { }




  onChnageEntidad(value: any) {
    this.entidadValue = value;
  }
  //CERRAMOS SESION
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }
  //SE OBTIENEN LOS MUNICIPIOS
  async obtainMunicipios(key:string){
    if(key != undefined){
      await this.readJson.readMunicipios(key).subscribe(data => {
            this.municipios = data;
          });
    }
    

  }
  
   //RECARGAMOS LA PAGINA POR SI MISMA
   reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }



  //BUSCAR POR CURP
  async buscar() {
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
    

    // {
    //   "type": "CURP",
    //   "metadata": {"type":"NACIMIENTO","state":"OAXACA","curp":"NACK990503HRRSV07"}
    // }
    let datosdeenvio = [];
    if (this.tipodebusqueda == '1') {
      datosdeenvio.push(
        {
          "type": "CURP",
          "metadata": { "type": this.acto, "state": this.entidad, "curp": this.curp.toUpperCase() }
        }
      );
    }
    else if (this.tipodebusqueda == '2') {
      datosdeenvio.push(
        {
          "type": "Cadena Digital",
	"metadata": {"cadena":this.cadenadigital}
        }
      );
    }
   
    else  if (this.tipodebusqueda == '3') {
      var fechas = this.fechaNacimiento.toString().split("-");
      datosdeenvio.push(
        {
          "type": "Datos Personales",
          "metadata": { "type": this.acto, "state": this.entidad,  
          "nombre": this.nombres.toUpperCase(), "primerapellido": this.primerApellido.toUpperCase(), 
          "segundoapelido": this.segundoApellido.toUpperCase(),
           "sexo": this.sexo,
            "fecnac":  fechas[2]+"/"+fechas[1]+"/"+fechas[0] }
        }
      );
    }
   




 const acto = this.restservice.SolicitudactasporCurp(datosdeenvio[0]).toPromise();
 Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Datos enviados ',
  showConfirmButton: false,
  timer: 1500
})
 this.reloadCurrentRoute();
    













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
          this.entidad = 'ESTADO DE MEXICO';
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
    this.tipodebusqueda = event;
  }
  onChangeTwo(event: any) {
    this.actoRegistral = event;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/login');
    }

  }




}
