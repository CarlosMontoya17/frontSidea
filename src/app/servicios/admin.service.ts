import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

declare function swalError(mensaje:any): any;
declare function swalOk(mensaje:any): any;
const urlApi = 'https://actasalinstante.com:3030';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpOptions: any;
  httpOptions2: any;
  urlsAdd: any = [];
  private corte: BehaviorSubject<String> = new BehaviorSubject<String>("Elige un corte");
  router: any;
  constructor(private http: HttpClient) { }

  enviado(){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.get(urlApi+'/api/actas/ReadySend/', { headers });

  }

  porenviar(){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.get(urlApi+'/api/actas/DontSend/', { headers });

  }

//float int
  cambiarstatus(id:string, date:any, status:any){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    

    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.put(urlApi+'/api/actas/Send/'+id, { date:date, send:status }, { headers });
  }

  async addImg(param:any, categoria:any){
    if(param!=null){
      var img:any;
      let formData = new FormData();
      img = param.name;
      formData.append("uploads[]", param, img);
      await this.uploadFile(formData, '/imgUpload').subscribe((res)=> {
        this.http.post(urlApi+'/sidea/api/imgs/create/', {path: img, categoria : categoria}, this.httpOptions2).subscribe(res => {
          swalOk('Imagen agregada correctamente');
          setTimeout(function(){
            location.reload();
          },1300);
        },error => {
          console.log(error)
          swalError('Error al subir la imagen');
        });
      },error => {
        console.log(error)
        swalError('Error al subir la imagen');
      });
    }
  }


  init() {
    if (localStorage.getItem('dist') != null) {
      var decrypted = CryptoJS.AES.decrypt(localStorage.getItem('dist') || '{}', "data");
      var result: any = decrypted.toString(CryptoJS.enc.Utf8);
      var data: any = JSON.parse(result);
    } else {
      var data: any = 'test';
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': data.accessToken
      })
    };
    this.httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': data.accessToken,
      }),
      responseType: 'text'
    };
  }


  getMyClientForDate(date:any){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });

    return this.http.get(urlApi+'/api/actas/reg/Corte/Clients/'+date, { headers });
  };


  getCorteByUserForDate(id:any, date:any){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.get(urlApi+'/api/actas/reg/Corte/'+id+'/'+date,{headers});
  }



  getHistorialAt(date:any){
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    const headers = new HttpHeaders({ 'x-access-token': final! });
    return this.http.get(urlApi+'/api/actas/reg/History/'+date,{headers});
  }
//PUBLICIDAD

sendImages(body: FormData): Observable<any> {
  var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
  var token: any = i.toString(CryptoJS.enc.Utf8);
  var parteuno = token.slice(1);
  var final = parteuno.slice(0, -1);
  const headers = new HttpHeaders({ 'x-access-token': final! });
  return this.http.post(urlApi+`/api/ads/up/`, body, { headers })
}


getNames(){
  var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
  var token: any = i.toString(CryptoJS.enc.Utf8);
  var parteuno = token.slice(1);
  var final = parteuno.slice(0, -1);
  const headers = new HttpHeaders({ 'x-access-token': final! });
  return this.http.get(urlApi+'/api/ads/getNames/',{headers});
}

GetImages(id:any){
  var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
  var token: any = i.toString(CryptoJS.enc.Utf8);
  var parteuno = token.slice(1);
  var final = parteuno.slice(0, -1);
  const headers = new HttpHeaders({ 'x-access-token': final! });
  return this.http.get<any>(urlApi+'/api/ads/getImage/'+id,{headers});
}





















getImages(tipo:any){
  var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
  var token: any = i.toString(CryptoJS.enc.Utf8);
  var parteuno = token.slice(1);
  var final = parteuno.slice(0, -1);
  const headers = new HttpHeaders({ 'x-access-token': final! });
  return this.http.get<any>(urlApi+'/api/ads/getImage/'+tipo,{headers});
 // return this.http.get(urlApi+'/api/ads/getImage/'+categoria, this.httpOptions);
}



uploadFile(formData:any, url:any) {
  return this.http.post(urlApi+url, formData);
}


deleteImg(id:any, path:any){
  return this.http.delete(urlApi+'/sidea/api/imgs/delete/'+id+'/'+path, this.httpOptions2);
}

descargarImgs(){
  return this.http.get(urlApi+'/imgs/download/', {responseType: 'blob'});
}

get getSelect() {
  return this.corte.asObservable();
  
}

set setSelect(newTitle: String) {
  this.corte.next(newTitle);
}




}






