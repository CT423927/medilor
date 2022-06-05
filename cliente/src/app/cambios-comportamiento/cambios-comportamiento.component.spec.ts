import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosComportamientoComponent } from './cambios-comportamiento.component';

describe('CambiosComportamientoComponent', () => {
  let component: CambiosComportamientoComponent;
  let fixture: ComponentFixture<CambiosComportamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiosComportamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiosComportamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
