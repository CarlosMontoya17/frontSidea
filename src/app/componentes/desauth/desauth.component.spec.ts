import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesauthComponent } from './desauth.component';

describe('DesauthComponent', () => {
  let component: DesauthComponent;
  let fixture: ComponentFixture<DesauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
