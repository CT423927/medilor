import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaResumenComponent } from './tarjeta-resumen.component';

describe('TarjetaResumenComponent', () => {
  let component: TarjetaResumenComponent;
  let fixture: ComponentFixture<TarjetaResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaResumenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
