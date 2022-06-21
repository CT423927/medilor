import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ComunicacionComponentesService } from '../comunicacion-componentes.service';

@Component({
  selector: 'app-cambios-fisico',
  templateUrl: './cambios-fisico.component.html',
  styleUrls: ['./cambios-fisico.component.scss']
})

export class CambiosFisicoComponent implements OnInit {

  constructor(private http: HttpClient, private servicioCom:ComunicacionComponentesService) { }

  ngOnInit(): void {
  }

  valorCambioFisico=0;
  alerta=false;

  cambioFisico = new FormGroup({
    cambioFisico: new FormControl('', Validators.required)
  });
    
  get f(){
    return this.cambioFisico.controls;
  }
    
  submit(){
    this.valorCambioFisico = this.cambioFisico.value;
    console.log(this.valorCambioFisico);
    this.servicioCom.disparadorEnviarCambiosFisicos.emit({
      data:this.valorCambioFisico 
    });
    this.http.post<any>('http://localhost:8080/cambiosFisicos',  {cambioFisico: this.valorCambioFisico} ).subscribe(data => {
      next: (response) => console.log(response)
    });
    this.alerta=true;

  }
  
  changeCambioFisico(e) {
    console.log(e.target.value);
  }

}
