import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from '../componentes/login/token.model';
const urlApi = 'https://actasalinstante.com:3030';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpclient: HttpClient) { }
  async login(username: any, password: any) {
    const data = await this.httpclient.post<Token>(urlApi + '/api/user/signin/', { username: username, password: password }).toPromise();

    return data;
  }
  async adduser(username: any, password: any, rol: any, type: any, idSuper: any, precios: any, status: any, nombre: any) {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return await this.httpclient.post<Token>(urlApi + '/api/user/createOne/', { username: username, password: password, rol: rol, type: type, idSuper: idSuper, precios: precios, status: status, nombre: nombre },{headers}).toPromise();
  }
}
