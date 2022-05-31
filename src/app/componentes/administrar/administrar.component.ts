import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/servicios/admin.service';
import { LoginService } from "../../servicios/login.service";
import Swal from 'sweetalert2';
import { RestService } from '../historial/rest.service';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { fa1 } from '@fortawesome/free-solid-svg-icons';
import { fa2 } from '@fortawesome/free-solid-svg-icons';
import { fa3 } from '@fortawesome/free-solid-svg-icons';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { PerfileditService } from './editarprecios/perfiledit.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {
  dataselect: string = "";
  porEstados: boolean = true;
  result: any;
  currentStep: number = 0;
  responsableSearch: string = "";
  providers: any = [];
  newUsername: string = "";
  newPassword: string = "";
  newRol: string = "";
  newResponsable: any;
  newidSuper: any;
  alert: any = [];
  MyrolCliente:boolean = false;
  usernameLocal: string = "";
//Lista de precios de actas
  nac: number = 0;
  mat: number = 150;
  def: number = 160;
  div: number = 160;
  cot: number = 40;
  der: number = 40;
  nss: number = 50;
  rfc: number = 100;
  inh: number = 140;
  //Nuevos servicios
  ret: number = 0;
  sus: number = 0;
  ecu: number = 0;
  reset: number = 0;
  arfc: number = 0;
  dnac: number =  0;
  myRol: any;

  vista: boolean = false;
//Lista de precios por estado
  BAJACALIFORNIA: number = 140;
  YUCATAN: number = 135;
  BAJACALIFORNIASUR: number = 130;
  VERACURZ: number = 125;
  COAHUILA: number = 110;
  MICHOACAN: number = 100;
  TLAXCALA: number = 100;
  DURANGO: number = 95;
  AGUASCALIENTES: number = 85;
  CHIAPAS: number = 100;
  HIDALGO: number = 85;
  PUEBLA: number = 85;
  QUERETARO: number = 85;
  CHIHUAHA: number = 85;
  OAXACA: number = 80;
  SONORA: number = 80;
  SANLUISPOTOSI: number = 80;
  SINALOA: number = 75;
  GUERRERO: number = 75;
  ZACATECAS: number = 75;
  TAMAULIPAS: number = 70;
  MORELOS: number = 70;
  TABASCO: number = 70;
  GUANAJUATO: number = 70;
  COLIMA: number = 70;
  JALISCO: number = 70;
  CDMX: number = 60;
  NAYARIT: number = 55;
  CAMPECHE: number = 50;
  NUEVOLEON: number = 50;
  MEXICO: number = 48;
  QUINTANAROO: number = 50;
  EXTRANJERO: number = 120;
  precios: any = [];
////////////////////////////
  tipodebusqueda: any = 'Seleccione el tipo de busqueda';
  preview: any = 0;
  usuarios: any;
  public page: number = 1;
  searchUser: string = "";
  faTrash = faTrash;
  faUserPlus = faUserPlus;
  faUser = faUser;
  faPowerOff = faPowerOff;
  fa1 = fa1;
  fa2 = fa2;
  fa3 = fa3;
  faD = faGripLines;
  faPencil = faPencil;

  usuario: string = "";
  contrasena: string = "";
  rol: string = "Supervisor";
  type: string = "";
  encargado: string = "";
  precio: string = "";
  Negocio: string = "";
  tipoNegocio: string = "";
  Status: string = "";

  agregarusuario: boolean = false;

  buscarCiber: string = "";
  myData: any;

  constructor(private router: Router,
    private loginservice: LoginService,
    private restservice: RestService,
    private database: DatabaseService,
    private perfil: PerfileditService,
    private httpClient: HttpClient) { }
    //CAMBIAMOS LA VISTA DE LA TABLA DE USUARIOS
  changeView() {
    this.vista = !this.vista;

  }
  ClienteVista() {
    if (this.myRol != 'Cliente') {
      this.MyrolCliente = !this.MyrolCliente;
    }
  
    
  }

  //BOTON PARA AGREGAR UN NUEVO USUARIO
  agregaUsuario() {
    this.agregarusuario = !this.agregarusuario;
  }
  //RESETEAMOS LA PAGINA 
  resetPagination() {
    this.page = 1;
  }
  //SELECCIONAMOS EL PRECIO DEL USUARIO 
  setPriceUsername() {
    if (this.usernameLocal == "Cibers Nelly") {
      this.nac = 0;
      this.mat = 150;
      this.def = 150;
      this.div = 150;
      this.cot = 40;
      this.der = 40;
      this.nss = 50;
      this.rfc = 100;
      this.inh = 130;
      ///Nuevos Servicios
      this. ret = 100;
      this.sus = 100;
      this.ecu = 200;
      this.reset = 650;
      this.arfc = 1700;
      this.dnac =  1700;
      //Estados
      this.BAJACALIFORNIA = 130;
      this.YUCATAN = 125;
      this.BAJACALIFORNIASUR = 120;
      this.VERACURZ = 125;
      this.COAHUILA = 100;
      this.MICHOACAN = 90;
      this.TLAXCALA = 90;
      this.DURANGO = 85;
      this.AGUASCALIENTES = 75;
      this.CHIAPAS = 90;
      this.HIDALGO = 75;
      this.PUEBLA = 75;
      this.QUERETARO = 75;
      this.CHIHUAHA = 75;
      this.OAXACA = 70;
      this.SONORA = 70;
      this.SANLUISPOTOSI = 70;
      this.SINALOA = 65;
      this.GUERRERO = 65;
      this.ZACATECAS = 65;
      this.TAMAULIPAS = 60;
      this.MORELOS = 60;
      this.TABASCO = 60;
      this.GUANAJUATO = 60;
      this.COLIMA = 60;
      this.JALISCO = 60;
      this.CDMX = 50;
      this.NAYARIT = 45;
      this.CAMPECHE = 40;
      this.NUEVOLEON = 40;
      this.MEXICO = 38;
      this.QUINTANAROO = 40;
      this.EXTRANJERO = 120;
    }
    else if (this.usernameLocal == "Publico David" || this.usernameLocal == "Jose Daniel") {
      this.nac = 0;
      this.mat = 150;
      this.def = 150;
      this.div = 150;
      this.cot = 40;
      this.der = 40;
      this.nss = 40;
      this.rfc = 120;
      this.inh = 130;

      this. ret = 100;
      this.sus = 100;
      this.ecu = 200;
      this.reset = 650;
      this.arfc = 1700;
      this.dnac =  1700;
      //Estados
      this.BAJACALIFORNIA = 140;
      this.YUCATAN = 135;
      this.BAJACALIFORNIASUR = 130;
      this.VERACURZ = 125;
      this.COAHUILA = 110;
      this.MICHOACAN = 100;
      this.TLAXCALA = 100;
      this.DURANGO = 95;
      this.AGUASCALIENTES = 85;
      this.CHIAPAS = 110;
      this.HIDALGO = 85;
      this.PUEBLA = 85;
      this.QUERETARO = 75;
      this.CHIHUAHA = 85;
      this.OAXACA = 80;
      this.SONORA = 80;
      this.SANLUISPOTOSI = 80;
      this.SINALOA = 75;
      this.GUERRERO = 75;
      this.ZACATECAS = 75;
      this.TAMAULIPAS = 70;
      this.MORELOS = 70;
      this.TABASCO = 70;
      this.GUANAJUATO = 70;
      this.COLIMA = 70;
      this.JALISCO = 70;
      this.CDMX = 70;
      this.NAYARIT = 70;
      this.CAMPECHE = 70;
      this.NUEVOLEON = 70;
      this.MEXICO = 70;
      this.QUINTANAROO = 70;
      this.EXTRANJERO= 120;
    }
    else if (this.usernameLocal == "Publico Eli") {
      this.nac = 0;
      this.mat = 150;
      this.def = 160;
      this.div = 150;
      this.cot = 40;
      this.der = 40;
      this.nss = 50;
      this.rfc = 100;
      this.inh = 130;
      this. ret = 100;
      this.sus = 100;
      this.ecu = 200;
      this.reset = 650;
      this.arfc = 1700;
      this.dnac =  1700;
      //Estados
      this.BAJACALIFORNIA = 140;
      this.YUCATAN = 135;
      this.BAJACALIFORNIASUR = 130;
      this.VERACURZ = 130;
      this.COAHUILA = 110;
      this.MICHOACAN = 100;
      this.TLAXCALA = 100;
      this.DURANGO = 95;
      this.AGUASCALIENTES = 85;
      this.CHIAPAS = 105;
      this.HIDALGO = 85;
      this.PUEBLA = 85;
      this.QUERETARO = 85;
      this.CHIHUAHA = 85;
      this.OAXACA = 80;
      this.SONORA = 80;
      this.SANLUISPOTOSI = 80;
      this.SINALOA = 75;
      this.GUERRERO = 75;
      this.ZACATECAS = 75;
      this.TAMAULIPAS = 70;
      this.MORELOS = 70;
      this.TABASCO = 70;
      this.GUANAJUATO = 70;
      this.COLIMA = 70;
      this.JALISCO = 70;
      this.CDMX = 60;
      this.NAYARIT = 55;
      this.CAMPECHE = 50;
      this.NUEVOLEON = 50;
      this.MEXICO = 48;
      this.QUINTANAROO = 50;
      this.EXTRANJERO= 120;
    }


  }
  //BORRAMOS EL USUARIO
  async deleteUser(user: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará al usuario '" + user.username + "', con nombre de negocio '" + user.nombre + "'",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
        var token: any = i.toString(CryptoJS.enc.Utf8);
        var parteuno = token.slice(1);
        var final = parteuno.slice(0, -1);
        let tokenfinal: string = final;
        const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
        this.httpClient.delete('http://actasalinstante.com:3030/api/user/delete/' + user.id, { headers }).subscribe(
          e => {
            Swal.fire(
              'Eliminado',
              "Se eliminó al usuario '" + user.username + "'",
              'success'
            )
            this.reloadCurrentRoute();
          },
          error => {
            Swal.fire(
              'Error',
              "No tienes los permisos suficientes",
              'error'
            )
          }
        );
      }
    })
  }
  //EDITAMOS EL PRECIO DEL USUARIO
  async editprice(user: any) {
    const data = this.restservice.getidsupervisor(user.idSuper);
    this.perfil.set(user);
    this.router.navigateByUrl('editprecio');
  }
  async tetsEnviar() {
    if (this.Status == "" || this.Negocio == "" || this.tipoNegocio == "") {
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
    else {
      let estatus: boolean;
      if (this.Status == "Activo") {
        estatus = true;
      } else {
        estatus = false;
      }
      if (this.porEstados) {
        let preciosdeestados = {
          "bcn": this.BAJACALIFORNIA,
          "yuca": this.YUCATAN,
          "bcs": this.BAJACALIFORNIASUR,
          "vera": this.VERACURZ,
          "coah": this.COAHUILA,
          "mich": this.MICHOACAN,
          "tlax": this.TLAXCALA,
          "dura": this.DURANGO,
          "agua": this.AGUASCALIENTES,
          "chia": this.CHIAPAS,
          "hida": this.HIDALGO,
          "pueb": this.PUEBLA,
          "quer": this.QUERETARO,
          "chih": this.CHIHUAHA,
          "oaxa": this.OAXACA,
          "sono": this.SONORA,
          "slp": this.SANLUISPOTOSI,
          "sina": this.SINALOA,
          "guer": this.GUERRERO,
          "zaca": this.ZACATECAS,
          "tama": this.TAMAULIPAS,
          "more": this.MORELOS,
          "taba": this.TABASCO,
          "guan": this.GUANAJUATO,
          "coli": this.COLIMA,
          "jali": this.JALISCO,
          "cdmx": this.CDMX,
          "naya": this.NAYARIT,
          "camp": this.CAMPECHE,
          "nl": this.NUEVOLEON,
          "mex": this.MEXICO,
          "qroo": this.QUINTANAROO,
          "ext":this.EXTRANJERO,

        }
        this.precios = {
          "nac": preciosdeestados,
          "mat": this.mat,
          "def": this.def,
          "div": this.div,
          "cot": this.cot,
          "der": this.der,
          "nss": this.nss,
          "rfc": this.rfc,
          "inh": this.inh,

         "ret": this. ret,
         "sus": this.sus ,
         "ecu": this.ecu ,
         "reset": this.reset,
         "arfc":  this.arfc,
         "dnac":  this.dnac,
        }
      }
      else {
        this.precios = {
          "nac": this.nac,
          "mat": this.mat,
          "def": this.def,
          "div": this.div,
          "cot": this.cot,
          "der": this.der,
          "nss": this.nss,
          "rfc": this.rfc,
          "inh": this.inh,
          "ret": this. ret,
         "sus": this.sus ,
         "ecu": this.ecu ,
         "reset": this.reset,
         "arfc":  this.arfc,
         "dnac":  this.dnac,
        }
      }
      let idSuper;

      if (this.newRol == "Supervisor") {
        idSuper = 1;
      }
      else {
        idSuper = this.newResponsable?.id;
      }

      const data = await this.loginservice.adduser(this.newUsername, this.newPassword, this.newRol, this.tipoNegocio, idSuper, this.precios, estatus, this.Negocio);
      
      if (data) {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Agregado',
          showConfirmButton: false,
          timer: 1500
        });
        this.reloadCurrentRoute();
      }
    }
  }
  //RECARGAMOS EL COMPONENTE POR SI MISMO
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  //LIMPIAMOS EL BUSCADOR
  clearresponsable() {
    this.responsableSearch = "";
    this.newResponsable = undefined;
  }
  //PASAMOS AL SIGUENTE PASO DE AGREGAR O MODIFICAR USUARIOS
  nextStep() {
    if (this.currentStep == 0) {
      if (this.newUsername != "" && this.newPassword != "" && this.newRol != "" && this.newResponsable != "") {
        this.alert = [];
        this.currentStep++;
      }
      else {
        this.alert = [1, 'Porfavor ingresa todos los datos'];
      }
    }
    else if (this.currentStep == 1) {
      if (!this.porEstados) {
        if (this.nac != 0 && 
          this.mat != 0 && this.def != 0 
          && this.div != 0 && 
          this.cot != 0 &&
           this.der != 0 && 
           this.nss != 0 && 
           this.rfc != 0 && 
           this.inh != 0 
           && this.ret != 0
           && this.ecu != 0
           && this.reset != 0
           && this.arfc != 0
           && this.dnac != 0
     
           ) {
          this.alert = [];
          this.currentStep++;
        }
        else {
          this.alert = [2, 'Porfavor ingresa todos los precios'];
        }
      }
      else {
        if (this.mat != 0 && this.def != 0 && this.div != 0 && this.cot != 0 && this.der != 0 && this.nss != 0 && this.rfc != 0 && this.inh != 0 
         && this.ret != 0
          && this.ecu != 0
          && this.reset != 0
          && this.arfc != 0
          && this.dnac != 0) {
          this.alert = [];
          this.currentStep++;
        }
        else {
          this.alert = [2, 'Porfavor ingresa todos los precios'];
        }
      }
    } else if (this.currentStep == 2) {
      this.alert = [];
      this.currentStep++;
    }
    else {
      this.alert = [3, 'Ocurrio un Error!!'];
    }
  }
  estados() {
    this.porEstados = !this.porEstados;
  }
  //REGRESAMOS AL ANTERIOR PASO DE LA TABLA AGREGAR O MODIFICAR USUARIOS
  prevStep() {
    this.currentStep--;
    this.alert = [];
  }
  restart(m: number) {
    this.currentStep = m;
  }
  //OPTENEMOS  TODO LOS USUARIOS
  async getAllUsers() {
    var idlocal = localStorage.getItem("іди");
    var i = CryptoJS.AES.decrypt(idlocal || '{}', "іди");
    var id: any = i.toString(CryptoJS.enc.Utf8);
    const users = await this.database.getAllUsers(id).toPromise();
    if (users) {
      this.usuarios = users;
    }
  }
  //OPTENEMOS TODOS LOS CIBER
  async getAllProviders() {
  
    if (this.newRol == "Supervisor") {
      this.clearresponsable()
    }
    if (this.newRol == "Cliente") {
      this.newResponsable = this.myData;
     
    }
    if (this.newRol != "") {
      const providers = await this.database.getAllProviders(this.newRol).toPromise();
   
      if (providers) {
        this.providers = providers;
      }
    
    }
  }

  //SELECCIONAMOS EL CIBER
  selectProvider(provider: string) {
    if (this.responsableSearch != "") {
      this.newResponsable = provider;
    }
  }
  //SELECCIONAMOS EL ASESOR
  selectProvidertable(provider: string) {
    if (this.dataselect != "") {
      this.newResponsable = provider;
    }
  }

  //OBTENEMOS LOS DATOS DEL SUPERVISORR
  async getMyData(id: any) {
    const mydata: any = await this.restservice.getidsupervisor(id).toPromise();
    this.myData = mydata?.data;
  }

  async ngOnInit() {

    const token = localStorage.getItem('привіт');
    const usuario = localStorage.getItem('Імякористувача');

    const un = CryptoJS.AES.decrypt(usuario || '{}', "Імякористувача");
    const UserName = un.toString(CryptoJS.enc.Utf8);
    const i = localStorage.getItem('іди');
    const is = CryptoJS.AES.decrypt(i || '{}', "іди");
    const id = is.toString(CryptoJS.enc.Utf8);
  
    const array = UserName.split('"');
    this.usernameLocal = array[1];
    
    const data: any = await this.database.getmydata(id).toPromise();
    this.myData = data.data;
   
    this.myRol = data.data.rol;

    if(this.myRol != 'Cliente'){
      this.getAllUsers();

  
      if (!token) {
        this.router.navigateByUrl('/login');
      }
 
      this.setPriceUsername();
  
    }
    else{

      this.router.navigateByUrl('/inicio');
  

    }





  }


  onChange(event: any) {
    this.tipodebusqueda = event;
  }
   //DESINCRIPTAMOS EL TOKEN PARA OBTENER LOS DATOS Y EL ROL
   async descry() {

    var idlocal = localStorage.getItem("іди");
    var i = CryptoJS.AES.decrypt(idlocal || '{}', "іди");
    var id: any = i.toString(CryptoJS.enc.Utf8);
    this.result.push(id);

    const data: any = await this.database.getmydata(id).toPromise();
    this.myRol = data.data.rol;
  }

}
