import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../historial/rest.service';
import * as CryptoJS from 'crypto-js';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  //Tabla
  columnDefs = [{ field: "N" }, { field: "tipo de documento" }, { field: "Estado" }, { field: "Nombre"}, { field: "Asesor" }, { field: "Ciber"}, { field: "Estado"}, { field: "Precio acta de negocio" }, { field: "Fecha" }];

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];


  //Tabla


  result: any = [];
  getcortes: any;
  page: number = 0;
  usuario: any = "Usuario";
  constructor(private router: Router, private restservice: RestService) { }

  ngOnInit(): void {

    this.getcorte();
  }
  //CORTE
  async getcorte() {
    if (localStorage.getItem('token') != null) {
      if (localStorage.getItem('usuario') != null) {
        var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");

        let userName = usuario.toString(CryptoJS.enc.Utf8);
        let arreglo = userName.split('"');
        this.getcortes = await this.restservice.getcorte(arreglo[1]).toPromise();
        console.log(this.getcortes);
      }
    }
  }
}
