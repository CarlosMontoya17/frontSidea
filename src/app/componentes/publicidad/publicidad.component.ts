import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatabaseService } from 'src/app/servicios/database/database.service';



import * as CryptoJS from 'crypto-js';


declare function loader(): any;
declare function closeAlert(): any;
declare function img_preview(): any;
declare function ShowImageAd(id:any,tipo:any):any;
declare function edit(): any;
declare function show(): any;


@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {
  result: any;
  img1: any = 0;
  urlImgs: any = [];
  selectOpt: any = 0;
  usuario: any = 'Publicidad';
  preview: any = 0;
  vista: boolean = false;
  fileTmp: any;
  SoltarImg: boolean = false;
  imagePath:any;
  imgURL: any;
  verImagenes:boolean= false;
getnames:any;
tipo:any;
usernameLocal: string = "";
myRol: any;
image:any;
sanitizer:any;

 
MyrolCliente:boolean = false;

  constructor(private adminservice: AdminService, private router: Router, private database: DatabaseService, private adminService:AdminService) { }
  ClienteVista() {
    if (this.myRol != 'Cliente' && this.myRol != 'Sucursal') {
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

    if(this.myRol != 'Cliente'){
    

  
  
  
      if (!token) {
        this.router.navigateByUrl('/login');
      }
 
     
  
    }
    else{

      this.router.navigateByUrl('/inicio');
  

    }
  }

  
  VerImagenes(){
    this.getnombres();

  }
  ver(){
    this.verImagenes = !this.verImagenes;
  }
  //cambiamos la vista del drop & drag
  changeView4() {

    this.SoltarImg = !this.SoltarImg;
  }
  //visualizamos el pdf con metodo mimeType no funciono :,(
  preview56(files:any) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
     
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

  //AÑADIMOS UNA IMAGEN POR MEDIO DE LA API
  addImg() {
    let id:any;
    try {
      loader();
      let ext2 = this.fileTmp.fileName.split(".");
      Swal.fire(
        {
          position: 'center',
          icon: 'success',
          title: 'Imagen para ' + this.selectOpt + '\n' + '&bull;' + 'Enviado' + '&bull;',
          showConfirmButton: false,
          timer: 1500
        }
      )
      this.reloadCurrentRoute();
      let ext = this.fileTmp.fileName.split(".");
      if (ext[1] != "png" && ext[1] !="jpg"  ) {

        Swal.fire(
          {
            position: 'center',
            icon: 'error',
            title: 'Solo Imagenes con formato "PNG" o "JPG"',
            showConfirmButton: false,
            timer: 1500

          }
        )
        this.reloadCurrentRoute();
      }
      else {
        const body = new FormData();
        body.append('ad', this.fileTmp.fileRaw, this.fileTmp.fileName);
        body.append('tipo', this.selectOpt);
        this.adminservice.sendImages(body)
        .subscribe(res => {
          this.selectOpt = res;
          this.img1 = 1;
          closeAlert();
         // console.log(this.selectOpt)
        }),
        this.reloadCurrentRoute();
        (error: any) => {
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
          title: 'Debes subir una imagen en formato "PNG" o "JPG"',
          showConfirmButton: false,
          timer: 1500
        }
      );
      this.reloadCurrentRoute();
    }


    // if(this.selectOpt != 0 && this.img1 != 0){




    //   this.adminservice.addImg(this.img1, this.selectOpt);
    // }

  }


  async getImageFromService(id:any) {
    
    
    this.img1 = true;
    await this.adminservice.GetImages(id).subscribe( (data:any) => {
      // this.createImageFromBlob(data);
      // this.img1 = false;

      let objectURL = URL.createObjectURL(data);       
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);



    }, (error: any) => {
      this.img1 = false;

    });
}


showImage(id:any, tipo:any){
  ShowImageAd(id, tipo);
 
}
showImages(id:any, tipo:any){
  ShowImageAd(id, tipo);
 
}
editimage(){
  
}
  async getnombres() {

    if (localStorage.getItem('привіт') != null) {
        const data: any = await this.adminservice.getNames().toPromise();
        this.getnames = data;
       // console.log(this.getnames)
        if (data.lenght != 0) {
          closeAlert();
  
      }
    }
  
  }
  //Recargamos la misma pagina para resetear todos los datos
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  //SELECCIONAMOS UNO DE LOS CAPOS DE TIPO DE ACTAS
  selectOption(element: any) {

    this.selectOpt = element.target.value;


  }
  //tipo
  getImages2(tipo:any){
    this.adminservice.getImages(tipo).subscribe(data => {
      this.urlImgs = data;
    },error => {
      //console.log(error)
      
    });
  }
  setTipoDeActa(tipo: any) {
    this.tipo = tipo;
   
  }
  //OPTENEMOS LAS IMAGENES  
  async getImages(tipo: any) {
   
    this.img1 = true;
    await this.adminservice.GetImages(tipo).subscribe( (data:any) => {
      // this.createImageFromBlob(data);
      // this.img1 = false;

      let objectURL = URL.createObjectURL(data);       
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
     // console.log(this.image)


    }, (error: any) => {
      this.img1 = false;

    });
  }

  //ELIMINAMOS LAS IMAGENES QUE SUBIMOS 
  eliminar(id: any, path: any) {
    // console.log(id)
    // this.adminservice.deleteImg(id, path).subscribe(res => {
    // this.adminservice.deleetIgame(id,path).suscribe(res=: setTimeO function(location.reload()))
    // setTimeout(function()) 
    /*
    
insert into database  nombre where nombre='k' like datos='nombre,apellidos,estasddo,tipo';
select * from database where nombre='k' like datos='tipo';
delete *from database where nombre='k';
update database where nombre='k' like nombre='knc';
truncate database all rows;
navigate for database and select * from nombre de alumnos;

    */
    //   setTimeout(function(){
    //         location.reload();
    //   },1300);
    // },error => {
    //   console.log(error)

    // });
  }
  //DESCARGAMOS LA PUBLICIDAD DE SUBIMOS
  descargar(tipo:any) {
 
    this.adminservice.GetImages(tipo).subscribe(data => {
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "publicidad.zip";
      link.click();
    }, error => {
      console.log(error)

    });
  }

}
