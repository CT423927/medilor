import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ComunicacionComponentesService } from '../comunicacion-componentes.service';

@Component({
  selector: 'app-micro',
  templateUrl: './micro.component.html',
  styleUrls: ['./micro.component.scss']
})
export class MicroComponent implements OnInit {

  constructor(private http: HttpClient, private servicioCom:ComunicacionComponentesService) { }

  valorVocalizacion;
  valorCheckbox=false;
  vocalizacion = new FormGroup({
    vocalizacion: new FormControl('', Validators.required)
  });

  onCheckboxChange(e: any) {
    this.valorCheckbox=e.target.checked;
    console.log(e.target.checked);
    console.log("CHECK"+this.valorCheckbox);
  }

  submit(){
    this.valorVocalizacion = this.vocalizacion.value;
    console.log(this.valorVocalizacion);

    this.servicioCom.disparadorVocalizacion.emit({
      data:this.valorVocalizacion 
    });

    this.http.post<any>('http://localhost:8080/vocalizacionManual',  {valorVocalizacion: this.valorVocalizacion} ).subscribe(data => {
      next: (response) => console.log(response)
    });
    
  }
  averageVolume=0;
  ngOnInit(): void {
    (async () => {
      let volumeCallback = null;
      let volumeInterval = null;
      const volumeVisualizer = document.getElementById('volume-visualizer')!;
      // Initialize
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true
          }
        });
        const audioContext = new AudioContext();
        const audioSource = audioContext.createMediaStreamSource(audioStream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        analyser.minDecibels = -127;
        analyser.maxDecibels = 0;
        analyser.smoothingTimeConstant = 0.4;
        audioSource.connect(analyser);
        const volumes = new Uint8Array(analyser.frequencyBinCount);
        volumeCallback = () => {
          analyser.getByteFrequencyData(volumes);
          let volumeSum = 0;
          for(const volume of volumes)
            volumeSum += volume;
          this.averageVolume = Math.round(volumeSum / volumes.length);
          // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
          console.log(this.averageVolume);
          volumeVisualizer.style.setProperty('--volume', (this.averageVolume * 100 / 127) + '%');
        };
      } catch(e) {
        console.error('Failed to initialize volume visualizer, simulating instead...', e);
        // Simulation
        //TODO remove in production!
        let lastVolume = 50;
        volumeCallback = () => {
          const volume = Math.min(Math.max(Math.random() * 100, 0.8 * lastVolume), 1.2 * lastVolume);
          lastVolume = volume;
          volumeVisualizer.style.setProperty('--volume', volume + '%');
        };
      }
      volumeInterval = setInterval(volumeCallback, 100);
    })();
  }
}
  
   
    

  
  




