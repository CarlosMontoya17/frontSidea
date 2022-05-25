import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../../servicios/login.service";
import * as CryptoJS from 'crypto-js';
import { AdminService } from 'src/app/servicios/admin.service';
import { Observable } from 'rxjs';
import { SocketService } from '../../servicios/socket/socket.service';



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

  constructor(private router:Router, private loginservice:LoginService, private adminService:AdminService, private socketClient:SocketService) {

   }

  public ngOnInit(): void {
    this.descry();
    this.socketClient.onNewNotify().subscribe( (data:any) => {
      if( this.userid ==  data.data.id_req ){
        Notifications(data.data.message, data.data.status);
      }
    });
    
    
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
