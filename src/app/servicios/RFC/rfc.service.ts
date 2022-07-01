import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from 'src/app/servicios/localstorage/localstorage.service';
import * as CryptoJS from 'crypto-js';
import { Token } from '../../componentes/login/token.model';
const api = "https://actasalinstante.com:3030";
@Injectable({
  providedIn: 'root'
})
export class RfcService {

  constructor(private http: HttpClient, private localStorage:LocalstorageService) { }


  obtainAllRFCs(){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.get(api+'/api/rfc/request/getMyRequest/', { headers });
  }
  getMyRFC(id:any): Observable<any> {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
    return this.http.get(api+'/api/rfc/request/donwload/'+id, { headers, responseType: 'blob'});
  }
  Solicitudactasporrfcourp(datos: any) {

    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.post(api + '/api/rfc/request/new/', datos, { headers });
  }
  //RFC
  reAsignarActa(id:any, provider:any, service:any){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
    return this.http.put(api+"/api/actas/reg/transpose/"+id, { newciber: provider, service: service }, { headers });
  }

    //SE trae a todos los usuarios
    getuser(): Observable<any> {
      return this.http.get(api+'/api/user/getFull/')
    }

    getDates(){
      var token = this.localStorage.TokenDesencrypt();
      const headers = new HttpHeaders({ 'x-access-token': token! });
      return this.http.get(api+'/api/rfc/requests/myDates/', { headers });
    }

    getMyRequets(date:any){
      var token = this.localStorage.TokenDesencrypt();
      const headers = new HttpHeaders({ 'x-access-token': token! });
      return this.http.get(api+'/api/rfc/requests/myRequests/' + date, { headers });
    }
  
}
