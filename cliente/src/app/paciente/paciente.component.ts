import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente.model';
import { MongoService } from '../services/mongo.service';
import { HttpClient } from '@angular/common/http';

import { ComunicacionComponentesService } from '../comunicacion-componentes.service';


declare const scan: any;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

@Injectable({
  providedIn: 'root'
})


export class PacienteComponent implements OnInit {

  thresholdConfig = {
    '0': {color: '#00c942'},
    '3': {color: '#FFEE58'},
    '8': {color: '#ff9d4d'},
    '14': {color: '#E74C3C'},
  };
  markerConfig = {
    "0": { color: '#C8E6C9', size: 10, label: '0', type: 'line'},
    "3": { color: '#C8E6C9', size: 0.1, label: '3', type: 'line'},
    "8": { color: 'red', size: 0.1, label: '8', type: 'line'},
    "14": { color: '#FFE0B2', size: 0.1, label: '14', type: 'line'},
    "18": { color: '#555', size: 10, label: '18', type: 'line'},
  }

  @Input() currentPaciente: Paciente = {
    nombre: '',
    fechaNacimiento: null,
    sexo: '',
    contacto: '',
    fechaIngreso: null,
    fechaAlta: null,
    ingresado: null,
  };
  
  listExpressions: any = [];
  id!: number;
  private sub: any;
  requestTimeout: NodeJS.Timeout;

  onClick(){
    scan();
  }
  
  constructor(private route: ActivatedRoute, private mongoService: MongoService, private http: HttpClient, private servicioCom:ComunicacionComponentesService) {

  }

  vocalizacion;
  expresionFacial;
  cambiosLenguajeCorporal;
  cambiosComportamiento;
  cambiosFisicologicos;
  cambiosFisicos;
  puntuacionTotal:number;
  json;
  gaugeValue;
  gaugeType = "semi";
  gaugeLabel = "Nivel dolor";
  avisos;
  avisosOriginal;

  ngOnInit() {
    
    this.getTutorial(this.route.snapshot.params["id"]);
    /* this.refreshObjectAuto(); */

    this.servicioCom.disparadorEnviar.subscribe(data =>{
      console.log(data.data.cambioComportamiento);
      this.cambiosComportamiento=data.data.cambioComportamiento;
      this.refreshObject();
    });

    this.servicioCom.disparadorEnviarCambiosFisicos.subscribe(data =>{
      console.log(data.data.cambioFisico);
      this.cambiosFisicos=data.data.cambioFisico;
      this.refreshObject();
    });

    this.servicioCom.disparadorVocalizacion.subscribe(data =>{
      console.log(data.data.vocalizacion);
      this.vocalizacion=data.data.vocalizacion;
      this.refreshObject();
    });

    this.servicioCom.disparadorExpresionFacial.subscribe(data =>{
      console.log(data.data.expresionFacial);
      this.expresionFacial=data.data.expresionFacial;
      this.refreshObject();
    });

    this.servicioCom.disparadorLenguajeCorporal.subscribe(data =>{
      console.log(data.data.lenguajeCorporal);
      this.cambiosLenguajeCorporal=data.data.lenguajeCorporal;
      this.refreshObject();
    });

    this.servicioCom.disparadorFisicologicos.subscribe(data =>{
      console.log(data.data);
      this.cambiosFisicologicos=data.data;
      this.refreshObject();
    });

    this.http.get('http://localhost:8080/obtenerPuntuaciones').subscribe(data => {

      this.json=data;
      console.log(this.json.vocalizacion);
      this.vocalizacion=this.json.vocalizacion;
      this.expresionFacial=this.json.expresionFacial;
      this.cambiosLenguajeCorporal=this.json.cambiosLenguajeCorporal;
      this.cambiosComportamiento=this.json.cambiosComportamiento;
      this.cambiosFisicologicos=this.json.cambiosFisicologicos;
      this.cambiosFisicos=this.json.cambiosFisicos;
      this.puntuacionTotal=this.json.puntuacionTotal;
    });

    this.refreshObject();
    this.conseguirAvisosPaciente();
    this.refreshObjectAuto();

  }

  refreshObject(): void {
    this.http.get('http://localhost:8080/obtenerPuntuacionFinal').subscribe(data => {
      console.log("PUNTUACION TOTAL" + data);
      this.puntuacionTotal=JSON.parse(data.toString());
      this.gaugeValue= this.puntuacionTotal;
    });
  }

  refreshObjectAuto(): void {
    this.http.get('http://localhost:8080/obtenerPuntuacionFinal').subscribe(data => {
      console.log("PUNTUACION TOTAL" + data);
      this.puntuacionTotal=JSON.parse(data.toString());
      this.requestTimeout = setTimeout(() => this.refreshObjectAuto(),4000);
    });
  }

  

  getTutorial(id: string): void {
    this.mongoService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPaciente = data;
          this.currentPaciente.fechaNacimiento=this.currentPaciente.fechaNacimiento.split('T')[0];
          this.currentPaciente.fechaAlta=this.currentPaciente.fechaAlta.split('T')[0];
          console.log("FEXHA ALTA" + this.currentPaciente.fechaAlta);
          if(this.currentPaciente.fechaAlta.includes('0000')){
            this.currentPaciente.fechaAlta="";
            console.log("FEXHA ALTA" + this.currentPaciente.fechaAlta);
          }
          this.currentPaciente.fechaIngreso=this.currentPaciente.fechaIngreso.split('T')[0];
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  conseguirAvisosPaciente(){
    this.http.get('http://localhost:8080/obtenerAlertas').subscribe(data => {
      this.avisos=data;
      
      for(let paciente of this.avisos){
        let split1 = paciente.fecha.split('T');
        let dia = split1[0];
        let split2= split1[1].split('.');
    
        let nuevaFecha=dia.concat(' ', split2[0]);
        paciente.fecha=nuevaFecha;

        console.log(paciente.fecha);
      }
      this.avisos = this.avisos.filter(object => {
        let paciente = object['paciente'].includes(this.currentPaciente.nombre);
        return paciente;
      });
    });
  }


  customOptions: OwlOptions = {
    stagePadding: 0,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 0,
    navSpeed: 700,
    nav: false,
    items:4
  }

  actualizarAtendidas(id){
    this.avisos[id].atendida='true';

    this.http.post<any>('http://localhost:8080/avisoAtendido',  {id: id} ).subscribe(data => {
      next: (response) => console.log(response)
    });
  }

}
