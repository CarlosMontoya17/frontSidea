import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Municipios } from './municipios.model';
import { BehaviorSubject } from 'rxjs';
import { Requested } from './actas_req.model';

@Injectable({
  providedIn: 'root'
})
export class ReadService {
  private getRequested: BehaviorSubject<any> = new BehaviorSubject<any>({});


  view:boolean = false;
  constructor(private http: HttpClient) { }

  readMunicipios(key: string) {
    return this.http.get<Municipios>("assets/json/mun/mun_" + key + ".json");
  }

  readOficialia(mun: any, id: any) {
    return this.http.get<Municipios>("assets/json/of/"+mun+"/"+id+".json");
  }


  get getObtainsCards(){
      return this.getRequested.asObservable();
  }

  set ObtainCards(req: any){
        this.getRequested.next(req);
  }

  setViewCards(value:any){
      this.view = value;
  }

  getViewCards(){
    return this.view;
  }


  

}
