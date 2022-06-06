import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { RestService } from '../historial/rest.service';
import * as CryptoJS from 'crypto-js';
import { GridOptions, ValueGetterParams } from 'ag-grid-enterprise';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { AdminService } from 'src/app/servicios/admin.service';
import Swal from 'sweetalert2';
declare function getArray(): any;


@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular | undefined;
  localeText: any;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  defaultColGroupDef: any;
  columnTypes: any;
  params: any;
  faDownload = faDownload;
  sortingOrder: any;
  overlayLoadingTemplate: any;
  rowData: any = [];
  getcortes: any;
  pinnedBottomRowData!: any[];
  filtrados: any;
  utilidad: any;
  myRol: any;
  ///Totales
  totalDocumentos: number = 0;
  totalPrecioVendido: number = 0;
  totalPrecioAPagar: number = 0;
  totalUtilidad: number = 0;
  usernameLocal: string = "";
  MyrolCliente:boolean = false;
  //Datos para Tabla
  fechas:any;
  fechaSeleccionada:any;
  usuariosEnFecha:any;
  data:any;

  constructor(private restservice: RestService, private database: DatabaseService, private adminService:AdminService, private router: Router) {
    let AG_GRID_LOCALE_EN = getArray();
    this.localeText = AG_GRID_LOCALE_EN;
    this.columnDefs = [
      { field: "id", width: 80, headerName: "Id", filter: 'agSetColumnFilter' },
      { field: "provider", headerName: "Asesor", filter: 'agSetColumnFilter' },
      { field: "enterprise", headerName: "Ciber", filter: 'agSetColumnFilter' },
      { field: "document", headerName: "Documento", filter: 'agSetColumnFilter' },
      { field: "states", headerName: "Estado", filter: 'agSetColumnFilter' },
      { field: "curp", headerName: "CURP", filter: 'agSetColumnFilter' },
      { field: "price", headerName: "Precio vendido", type: 'valueColumn', filter: 'agSetColumnFilter' },
      { field: "buy", headerName: "Precio a pagar", type: 'valueColumn', filter: 'agSetColumnFilter' },
      { headerName: "Utilidad", field: "utilidad", valueGetter: this.totalUtility, type: 'valueColumn', filter: 'agSetColumnFilter' },
      { field: "pay2", headerName: "Pagar a", type: 'valueColumn', filter: 'agSetColumnFilter' },
      { field: "createdAt", headerName: "Fecha y hora", filter: 'agSetColumnFilter' },
      { field: "corte", headerName: "Fecha de corte", type: 'valueColumn', filter: 'agSetColumnFilter' },
    ];
    this.defaultColDef = {
      width: 200,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
      editable: true,
    };
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Por favor espere, estamos cargando los datos</span>';
    this.columnTypes = {
      numberColumn: {
        width: 130,
        filter: 'agNumberColumnFilter',
      },
      nonEditableColumn: { editable: false },
    };
  }
  ClienteVista() {
    if (this.myRol != 'Cliente' && this.myRol != 'Sucursal' && this.myRol!='Empleado') {
      this.MyrolCliente = !this.MyrolCliente;
    }
  
    
  }

  async ngOnInit() {

    const token = localStorage.getItem('привіт');
    const usuario = localStorage.getItem('Імякористувача');

    const un = CryptoJS.AES.decrypt(usuario || '{}', "Імякористувача");
    const UserName = un.toString(CryptoJS.enc.Utf8);
    const i = localStorage.getItem('іди');
    const is = CryptoJS.AES.decrypt(i || '{}', "іди");
    const id = is.toString(CryptoJS.enc.Utf8);
  
    const array = UserName.split('"');
    this.usernameLocal = array[1];
    
    const data: any = await this.database.getmydata(id).toPromise();
    this.myRol = data.data.rol;

    if(this.myRol != 'Cliente'  && this.myRol!='Empleado'){
    

    //this.getcorte();
    this.getDates();
    this.setDate(null);
  
  
      if (!token) {
        this.router.navigateByUrl('/login');
      }
 
     
  
    }
    else{

      this.router.navigateByUrl('/inicio');
  

    }



    
  }
  onFilterChanged(params: GridOptions): void {
    this.filtrados = params.api?.getModel();
    this.onPinnedRowBottomCount();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onPinnedRowBottomCount() {
    var rows = this.createData();
    this.gridApi.setPinnedBottomRowData(rows);
  }
  
  createData() {
    var result = [];

    this.totalDocumentos = 0;
    this.totalPrecioVendido = 0;
    this.totalPrecioAPagar = 0;
    if (this.filtrados?.rowsToDisplay == undefined) {
      for (let i = 0; i < this.rowData.length; i++) {
        this.totalDocumentos += 1;
        this.totalPrecioVendido += this.rowData[i].price;
        if (this.rowData[i].buy != null) {
          this.totalPrecioAPagar += this.rowData[i].buy;
        }
        else {
          this.totalPrecioAPagar += 0;
        }
      }
    }
    else {
      for (let i = 0; i < this.filtrados?.rowsToDisplay.length; i++) {
        this.totalDocumentos += 1;
        this.totalPrecioVendido += this.filtrados.rowsToDisplay[i].data.price;
        if (this.filtrados.rowsToDisplay[i].data.buy != null) {
          this.totalPrecioAPagar += this.filtrados.rowsToDisplay[i].data.buy;
        }
        else {
          this.totalPrecioAPagar += 0;
        }
      }
    }


    result.push({
      document: `Documentos: ${this.totalDocumentos}`,
      curp: 'Totales:',
      price: this.totalPrecioVendido,
      buy: this.totalPrecioAPagar,
    });

    return result;
  }

  onBtnExport() {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('Імякористувача') || '{}', "Імякористувача");
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

  totalUtility(params: ValueGetterParams) {
    var preciovendido = params.getValue('price')
    var precioxpagar = params.getValue('buy')
    let utility;
    if (preciovendido != null && precioxpagar != null) {
      utility = preciovendido - precioxpagar;
    }
    else {
      utility = [];
    }
    return utility;
  }

  // async getcorte() {

  //   var usuario = CryptoJS.AES.decrypt(localStorage.getItem('id') || '{}', "id");
  //   let id = usuario.toString(CryptoJS.enc.Utf8);
  //   // this.getcortes = await this.restService.getcorte(arreglo[1]).toPromise();
  //   const data: any = await this.restservice.getcorte(id).toPromise();
  //   let Arreglo: any = [];
  //   let index: number = 0;
  //   this.getcortes = Arreglo;
  //   //this.rowData = data;
  //   this.onPinnedRowBottomCount();
  // }

  async getDates(){
    this.fechas = await this.database.getAllDates().toPromise();
  }

  setDate(fecha:any){
    this.fechaSeleccionada = fecha;

    this.getCorte();
  }


  async getCorte() {
    this.rowData = await this.adminService.getHistorialAt(this.fechaSeleccionada).toPromise();
    this.onPinnedRowBottomCount();


    await this.adminService.getHistorialAt(this.fechaSeleccionada).subscribe(data => {

    },(err:any) => {

    });
  }

}
