import { Component, OnInit } from '@angular/core';
//Services
import { RequestsService } from 'src/app/services/requests/requests.service';
import { AuthService } from 'src/app/services/auth/auth.service';
//Models
import { myData } from 'src/app/models/myData.model';
//Icons
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
//JS
declare function LoaderModal():any;
declare function closeAlert():any;
declare function OkStatus(msg:any):any;
@Component({
  selector: 'app-rfcs',
  templateUrl: './rfcs.component.html',
  styleUrls: ['./rfcs.component.css']
})
export class RfcsComponent implements OnInit {
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
  //MyData
  myRol:string = "";
  id:string = "";
  //Values New Req
  MetodoBusqueda: string = "MÉTODO DE BUSQUEDA";
  Persona: string = "PERSONA";
  DatoEnviar: string = "";
  Estado: string = "";
  //RFCs
  rfcs:any = [];
  dates:any = [];
  dateSelect:any;
  //Views
  view:number = 0;

  constructor(private req:RequestsService, private auth: AuthService) {
    auth.GetMyData.subscribe(data => {
      this.myRol = data.rol;
      this.id = data.id.toString();
    });
   }

  ngOnInit(): void {

  }

  //Views
  switcheableView(i: number) {
    //1 = Solicitudes
    //2 = Nueva
    switch (i) {
      case 1:
        this.view = 1;
        this.GetMyDates();
        break;
      case 2:
        this.view = 2;
        break;
      default:
        this.view = 0;
        break;
    }
  }


  //New Request
  SelectMetodoBusqueda(newValue: any) {
    if (newValue != "MÉTODO DE BUSQUEDA") {
      this.DatoEnviar = "";
      document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");

    }
  }

  SelectPersona(newValue: any) {
    if (newValue != "PERSONA") {
      document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
      document.getElementsByName("MetodoBusqueda")[0]?.removeAttribute("disabled");
      this.DatoEnviar = "";
    }
    this.MetodoBusqueda = "MÉTODO DE BUSQUEDA";
  }

  KeyupData() {
    switch (this.MetodoBusqueda) {
      case "CURP":
        if (this.DatoEnviar.length > 18) {
          this.DatoEnviar = this.DatoEnviar.slice(0, 18);
        }
        else if (this.DatoEnviar.length == 18) {
          this.DatoEnviar = this.DatoEnviar.toUpperCase();
          if (this.verifyCurp() == false) {
            document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
            document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(240, 125, 125); color:black;");
          }
          else {
            document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOn");
            document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(158, 240, 125); color:black;");
          }
        }
        else {
          document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
          document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(255, 255, 255); color:black;");
        }
        break;
      case "RFC":
        switch (this.Persona) {
          case "FISICA":
            if (this.DatoEnviar.length > 13) {
              this.DatoEnviar = this.DatoEnviar.slice(0, 13);
            }
            else if (this.DatoEnviar.length == 13) {
              this.DatoEnviar = this.DatoEnviar.toUpperCase();
              if (this.verifyFisica() == false) {
                document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
                document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(240, 125, 125); color:black;");
              }
              else {
                document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOn");
                document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(158, 240, 125); color:black;");
              }
            }
            else {
              document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
              document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(255, 255, 255); color:black;");
            }
            break;
          case "MORAL":
            if (this.DatoEnviar.length > 12) {
              this.DatoEnviar = this.DatoEnviar.slice(0, 12);
            }
            else if (this.DatoEnviar.length == 12) {
              this.DatoEnviar = this.DatoEnviar.toUpperCase();
              if (this.verifyMoral() == false) {
                document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
                document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(240, 125, 125); color:black;");
              }
              else {
                document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOn");
                document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(158, 240, 125); color:black;");
              }
            }
            else {
              document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
              document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(255, 255, 255); color:black;");
            }
            break;
          default:
            break;
        }


        break;
      default:
        break;
    }


  }

  verifyMoral() {
    let razon = this.DatoEnviar.charAt(0) + this.DatoEnviar.charAt(1) + this.DatoEnviar.charAt(2);
    let fecha = this.DatoEnviar.charAt(3) + this.DatoEnviar.charAt(4) + this.DatoEnviar.charAt(5) + this.DatoEnviar.charAt(6) + this.DatoEnviar.charAt(7) + this.DatoEnviar.charAt(8);
    var hasNumber = /\d/;
    var hasString = /[A-Za-z]/;

    let one = hasNumber.test(razon);
    let two = hasString.test(fecha);
    if (!one && !two) {
      return true;
    }
    else {
      return false;
    }

  }
  verifyFisica() {
    let iniciales = this.DatoEnviar.charAt(0) + this.DatoEnviar.charAt(1) + this.DatoEnviar.charAt(2) + this.DatoEnviar.charAt(3);
    let año = this.DatoEnviar.charAt(4) + this.DatoEnviar.charAt(5) + this.DatoEnviar.charAt(6) + this.DatoEnviar.charAt(7) + this.DatoEnviar.charAt(8) + this.DatoEnviar.charAt(9);
    let clave = this.DatoEnviar.charAt(10) + this.DatoEnviar.charAt(11) + this.DatoEnviar.charAt(12);
    var hasNumber = /\d/;
    var hasString = /[A-Za-z]/;

    let one = hasNumber.test(iniciales);
    let two = hasString.test(año);

    if (!one && !two) {
      return true;
    }
    else {
      return false;
    }

  }

  verifyCurp() {
    let iniciales = this.DatoEnviar.charAt(0) + this.DatoEnviar.charAt(1) + this.DatoEnviar.charAt(2) + this.DatoEnviar.charAt(3);
    let año = this.DatoEnviar.charAt(4) + this.DatoEnviar.charAt(5) + this.DatoEnviar.charAt(6) + this.DatoEnviar.charAt(7) + this.DatoEnviar.charAt(8) + this.DatoEnviar.charAt(9);
    let clave = this.DatoEnviar.charAt(10) + this.DatoEnviar.charAt(11) + this.DatoEnviar.charAt(12) + this.DatoEnviar.charAt(13) + this.DatoEnviar.charAt(14) + this.DatoEnviar.charAt(15);
    let numbers = this.DatoEnviar.charAt(16) + this.DatoEnviar.charAt(17);
    var hasNumber = /\d/;
    var hasString = /[A-Za-z]/;

    let one = hasNumber.test(iniciales);
    let two = hasString.test(año);
    let three = hasNumber.test(clave);
    let four = hasString.test(numbers);
    if (!one && !two && !three && !four) {
      return true;
    }
    else {
      return false;
    }
  }

  restartVariables(){
    this.MetodoBusqueda = "MÉTODO DE BUSQUEDA";
    this.Persona = "PERSONA";
    this.DatoEnviar = "";
    this.Estado = "";
    document.getElementsByName("MetodoBusqueda")[0]?.setAttribute("disabled","");
    document.getElementById("solicitarReq")?.setAttribute("class", "myButtonOff");
    document.getElementById("alertState")?.setAttribute("style", "background-color: rgb(255, 255, 255); color:black;");
  }

  selectDate(date: any){
    this.dateSelect = date;
    this.req.getAllRFCRequest(this.dateSelect).subscribe((data:any) => {
      let requests = [];
      for (let i = 0; i < data.length; i++) {
        requests.push({
          "nm": i + 1,
          "id": data[i].id,
          "type": data[i].search,
          "metadata": data[i].data,
          "createdAt": data[i].createdAt,
          "comments": data[i].comments,
          "url": data[i].namefile,
          "idtranspose": data[i].idtranspose,
          "downloaded": data[i].downloaded
        });
      }
      this.rfcs = requests;
    }, err => {

    });

  }

  DownloadActa(id:any, name:any){
    if(name != null){
      this.req.DownloadRFC(id).subscribe(data => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(data);
        a.href = objectUrl
        a.download = name;
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
    }
  }

  Send(){
    if(document.getElementById("solicitarReq")?.getAttribute("class") == "myButtonOn"){
      LoaderModal();
      this.req.SendRFCRequest(this.MetodoBusqueda, this.DatoEnviar, this.Persona).subscribe( data => {
        closeAlert();
        OkStatus("Enviado");
        this.restartVariables();
      }, err => {
        closeAlert();
        Swal.fire(
          {
            position: 'center',
            icon: 'error',
            title: 'ERROR',
            showConfirmButton: false,
            timer: 1500,
            text: 'Contactar al administrador' 
          }
        );
      }
      );

    }
    console.log(document.getElementById("solicitarReq")?.getAttribute("class"));
  }


  //ViewRequest
  GetMyDates(){
    this.req.getMyDatesRFCRequest().subscribe((data: any) => {
      this.dates = data;
      this.selectDate(data[0].corte);
    }, (err: any) => {
      //No Identificated!
      console.log(err.error.message);
    });
  }



}
