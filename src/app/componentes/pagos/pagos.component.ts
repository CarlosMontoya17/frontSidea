import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../historial/rest.service';
import * as CryptoJS from 'crypto-js';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { distinctUntilChanged, Observable } from 'rxjs';
import { GridApi, GridReadyEvent, RowSpanParams, ValueGetterFunc, ValueGetterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { faArrowRightFromBracket, faL } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2';
import { AdminService } from 'src/app/servicios/admin.service';
declare function onclick(): any;

declare function loader(): any;
declare function closeAlert(): any;
declare function loadedData(): any;

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
  MyrolCliente:boolean = false;
  porEnviar: boolean = false;

  fechasParaBuscarClientes: any;
  usernameLocal: string = "";
  public rowData!: any[];
  public pinnedBottomRowData!: any[];
  //Tabla
  ciberSearch: string = "";
  //TABLE
  Cibers: any;
  CiberSelect: any = [];
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

  valordelobservable: any;
  //TABLE
  corteSeleccionado: string = "Seleccionar corte";

  myRol: any;


  fechaDeUsuarioSeleccionada: any;
  usuariosEnFecha: any;
  corteDelUsuario: any;
  paginacion: boolean = false;
  itemPerPage: number = 10;
  items: any;
  indexOfItems: any;


  data$!: Observable<String>;
  constructor(private router: Router,
    private restservice: RestService,
    private http: HttpClient,
    private database: DatabaseService,
    private adminService: AdminService
  ) {
    this.data$ = adminService.getSelect;
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('іди') || '{}', "іди");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');
  }


  async getAllDates() {
    this.fechasParaBuscarClientes = await this.database.getAllDates().toPromise();
  }

  //DESINCRIPTAMOS EL TOKEN PARA OBTENER LOS DATOS Y EL ROL
  async descry() {

    var idlocal = localStorage.getItem("іди");
    var i = CryptoJS.AES.decrypt(idlocal || '{}', "іди");
    var id: any = i.toString(CryptoJS.enc.Utf8);
    this.result.push(id);

    const data: any = await this.database.getmydata(id).toPromise();
    this.myRol = data.data.rol;
  }

  ClienteVista() {
    if (this.myRol != 'Cliente' && this.myRol != 'Sucursal') {
      this.MyrolCliente = !this.MyrolCliente;
    }
  
    
  }






  exportexcel(): void {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('Імякористувача') || '{}', "Імякористувача");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');

    // this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' }) Esta funcion permite exporytar a excel;

    /* Pasamos el id de la tabla de registros */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* genera el excel y agregra los elementos de la tabla */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Corte ' + this.CiberSelect);

    /* Exportamos a excel */
    XLSX.writeFile(wb, "Pagos-" + this.CiberSelect + "-Por: " + arreglo[1] + ".csv");
    /*     Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Corte de ' + arreglo[1] + ' descargado',
          showConfirmButton: false,
          timer: 1500
        }) */
  }

  alert2() {
    // Swal.fire({
    //   position: 'center',
    //   icon: 'warning',
    //   title: 'Enviar corte',//'Corte de ' + this.CiberSelect + ' descargado',
    //   text: '¿Deseas enviar el corte?',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, enviar el corte',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Corte enviado!'
    //     )

    //   }
    // })
    loader();
    this.exportexcel();
    closeAlert();
    this.getCorte(this.ciberidselect, this.CiberSelect);
  }

  changeView() {

    this.conteo = !this.conteo;



  }
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  //DESCARGAR CORTE EN IMAGEN PNG
  async downloadCorte() {
    closeAlert();
    if (this.corteDelUsuario.length <= 10) {
      loader();
      await html2canvas(this.screen.nativeElement).then(canvas => {
        this.canvas.nativeElement.src = canvas.toDataURL();
        this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
        this.downloadLink.nativeElement.download = 'Corte -' + this.CiberSelect + ' .png';
        this.downloadLink.nativeElement.click();
        closeAlert();
        this.getCorte(this.ciberidselect, this.CiberSelect)
        this.paginacion = false;
      });
    }
    else if ((this.corteDelUsuario.length > 10)) {
      Swal.fire({
        title: 'Aviso',
        text: "Tienes mas de 10 elementos, ¿Deseas descargarlo por partes?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No, en una sola imagen'
      }).then(async (result) => {
        if (result.isConfirmed) {
          loader();
          this.paginacionCorte().then(data => {
            this.getCorte(this.ciberidselect, this.CiberSelect)
            this.paginacion = false;
            closeAlert();
          }).catch(err => {
            this.paginacion = false;
          });
        }
        else{
          loader();
          this.paginacion = false;
          await html2canvas(this.screen.nativeElement).then(canvas => {
            this.canvas.nativeElement.src = canvas.toDataURL();
            this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
            this.downloadLink.nativeElement.download = 'Corte -' + this.CiberSelect + ' .png';
            this.downloadLink.nativeElement.click();
            closeAlert();
            this.getCorte(this.ciberidselect, this.CiberSelect)
            
          });
        }


      })

    }


  }


  async paginacionCorte() {
    this.paginacion = true;
    let backup = this.corteDelUsuario;
    let itemsTotal: number = this.corteDelUsuario.length;
    let divide: number = Math.floor(itemsTotal / this.itemPerPage);
    let res: number = itemsTotal % this.itemPerPage;

    let pages: number = divide;

    if (res != 0) {
      pages += 1;
    }

    let currentPageData = this.corteDelUsuario;
    let index = 0;
    for (let a = 0; a < pages + 1; a++) {
      let pageData = [];
      let indexes = [];
      this.indexOfItems = [];
      for (let b = 0; b < this.itemPerPage; b++) {
        if (currentPageData[currentPageData.length - 1] != undefined) {

          pageData.push(currentPageData[currentPageData.length - 1]);
          currentPageData.pop()
          index += 1;
          indexes.push(index);
        }
      }

      this.indexOfItems.push(indexes);
      this.items = await pageData;
      await html2canvas(this.screen.nativeElement).then(canvas => {
        if (this.paginacion == true && a > 0) {
          this.canvas.nativeElement.src = canvas.toDataURL();
          this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
          let pagina = a;
          this.downloadLink.nativeElement.download = 'Corte -' + this.CiberSelect + '-Pag:' + pagina + '-' + pages + ' .png';
          this.downloadLink.nativeElement.click();
        }
      });
    }
    this.corteDelUsuario = backup;
    this.indexOfItems = [];

  }





  alert() {
    // Swal.fire({
    //   position: 'center',
    //   icon: 'warning',
    //   title: 'Enviar corte',//'Corte de ' + this.CiberSelect + ' descargado',
    //   text: '¿Deseas enviar el corte?',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, enviar el corte',
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Corte enviado!'
    //     )
    //     //Estatus a enviado
    //     let date: string = "";
    //     if (this.corteSeleccionado == "Actual") {
    //       date = "null";
    //     }
    //     else {
    //       date = this.corteSeleccionado;
    //     }
    //     console.log(date);
    //     await this.adminService.cambiarstatus(this.ciberidselect, date, true).toPromise();
    //     this.reloadCurrentRoute();
    //     this.downloadCorte();
    //   }
    // })

    this.downloadCorte();
  }



  alert3() {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Por enviar',//'Corte de ' + this.CiberSelect + ' descargado',
      text: '¿Deseas regresar al apartado "Por Enviar"?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Se regresó a "Por Enviar"'
        )
        //Estatus a enviado
        let date: string = "";
        if (this.corteSeleccionado == "Actual") {
          date = "null";
        }
        else {
          date = this.corteSeleccionado;
        }
        await this.adminService.cambiarstatus(this.ciberidselect, date, false).toPromise();
        this.reloadCurrentRoute();
      }
    })
  }

  async setCorte(fecha: any) {
    for (let i = 0; i < this.corteDelUsuario.length; i++) {
      switch (this.corteDelUsuario[i].document) {
        case "Asignación de Número de Seguridad Social":
          this.conteo_nss += 1;
          break;
        case "Acta de Defunción":
          this.conteo_defuncion += 1;
          break;
        case "Acta de Nacimiento":
          this.conteo_nacimiento += 1;
          break;
        case "Acta de Matrimonio":
          this.conteo_matrimonio += 1;
          break;
        case "Acta de Divorcio":
          this.conteo_divorcio += 1;
          break;
        case "Constancia de Vigencia de Derechos":
          this.conteo_der += 1;
          break;
        case "Constancia de Semanas Cotizadas en el IMSS":
          this.conteo_cot += 1;
          break;
        case "Registro Federal de Contribuyentes":
          this.conteo_rfc += 1;
          break;
        case "CONSTANCIA DE NO INHABILITACIÓN":
          this.conteo_inh += 1;
          break;
        default:
          break;
      }
    }
  }

  //SE OBTIENE EL CORTE CON EL CIBER
  async getCorte(id: any, nombre: any) {
    this.corteDelUsuario = [];
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
    this.page = 0;
    // this.fechas = await this.database.Obtenerfechas(id).toPromise();
    // const data: any = await this.restservice.GetActasNumber(id).toPromise();

    // this.nacimiento = data["nac"];
    // this.defuncion = data["def"];
    // this.matrimonio = data["mat"];
    // this.divorcio = data["div"];
    // this.semancot = data["cot"];
    // this.nss = data["nss"];
    // this.rfc = data["rfc"];
    // this.derechos = data["der"];
    // this.total = data["total"];
    // this.NumerodeActas = data;
    let date: any = this.fechaDeUsuarioSeleccionada;
    if (this.fechaDeUsuarioSeleccionada == "Actual") {
      date = null;
    }



    this.adminService.getCorteByUserForDate(id, date).subscribe(data => {
      this.corteDelUsuario = data;

      this.precioTotal();
      this.setCorte(0);
      loadedData();
    }, (err: any) => {
      
    });

  }

  //PRECIO TOTAL
  precioTotal() {
    var addNumber: number = 0;
    var addActas: number = 0;
    for (let i = 0; i < this.corteDelUsuario.length; i++) {
      addNumber += this.corteDelUsuario[i]?.price;

      addActas += 1;
    }
    this.totalPrecio = addNumber;
    this.totalActas = addActas;
  }


  //CAMBIO DEL FILTRO CON EL TOKEN Y USUARIO PARA OPTENER TOLOS LOS CLIENTES
  async changeFilter(filter: any) {

    if (filter == 1 && this.filter1 == false) {
      this.filter1 = true;
      this.filter2 = false;
      var usuario = CryptoJS.AES.decrypt(localStorage.getItem('іди') || '{}', "іди");
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
      var idlocal = localStorage.getItem("іди");
      var i = CryptoJS.AES.decrypt(idlocal || '{}', "іди");
      var id: any = i.toString(CryptoJS.enc.Utf8);
      const users: any = await this.database.getAllUsers(id).toPromise();
      let enterprises: any = [];
      users!.forEach((element: any) => {
        enterprises.push(element.nombre);
      });
      this.Cibers = enterprises;
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

    if(this.myRol != 'Cliente'  && this.myRol != 'Sucursal'){
    

      this.getAllDates();
      this.getClientsByDateSelected(null);
  
      if (!token) {
        this.router.navigateByUrl('/login');
      }
 
     
  
    }
    else{

      this.router.navigateByUrl('/inicio');
  

    }





    

  }



  async getClientsByDateSelected(date: any) {
    this.usuariosEnFecha = [];
    this.fechaDeUsuarioSeleccionada = date;
    this.CiberSelect = [];
    loader();
    if (date == null) {
      this.fechaDeUsuarioSeleccionada = "Actual";
    }
    this.adminService.getMyClientForDate(date).subscribe(data => {
      closeAlert();
      this.usuariosEnFecha = data;


    },
      (error: any) => {
        closeAlert()
      });
  }




























  //EXPORTAR EL CORTE 
  onBtnExport() {
    var usuario = CryptoJS.AES.decrypt(localStorage.getItem('Імякористувача') || '{}', "Імякористувача");
    let userName = usuario.toString(CryptoJS.enc.Utf8);
    let arreglo = userName.split('"');
    this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' });
  }

  //SE OPTIENE EL TOKEN Y TRAE EL CLIENTE ACUTAL CON EL PRECIO TOTAL
  async requestData() {
    var i = CryptoJS.AES.decrypt(localStorage.getItem("привіт") || '{}', "привіт");
    var token: any = i.toString(CryptoJS.enc.Utf8);
    var parteuno = token.slice(1);
    var final = parteuno.slice(0, -1);
    let tokenfinal: string = final;
    const headers = new HttpHeaders({ 'x-access-token': tokenfinal! });
    const data: any = await this.http
      .get<any[]>('https://actasalinstante.com:3030/api/actas/ClientsActuals/', { headers }).toPromise();
    this.rowData = data;
    this.precioTotal();
  }
  
  getTodos() {

    this.data$.pipe(distinctUntilChanged()).subscribe(async (Data: any) => {
      let datos: any;
      if (Data === "POR ENVIAR") {
        datos = await this.adminService.porenviar().toPromise();

      }
      else {
        datos = await this.adminService.enviado().toPromise();
      }
      this.CiberSelect = "";
      this.valordelobservable = Data;
      this.rowData = datos;

    });

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
    if (localStorage.getItem('привіт') != null) {
      if (localStorage.getItem('Імякористувача') != null) {
        var usuario = CryptoJS.AES.decrypt(localStorage.getItem('Імякористувача') || '{}', "Імякористувача");
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
