import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Token } from '../../componentes/login/token.model';
const api = "https://actasalinstante.com:3030";
@Injectable({
  providedIn: 'root'
})
export class ActasService {
//ACTAS DE NACIMIENTO, ETC ... POR CURP
  constructor(private http: HttpClient) { }

  updateServicio(id:any, newService:any){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });

    return this.http.put(api+'/api/update/services/'+id,{ "servicios": newService } ,{ headers });
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

  getMyActa(id:any): Observable<any> {
    return this.http.get(api+'/api/actas/requests/getMyActa/'+id,{ responseType: 'blob'})
  }
    //Se envian las actas
    SolicitudactasporCurp(datos: any) {
      var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
      var token: any = i.toString(CryptoJS.enc.Utf8);
      var parteuno = token.slice(1);
      var final = parteuno.slice(0, -1);
      const headers = new HttpHeaders({ 'x-access-token': final! });
      return this.http.post(api + '/api/actas/requests/createOne/', datos, { headers });
    }
    //SE trae a todos los usuarios
    getuser(): Observable<any> {
      return this.http.get(api+'/api/user/getFull/')
    }
    
    reAsignarActa(id:any, provider:any, service:any){
      var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
      var token: any = i.toString(CryptoJS.enc.Utf8);
      var parteuno = token.slice(1);
      var final = parteuno.slice(0, -1);
      let tokenfinal: string = final;
      const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
      return this.http.put(api+"/api/actas/transpose/"+id, { newciber: provider, service: service }, { headers });
    }
  


}
