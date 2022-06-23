import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import Swal from 'sweetalert2';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RestService } from './rest.service';
declare const main: any;
import * as CryptoJS from 'crypto-js';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridApi, GridOptions, ValueGetterParams } from 'ag-grid-enterprise';
import * as XLSX from 'xlsx'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
declare function loader(): any;
declare function closeAlert(): any;
declare function getArray(): any;
import { AgGridAngular } from 'ag-grid-angular';
import { AdminService } from 'src/app/servicios/admin.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],

})

export class HistorialComponent implements OnInit {
  //VARIABLES
  private gridApi!: GridApi;
 api = "https://actasalinstante.com:3030";
 sortingOrder: any;
  //cambios de vista
  rowData: any = [];
  papeleras: boolean = false;
  conteo: boolean = false;
  conteo2: boolean = false;
  conteo3: boolean = false;
  hidden: boolean = false;
  hidden2: boolean = true;
  excel: boolean = false;
  select:any;
  docPath: string = "";
  faRobot = faRobot;
  public imagePath: any;
  //Variables de iconos
  faTrashCan = faTrashCan;
  facalend = faCalendarDays;
  restored = faTrashRestore;
  papelera = faTrashArrowUp;
  faUser = faUser;
  //Imagen URL
  imgURL: any;
  //Variables generales
  fileTmp: any;
  info: any;
  preview: any = 0;
  vista: boolean = false;
  tablavieja: boolean = false;
  //Select de boostrap
  tipodebusqueda: any = 'Seleccione el tipo de busqueda';
  getciber: any;
  getcortes: any;
  valorabuscar: string = "";
  buscargethistorial: string = "";
  tipo: any;
  estado: any;
  nombredecliente: any;
  apellidosc: any;
  precioyasesor: any;
  namefile: any;
  ciberseleccionado: any;
  // VARIABLES PARA ENVIAR ACTAS
  enviaractas: any;
  enterprise: any;
  provider: any;
  document: any;
  states: any;
  curp: any;
  nombreacta: any;
  request: any;
  price: any;
  usuario: any = 'Usuario';
  result: any = [];
  page: number = 0;
  pagePapelera: number = 0;
  myInfo: any;
  myRol: any;
  MyrolCliente:boolean = false;
  nombreProvedor: String = "";
  nombreEmpresa: string = "";
  nombreasesor: string = "";
  ids: any = [];
  tipos: any = [];
  username: string = "";
  totalPrecio: number = 0;
  totalActas: number = 0;
  cortes: any;
  responsableSearch: string = "";
  newResponsable: any;
  fecha: any;
//variables del API
  gettraerPapelera2: any;

  public pinnedBottomRowData!: any[];
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular | undefined;
  selectedRows:any;
  localeText: any;
  gridApis: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  defaultColGroupDef: any;
  columnTypes: any;
  params: any;
  overlayLoadingTemplate: any;
  totalDocumentos: number = 0;
  totalPrecioVendido: number = 0;
  totalPrecioAPagar: number = 0;
  totalUtilidad: number = 0;
  usernameLocal: string = "";
  filtrados: any;
  //Datos para Tabla
  fechas: any;
  fechaSeleccionada: any;
  usuariosEnFecha: any;
  data: any;
  faDownload = faDownload;
  public rowSelection = 'single';
  //CONSTRUCTOR
  constructor(private restService: RestService, private router: Router, private database: DatabaseService, private http: HttpClient,private adminService: AdminService) {
    let AG_GRID_LOCALE_EN = getArray();
    this.localeText = AG_GRID_LOCALE_EN;
    this.columnDefs = [
      
      // { field: "i", width: 80, headerName: "Id", filter: 'agSetColumnFilter' },
      { field: "id", width: 80, headerName: "Id", filter: 'agSetColumnFilter' ,cellStyle: {fontSize: '12px'} },
      { field: "document",width: 160, headerName: "Documento", filter: 'agSetColumnFilter'  ,cellStyle: {fontSize: '12px'}},
      { field: "dataset", headerName: "CURP", filter: 'agSetColumnFilter' ,cellStyle: {fontSize: '12px'} },
      { field: "state",width: 120, headerName: "Estado", filter: 'agSetColumnFilter' ,cellStyle: {fontSize: '12px'} },
      { field: "nameinside", headerName: "Nombre", filter: 'agSetColumnFilter' ,cellStyle: {fontSize: '12px'} },
      { field: "seller.nombre", headerName: "Vendedor", filter: 'agSetColumnFilter' ,cellStyle: {fontSize: '12px'} },
      { field: "bought.nombre", headerName: "Comprador", filter: 'agSetColumnFilter' ,cellStyle: {fontSize: '12px'} },
      { field: "uploadBy.nombre",width: 150, headerName: "Cragado Por", filter: 'agSetColumnFilter' ,cellStyle: {fontSize: '12px'} },
      { field: "createdAt", headerName: "Fecha y hora", filter: 'agSetColumnFilter' ,cellStyle: {fontSize: '12px'} },
      { field: "corte", headerName: "Fecha de corte", filter: 'agSetColumnFilter'  ,cellStyle: {fontSize: '12px'}},
            
      /* ... */
   { headerName: 'Eliminar',width: 150, field: 'eliminar', editable: false, 
   cellRenderer: function(params:any) {
    
        return '<button   (click)="moveraPapelera(cortes.id,cortes.document)" > 🗑️ Eliminar</button>  '
       
   },
    //valueGetter: this.deleteItemActa,
   },
        /* ... */
        { headerName: 'Editar fecha', field: 'eliminar', editable: false,
         
        cellRenderer: function(params:any) {
             return '<input class="responsive" type="date" name="fecha" (click)="EditFecha(cortes.id)" id="fecha"><button>Editar</button>   '
           
        } }
    //   { field: "corte", headerName: "Fecha de corte", type: 'valueColumn', filter: 'agSetColumnFilter' },
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
      cellRendererParams: {
        checkbox: true,
      },
      nonEditableColumn: { editable: false },
    };

    


   }
   onSelectionChanged($event:any) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.select = JSON.stringify( selectedRows);
      console.log(this.gridApi.getSelectedRows());
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
  //Creamos datos para saber el total del corte.
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
  async getDates() {
    this.fechas = await this.database.getAllDates().toPromise();
  }
    //Mostramos todas las fechas
    setDate(fecha: any) {
      this.fechaSeleccionada = fecha;
      this.getCorte();
    }
    onRemoveSelected() {
      var selectedRowData = this.gridApi.getSelectedRows();
      this.gridApi.applyTransaction({ remove: selectedRowData });
    }
  //Otenemos el corte
  async getCorte() {

    if (localStorage.getItem('привіт') != null) {
      if (localStorage.getItem('іди') != null) {
        var usuario = CryptoJS.AES.decrypt(localStorage.getItem('іди') || '{}', "іди");
        let id = usuario.toString(CryptoJS.enc.Utf8);

        this.rowData = await this.restService.getcorte().toPromise();
        //console.log(this.rowData)
        this.onPinnedRowBottomCount();
      }
    }
   
  }
  //Exportamos el excel 
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
  //Optenemos el precio
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

//vista excel
  descargarexcelvista() {
    this.excel = !this.excel;
  }

  //EXPORTAMOS EL EXCEL
  exportexcel(): void {

    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('Імякористувача') || '{}', "Імякористувача");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');


    /*PASAMOS EL ID DE L TABLA PARA PPSTERIORMENTE MANDARLO A LA BASE DE DATOS*/
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Corte');

    /* save to file */
    XLSX.writeFile(wb, "Historial-" + arreglo[1] + ".xlsx");
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Historial de ' + arreglo[1] + ' descargado',
      showConfirmButton: false,
      timer: 1500
    })
    this.reloadCurrentRoute();

  }


  //RESETEAMOS LA PAGINA 
  resetPagination() {
    this.page = 1;
  }
  clearresponsable() {
    this.responsableSearch = "";
    this.newResponsable = undefined;
  }

  //ENVIAMOS EL ACTA A LA BASE DE DATOS
  async enviaracta() {
    Swal.fire(
      {
        position: 'center',
        icon: 'success',
        title: 'Datos Enviados',
        showConfirmButton: false,
        timer: 1500
      }
    )

    this.router.navigateByUrl('/historial');
    const body = new FormData();
    body.append("enterprise", this.ciberseleccionado);
    body.append("provider", this.precioyasesor.superviser);
    body.append("document", this.info.tipo);
    body.append("dataset", this.info.curp);
    body.append("state", this.info.estado);
    body.append("price", this.precioyasesor.precio);
    body.append("nameinside", this.info.nombre + " " + this.info.apellidos);


    let nombrecompleto;
    if (this.info.apellidos == undefined || this.info.apellidos == null || this.info.apellidos == "") {
      nombrecompleto = this.info.nombre
    } else {
      nombrecompleto = this.info.nombre + " " + this.info.apellidos;
    }

    const data = await this.restService.enviarcta(this.ciberseleccionado, 
      this.info.tipo, 
      this.info.curp,
       this.info.estado, 
       nombrecompleto,
        this.fileTmp.fileName).toPromise();
  
    this.reloadCurrentRoute();
  }


  //RECARGAMOS LA PAGINA POR SI MISMA
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  Volver() {

    this.router.navigateByUrl("/manual");

  }

  //RECARGAMOS LA MISMA PAGINA DESPUES DE QUE SE MANDA A LA PAPELERA
  reloadCurrentRouteLastDelete() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });

  }
  //EXPPRTAMOS A EXCEL LA TABLA
  // onBtnExport() {
  //   var usuario = CryptoJS.AES.decrypt(localStorage.getItem('Імякористувача') || '{}', "Імякористувача");
  //   let userName = usuario.toString(CryptoJS.enc.Utf8);
  //   let arreglo = userName.split('"');

  //   this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' });
  // }
  //BORRAMOS UNA ACTA CON SU ID Y NOMBRE DE USUARIO
  deleteItemActa(id: any, document: any, enterprise: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará '" + document + "', del negocio '" + enterprise + "'",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
        var token: any = i.toString(CryptoJS.enc.Utf8);
        var parteuno = token.slice(1);
        var final = parteuno.slice(0, -1);
        let tokenfinal: string = final;
        const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
        this.http.delete('https://actasalinstante.com:3030/api/actas/deleteActa/' + id, { headers }).subscribe(
          (data: any) => {
            Swal.fire(
              {
                position: 'center',
                icon: 'success',
                title: 'Acta eliminada',
                showConfirmButton: false,
                timer: 1500
              }
            );
            this.reloadCurrentRouteLastDelete();
          },
          (err: any) => {
            Swal.fire(
              {
                position: 'center',
                icon: 'error',
                title: 'Contacta al equipo de soporte',
                showConfirmButton: false,
                timer: 1500
              }
            );
          }
        );

      }
    })
  }

  //EDITAMOS LA FECHA DE LOS REGISTROS DE LA TABLA
  EditFecha(id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se cambiara a la fecha de: '" + this.fecha,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
        var token: any = i.toString(CryptoJS.enc.Utf8);
        var parteuno = token.slice(1);
        var final = parteuno.slice(0, -1);
        let tokenfinal: string = final;
        const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });

        this.http.put('https://actasalinstante.com:3030/api/actas/changeDate/' + id, { date: this.fecha }, { headers }).subscribe(
          (data: any) => {
            Swal.fire(
              {
                position: 'center',
                icon: 'success',
                title: 'Se cambio la fecha: ' + this.fecha,
                showConfirmButton: false,
                timer: 1500
              }
            );
            this.reloadCurrentRoute();

          },

          (err: any) => {

            Swal.fire(
              {
                position: 'center',
                icon: 'error',
                title: 'Contacta al equipo de soporte',
                showConfirmButton: false,
                timer: 1500
              }
            );
          }
        );

      }
    })
  }
  //RESTAURAMOS LAS ACTAS ELIMINADADAS DE LA PAPELERA
  restaurarPapelera(id: any, document: any) {

    let hiddensa: boolean = false;
    Swal.fire({
      title: 'Mover a papelera',
      text: "Se movera :'" + document,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
        var token: any = i.toString(CryptoJS.enc.Utf8);
        var parteuno = token.slice(1);
        var final = parteuno.slice(0, -1);
        let tokenfinal: string = final;
        const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });

        this.http.put('https://actasalinstante.com:3030/api/actas/moveToTrash/', { id: id, hidden: hiddensa }, { headers }).subscribe(
          (data: any) => {
            Swal.fire(
              {
                position: 'center',
                icon: 'success',
                title: 'Se movio a la papelera',
                showConfirmButton: false,
                timer: 1500
              }
            );
            this.reloadCurrentRoute();

          },

          (err: any) => {

            Swal.fire(
              {
                position: 'center',
                icon: 'error',
                title: 'Contacta al equipo de soporte',
                showConfirmButton: false,
                timer: 1500
              }
            );
          }
        );

      }
    })
  }

  // BORRAMOS Y SE VA A LA PAPELERA
  moveraPapelera(id: any, document: any) {

    let hiddensa: boolean = true || false;
    Swal.fire({
      title: 'Mover a papelera',
      text: "Se movera :'" + document,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
        var token: any = i.toString(CryptoJS.enc.Utf8);
        var parteuno = token.slice(1);
        var final = parteuno.slice(0, -1);
        let tokenfinal: string = final;
        const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });

        this.http.put('https://actasalinstante.com:3030/api/actas/moveToTrash/', { id: id, hidden: hiddensa }, { headers }).subscribe(
          (data: any) => {
            Swal.fire(
              {
                position: 'center',
                icon: 'success',
                title: 'Se movio a la papelera',
                showConfirmButton: false,
                timer: 1500
              }
            );
            this.reloadCurrentRoute();

          },

          (err: any) => {

            Swal.fire(
              {
                position: 'center',
                icon: 'error',
                title: 'Contacta al equipo de soporte',
                showConfirmButton: false,
                timer: 1500
              }
            );
          }
        );

      }
    })
  }
  //Seleccionamos el tipo de acta
  setTipoDeActa(tipo: any) {
    this.tipo = tipo;
  }

  //SELECCIONAMOS EL CIBER PARA EL ASESOR
  async clickciber(id: any, nombre: any) {
    this.ciberseleccionado = id;
    const body = new FormData();
    let documento: string;

    switch (this.info.tipo) {

      case "Asignación de Número de Seguridad Social":
        documento = "nss";
        break;
      case "Acta de Defunción":
        documento = "def";
        break;
      case "Acta de Nacimiento":
        documento = "nac";
        break;
      case "Acta de Matrimonio":
        documento = "mat";
        break;
      case "Acta de Divorcio":
        documento = "div";
        break;
      case "Constancia de Vigencia de Derechos":
        documento = "der";
        break;
      case "Constancia de Semanas Cotizadas en el IMSS":
        documento = "cot";
        break;
      case "Registro Federal de Contribuyentes":
        documento = "rfc";
        break;
      case "CONSTANCIA DE NO INHABILITACIÓN":
        documento = "inh";
        break;

      case "AVISO PARA RETENCIÓN DE DESCUENTOS":
        documento = "ret";
        break;

      default:
        documento = "";
        break;
    }

    let state;

    switch (this.info.estado) {
      case "CHIAPAS":
        state = "chia";
        break;
      case "BAJA CALIFORNIA SUR":
        state = "bcs";
        break;
      case "BAJA CALIFORNIA":
        state = "bcn";
        break;
      case "YUCATAN":
        state = "yuca";
        break;
      case "VERACRUZ":
        state = "vera";
        break;
      case "VERACRUZ DE IGNACIO DE LA":
        state = "vera";
        break;
      case "COAHUILA":
        state = "coah";
        break;
      case "COAHUILA DE ZARAGOZA":
        state = "coah";
        break;
      case "MICHOACAN":
        state = "mich";
        break;
      case "MICHOACAN DE OCAMPO":
        state = "mich";
        break;
        
      case "TLAXCALA":
        state = "tlax";
        break;
      case "DURANGO":
        state = "dura";
        break;
      case "AGUASCALIENTES":
        state = "agua";
        break;
      case "HIDALGO":
        state = "hida";
        break;
      case "PUEBLA":
        state = "pueb";
        break;
      case "QUERETARO":
        state = "quer";
        break;
      case "CHIHUAHUA":
        state = "chih";
        break;
      case "OAXACA":
        state = "oaxa";
        break;
      case "SONORA":
        state = "sono";
        break;
      case "SAN LUIS POTOSI":
        state = "slp";
        break;
      case "SINALOA":
        state = "sina";
        break;
      case "GUERRERO":
        state = "guer";
        break;
      case "ZACATECAS":
        state = "zaca";
        break;
      case "TAMAULIPAS":
        state = "tama";
        break;
      case "MORELOS":
        state = "more";
        break;
      case "TABASCO":
        state = "taba";
        break;
      case "GUANAJUATO":
        state = "guan";
        break;
      case "COLIMA":
        state = "coli";
        break;
      case "JALISCO":
        state = "jali";
        break;
      case "CDMX":
        state = "cdmx";
        break;
      case "CIUDAD DE MEXICO":
        state = "cdmx";
        break;
      case "CAMPECHE":
        state = "camp";
        break;
      case "NUEVO LEON":
        state = "nl";
        break;
      case "MEXICO":
        state = "mex";
        break;
      case "QUINTANA ROO":
        state = "qroo";
        break;
      case "NAYARIT":
        state = "naya";
        break;
      default:
        state = "";
        break;
    }
    if (this.info.estado.includes("ESTADOS")) {
      state = "ext";
    }
  
    //rutas api para enviar
    const precioyasesor = await this.restService.getprecioyasesor(documento, state, id).toPromise();
    this.precioyasesor = precioyasesor;
 
    const data: any = await this.restService.getidsupervisor(this.precioyasesor.superviser).toPromise();
    this.nombreasesor = data?.data.nombre;

  }

  //TRAEMOS TODOS LOS DATOS DE LAS ACTAS DE PAPELERA
  async gettraerPapelera() {

    const data: any = await this.restService.Getpapelera().toPromise();

    this.gettraerPapelera2 = data;

    if (data.lenght != 0) {
      closeAlert();
    }

  }
  //OPTENEMOS TODO EL CORTE DE LAS ACTAS Y ASESORES
  async getcorte() {

    if (localStorage.getItem('привіт') != null) {
      if (localStorage.getItem('іди') != null) {
        var usuario = CryptoJS.AES.decrypt(localStorage.getItem('іди') || '{}', "іди");
        let id = usuario.toString(CryptoJS.enc.Utf8);

        const data: any = await this.restService.getcorte().toPromise();

        this.getcortes = data;
    // console.log(this.getcortes);
        if (data.lenght != 0) {
          closeAlert();
        }

      }
    }
  }
  //CAMBIAMOS LA VISTA HACIA OTRA TABLA
  onChange(event: any) {
    this.tipodebusqueda = event;
  }
  //DESINCRIPTAMOS EL TOKEN PARA OBTENER LOS DATOS Y EL ROL
  async descry() {

    var idlocal = localStorage.getItem("іди");
    var i = CryptoJS.AES.decrypt(idlocal || '{}', "іди");
    var id: any = i.toString(CryptoJS.enc.Utf8);
    this.result.push(id);
    //getmydata
    const data: any = await this.database.getmydata(id).toPromise();
    this.myRol = data.data.rol;
  }

  //PROTEGEMOS LAS VISTAS PARA NO SER HACKEADAS
  async ngOnInit() {
    const token = localStorage.getItem('привіт');
    var idlocal = localStorage.getItem("іди");
    var i = CryptoJS.AES.decrypt(idlocal || '{}', "іди");
    var id: any = i.toString(CryptoJS.enc.Utf8);
    this.result.push(id);
    const data: any = await this.database.getmydata(id).toPromise();
    this.myRol = data.data.rol;

    if (!token) {
      this.router.navigateByUrl('/login');
    }
    if(this.myRol != 'Cliente'  && this.myRol != 'Sucursal'  && this.myRol!='Empleado'){
      this.getAllCibers();
      this.getDates();
      this.setDate(null);
    }
    else{
      this.router.navigateByUrl('/inicio');
    }
  }
  //OBTENEMOS TODOS LOS CIBER PARA EL BUSCADOR
  async getAllCibers() {
    let arreglo: any = await this.restService.getuser().toPromise();
    this.getciber = arreglo;
  }

  /*   CAMBIO DE VISTA DE LA TABLA CORTE  */
  changeView() {
    if (this.vista === false) {
      loader();
    }
    this.vista = !this.vista;
    this.getcorte();
  }

  tablavieja2() {
    if (this.tablavieja === false) {
      loader();
    }
    this.tablavieja = !this.tablavieja;
    this.getcorte();
  }






  ClienteVista() {
    if (this.myRol != 'Cliente' && this.myRol != 'Sucursal' && this.myRol!='Empleado') {
      this.MyrolCliente = !this.MyrolCliente;
    }
  
    
  }

  //CAMBIAMOS LA VISTA DE LA TABLA DE DCOUMENTOS
  changeView2() {
    this.conteo = !this.conteo;
    this.getcorte();

  }
  //CAMBIAMOS LA VISTA D ELA TABLA SUBIR ARCHIVOS MANUAL
  changeView3() {
    this.conteo2 = !this.conteo2;
  }
  //OCULTAMOS LA VISTA DE LOS BOTONES DE SUBIR EN DUCMENTOS
  changeView4() {
    this.conteo3 = !this.conteo3;
  }
  //OCULTAMOS LA VISTA DE LOS BOTONES DE LA VISTA DE SUBIR DOCUMENTOS DE FORMA MANUAL
  changeView5() {
    this.router.navigateByUrl('papelera');

  }
  changeView6() {
    this.excel = !this.excel;
  }
  //REGRESAMOS A LA VISTA ACTUAL CON EL BOTON REGRESAR
  backUp() {
    this.preview = 0;
    this.fileTmp = null;
    this.reloadCurrentRoute();

  }
  //REGRESAMOS A LA VISTA ACTUAL CON EL BOTON REGRESAR
  backUp2() {
    this.preview = 0;
    this.fileTmp = null;
    this.reloadCurrentRoute();
  }
  ngAfterViewInit(): void {
  }
  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from njjnjgfbnbnjdpdpnmcdjhjvbdvbvbhvhbvhbvhbd rvrbackend
        
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;

      }
    }
  }
  Volver2() {

    this.reloadCurrentRoute();
  }


  preview56(files: any) {
    this.docPath = '   ';
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {

      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;


    }
  }

  //SOLTAMOS EL DOCUMENTO PDF AL APARTADO DE DOCUMENTOS
  getFile($event: any): void {
    //TODO esto captura el archivo!
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file?.name
    }
  }
  //ENVIAMOS TODOS LOS DATOS SLICITADOS DEL DOCUMENTO PDF
  sendFile(): void {
    try {
      loader();
      let ext = this.fileTmp.fileName.split(".");
      if (ext[1] != "pdf") {
        Swal.fire(
          {
            position: 'center',
            icon: 'error',
            title: 'Solo PDF',
            showConfirmButton: false,
            timer: 1500

          }
        )
      }
      else {
        const body = new FormData();
        body.append('doc', this.fileTmp.fileRaw, this.fileTmp.fileName);
        this.restService.sendPost(body)
          .subscribe(res => {
            this.info = res;
            this.preview = 1;
            closeAlert();
          }), (error: any) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error interno',
              showConfirmButton: false,
              timer: 1500
            });
          }
      }
    }
    catch (error: any) {

      Swal.fire(
        {
          position: 'center',
          icon: 'error',
          title: 'Subir un archivo',
          showConfirmButton: false,
          timer: 1500
        }
      );
    }
  }

}
