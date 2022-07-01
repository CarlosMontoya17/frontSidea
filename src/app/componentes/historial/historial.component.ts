import { Component, OnInit, ViewChild } from '@angular/core';
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
import { AgGridAngular } from 'ag-grid-angular';
import { AdminService } from 'src/app/servicios/admin.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { ActasService } from 'src/app/servicios/Actas/actas.service';

//Icons Revised
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
declare function loader(): any;
declare function closeAlert(): any;
declare function getArray(): any;
declare function customAlerts(status: any, msg: any): any;
declare function loaderMsg(msg: any): any;

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],

})

export class HistorialComponent implements OnInit {
  //AgGrid
  select: any = [];
  //Icons
  faCircleCheck = faCircleCheck;
  faEraser = faEraser;
  faCalendarPlus = faCalendarPlus;
  //Controls

  //Change Date
  editDate: boolean = false;
  newDateToChange: any;
  //Dates
  dates: any;
  dateSelect: any = null;

  //Re-Asignar Acta
  showAlertReasign: boolean = false;
  CibersToReasign: any;
  allUsers: any;
  valorabuscarActa: string = "";

  //Legend
  SelectedRowLegend: string = "";

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

  docPath: string = "";
  faPeopleArrowsLeftRight = faPeopleArrowsLeftRight;
  id: any;
  req: any;
  valorabuscartranspose: string = "";
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
  MyrolCliente: boolean = false;
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
  newTranspose: any = [];
  public pinnedBottomRowData!: any[];
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular | undefined;
  selectedRows: any;
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

  public rowSelection = 'multiple';
  //CONSTRUCTOR
  constructor(private restService: RestService, private actasservice: ActasService, private router: Router, private database: DatabaseService, private http: HttpClient, private adminService: AdminService) {
    let AG_GRID_LOCALE_EN = getArray();
    this.localeText = AG_GRID_LOCALE_EN;
    this.columnDefs = [

      // { field: "i", width: 80, headerName: "Id", filter: 'agSetColumnFilter' },
      { field: "id", editable: true, width: 80, headerName: "Id", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },
      { field: "document", editable: true, width: 160, headerName: "Documento", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },
      { field: "dataset", editable: true, headerName: "CURP", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },
      { field: "state", editable: true, width: 120, headerName: "Estado", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },
      { field: "nameinside", editable: true, headerName: "Nombre", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },
      { field: "seller.nombre", editable: true, headerName: "Vendedor", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },
      { field: "bought.nombre", editable: true, headerName: "Comprador", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },
      { field: "uploadBy.nombre", editable: true, width: 150, headerName: "Cragado Por", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },
      { field: "createdAt", editable: true, headerName: "Fecha y hora", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },
      { field: "corte", editable: true, headerName: "Fecha de corte", filter: 'agSetColumnFilter', cellStyle: { fontSize: '12px' } },

      //   { field: "corte", headerName: "Fecha de corte", type: 'valueColumn', filter: 'agSetColumnFilter' },
    ];
    this.defaultColDef = {
      width: 200,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
      editable: false,
      cellRendererParams: {
        checkbox: true,
      },

    };
    document
    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Por favor espere, estamos cargando los datos</span>';
    this.columnTypes = {
      numberColumn: {
        width: 130,
        filter: 'agNumberColumnFilter',
      },
      cellRendererParams: {
        checkbox: true,
      },
      nonEditableColumn: { editable: true },
    };
  }




  EditarActaSeleccionada() {
    this.fecha = this.select.createdAt;
  }


  onSelectionChanged($event: any) {
    this.select = this.gridApi.getSelectedRows();
    this.SelectedRowLegend = "";
    let itemShow = 15;
    if (this.select.length > 0) {
      for (let i = 0; i < this.select.length; i++) {
        if (this.select.length > 8) {
          if (i < itemShow) {
            this.SelectedRowLegend += this.select[i].id;
            if (this.select.length > 1 && i < this.select.length - 1 && i != itemShow-1) {
              this.SelectedRowLegend += ", ";
            }
          }
          else if (i == itemShow) {
            this.SelectedRowLegend += ` y ${this.select.length - i} más`;
          }
        }
        else {
          this.SelectedRowLegend += this.select[i].id;
          if (this.select.length > 1 && i < this.select.length - 1) {
            this.SelectedRowLegend += ", ";
          }
        }
      }
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

  //Mostramos todas las fechas
  setDate(fecha: any) {
    this.fechaSeleccionada = fecha;
  }
  onRemoveSelected() {
    var selectedRowData = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({ remove: selectedRowData });
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
    );
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
    const precioyasesor = await this.restService.getprecioyasesor(documento, state, id).toPromise();
    this.precioyasesor = precioyasesor;
    const data: any = await this.restService.getidsupervisor(this.precioyasesor.superviser).toPromise();
    this.nombreasesor = data?.data.nombre;
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


  //OBTENEMOS TODOS LOS CIBER PARA EL BUSCADOR
  async getAllCibers() {
    let arreglo: any = await this.restService.getuser().toPromise();
    this.getciber = arreglo;
  }

  /*   CAMBIO DE VISTA DE LA TABLA CORTE  */
  changeView() {
    if (this.vista === false) {
      this.giveMeDates();
      this.getHistorial();
      this.select = undefined;
    }
    this.vista = !this.vista;
  }



  ClienteVista() {
    if (this.myRol != 'Cliente' && this.myRol != 'Sucursal' && this.myRol != 'Empleado') {
      this.MyrolCliente = !this.MyrolCliente;
    }
  }

  //CAMBIAMOS LA VISTA DE LA TABLA DE DCOUMENTOS
  changeView2() {
    this.conteo = !this.conteo;
    // this.getcorte();

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


  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
        });
      } else {
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
        customAlerts("error", "Sólo PDF");
      }
      else {
        const body = new FormData();
        body.append('doc', this.fileTmp.fileRaw, this.fileTmp.fileName);
        this.restService.sendPost(body)
          .subscribe(res => {
            this.info = res;
            this.preview = 1;
            this.ObtainAllCibers();
            closeAlert();
          }), (error: any) => {
            customAlerts("error", "Error interno");
          }
      }
    }
    catch (error: any) {
      customAlerts("error", "Subir un archivo");
    }
  }




  EditDateBoolean() {
    this.editDate = !this.editDate;
  }

  giveMeDates() {
    this.database.getAllDates().subscribe((data: any) => {
      this.dates = data;
    }, (err: any) => {
      customAlerts("info", "Sin fechas de corte");
    });
  }

  SelectDate(date: any) {
    this.dateSelect = date;
    this.getHistorial();
    this.select = undefined;
  }

  //Otenemos el Historial
  async getHistorial() {
    loader();
    await this.database.HistorialDeRegistros(this.dateSelect).subscribe((data: any) => {
      this.rowData = data;
      this.onPinnedRowBottomCount();
      closeAlert();
    });
  }


  //Change Date
  ChangeNewDate() {

    let legend = "";
    if (this.select.length > 1) {
      legend = ` ¿Estás seguro  de modificar la fecha a ${this.select.length.toString()} registros a ${this.newDateToChange}?`;
    }
    else {
      legend = `¿Estás seguro modificar la fecha para ${this.select[0].id} a ${this.newDateToChange}?`;
    }

    Swal.fire({
      title: legend,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sí, proceder",
      denyButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {

        for (let i = 0; i < this.select.length; i++) {
          loader();
          this.restService.ChangeDate(this.select[i].id, this.newDateToChange).subscribe((data: any) => {
            closeAlert();
          }, (err: any) => {
            customAlerts("error", "Error en el servidor");
          });
        }
        customAlerts("success", "¡Actualizado!");
        this.clearVariablesFromRegisters();
        this.getHistorial();

      }
    });
  }

  ClearNewDate() {
    this.newDateToChange = undefined;
  }


  clearVariablesFromRegisters() {
    this.rowData = [];
    this.newDateToChange = undefined;
    this.select = undefined;
    this.editDate = false;
    this.valorabuscartranspose = "";
  }


  // Re-asignar 
  AlertReasign() {
    this.showAlertReasign = !this.showAlertReasign;
  }

  ObtainAllCibers() {
    this.restService.getAllClients().subscribe((data: any) => {
      this.allUsers = data;
    });
  }



  TransposeRegister(id: any) {
    this.showAlertReasign = false;
    let legend = "";
    if (this.select.length > 1) {
      legend = ` ¿Estás seguro de traspasar ${this.select.length.toString()} registros?`;
    }
    else {
      legend = `¿Estás seguro de traspasar el registro ${this.select[0].id}?`;
    }

    Swal.fire({
      title: legend,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sí, proceder",
      denyButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i = 0; i < this.select.length; i++) {
          loaderMsg(`Traspasando registro ${this.select[0].id}`);
          this.restService.TransposeRegister(this.select[i].id, id).subscribe((data: any) => {
            closeAlert();
          }, (err: any) => {
            customAlerts("error", "Error en el servidor");
          });
        }
        customAlerts("success", "¡Actualizado!");
        this.clearVariablesFromRegisters();
        this.getHistorial();
      }
    });


  }


  DeleteRegister() {
    let legend = "";
    if (this.select.length > 1) {
      legend = ` ¿Estás seguro de eliminar ${this.select.length.toString()} registros?`;
    }
    else {
      legend = `¿Estás seguro de eliminar el registro ${this.select[0].id}?`;
    }
    Swal.fire({
      title: legend,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sí, proceder",
      denyButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i = 0; i < this.select.length; i++) {
          loaderMsg(`Elimando registro ${this.select[0].id}`);
          this.restService.DeleteRegister(this.select[i].id).subscribe((data: any) => {
            closeAlert();
          }, (err: any) => {
            customAlerts("error", "Error en el servidor");
          });
        }
        customAlerts("success", "¡Actualizado!");
        this.clearVariablesFromRegisters();
        this.getHistorial();
      }
    });
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

    if (!token && this.myRol == 'Cliente' && this.myRol == 'Sucursal' && this.myRol == 'Empleado') {
      this.router.navigateByUrl('/login');
    }
    this.setDate(null);
    this.ObtainAllCibers();
  }





}
