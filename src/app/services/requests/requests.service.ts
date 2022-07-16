import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalstorageService } from '../manage/localstorage.service';

const urlApi = 'https://actasalinstante.com:3030';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http:HttpClient, private local:LocalstorageService) { }


  //ACTAS

  getMyDatesActasRequest(){
    let token = this.local.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.get(urlApi+'/api/actas/requests/myDates/', { headers });
  }

  getAllActasRequest(date:any){
    let token = this.local.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.get(urlApi+'/api/actas/requests/myRequests/'+date, { headers });
  }

  SendARequest(type:any, metadata:any, preferences:any){
    let token = this.local.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.post(urlApi+'/api/actas/requests/new/', { type, metadata, preferences },{ headers });
  }

  DownloadActa(id:any){
    return this.http.get(urlApi+'/api/actas/requests/getMyActa/'+id, { responseType: 'blob'});
  }

}
