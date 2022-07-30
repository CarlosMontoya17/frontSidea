import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from "crypto-js";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from 'src/app/services/manage/localstorage.service';
import { BehaviorSubject, Observable } from 'rxjs';
//Models
import { myData } from 'src/app/models/myData.model';

const urlApi = 'https://actasalinstante.com:3030';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myData: BehaviorSubject<myData> = new BehaviorSubject<myData>({
    id: 0,
    rol: "",
    servicios: "",
    status: false,
    username: ""
  });

  constructor(private http:HttpClient, private local:LocalstorageService, private router: Router) { }


  getUserInfo(){
    let token = this.local.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.get<myData>(urlApi+'/api/user/myData/', { headers });
  }

  Unauth(){
    this.local.removeAll();
    this.router.navigateByUrl("/");
  }

  set SaveMyData(myData:myData){
    this.myData.next(myData);
  }

  get GetMyData(){
    return this.myData.asObservable();
  }

}
