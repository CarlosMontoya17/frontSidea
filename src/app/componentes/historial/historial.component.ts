import { Component, OnInit } from '@angular/core';
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
import { GridApi, GridReadyEvent, RowSpanParams, ValueGetterFunc, ValueGetterParams } from 'ag-grid-community';
import * as XLSX from 'xlsx'
declare function loader(): any;
declare function closeAlert(): any;

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],

})

export class HistorialComponent implements OnInit {
  private gridApi!: GridApi;
  public imagePath: any;
  hidden:boolean = false;
  hidden2:boolean = true;
  faTrashCan = faTrashCan;
  imgURL: any;
  fileTmp: any;
  info: any;
  preview: any = 0;
  vista: boolean = false;
  tipodebusqueda: any = 'Seleccione el tipo de busqueda';
  getciber: any;
  getcortes: any;
  valorabuscar: string = "";
  tipo: any;
  estado: any;
  precioyasesor: any;
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
  myInfo: any;
  myRol: any;
  nombreProvedor: String = "";
  nombreEmpresa: string = "";
  nombreasesor: string = "";
  ids: any = [];
  tipos: any = [];
  username: string = "";
  totalPrecio: number = 0;
  totalActas: number = 0;
  cortes: any;
  columnDefs = [
    { field: "id", width: 80, headerName: "Id", filter: true },
    { field: "enterprise", headerName: "Ciber", filter: true },
    { field: "document", headerName: "Documento", filter: true },
    { field: "states", headerName: "Estado", filter: true },
    { field: "curp", headerName: "CURP", filter: true },
    { field: "price", headerName: "Precio", type: 'valueColumn', filter: true, },
    { field: "createdAt", headerName: "Fecha y hora", filter: true },
    { field: "corte", headerName: "Corte", type: 'valueColumn', filter: true, }
  ];

  public rowData!: any[];
  public pinnedBottomRowData!: any[];
  //Tabla
  constructor(private restService: RestService, private router: Router, private database: DatabaseService, private http: HttpClient) { }

  exportexcel(): void {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');

    // this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' });
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Corte' + arreglo[1]);

    /* save to file */
    XLSX.writeFile(wb, "Historial-" + arreglo[1] + ".xlsx");

  }
 




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
    body.append("curp", this.info.curp);
    body.append("states", this.info.estado);
    body.append("price", this.precioyasesor.precio);
    body.append("nombreacta", this.info.nombre + " " + this.info.apellidos);

    let nombrecompleto;
    if (this.info.apellidos == undefined || this.info.apellidos == null || this.info.apellidos == "") {
      nombrecompleto = this.info.nombre
    } else {
      nombrecompleto = this.info.nombre + " " + this.info.apellidos;
    }
    const data = await this.restService.enviarcta(this.ciberseleccionado, this.precioyasesor.superviser, this.info.tipo, this.info.curp, this.info.estado, this.precioyasesor.precio, nombrecompleto, "").toPromise();
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  reloadCurrentRouteLastDelete() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });

  }
  onBtnExport() {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('usuario') || '{}', "usuario");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');

    this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' });
  }

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
        var i = CryptoJS.AES.decrypt(localStorage.getItem("token") || '{}', "token");
        var token: any = i.toString(CryptoJS.enc.Utf8);
        var parteuno = token.slice(1);
        var final = parteuno.slice(0, -1);
        let tokenfinal: string = final;
        const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
        this.http.delete('http://actasalinstante.com:3030/api/actas/deleteActa/' + id, { headers }).subscribe(
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

    const precioyasesor = await this.restService.getprecioyasesor(documento, state, id).toPromise();
    this.precioyasesor = precioyasesor;
    const data: any = await this.restService.getidsupervisor(this.precioyasesor.superviser).toPromise();
    this.nombreasesor = data?.data.nombre


  }

  //CORTEHSITORIAL
  async getcorte() {

    if (localStorage.getItem('token') != null) {
      if (localStorage.getItem('id') != null) {
        var usuario = CryptoJS.AES.decrypt(localStorage.getItem('id') || '{}', "id");
        let id = usuario.toString(CryptoJS.enc.Utf8);
        // this.getcortes = await this.restService.getcorte(arreglo[1]).toPromise();
        const data: any = await this.restService.getcorte(id).toPromise();

        this.getcortes = data;


        if (data.lenght != 0) {
          closeAlert();
        }

      }
    }
  }

  onChange(event: any) {
    this.tipodebusqueda = event;
  }
  /*   CRYPTO.JS  */
  async descry() {

    var idlocal = localStorage.getItem("id");
    var i = CryptoJS.AES.decrypt(idlocal || '{}', "id");
    var id: any = i.toString(CryptoJS.enc.Utf8);
    this.result.push(id);

    const data: any = await this.database.getmydata(id).toPromise();
    this.myRol = data.data.rol;


  }

  /*   SE OPTIENE EL CORTE  */
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/login');
    }


    this.getAllCibers();
    this.descry();

  }

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
  backUp() {
    this.preview = 0;
    this.fileTmp = null;
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
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  public fileOver(event: any) {

  }
  public fileLeave(event: any) {

  }
  //SOLTARPDF
  getFile($event: any): void {
    //TODO esto captura el archivo!
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file?.name
    }
  }
  //ENVIARPDF
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
