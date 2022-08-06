import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from 'src/app/servicios/localstorage/localstorage.service';
import * as CryptoJS from 'crypto-js';
import { Token } from '../login/token.model';
const api = "https://actasalinstante.com:3030";
@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient, private localStorage:LocalstorageService) {
  }


    
  //Envia las actas cargadas automaticamente
  sendPost(body: FormData): Observable<any> {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.post(api+`/api/actas/reg/load/`, body, { headers })
  }
  //Se optiene el documento
  getdoc(body: FormData): Observable<any> {
    const token = localStorage.getItem("привіт");
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.post(api+`/api/actas/load`, body, { headers })
  }


  //SE trae a todos los usuarios
  getuser(): Observable<any> {
    return this.http.get(api+'/api/user/getFull/')
  }
  
  //SE optienen las actas
  obtainActasRequest() {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.get(api+'/api/actas/requests/obtainAll/', { headers });
  }

  updateServicio(id:any, newService:any){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });

    return this.http.put(api+'/api/update/services/'+id,{ "servicios": newService } ,{ headers });
  }
 

  //Se ttaen a todos los cibers
  getciber(): Observable<any> {
    return this.http.get(api+'/api/clients/getAll');
  }
  //Se trae el precio de los asesores
  getprecioyasesor(tipo: any, estado: any, id: any) {
    return this.http.put(api + '/api/clients/getMyData/' + id, { "tipo": tipo, "estado": estado })
  }
  //se trae el supervisor por id
  getidsupervisor(id: any) {
    return this.http.get(api+'/api/user/getOne/' + id);
  }

  //enviamos el acta tras haber seleccionado el ciber
  enviarcta(ciberseleccionado: any,  tipo: any, curp: any, estado: any,  nombre: any, nombredearchivo: any): Observable<any> {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
    return this.http.post(api+'/api/actas/reg/new/', 
    { 
      level0: ciberseleccionado, 
     
      document: tipo, 
      state: estado, 
      dataset: curp, 
      nameinside: nombre, 
      namefile: nombredearchivo 
    }
    , { headers });
  }
  //Corte de historial
  getcorte(): Observable<any> {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
    return this.http.get(api+'/api/actas/reg/getMyHistory/', { headers } )
  }
  //Se traen los documentos
  getMyDocumentsLoaded(id: any) {
    return this.http.get(api + '/api/actas/getMyDocuments/' + id);
  }
  //Se borran las actas 
  deleteActa(id: any) {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
    return this.http.delete(api + '/api/actas/deleteActa/' + id);
  }
  //Se borrran los usuarios
  deleteuser(id: any): Observable<any> {
    return this.http.get(api+'/api/user/delete/' + id)
  }
  //Se edita el precio
  editPrecior(id: any, precios: any): Observable<any> {
    return this.http.put(api+'/api/user/editPrice/' + id, { precios: precios })
  }
  //Se traen las actas porm numero
  GetActasNumber(id: any): Observable<any> {
    return this.http.get(api+'/api/actas/CountForEnterprise/' + id)
  }
  //Se traen las actas de la papelera
  Getpapelera(): Observable<any> {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.get(api+'/api/actas/Trash/', { headers })
  }





  getAllClients(): Observable<any> {
    return this.http.get(api+'/api/user/getFull/')
  }
 

  TransposeRegister(id:any, ciber:any){
    let token = this.localStorage.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.put(api+"/api/actas/reg/transposeSelf/"+id, { newciber: ciber }, { headers });
  }

  
  ChangeDate(id:any, newdate:any){
    let token = this.localStorage.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.put(api+"/api/actas/reg/ChangeDate/"+id, { date: newdate }, { headers });
  }


  DeleteRegister(id:any){
    let token = this.localStorage.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.delete(api+"/api/actas/reg/Trash/delete/"+id, { headers });

  }

} 