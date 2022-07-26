import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.css']
})

export class ActasComponent implements OnInit {
  //Icons
  faPaperPlane = faPaperPlane;
  faBook = faBook;
  faFileCirclePlus = faFileCirclePlus;
  faMagnifyingGlass = faMagnifyingGlass;
  faCertificate = faCertificate;
  faFileArrowDown = faFileArrowDown;
  faCheckToSlot = faCheckToSlot;
  faCircleXmark = faCircleXmark;
  faRotate = faRotate;
  faPeopleArrowsLeftRight = faPeopleArrowsLeftRight;
  //DatesOnCut
  dates: any = [];
  dateSelect: any;
  //ComponentsView
  view: number = 0;
  //Actas
  actas: any;

  //NewRequest
  ActoRegistral: string = "ACTA REGISTRAL";
  MetodoBusqueda: string = "MÉTODO DE BUSQUEDA";
  Estado:string = "";
  DatoEnviar: string = "";
  Lock:boolean = false;
  ModalReq:boolean = false;

  constructor(private reqService: RequestsService, private auth:AuthService) { }

  ngOnInit(): void {
    // document.getElementById("typeReq")?.setAttribute("*ngIf", "false");
  }


  switcheableView(i: number) {
    //1 = Solicitudes
    //2 = Nueva
    switch (i) {
      case 1:
        this.getDates();
        break;
      case 2:
        this.getServices();
        break;
      default:
        break;
    }
  }

  getServices() {
    this.view = 2;
  }

  // Dates
  getDates() {
    this.reqService.getMyDatesActasRequest().subscribe((data: any) => {
      this.dates = data;
      this.view = 1;
      this.selectDate(data[0].corte);
    }, (err: any) => {
      //No Identificated!
      console.log(err.error.message);
    });
  }

  selectDate(date: any) {
    this.dateSelect = date;
    this.reqService.getAllActasRequest(this.dateSelect).subscribe((data: any) => {
      this.actas = [];
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
        this.actas.push({
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
    }, (err: any) => {
      console.log(err.error.message);
    });
  }

  SetState(){
    let res = this.DatoEnviar.charAt(11) + this.DatoEnviar.charAt(12);
    switch (res) {
      case 'AS': {
        this.Estado = 'AGUASCALIENTES';
        break;
      }
      case 'BC': {
        this.Estado = 'BAJA CALIFORNIA';
        break;
      }
      case 'BS': {
        this.Estado = 'BAJA CALIFORNIA SUR';
        break;
      }
      case 'CC': {
        this.Estado = 'CAMPECHE';
        break;
      }
      case "CS": {
        this.Estado = 'CHIAPAS';
        break;
      }
      case 'CH': {
        this.Estado = 'CHIHUAHUA';
        break;
      }
      case 'DF': {
        this.Estado = 'DISTRITO FEDERAL';
        break;
      }
      case 'CL': {
        this.Estado = 'COAHUILA DE ZARAGOZA';
        break;
      }
      case 'CM': {
        this.Estado = 'COLIMA';
        break;
      }
      case 'DG': {
        this.Estado = 'DURANGO';
        break;
      }
      case 'GT': {
        this.Estado = 'GUANAJUATO';
        break;
      }
      case 'GR': {
        this.Estado = 'GUERRERO';
        break;
      }
      case 'HG': {
        this.Estado = 'HIDALGO';
        break;
      }
      case 'JC': {
        this.Estado = 'JALISCO';
        break;
      }
      case 'MC': {
        this.Estado = 'MEXICO';
        break;
      }
      case 'MN': {
        this.Estado = 'MICHOACAN';
        break;
      }
      case 'MS': {
        this.Estado = 'MORELOS';
        break;
      }
      case 'NT': {
        this.Estado = 'NAYARIT';
        break;
      }
      case 'NL': {
        this.Estado = 'NUEVO LEON';
        break;
      }
      case 'OC': {
        this.Estado = 'OAXACA';
        break;
      }
      case 'PL': {
        this.Estado = 'PUEBLA';
        break;
      }
      case 'QT': {
        this.Estado = 'QUERETARO';
        break;
      }
      case 'QR': {
        this.Estado = 'QUINTANA ROO';
        break;
      }
      case 'SP': {
        this.Estado = 'SAN LUIS POTOSI';
        break;
      }
      case 'SL': {
        this.Estado = 'SINALOA';
        break;
      }
      case 'SR': {
        this.Estado = 'SONORA';
        break;
      }
      case 'TC': {
        this.Estado = 'TABASCO';
        break;
      }        
      case 'TS': {
        this.Estado = 'Tamaulipas';
        break;
      }
      case 'TL': {
        this.Estado = 'TLAXCALA';
        break;
      }
      case 'VZ': {
        this.Estado = 'Veracruz';
        break;
      }
      case 'YN': {
        this.Estado = 'YUCATAN';
        break;
      }
      case 'ZS': {
        this.Estado = 'ZACATECAS';
        break;
      }
      default: {
        this.Estado = 'NACIDO EN EL EXTRANJERO';
        break;
      }
    }
  }

  verifyCurp(){
    let iniciales = this.DatoEnviar.charAt(0) + this.DatoEnviar.charAt(1) +  this.DatoEnviar.charAt(2) + this.DatoEnviar.charAt(3);
    let año = this.DatoEnviar.charAt(4) + this.DatoEnviar.charAt(5) + this.DatoEnviar.charAt(6) + this.DatoEnviar.charAt(7) + this.DatoEnviar.charAt(8) + this.DatoEnviar.charAt(9);
    let clave = this.DatoEnviar.charAt(10) + this.DatoEnviar.charAt(11) + this.DatoEnviar.charAt(12) + this.DatoEnviar.charAt(13) + this.DatoEnviar.charAt(14) + this.DatoEnviar.charAt(15);
    let numbers = this.DatoEnviar.charAt(16) + this.DatoEnviar.charAt(17);
    var hasNumber = /\d/;
    var hasString = /[A-Za-z]/;

    let one = hasNumber.test(iniciales);
    let two = hasString.test(año);
    let three = hasNumber.test(clave);
    let four = hasString.test(numbers);
    if(!one && !two && !three && !four){
      return true;
    }
    else{
      return false;
    }
  }

  KeyupData() {
    switch (this.MetodoBusqueda) {
      case "CADENA":
        if (this.DatoEnviar.length > 20) {
          this.Lock = false;
          this.DatoEnviar = this.DatoEnviar.slice(0, 20);
        }
        else if(this.DatoEnviar.length == 20){
          this.Lock = true;
          document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOn");
        }
        else{
          this.Lock = false;
          document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
        }
        break;
      case "CURP":
        if (this.DatoEnviar.length > 18) {
          this.Lock = false;
          this.DatoEnviar = this.DatoEnviar.slice(0, 18);
        }
        else if (this.DatoEnviar.length == 18){
          this.DatoEnviar = this.DatoEnviar.toUpperCase();
          this.SetState();
          
          if(this.verifyCurp() == false){
            this.Lock = false;
            document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
            document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(240, 125, 125); color:black;");
            this.Estado = "ERROR DE FORMATO";
          }
          else{
            this.Lock = true;
            document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOn");
            document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(158, 240, 125); color:black;");
          }
        }
        else{
          this.Lock = false;
          document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
          document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(255, 255, 255); color:black;");
          this.Estado = "SIN ENTIDAD";
        }
        break;
      default:
        break;
    }


  }

  SelectMetodoBusqueda(newValue: any) {
    if (newValue != "MÉTODO DE BUSQUEDA") {
      this.DatoEnviar = "";
    }
  }

  SelectActaRegistral(newValue: any) {
    if (newValue != "ACTA REGISTRAL") {
      const metodo = document.getElementById("method");
      metodo?.removeAttribute("disabled");
    }
  }

  EnviarSolicitud(preferences:string){
    this.ModalReq = false;

    let metadata = {};

    if(this.MetodoBusqueda == "CURP")
    {
      metadata = { type:this.ActoRegistral, state: this.Estado, curp: this.DatoEnviar  }
      this.reqService.SendARequest(this.MetodoBusqueda, metadata, preferences).subscribe((data:any) => {
        this.ActoRegistral = "ACTA REGISTRAL";
        this.MetodoBusqueda = "MÉTODO DE BUSQUEDA";
        this.DatoEnviar = "";
        this.Lock = false;
        document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
      }, (err:any) => {
        this.auth.Unauth();
        console.log(err);
      });
    }
    else if(this.MetodoBusqueda == "CADENA"){
      metadata = { cadena: this.DatoEnviar  }
      this.reqService.SendARequest("Cadena Digital", metadata, preferences).subscribe((data:any) => {
        this.ActoRegistral = "ACTA REGISTRAL";
        this.MetodoBusqueda = "MÉTODO DE BUSQUEDA";
        this.DatoEnviar = "";
        this.Lock = false;
        document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
      }, (err:any) => {
        this.auth.Unauth();
        console.log(err);
      });
    }


    
  }

  Solicitar(){
    if(this.Lock){
      this.ModalReq = true;
    }
  }

  DownloadActa(id:any, name:any){
    if(name != null){
      this.reqService.DownloadActa(id).subscribe(data => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(data);
        a.href = objectUrl
        a.download = name;
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
    }
  }


}
