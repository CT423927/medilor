import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Paciente } from '../models/paciente.model';
import { MongoService } from '../services/mongo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent implements OnInit {

  constructor(private mongoService: MongoService, private http: HttpClient) { }

  pacientes?: Paciente[];
  numTotal;
  numIngresados=0;
  numAltas=0;
  numMonitorizados=0;
  numAvisos=0;

  ngOnInit(): void {
    this.retrievePacientes();
    this.conseguirAvisos();
  }

  retrievePacientes(): void {
    this.mongoService.getAll()
      .subscribe({
        next: (data) => {
          this.pacientes=data;
          this.numTotal= data.length;
          for(let paciente of this.pacientes){
            if(paciente.ingresado==true){
              this.numMonitorizados++;
            }
            if(paciente.fechaAlta.split('-')[0]=='0000'){
              this.numIngresados++;
            } 
            
          }
          this.numAltas=this.numTotal-this.numIngresados;
          
        },
        error: (e) => console.error(e)
      });
  }

  conseguirAvisos(){
    this.http.get('http://localhost:8080/obtenerAlertas').subscribe(data => {
      console.log("avisos" + data);
      console.log("avisos" + Object.keys(data).length);
      this.numAvisos=Object.keys(data).length;
    });
  }
   
  customOptions: OwlOptions = {
    stagePadding: 110,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 50,
    navSpeed: 700,
    nav: false,
    items:4
  }
}
