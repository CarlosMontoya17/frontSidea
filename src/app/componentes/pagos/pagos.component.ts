import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../historial/rest.service';
import * as CryptoJS from 'crypto-js';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { Observable } from 'rxjs';
import { GridApi, GridReadyEvent, RowSpanParams, ValueGetterFunc, ValueGetterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;

  
  result: any = [];
  ids: any = [];
  tipos: any = [];
  getcortes: any;
  page: number = 0;
  usuario: any = "Usuario";
  username: string = "";
  totalPrecio: number = 0;
  totalActas: number = 0;
  faArrowRightFromBracket = faArrowRightFromBracket;
  private gridApi!: GridApi;
  filter1: boolean = true;
  filter2: boolean = false;
  //Tabla
  cortes: any;
  columnDefs = [
    { field: "id", width: 80, headerName: "Id", filter: true },
    { field: "enterprise", headerName: "Ciber", filter: true },
    { field: "document", headerName: "Documento", filter: true },
    { field: "states", headerName: "Estado", filter: true },
    { field: "curp", headerName: "CURP", filter: true },
    { field: "price", headerName: "Precio", type: 'valueColumn', filter: true, },
    { field: "createdAt", headerName: "Fecha y hora", filter: true },
    { field: "corte", headerName: "Corte", type: 'valueColumn', filter: true, }];
  public rowData!: any[];
  public pinnedBottomRowData!: any[];
  //Tabla
  ciberSearch: string = "";

  //TABLE
  Cibers: any;
  CiberSelect:any;
  Corte:any;
  TotalCorte:number = 0;
  //TABLE
  constructor(private router: Router, private restservice: RestService, private http: HttpClient, private database: DatabaseService) {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');
    //this.rowData = this.restservice.getcorte<any[]>(arreglo[1]).toPromise();
    //this.rowData = this.http.get<any[]>('http://actasalinstante.com:3030/api/getMyCorte/' + arreglo[1]);
  }

  downloadCorte(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'Corte '+this.CiberSelect+' .png';
      this.downloadLink.nativeElement.click();
    });
  }
  async getCorte(ciber:any){
    this.CiberSelect = ciber;
    this.TotalCorte = 0;

    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
      let userName = usuario.toString(CryptoJS.enc.Utf8);
      let arreglo = userName.split('"');
      let users: any = await this.database.getAllClients(arreglo[1]).toPromise();
      let actas:any = users.filter((element:any)=>{
        return element['enterprise'].includes(ciber);
      });
      this.Corte = actas;
    
      actas.forEach((element:any) => {
          this.TotalCorte += Number(element.price);
      });
  }

  async changeFilter(filter: any) {
    if (filter == 1 && this.filter1 == false) {
      this.filter1 = true;
      this.filter2 = false;
      console.log('Filter 1');

      var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
      let userName = usuario.toString(CryptoJS.enc.Utf8);
      let arreglo = userName.split('"');


      let users: any = await this.database.getAllClients(arreglo[1]).toPromise();

      let enterprises: any = [];
      users!.forEach((element: any) => {
        enterprises.push(element.enterprise);
      });
      this.Cibers = enterprises;
    }
    else if (filter == 2 && this.filter2 == false) {
      this.filter2 = true;
      this.filter1 = false;
      console.log('Filter 2');

      var idlocal = localStorage.getItem("id");
      var i = CryptoJS.AES.decrypt(idlocal || '{}', "id");
      var id: any = i.toString(CryptoJS.enc.Utf8);
      const users: any = await this.database.getAllUsers(id).toPromise();
      let enterprises: any = [];
      users!.forEach((element: any) => {
        enterprises.push(element.nombre);
      });
      this.Cibers = enterprises;
    }
  }
  ngOnInit(): void {
    this.requestData();
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
        this.noRepeatData();
      });

  }

  onPinnedRowBottomCount() {
    var rows = this.createData();
    this.gridApi.setPinnedBottomRowData(rows);
  }

  requestData() {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');
    this.http
      .get<any[]>('http://actasalinstante.com:3030/api/getMyCorte/' + arreglo[1])
      .subscribe((data) => {
        this.rowData = data;
        this.precioTotal();
        this.noRepeatData();
      });
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

  async noRepeatData() {
    let enterprises: any[] = [];
    for (let i = 0; i < this.rowData.length; i++) {
      enterprises.push(this.rowData[i].enterprise);
    }
    let enter = enterprises.filter((item, index) => {
      return enterprises.indexOf(item) === index;
    });

    this.Cibers = enter;
   // else if(this.rowData[i].enterprise != this.rowData[i-1].enterprise){
    //   console.log(this.rowData[i].enterprise+">"+this.rowData[i-1].enterprise);
    //   enterprises.push(this.rowData[i].enterprise);
    // }
  }

}
