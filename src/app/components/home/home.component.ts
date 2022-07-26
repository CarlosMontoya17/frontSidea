import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/manage/localstorage.service';
import { faFaceGrin } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Icons
  faFaceGrin = faFaceGrin;
  //Data User's
  username:string = "";
  constructor(private localStorageService:LocalstorageService) { }

  ngOnInit(): void {
    this.username = this.localStorageService.getUsername();
  }

}
