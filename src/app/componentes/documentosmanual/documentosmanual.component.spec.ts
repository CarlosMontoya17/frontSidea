import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosmanualComponent } from './documentosmanual.component';

describe('DocumentosmanualComponent', () => {
  let component: DocumentosmanualComponent;
  let fixture: ComponentFixture<DocumentosmanualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosmanualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosmanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
