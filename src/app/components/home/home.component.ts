import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/manage/localstorage.service';
import { Observable } from 'rxjs';
//Services
import { RobotsService } from 'src/app/services/robots.service';
import { AuthService } from 'src/app/services/auth/auth.service';
//Icons
import { faFaceGrin } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
//Models
import { myData } from 'src/app/models/myData.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Observable
  myData$: Observable<myData>;
  //Icons
  faFaceGrin = faFaceGrin;
  faPowerOff = faPowerOff;
  //Captha Image
  imageToShow: any;
  myRol:string = "";


  constructor(private localStorageService: LocalstorageService, private robots: RobotsService, auth: AuthService) {
    this.myData$ = auth.GetMyData;
  }

  ngOnInit(): void {
    this.myData$.subscribe(data => {
      this.myRol = data.rol;
      switch (data.rol) {
        case "Admin":
          this.GiveMeCaptcha();
          break;
        case "Supervisor":
          this.GiveMeCaptcha();
          break;
      }
    });

  }



  GiveMeCaptcha() {
    this.robots.Captcha("robot2").subscribe(data => {
      this.createImageFromBlob(data);
    }, err => {
      // console.log("error");
    });
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
