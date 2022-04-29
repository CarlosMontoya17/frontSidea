import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarpanelhistorialComponent } from './sidebarpanelhistorial.component';

describe('SidebarpanelhistorialComponent', () => {
  let component: SidebarpanelhistorialComponent;
  let fixture: ComponentFixture<SidebarpanelhistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarpanelhistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarpanelhistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
