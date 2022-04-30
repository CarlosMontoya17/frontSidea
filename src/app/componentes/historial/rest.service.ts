import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Token } from '../login/token.model';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {
  }
  sendPost(body: FormData): Observable<any> {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("token") || '{}', "token");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.post(`http://actasalinstante.com:3030/api/actas/load`, body, { headers })
  }
  getdoc(body: FormData): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.post(`http://actasalinstante.com:3030/api/actas/load`, body, { headers })
  }
  getuser(): Observable<any> {
    return this.http.get('http://actasalinstante.com:3030/api/user/getFull/')
  }
  getciber(): Observable<any> {
    return this.http.get('http://actasalinstante.com:3030/api/clients/getAll')
  }
  getprecioyasesor(tipo: any, estado: any, id: any): Observable<any> {
    return this.http.put('http://actasalinstante.com:3030/api/clients/getMyData/' + id, { tipo, estado })
  }

  getidsupervisor(id: any) {
    return this.http.get('http://actasalinstante.com:3030/api/user/getOne/' + id);
  }
  enviarcta(ciberseleccionado: any, superviser: any, tipo: any, curp: any, estado: any, precio: any, nombre: any, requested: any): Observable<any> {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("token") || '{}', "token");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
    return this.http.post('http://actasalinstante.com:3030/api/actas/up', { enterprise: ciberseleccionado, provider: superviser, document: tipo, states: estado, curp: curp, nombreacta: nombre, requested: requested, price: precio }, { headers });
  }
  getcorte(usuario: any): Observable<any> {
    return this.http.get('http://actasalinstante.com:3030/api/getMyCorte/' + usuario)
  }
  deleteuser(id: any): Observable<any> {
    return this.http.get('http://actasalinstante.com:3030/api/user/delete/' + id)
  }
  editPrecior(id: any, precios: any): Observable<any> {
    return this.http.put('http://actasalinstante.com:3030/api/user/editPrice/' + id, { precios: precios })
  }
} 