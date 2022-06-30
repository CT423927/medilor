import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ComunicacionComponentesService } from '../comunicacion-componentes.service';

@Component({
  selector: 'app-cambios-comportamiento',
  templateUrl: './cambios-comportamiento.component.html',
  styleUrls: ['./cambios-comportamiento.component.scss']
})

export class CambiosComportamientoComponent implements OnInit {

  constructor(private http: HttpClient, private servicioCom:ComunicacionComponentesService) { }

  valorCambioComportamiento=0;
  alerta=false;
  cambioComportamiento = new FormGroup({
    cambioComportamiento: new FormControl('', Validators.required)
  });
    
  get f(){
    return this.cambioComportamiento.controls;
  }
    
  submit(){
    this.valorCambioComportamiento = this.cambioComportamiento.value;
    console.log(this.valorCambioComportamiento);
    this.servicioCom.disparadorEnviar.emit({
      data:this.valorCambioComportamiento 
    });
    this.http.post<any>('http://localhost:8080/cambiosComportamiento',  {cambioComportamiento: this.valorCambioComportamiento} ).subscribe(data => {
      next: (response) => console.log(response)
    });
    this.alerta=true;
  }
  
  changeCambioComportamiento(e) {
    console.log(e.target.value);
  }

  ngOnInit(): void {
  }


}
