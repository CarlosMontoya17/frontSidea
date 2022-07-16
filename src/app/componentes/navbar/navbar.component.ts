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
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //Iconos
  faFile = faFile;
  faGear = faGear; 
  faBook = faBook;
  faBars = faBars;
  faHomeUser = faHomeUser;
  faSackDollar = faSackDollar;
  faAddressCard = faAddressCard;
  faPowerOff = faPowerOff;

  usuario:any = "";  
  myRol: any = "";


  constructor(private local:LocalstorageService, private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.GetMyUser();
  }


  GetMyUser(){
    let id = this.local.GetId();
    this.auth.getUserInfo(id).subscribe((data:any) => {
      this.usuario = data.data.username;
      this.myRol = data.rol;
    }, (err:any) => {
      this.local.removeAll();
      this.router.navigateByUrl("/")
      console.log(err);
    });

  }





}
