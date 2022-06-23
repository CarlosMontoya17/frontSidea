import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import Swal from 'sweetalert2';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RestService } from './../historial/rest.service';

import * as CryptoJS from 'crypto-js';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridApi, GridReadyEvent, RowSpanParams, ValueGetterFunc, ValueGetterParams } from 'ag-grid-community';
import * as XLSX from 'xlsx'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faTrashRestore } from '@fortawesome/free-solid-svg-icons';
declare function loader(): any;
declare function closeAlert(): any;


@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent implements OnInit {
  //VARIABLES
  private gridApi!: GridApi;
  //cambios de vista
  papeleras: boolean = false;
  conteo: boolean = false;
  conteo2: boolean = false;
  conteo3: boolean = false;


  public imagePath: any;
  hidden: boolean = false;
  hidden2: boolean = true;
  excel : boolean = false;
  faTrashCan = faTrashCan;
  facalend = faCalendarDays;
  restored = faTrashRestore;
  papelera = faTrashArrowUp;
  imgURL: any;
  fileTmp: any;
  info: any;
  preview: any = 0;
  vista: boolean = false;
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

  gettraerPapelera2: any;
  public rowData!: any[];
  public pinnedBottomRowData!: any[];
  //CONSTRUCTOR
  constructor(private restService: RestService, private router: Router, private database: DatabaseService, private http: HttpClient) { }

  descargarexcelvista(){
    this.excel = !this.excel;
  }


//RESETEAMOS LA PAGINA 
resetPagination() {
  this.page = 1;
}
clearresponsable() {
  this.responsableSearch = "";
  this.newResponsable = undefined;
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
onBtnExport() {
  var usuario = CryptoJS.AES.decrypt(localStorage.getItem('Імякористувача') || '{}', "Імякористувача");
  let userName = usuario.toString(CryptoJS.enc.Utf8);
  let arreglo = userName.split('"');

  this.gridApi.exportDataAsCsv({ fileName: 'Corte-' + arreglo[1] + '.csv' });
}
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

setTipoDeActa(tipo: any) {
  this.tipo = tipo;
}

Volver2() {

  this.router.navigateByUrl("/historial");

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

  const data: any = await this.database.getmydata(id).toPromise();
  this.myRol = data.data.rol;
}

//PROTEGEMOS LAS VISTAS PARA NO SER HACKEADAS
ngOnInit(): void {
  const token = localStorage.getItem('привіт');
  if (!token) {
    this.router.navigateByUrl('/login');
  }

  this.gettraerPapelera();
  this.getAllCibers();
  this.descry();

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
  this.gettraerPapelera();

}
//CAMBIAMOS LA VISTA DE LA TABLA DE DCOUMENTOS
changeView2() {

  this.conteo = !this.conteo;

  this.getcorte();
  this.gettraerPapelera();
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

  this.papeleras = !this.papeleras;



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
