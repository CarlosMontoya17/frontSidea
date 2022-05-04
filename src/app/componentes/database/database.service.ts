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
  

}