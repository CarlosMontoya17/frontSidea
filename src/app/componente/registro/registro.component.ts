import { Component, OnInit } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  docPath: string = "";
  public imagePath: any;
  imgURL: any;
  fileTmp: any;
  fileTmpDomi: any;
  fileDomi: any;
  fileTmpfoto: any;
  filefoto: any;

  constructor() { }

  ngOnInit(): void {
  }

    //SOLTAMOS EL DOCUMENTO PDF AL APARTADO DE DOCUMENTOS INE
    getFile($event: any): void {
      const [fileine] = $event.target.files;
      this.fileTmp = {
        fileRaw: fileine,
        fileName: fileine?.name
      }
      console.log(fileine);
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
   //SOLTAMOS EL DOCUMENTO PDF AL APARTADO DE DOCUMENTOS DOMICILIO
   getdDomi($event: any): void {
    const [file] = $event.target.files;
    this.fileTmpDomi = {
      fileRaw: file,
      fileName: file?.name
    }
    console.log(file);
  }
previewDOMI(files: any) {
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

//SOLTAMOS EL DOCUMENTO PDF AL APARTADO DE DOCUMENTOS FOTOGRAFIA
getfOTO($event: any): void {
  const [filefoto] = $event.target.files;
  this.fileTmpfoto = {
    fileRaw: filefoto,
    fileName: filefoto?.name
  }
  console.log(filefoto);
}
previewFOTO(files: any) {
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

send(){
  let ext = this.fileTmp.fileName.split(".");


console.log(ext);

}






}
