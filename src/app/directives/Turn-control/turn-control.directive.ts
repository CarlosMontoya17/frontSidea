import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
/**
 * @CarlosMontoya - Directive TurnFormControls
 */

@Directive({
  selector: '[turnControl]'
})
export class TurnControlDirective {

  @Input() set turnControl(condition: boolean) {
    const action = condition ? 'disable': 'enable';
    this.ngControl.control![action]();
  }

  constructor(private ngControl: NgControl) { }

}
