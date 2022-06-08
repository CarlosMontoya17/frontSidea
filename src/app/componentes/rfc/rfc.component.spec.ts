import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfcComponent } from './rfc.component';

describe('RfcComponent', () => {
  let component: RfcComponent;
  let fixture: ComponentFixture<RfcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
