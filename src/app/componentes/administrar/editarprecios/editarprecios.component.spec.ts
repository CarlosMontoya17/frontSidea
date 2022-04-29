import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpreciosComponent } from './editarprecios.component';

describe('EditarpreciosComponent', () => {
  let component: EditarpreciosComponent;
  let fixture: ComponentFixture<EditarpreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarpreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
