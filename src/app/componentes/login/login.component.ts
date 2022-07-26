import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../../servicios/login.service";
import * as CryptoJS from 'crypto-js';
import { Token } from './token.model';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';

declare function swalError(mensaje: any): any;
declare function validateLogin(): any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  contrasena: string = "";
  etextoncriptar: string = "";
  constructor(private router: Router, private login: LoginService) { }


  ngOnInit(): void {
  }

  async inicio() {
    try {
      const data = await this.login.login(this.usuario, this.contrasena);

      if (data) {

        var usuario = CryptoJS.AES.encrypt(JSON.stringify(data.username), "Імякористувача");

        var id = CryptoJS.AES.encrypt(JSON.stringify(data.id), "іди");
        
        var token = CryptoJS.AES.encrypt(JSON.stringify(data.token), "привіт");

        var idC = CryptoJS.AES.decrypt(id || '{}', "іди");
        var i: any = idC.toString(CryptoJS.enc.Utf8);


        
        this.router.navigateByUrl("/inicio");
        const now = new Date();
        // localStorage.setItem("u", JSON.stringify(now.getTime() + 18000000));
        localStorage.setItem("привіт", token.toString());
        localStorage.setItem("Імякористувача", usuario.toString());
        localStorage.setItem("іди", id.toString());
    


        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500,
          text: this.usuario
     
        })
      }
    } catch (error) {
      Swal.fire(
        {
          position: 'center',
          icon: 'error',
          title: 'Credenciales Invalidas',
          showConfirmButton: false,
          timer: 1500,
          text: 'No se encuentra el usuario: ' +this.usuario 
        }
      );
    }
  }



}
