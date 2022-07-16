import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.css']
})
export class ActasComponent implements OnInit {
  //Icons
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

  constructor(private reqService: RequestsService) { }

  ngOnInit(): void {
  }



  switcheableView(i: number) {
    //1 = Solicitudes
    //2 = Nueva
    switch (i) {
      case 1:
        this.getDates();
        break;
      default:
        break;
    }
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
      console.log(data);
    }, (err: any) => {
      console.log(err.error.message);
    });
  }








}
