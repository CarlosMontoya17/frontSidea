import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../../servicios/login.service";
import * as CryptoJS from 'crypto-js';
import { AdminService } from 'src/app/servicios/admin.service';
import { Observable } from 'rxjs';
import { SocketService } from '../../servicios/socket/socket.service';
import { ReadService } from '../inicio/models/read.service';
import { RestService } from '../historial/rest.service';
import Swal from 'sweetalert2';



declare function onclick(): any;
declare function Notifications(msg:any, status:any): any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../sidebar/sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuario:any = "Usuario";
  contrasena: string = "";
  result:any = [];
  myRol: any;

  CiberSelect:any;
  userid:string = "";


  public data:any;
  public requests:any;
  constructor(private restservice:RestService,private read:ReadService, private router:Router, private loginservice:LoginService, private adminService:AdminService, private socketClient:SocketService) {

   }

  public ngOnInit(): void {
    this.descry();
    this.socketClient.onNewNotify().subscribe( (data:any) => {
      if( this.userid ==  data.data.id_req ){
        this.notify(data.data.message, data.data.status);
        this.obtainARequests();
        this.read.ObtainCards = this.requests;

      }
    });
    
    


  }


  public async obtainARequests() {
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
          metadata = "TIPO: " + data[i].metadata.type + "\nESTADO: " + data[i].metadata.state + "\nNOMBRES: " + data[i].metadata.nombre + "\n1er APELLIDO: " + data[i].metadata.primerapellido + "\n2do APELLIDO: " + data[i].metadata.segundoapelido + "\nSEXO: " + data[i].metadata.sexo + "\nFECHA NAC.: " + data[i].metadata.fecnac;
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
        "url": data[i].url
      });
    }

    // console.log(this.requests);

  }


  publicidad()
{
  this.router.navigateByUrl("/publicidad");
}
logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  next(){
    onclick();
  }


  notify(message:any, status:any, ){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      confirmButtonText: 'Ver Solicitudes',
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
    })
    
    Toast.fire({
      icon: status,
      title: message
    }).then((result) => {
          if(result.isConfirmed){
            this.read.setViewCards(true);
            this.router.navigateByUrl("/inicio");
            if(this.router.url == "/inicio"){
              this.reloadCurrentRoute();
            } 
          }
      
    });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }



descry(){
  if(localStorage.getItem('token')!=null){
    if(localStorage.getItem('usuario')!=null){
      var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
      let userName = usuario.toString(CryptoJS.enc.Utf8);
      let arreglo = userName?.split('"');
      this.usuario = arreglo[1];

      var idValue = CryptoJS.AES.decrypt(localStorage.getItem('id') || '{}', "id");
      this.userid = idValue.toString(CryptoJS.enc.Utf8);
      
    }
    }
    }
    titulo(texto:string){
        this.adminService.setSelect = texto;
        this.router.navigateByUrl('/pagos');
        
        
    }

}
