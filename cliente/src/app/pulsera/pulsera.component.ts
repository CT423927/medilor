import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicacionComponentesService } from '../comunicacion-componentes.service';


@Component({
  selector: 'app-pulsera',
  templateUrl: './pulsera.component.html',
  styleUrls: ['./pulsera.component.scss']
})



export class PulseraComponent implements OnInit {

  constructor(private http: HttpClient, private servicioCom:ComunicacionComponentesService) { }

  valorCambiosFisiologicos;
  valorCheckbox=false;
  ritmoCardiaco=0;
  requestTimeout: NodeJS.Timeout;
  alerta=false;

  cambiosFisiologicos = new FormGroup({
    cambiosFisiologicos: new FormControl('', Validators.required)
  });

  onCheckboxChange(e: any) {
    this.valorCheckbox=e.target.checked;
    console.log(e.target.checked);
    console.log("CHECK"+this.valorCheckbox);
    this.http.post<any>('http://localhost:8080/manualActivadoCambiosFisicologicos',  {bool: this.valorCheckbox} ).subscribe(data => {
      next: (response) => console.log(response)
    });
  }

  submit(){
    this.valorCambiosFisiologicos = this.cambiosFisiologicos.value.cambiosFisiologicos;
    console.log("Valor fisiologicos" + this.valorCambiosFisiologicos);

    this.servicioCom.disparadorFisicologicos.emit({
      data:this.valorCambiosFisiologicos 
    });

    this.http.post<any>('http://localhost:8080/fisiologicosManual',  {valorCambiosFisiologicos: this.valorCambiosFisiologicos} ).subscribe(data => {
      next: (response) => console.log(response)
    });
    this.alerta=true;
    
  }

  obtenerRitmoCardiaco(): void {
    this.http.get('http://localhost:8080/obtenerRitmoCardiaco').subscribe(data => {
      console.log("ritmo" + data);
      this.ritmoCardiaco=JSON.parse(data.toString());
      this.requestTimeout = setTimeout(() => this.obtenerRitmoCardiaco(),2000);
      console.log(this.ritmoCardiaco + "RECIBIDOOOOO");
    });
  }

  public loadExternalScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
  
  ngOnInit(): void {
    this.obtenerRitmoCardiaco();
    this.loadExternalScript('assets/webapp.bundle.js')
  }

}
