import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosFisicoComponent } from './cambios-fisico.component';

describe('CambiosFisicoComponent', () => {
  let component: CambiosFisicoComponent;
  let fixture: ComponentFixture<CambiosFisicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiosFisicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiosFisicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
