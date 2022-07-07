import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../../servicios/login.service";
import * as CryptoJS from 'crypto-js';
import { AdminService } from 'src/app/servicios/admin.service';
import { Observable } from 'rxjs';
import { SocketService } from '../../servicios/socket/socket.service';
import { ReadService } from '../inicio/models/read.service';
import { RestService } from '../historial/rest.service';
import {DatabaseService} from '../database/database.service';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
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
  faSackDollar = faSackDollar;
  usuario:any = "Usuario";
  contrasena: string = "";
  result:any = [];
  myRol: any;

  CiberSelect:any;
  userid:string = "";


  public data:any;
  public requests:any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
