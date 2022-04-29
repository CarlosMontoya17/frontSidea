import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarpanelComponent } from './sidebarpanel.component';

describe('SidebarpanelComponent', () => {
  let component: SidebarpanelComponent;
  let fixture: ComponentFixture<SidebarpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
