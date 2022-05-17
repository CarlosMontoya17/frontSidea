import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';
import { Router } from '@angular/router';

declare function img_preview(): any;


  

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {
  result:any;
  img1: any = 0;
  urlImgs:any = [];
  selectOpt:any = 0;
  usuario:any = 'Publicidad';
  preview: any = 0;
  vista: boolean = false;
  fileTmp: any;
  constructor(private adminservice:AdminService) { }

  ngOnInit(): void {
  
  }

  imagenpreview(){
    img_preview();
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
  addImg(){
    // if(this.selectOpt != 0 && this.img1 != 0){
    //   this.adminservice.addImg(this.img1, this.selectOpt);
    // }
 
  }
  //SELECCIONAMOS UNO DE LOS CAPOS DE TIPO DE ACTAS
  selectOption(element:any){
     if(element.target.value != 0){
       this.selectOpt = element.target.value;
     }
  }
  //VISUALIZAMOS LA IMAGEN QUE CARGAMOS PREVIAMENTE
  preview1(element:any){    
   this.img1=<File>element.target.files[0];
  }
//OPTENEMOS LAS IMAGENES  
  getImages(categoria:any){
    // this.adminservice.getImages(categoria).subscribe(data => {
    //   this.urlImgs = data;
    // },error => {
    //   console.log(error)
     
    // });
  }

  //ELIMINAMOS LAS IMAGENES QUE SUBIMOS 
  eliminar(id:any, path:any){
    // console.log(id)
    // this.adminservice.deleteImg(id, path).subscribe(res => {
    
    //   setTimeout(function(){
    //         location.reload();
    //   },1300);
    // },error => {
    //   console.log(error)
    
    // });
  }
  //DESCARGAMOS LA PUBLICIDAD DE SUBIMOS
  descargar(){
    this.adminservice.descargarImgs().subscribe(data => {
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "publicidad.zip";
      link.click();  
    },error => {
      console.log(error)
   
    });
  }

}
