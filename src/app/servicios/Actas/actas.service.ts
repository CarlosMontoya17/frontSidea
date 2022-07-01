import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from 'src/app/servicios/localstorage/localstorage.service';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Token } from '../../componentes/login/token.model';
const api = "https://actasalinstante.com:3030";
@Injectable({
  providedIn: 'root'
})
export class ActasService {
//ACTAS DE NACIMIENTO, ETC ... POR CURP
  constructor(private http: HttpClient, private localStorage:LocalstorageService) { }

  updateServicio(id:any, newService:any){
    var token = this.localStorage.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });

    return this.http.put(api+'/api/update/services/'+id,{ "servicios": newService } ,{ headers });
  }

  
  //SE optienen las actas
  obtainActasRequest() {
    var token = this.localStorage.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.get(api+'/api/actas/requests/obtainAll/', { headers });
  }


  getDates(){
    var token = this.localStorage.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.get(api+'/api/actas/requests/myDates/', { headers });
  }

  getMyRequets(date:any){
    var token = this.localStorage.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.get(api+'/api/actas/requests/myRequests/' + date, { headers });
  }


  getMyActa(id:any): Observable<any> {
    return this.http.get(api+'/api/actas/requests/getMyActa/'+id,{ responseType: 'blob'})
  }
    //Se envian las actas
    SolicitudactasporCurp(datos: any) {
      var token = this.localStorage.TokenDesencrypt();
      const headers = new HttpHeaders({ 'x-access-token': token! });
      return this.http.post(api + '/api/actas/requests/createOne/', datos, { headers });
    }
    //SE trae a todos los usuarios
    getuser(): Observable<any> {
      return this.http.get(api+'/api/user/getFull/')
    }
    
    reAsignarActa(id:any, provider:any, service:any){
      var token = this.localStorage.TokenDesencrypt();
      const headers = new HttpHeaders({ 'x-access-token': token! });
      return this.http.put(api+"/api/actas/reg/transpose/"+id, { newciber: provider, service: service }, { headers });
    }
  


}
