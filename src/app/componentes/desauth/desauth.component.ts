import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-desauth',
  templateUrl: './desauth.component.html',
  styleUrls: ['./desauth.component.css']
})
export class DesauthComponent implements OnInit {

  timeLeft: number = 10;
  interval:any;

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.startTimer();
  }


  goToHome(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.goToHome();
        
      }
    },1000)
  }

}
