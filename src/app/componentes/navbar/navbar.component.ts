import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { SocketService } from '../../servicios/socket/socket.service';
import { LocalstorageService } from 'src/app/services/manage/localstorage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faHomeUser } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';
//Models
import { myData } from 'src/app/models/myData.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //Observables
  myData$: Observable<myData>;

  //Iconos
  faFile = faFile;
  faGear = faGear; 
  faBook = faBook;
  faBars = faBars;
  faHomeUser = faHomeUser;
  faSackDollar = faSackDollar;
  faAddressCard = faAddressCard;
  faPowerOff = faPowerOff;
  faPersonWalkingArrowRight = faPersonWalkingArrowRight;

  usuario:any = "";  
  myRol: any = "";
 
  //Selectable
  option:Number = 0;

  constructor(private local:LocalstorageService, private auth:AuthService, private router:Router) {
    this.myData$ = auth.GetMyData;
   }

  ngOnInit(): void {

    this.GetMyUser();
    // try{
    //   this.option = Number(localStorage.getItem("aych24sdTi"));
    // }
    // catch{
    //   this.option = 0;
    // }
  }


  GetMyUser(){
    this.auth.getUserInfo().subscribe( data => {
      this.auth.SaveMyData = data;
      this.usuario = data.username;
      this.myRol = data.rol;
      document.getElementById("loaderPage")?.setAttribute("style", "display: none;");
    }, err=> {
      this.local.removeAll();
      this.router.navigateByUrl("/");
    });
  }


  SelectOption(option:number){
    this.option = option;
    if(option == 6){
      this.local.removeAll();
      this.router.navigateByUrl("/");
    }
    // localStorage.setItem("aych24sdTi", option.toString());
  }



}
