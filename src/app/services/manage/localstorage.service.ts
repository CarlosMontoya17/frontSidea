import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  TokenDesencrypt(){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    return final;
  }

  GetId(){
    var idlocal = localStorage.getItem("іди");
    var i = CryptoJS.AES.decrypt(idlocal || '{}', "іди");
    return i.toString(CryptoJS.enc.Utf8);
  }


}