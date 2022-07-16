import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from 'src/app/services/manage/localstorage.service';
import { BehaviorSubject, Observable } from 'rxjs';
const urlApi = 'https://actasalinstante.com:3030';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private local:LocalstorageService) { }


  getUserInfo(id:any){
    let token = this.local.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.get(urlApi+'/api/user/getOne/'+id, { headers });
  }

}
