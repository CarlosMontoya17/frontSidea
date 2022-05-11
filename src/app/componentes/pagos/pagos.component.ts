import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../historial/rest.service';
import * as CryptoJS from 'crypto-js';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { ConnectableObservable, Observable } from 'rxjs';
import { GridApi, GridReadyEvent, RowSpanParams, ValueGetterFunc, ValueGetterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2';
declare function onclick(): any;
@Component({

  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})

export class PagosComponent implements OnInit {
  
  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;
  //VARIABLES DECLARADAS PARA FUNCIONES A UTILIZAR
  conteo: boolean = false;
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
  fechas: any;
  //Tabla
  cortes: any;
  NumerodeActas: any;
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
  CiberSelect: any;
  ciberidselect: any;
  Corte: any;
  TotalCorte: number = 0;
  nacimiento: any;
  defuncion: any;
  matrimonio: any;
  divorcio: any;
  semancot: any;
  nss: any;
  rfc: any;
  derechos: any;
  total: any;
  conteo_nacimiento: number = 0;
  conteo_defuncion: number = 0;
  conteo_matrimonio: number = 0;
  conteo_divorcio: number = 0;
  conteo_cot: number = 0;
  conteo_nss: number = 0;
  conteo_rfc: number = 0;
  conteo_der: number = 0;
  conteo_inh: number = 0;
  conteo_total: number = 0;
  //TABLE
  corteSeleccionado: string = "Seleccionar corte";
  constructor(private router: Router, private restservice: RestService, private http: HttpClient, private database: DatabaseService) {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('id') || '{}', "id");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');
  }
 


  exportexcel(): void {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');

    // this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' }) Esta funcion permite exporytar a excel;

    /* Pasamos el id de la tabla de registros */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* genera el excel y agregra los elementos de la tabla */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Corte' + arreglo[1]);

    /* Exportamos a excel */
    XLSX.writeFile(wb, "Pagos-" + arreglo[1] + ".xlsx");
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Corte de ' + arreglo[1] + ' descargado',
      showConfirmButton: false,
      timer: 1500
    })
  }
  changeView() {
    
    this.conteo = !this.conteo;
    

    
  }
  //DESCARGAR CORTE EN IMAGEN PNG
  downloadCorte() {
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'Corte ' + this.CiberSelect + ' .png';
      this.downloadLink.nativeElement.click();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Corte de ' + this.CiberSelect + ' descargado',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  async setCorte(fecha: any) {

    this.TotalCorte = 0;
    this.corteSeleccionado = fecha;
    let date: string = "";
    if (fecha == "Actual") {
      date = "null";
    }
    else {
      date = fecha;
    }

    //const data: any = await this.database.getmycort_fecha(this.ciberidselect, date).toPromise();
    const data: any = await this.database.getallCorte(this.ciberidselect, date).toPromise();
    this.Corte = data;

    for (let i = 0; i < data.length; i++) {
      switch (data[i].document) {
        case "Asignación de Número de Seguridad Social":
          this.conteo_nss +=1;
          break;
        case "Acta de Defunción":
          this.conteo_defuncion += 1;
          break;
        case "Acta de Nacimiento":
          this.conteo_nacimiento  +=1;
          break;
        case "Acta de Matrimonio":
          this.conteo_matrimonio +=1;
          break;
        case "Acta de Divorcio":
          this.conteo_divorcio +=1;
          break;
        case "Constancia de Vigencia de Derechos":
          this.conteo_der +=1;
          break;
        case "Constancia de Semanas Cotizadas en el IMSS":
          this.conteo_cot +=1;
          break;
        case "Registro Federal de Contribuyentes":
          this.conteo_rfc +=1;
          break;
        case "CONSTANCIA DE NO INHABILITACIÓN":
          this.conteo_inh +=1;
          break;
        default:
          break;
      }
        
      
     
      this.conteo_total += 1;
   
    
      
      
    }
    

    data.forEach((Element: any) => {
      this.TotalCorte += Number(Element.price);
    });
  }

  //SE OBTIENE EL CORTE CON EL CIBER
  async getCorte(id: any, nombre: any) {
    this.conteo_nacimiento = 0;
    this.conteo_defuncion = 0;
    this.conteo_matrimonio = 0;
    this.conteo_divorcio = 0;
    this.conteo_cot = 0;
    this.conteo_nss = 0;
    this.conteo_rfc = 0;
    this.conteo_der = 0;
    this.conteo_inh = 0;
    this.conteo_total = 0;
    this.Corte = [];
    this.corteSeleccionado = "Seleccionar corte";
    this.CiberSelect = nombre;
    this.ciberidselect = id;
    this.TotalCorte = 0;
    this.fechas = await this.database.Obtenerfechas(id).toPromise();
    const data: any = await this.restservice.GetActasNumber(id).toPromise();

    this.nacimiento = data["nac"];
    this.defuncion = data["def"];
    this.matrimonio = data["mat"];
    this.divorcio = data["div"];
    this.semancot = data["cot"];
    this.nss = data["nss"];
    this.rfc = data["rfc"];
    this.derechos = data["der"];
    this.total = data["total"];
    this.NumerodeActas = data;
  }


  //CAMBIO DEL FILTRO CON EL TOKEN Y USUARIO PARA OPTENER TOLOS LOS CLIENTES
  async changeFilter(filter: any) {

    if (filter == 1 && this.filter1 == false) {
      this.filter1 = true;
      this.filter2 = false;
      var usuario = CryptoJS.AES.decrypt(localStorage.getItem('id') || '{}', "id");
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
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/login');
    }
    this.getTodos();

  }
  //EXPORTAR EL CORTE 
  onBtnExport() {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');
    this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' });
  }

  //SE OPTIENE EL TOKEN Y TRAE EL CLIENTE ACUTAL CON EL PRECIO TOTAL
  async requestData() {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("token") || '{}', "token");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
    const data: any = await this.http
      .get<any[]>('http://actasalinstante.com:3030/api/actas/ClientsActuals/', { headers }).toPromise();
    this.rowData = data;
    this.precioTotal();
  }

  async getTodos() {
    const data: any = await this.database.obtenerTodos().toPromise();

    this.rowData = data;
  }
  //PRECIO TOTAL
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
      }
    }
  }

  //FILTRO DE ENTERPRISE 
  async noRepeatData() {
    let enterprises: any[] = [];
    let enter = this.rowData.filter((item, index) => {
    });
    this.Cibers = enter;
  }
}
