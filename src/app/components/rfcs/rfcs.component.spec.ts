import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfcsComponent } from './rfcs.component';

describe('RfcsComponent', () => {
  let component: RfcsComponent;
  let fixture: ComponentFixture<RfcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
