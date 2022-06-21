import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicacionComponentesService } from '../comunicacion-componentes.service';

declare const MotionDetector: any;
@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss']
})
export class MovimientoComponent implements OnInit {

  constructor(private http: HttpClient, private servicioCom:ComunicacionComponentesService) { }

  valorLenguajeCorporal;
  valorCheckbox=false;
  
  lenguajeCorporal = new FormGroup({
    lenguajeCorporal: new FormControl('', Validators.required)
  });

  onCheckboxChange(e: any) {
    this.valorCheckbox=e.target.checked;
    console.log(e.target.checked);
    console.log("CHECK"+this.valorCheckbox);
    this.http.post<any>('http://localhost:8080/manualActivadoCambiosLenguajeCorporal',  {bool: this.valorCheckbox} ).subscribe(data => {
      next: (response) => console.log(response)
    });
  }

  submit(){
    this.valorLenguajeCorporal = this.lenguajeCorporal.value;
    console.log(this.valorLenguajeCorporal);

    this.servicioCom.disparadorLenguajeCorporal.emit({
      data:this.valorLenguajeCorporal 
    });

    this.http.post<any>('http://localhost:8080/lenguajeCorporalManual',  {valorLenguajeCorporal: this.valorLenguajeCorporal} ).subscribe(data => {
      next: (response) => console.log(response)
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
    console.log(script);
  }
  
  ngOnInit(): void {
    this.loadExternalScript('assets/movimiento/MotionDetector/WebCamCapture.js')
    this.loadExternalScript('assets/movimiento/MotionDetector/ImageCompare.js')
    this.loadExternalScript('assets/movimiento/MotionDetector/Core.js')
    this.loadExternalScript('assets/movimiento/main.js')
  }

  
}
