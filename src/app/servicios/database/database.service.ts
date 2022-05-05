import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
const api = "http://actasalinstante.com:3030";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private httpClient: HttpClient) { }


  getAllUsers(id:any){
    return this.httpClient.get(api+'/api/user/getMyClients/'+id);
  }

  getAllProviders(rol:string){
    return this.httpClient.get(api+'/api/user/getMySuperviser/'+rol);
  }

  getmydata(id:any){
    return this.httpClient.get(api+'/api/user/getOne/'+id);
  }

  getAllClients(username:any){
    return this.httpClient.get(api+'/api/getMyCorte/' + username);
  }

  getcorteciber(id:any){
    return this.httpClient.get(api+'/api/actas/CorteForSomeone/' + id);
  }

  getMyDates(id:any){
    return this.httpClient.get(api+'/api/actas/getMyDateCuts/'+id);
  }

  getmycort_fecha(id:any, fecha:any){
    return this.httpClient.get(api+'/api/actas/getCutByDate/'+id+ '/'+fecha);
  }

  obtenerTodos(){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("token") || '{}', "token");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.httpClient.get(api+'/api/actas/lowerToCut/',{headers});
  }

}  
