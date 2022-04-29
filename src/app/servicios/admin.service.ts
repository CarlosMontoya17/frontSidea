import { Injectable } from '@angular/core';
import * as crypto from "crypto-js";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare function swalError(mensaje:any): any;
declare function swalOk(mensaje:any): any;
const urlApi = 'http://actasalinstante.com:3030';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpOptions: any;
  httpOptions2: any;
  urlsAdd: any = [];
  constructor(private http: HttpClient) { }



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


 





















getImages(categoria:any){
  return this.http.get(urlApi+'/sidea/api/imgs/get/'+categoria, this.httpOptions);
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




}






