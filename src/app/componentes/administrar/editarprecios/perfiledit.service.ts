import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const api = "http://actasalinstante.com:3030"
@Injectable({
  providedIn: 'root'
})
export class PerfileditService {

  data: any = [];
  constructor(private http: HttpClient) { }

  set(user: any) {
    this.data = user;
  }

  get() {
    return this.data;
  }
  editprecios(id: any, precios: any){

    return this.http.put(api + '/api/user/editPrice/' + id,  precios );
    

  }
}
