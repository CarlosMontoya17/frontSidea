import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { LocalstorageService } from './manage/localstorage.service';
const api = "https://actasalinstante.com:3030";
@Injectable({
  providedIn: 'root'
})
export class RobotsService {

  constructor(private http: HttpClient, private local:LocalstorageService) { }

  Captcha(robotname:string){
    let token = this.local.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });

    return this.http.get(api+"/api/robots/captcha/view/"+robotname, { responseType: 'blob', headers });
  }

  GetAllRobots(){
    let token = this.local.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.get(api+"/api/robots/getAll/", { headers });
  }

  UpNewInstruction(instruction:any, name:any){
    let token = this.local.TokenDesencrypt();
    const headers = new HttpHeaders({ 'x-access-token': token! });
    return this.http.post(`${api}/api/robots/controller/instruction/new/`, {name, instruction}, {headers});
  }


}
