import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';
import { Router } from '@angular/router';

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
  constructor(private adminservice:AdminService) { }

  ngOnInit(): void {
  }

  addImg(){
    if(this.selectOpt != 0 && this.img1 != 0){
      this.adminservice.addImg(this.img1, this.selectOpt);
    }
  }
  selectOption(element:any){
    if(element.target.value != 0){
      this.selectOpt = element.target.value;
    }
  }
  preview1(element:any){    
    this.img1=<File>element.target.files[0];
  }

  getImages(categoria:any){
    this.adminservice.getImages(categoria).subscribe(data => {
      this.urlImgs = data;
    },error => {
      console.log(error)
     
    });
  }
  eliminar(id:any, path:any){
    console.log(id)
    this.adminservice.deleteImg(id, path).subscribe(res => {
    
      setTimeout(function(){
            location.reload();
      },1300);
    },error => {
      console.log(error)
    
    });
  }
  descargar(){
    this.adminservice.descargarImgs().subscribe(data => {
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "publicidad.zip";
      link.click();  
    },error => {
      console.log(error)
      // swalError("Error 501, contacte al departamento de software!");
    });
  }

}
