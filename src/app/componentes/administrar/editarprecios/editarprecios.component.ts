import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RestService } from '../../historial/rest.service';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { PerfileditService } from './perfiledit.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { fa1 } from '@fortawesome/free-solid-svg-icons';
import { fa2 } from '@fortawesome/free-solid-svg-icons';
import { fa3 } from '@fortawesome/free-solid-svg-icons';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-editarprecios',
  templateUrl: './editarprecios.component.html',
  styleUrls: ['./editarprecios.component.css']
})
export class EditarpreciosComponent implements OnInit {
  dataselect: string = "";
  porEstados: boolean = false;
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
  nac: number = 0;
  mat: number = 0;
  def: number = 0;
  div: number = 0;
  cot: number = 0;
  der: number = 0;
  nss: number = 0;
  rfc: number = 0;
  inh: number = 0;
  vista: boolean = false;

  BAJACALIFORNIA: number = 0;
  YUCATAN: number = 0;
  BAJACALIFORNIASUR: number = 0;
  VERACURZ: number = 0;
  COAHUILA: number = 0;
  MICHOACAN: number = 0;
  TLAXCALA: number = 0;
  DURANGO: number = 0;
  AGUASCALIENTES: number = 0;
  CHIAPAS: number = 0;
  HIDALGO: number = 0;
  PUEBLA: number = 0;
  QUERETARO: number = 0;
  CHIHUAHA: number = 0;
  OAXACA: number = 0;
  SONORA: number = 0;
  SANLUISPOTOSI: number = 0;
  SINALOA: number = 0;
  GUERRERO: number = 0;
  ZACATECAS: number = 0;
  TAMAULIPAS: number = 0;
  MORELOS: number = 0;
  TABASCO: number = 0;
  GUANAJUATO: number = 0;
  COLIMA: number = 0;
  JALISCO: number = 0;
  CDMX: number = 0;
  NAYARIT: number = 0;
  CAMPECHE: number = 0;
  NUEVOLEON: number = 0;
  MEXICO: number = 0;
  QUINTANAROO: number = 0;
  EXTRANJERO: number = 0;
  precios: any = [];

  datossupervisor: any = [];
  tipodebusqueda: any = 'Seleccione el tipo de busqueda';
  preview: any = 0;
  usuarios: any;
  page: number = 0;
  searchUser: string = "";
  faTrash = faTrash;
  faUserPlus = faUserPlus;
  faUser = faUser;
  faPowerOff = faPowerOff;
  fa1 = fa1;
  fa2 = fa2;
  fa3 = fa3;
  faD = faGripLines;
  usuario: string = "";
  contrasena: string = "";
  rol: string = "Supervisor";
  type: string = "";
  encargado: string = "";
  precio: string = "";
  Negocio: string = "";
  tipoNegocio: string = "";
  Status: string = "";


  //ProfileCurrent
  myRol:any;
  constructor(private perfil: PerfileditService, private database: DatabaseService, private restservice: RestService, private router: Router) { }
  clearresponsable() {
    this.responsableSearch = "";
    this.newResponsable = undefined;
  }

  async tetsEnviar() {

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
        "ext": this.EXTRANJERO

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
        "inh": this.inh
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
        "inh": this.inh
      }
    }


    let idSuper;

     if (this.newRol == "Supervisor") {
      idSuper = 1;
     }
    else {
      idSuper = this.newResponsable?.id;
    }


  
    const data = await this.perfil.editprecios(this.usuarios.id, {precios:this.precios, username: this.newUsername, password: this.newPassword, nombre: this.Negocio, type: this.tipoNegocio}).toPromise();
    if(data){
      this.router.navigateByUrl("/administrar");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario Actualizado!',
        showConfirmButton: false,
        timer: 1500,
        text: this.usuarios.username +'-'+this.usuarios.nombre,
      })
    }
  
}


  async getMyData(){
    var idlocal = localStorage.getItem("id");
    var i = CryptoJS.AES.decrypt(idlocal || '{}', "id");
    var id: any = i.toString(CryptoJS.enc.Utf8);
    let data:any =  await this.restservice.getidsupervisor(id).toPromise();
    this.myRol = data.data.rol;
  }

  nextStep() {
    if (this.currentStep == 0) {
      if (this.newUsername != "") {
        this.alert = [];
        this.currentStep++;
      }
      else {
        this.alert = [1, 'Porfavor ingresa todos los datos'];
      }
    }
    else if (this.currentStep == 1) {
      if (!this.porEstados) {
        if (this.nac != 0 && this.mat != 0 && this.def != 0 && this.div != 0 && this.cot != 0 && this.der != 0 && this.nss != 0 && this.rfc != 0 && this.inh != 0) {
          this.alert = [];
          this.currentStep++;
        }
        else {
          this.alert = [2, 'Porfavor ingresa todos los precios'];
        }
      }
      else {
        if (this.mat != 0 && this.def != 0 && this.div != 0 && this.cot != 0 && this.der != 0 && this.nss != 0 && this.rfc != 0 && this.inh != 0) {
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
  ngOnInit(): void {

    this.getdatos();
    this.getMyData();



  }

  Regresar() {
    this.router.navigateByUrl('/administrar');
  }
  async getdatos() {
    this.usuarios = await this.perfil.get();

    if(this.usuarios == undefined || this.usuarios == [] || this.usuarios.length == 0){
      this.router.navigateByUrl('/administrar');
    }
    this.precios = this.usuarios.precios;
    if (typeof(this.precios.nac) != "number") {
      this.estados();
      this.CHIAPAS = this.precios.nac.chia;
      this.AGUASCALIENTES = this.precios.nac.agua;
      this.BAJACALIFORNIA = this.precios.nac.bcn;
      this.BAJACALIFORNIASUR = this.precios.nac.bcs;
      this.CAMPECHE = this.precios.nac.camp;
      this.CDMX = this.precios.nac.cdmx;
      this.CHIHUAHA = this.precios.nac.chih;
      this.COAHUILA = this.precios.nac.coah;
      this.COLIMA = this.precios.nac.coli;
      this.DURANGO = this.precios.nac.dura;
      this.GUERRERO = this.precios.nac.guer;

      this.HIDALGO = this.precios.nac.hida;
      this.JALISCO = this.precios.nac.jali;
      this.MEXICO = this.precios.nac.mex;
      this.MICHOACAN = this.precios.nac.mich;
      this.MORELOS = this.precios.nac.more;
      this.NAYARIT = this.precios.nac.naya;
      this.NUEVOLEON = this.precios.nac.nl;
      this.OAXACA = this.precios.nac.oaxa;
      this.PUEBLA = this.precios.nac.pueb;
      this.QUINTANAROO = this.precios.nac.qroo;
      this.QUERETARO = this.precios.nac.quer;

      this.SINALOA = this.precios.nac.sina;
      this.SANLUISPOTOSI = this.precios.nac.slp;
      this.SONORA = this.precios.nac.sono;
      this.TABASCO = this.precios.nac.taba;
      this.TAMAULIPAS = this.precios.nac.tama;
      this.TLAXCALA = this.precios.nac.tlax;
      this.VERACURZ = this.precios.nac.vera;
      this.YUCATAN = this.precios.nac.yuca;
      this.ZACATECAS = this.precios.nac.zaca;
      this.GUANAJUATO = this.precios.nac.guan;
      this.EXTRANJERO = this.precios.nac.ext;
    } else {
      this.nac = this.precios.nac;
    }
    this.cot = this.precios.cot;
    // 
    this.mat = this.precios.mat;
    this.def = this.precios.def;
    this.nss = this.precios.nss;
    this.rfc = this.precios.rfc;
    this.inh = this.precios.inh;
    this.der = this.precios.der;
    this.div = this.precios.div;
    this.Negocio = this.usuarios.nombre;
    this.tipoNegocio = this.usuarios.type;
    if (this.usuarios.Status == false) {
      this.Status = "Inactivo";
    }
    else {
      this.Status = "Activo";
    }

    this.datossupervisor = await this.restservice.getidsupervisor(this.usuarios.idSuper).toPromise();
    this.newResponsable = await this.datossupervisor.data;
    this.newUsername = this.usuarios.username;
    console.log(this.datossupervisor);
  }
  
  estados() {
    this.porEstados = !this.porEstados;
  }
  prevStep() {
    this.currentStep--;
    this.alert = [];
  }
  restart(m: number) {
    this.currentStep = m;
  }
  selectProvider(provider: string) {
    if (this.responsableSearch != "") {
      this.newResponsable = provider;
    }
  }
  selectProvidertable(provider: string) {
    if (this.dataselect != "") {
      this.newResponsable = provider;
    }
  }
  async getAllProviders() {
    if (this.newRol == "Supervisor") {
      this.clearresponsable()
    }

    if (this.newRol != "") {
      const providers = await this.database.getAllProviders(this.newRol).toPromise();
      if (providers) {
        this.providers = providers;
      }
    }
  }

}
