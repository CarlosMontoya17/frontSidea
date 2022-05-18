import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Municipios } from './municipios.model';


@Injectable({
  providedIn: 'root'
})
export class ReadService {

  constructor(private http:HttpClient) { }

readMunicipios(key:string){
  return this.http.get<Municipios>("assets/json/mun/mun_"+key+".json");
}

}
