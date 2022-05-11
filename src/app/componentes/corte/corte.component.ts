import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../historial/rest.service';
import * as CryptoJS from 'crypto-js';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
declare function getArray():any;


import { Observable } from 'rxjs';
import { GridApi, GridReadyEvent, RowSpanParams, ValueGetterFunc, ValueGetterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.css']
})

export class CorteComponent implements OnInit {


  @ViewChild("agGrid", {static:false}) agGrid: AgGridAngular | undefined;
  result: any = [];
  ids: any = [];
  tipos: any = [];
  getcortes: any;
  page: number = 0;

  usuario: any = "Usuario";
  username: string = "";
  totalPrecio: number = 0;
  totalActas: number = 0;


  columnDefs:any;
  localeText:any;
  gridColumnApi:any;
  gridApi: any;
  defaultColDef:any;
  defaultColGroupDef:any;
  columnTypes:any;
  params:any;
  sortingOrder:any;
  overlayLoadingTemplate:any;
  
  //Tabla
  cortes: any;
  // columnDefs = [
  //   { field: "id", width: 80, headerName: "Id", filter: true },
  //   { field: "provider", headerName: "Ciber", filter: true },
  //   { field: "enterprise", headerName: "Aesor", filter: true },
  //   { field: "document", headerName: "Documento", filter: true },
  //   { field: "states", headerName: "Estado", filter: true },
  //   { field: "curp", headerName: "CURP", filter: true },
  //   { field: "price", headerName: "Precio", type: 'valueColumn', filter: true, },
  //   { field: "createdAt", headerName: "Fecha y hora", filter: true },
  //   { field: "corte", headerName: "Corte", type: 'valueColumn', filter: true, }
  // ];

  rowData:any;
  pinnedBottomRowData!: any[];
  //Tabla
  constructor(private router: Router, private restservice: RestService, private http: HttpClient) {
    this.columnDefs = [
        { field: "id", width: 80, headerName: "Id", filter: true },
        { field: "provider", headerName: "Ciber", filter: true },
        { field: "enterprise", headerName: "Aesor", filter: true },
        { field: "document", headerName: "Documento", filter: true },
        { field: "states", headerName: "Estado", filter: true },
        { field: "curp", headerName: "CURP", filter: true },
        { field: "price", headerName: "Precio", type: 'valueColumn', filter: true, },
        { field: "createdAt", headerName: "Fecha y hora", filter: true },
        { field: "corte", headerName: "Corte", type: 'valueColumn', filter: true, }
      ];
      this.defaultColDef = {
        width: 200,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        resizable: true,
        editable: true,
      };
      this.overlayLoadingTemplate ='<span class="ag-overlay-loading-center">Por favor espere, estamos cargando los datos</span>';
      this.columnTypes = {
        numberColumn: {
          width: 130,
          filter: 'agNumberColumnFilter',
        },
        nonEditableColumn: { editable: false },
      };
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/login');
    }
    this.getcorte();
  }

  onBtnExport() {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');

    this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Corte de ' + arreglo[1] + ' descargado',
      showConfirmButton: false,
      timer: 1500
    })
  }

  async onGridReady(params: GridReadyEvent) {
    // this.gridApi = params.api;
    // if (localStorage.getItem('token') != null) {
    //   if (localStorage.getItem('id') != null) {
    //     var usuario = CryptoJS.AES.decrypt(localStorage.getItem('id') || '{}', "id");
    //     let id = usuario.toString(CryptoJS.enc.Utf8);
    //     // this.getcortes = await this.restService.getcorte(arreglo[1]).toPromise();
    //     const data: any = await this.restservice.getcorte(id).toPromise();
    //     this.rowData = data;
    //     this.precioTotal();
    //     this.onPinnedRowBottomCount();
    //   }
    // } 
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


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
      price: 'Total: $' + this.totalPrecio
    });

    return result;
  }

  //CORTE
  async getcorte() {
    if (localStorage.getItem('token') != null) {
      if (localStorage.getItem('id') != null) {
        var usuario = CryptoJS.AES.decrypt(localStorage.getItem('id') || '{}', "id");
        let id = usuario.toString(CryptoJS.enc.Utf8);
        // this.getcortes = await this.restService.getcorte(arreglo[1]).toPromise();
        const data: any = await this.restservice.getcorte(id).toPromise();
        let Arreglo: any = [];
        let index: number = 0;
        for (let i = 0; i < data.length; i++) {
          const Asesor: any = await this.restservice.getidsupervisor(data[i].provider).toPromise();
          const Ciber: any = await this.restservice.getidsupervisor(data[i].enterprise).toPromise();
          Arreglo.push({
            "i": index += 1,
            "id": data[i].id,
            "document": data[i].document,
            "curp": data[i].curp,
            "states": data[i].states,
            "nombreacta": data[i].nombreacta,
            "provider": Asesor.data.nombre,
            "enterprise": Ciber.data.nombre,
            "price": data[i].price,
            "createdAt": data[i].createdAt
          });
        }
        this.getcortes = Arreglo;
        this.rowData = data;
        this.precioTotal();
        this.onPinnedRowBottomCount();

      }
    }
  }
}


