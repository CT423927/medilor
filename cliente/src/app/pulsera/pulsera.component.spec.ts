import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseraComponent } from './pulsera.component';

describe('PulseraComponent', () => {
  let component: PulseraComponent;
  let fixture: ComponentFixture<PulseraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulseraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PulseraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
