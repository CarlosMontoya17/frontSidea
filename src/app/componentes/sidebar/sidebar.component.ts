import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../../servicios/login.service";
import * as CryptoJS from 'crypto-js';
import { AdminService } from 'src/app/servicios/admin.service';
import { Observable } from 'rxjs';

declare function onclick(): any;
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
  constructor(private router:Router, private loginservice:LoginService, private adminService:AdminService) { }

  ngOnInit(): void {
    this.descry();
    
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
      
      
    }
    }
    }
    titulo(texto:string){
        this.adminService.setSelect = texto;
        this.router.navigateByUrl('/pagos');
        
        
    }

}
