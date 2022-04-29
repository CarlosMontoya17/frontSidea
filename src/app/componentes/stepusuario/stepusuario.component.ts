import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';
declare var stepper1:any;
declare var form:any;
declare var validFormFeedback:any;
declare var inValidFormFeedback:any;
@Component({
  selector: 'app-stepusuario',
  templateUrl: './stepusuario.component.html',
  styleUrls: ['./stepusuario.component.css']
})
export class StepusuarioComponent implements OnInit {
  @ViewChild('bsStepper', { static: false }) stepperElement!: ElementRef<any>;
  public stepper!: Stepper;

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }


  ngOnInit() {
    this.stepper = new Stepper(this.stepperElement.nativeElement, {
      linear: false,
      animation: true
    });
  }
  
}
