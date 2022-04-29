import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepusuarioComponent } from './stepusuario.component';

describe('StepusuarioComponent', () => {
  let component: StepusuarioComponent;
  let fixture: ComponentFixture<StepusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
