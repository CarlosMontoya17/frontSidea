import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../historial/rest.service';
import * as CryptoJS from 'crypto-js';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { Observable } from 'rxjs';
import { GridApi, GridReadyEvent, ValueGetterFunc, ValueGetterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  result: any = [];
  ids: any = [];
  tipos: any = [];
  getcortes: any;
  page: number = 0;
  usuario: any = "Usuario";

  username: string = "";
  totalPrecio: number = 0;
  totalActas: number = 0;

  private gridApi!: GridApi;

  //Tabla
  cortes: any;
  columnDefs = [
    { field: "id", headerName: "Id", filter: true },
    { field: "document", headerName: "Documento", filter: true },
    { field: "states", headerName: "Estado", filter: true },
    { field: "curp", headerName: "CURP", filter: true },
    { field: "provider", headerName: "Asesor", filter: true },
    { field: "enterprise", headerName: "Ciber", filter: true },
    { field: "price", headerName: "Precio", type: 'valueColumn', filter: true, },
    { field: "createdAt", headerName: "Fecha y hora", filter: true },
    { field: "corte", headerName: "Corte", type: 'valueColumn', filter: true, }];
  public rowData!: any[];


  public pinnedBottomRowData!: any[];
  //Tabla
  constructor(private router: Router, private restservice: RestService, private http: HttpClient) {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');
    //this.rowData = this.restservice.getcorte<any[]>(arreglo[1]).toPromise();
    //this.rowData = this.http.get<any[]>('http://actasalinstante.com:3030/api/getMyCorte/' + arreglo[1]);
  }





  ngOnInit(): void {
  }
  onBtnExport() {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');
    this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' });
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');
    this.http
      .get<any[]>('http://actasalinstante.com:3030/api/getMyCorte/' + arreglo[1])
      .subscribe((data) => {
        this.rowData = data;
        this.precioTotal();
        this.onPinnedRowBottomCount();
      });

  }
  onPinnedRowBottomCount() {
    var rows = this.createData();
    this.gridApi.setPinnedBottomRowData(rows);
  }

  precioTotal() {
    var addNumber: number = 0;
    var addActas: number = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      addNumber += this.rowData[i]?.price;
      addActas += 1;
    }
    this.totalPrecio = addNumber;
    this.totalActas = addActas;
  }

  createData() {
    var result = [];
    result.push({
      enterprise: 'Actas: ' + this.totalActas,
      price: 'Total: ' + this.totalPrecio
    });
    return result;
  }
  //CORTE
  async getcorte() {
    if (localStorage.getItem('token') != null) {
      if (localStorage.getItem('usuario') != null) {
        var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
        let userName = usuario.toString(CryptoJS.enc.Utf8);
        let arreglo = userName.split('"');
        this.rowData = await this.restservice.getcorte(arreglo[1]).toPromise();
        console.log(this.getcortes);
      }
    }
  }
}
