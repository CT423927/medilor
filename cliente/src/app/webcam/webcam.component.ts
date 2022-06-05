import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicacionComponentesService } from '../comunicacion-componentes.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {

  WIDTH = 440;
  HEIGHT = 280;

  @ViewChild('video',{ static: true }) public video: ElementRef;
  @ViewChild('canvas',{ static: true }) public canvasRef: ElementRef;

  valorExpresionFacial;
  valorCheckbox=false;
  expresionFacial = new FormGroup({
    expresionFacial: new FormControl('', Validators.required)
  });

  onCheckboxChange(e: any) {
    this.valorCheckbox=e.target.checked;
    console.log(e.target.checked);
    console.log("CHECK"+this.valorCheckbox);
  }

  submit(){
    this.valorExpresionFacial = this.expresionFacial.value;
    console.log(this.valorExpresionFacial);

    this.servicioCom.disparadorExpresionFacial.emit({
      data:this.valorExpresionFacial
    });

    this.http.post<any>('http://localhost:8080/facialManual',  {valorExpresionFacial: this.valorExpresionFacial} ).subscribe(data => {
      next: (response) => console.log(response)
    });
  }
  
  constructor(private elRef: ElementRef,private http: HttpClient, private servicioCom:ComunicacionComponentesService) {}
  isChecked=false;

  checkValue(event: any){
    console.log(event);
  };

  stream: any;
  detection: any;
  resizedDetections: any;
  canvas: any;
  canvasEl: any;
  displaySize: any;
  videoInput: any;
  listExpressions: any = [];

  startVideo() {
    this.videoInput = this.video.nativeElement;
    navigator.mediaDevices.getUserMedia({ 
        video: {}, 
        audio: false
      }).then((stream) => {
        this.videoInput.srcObject = stream;
      }).catch(() => {
        console.log("ERROR")
      }); 
    this.detect_Faces();
    
  }

  async ngOnInit() {
    if(this.isChecked==false){
      await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
      await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
      await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
      await faceapi.nets.faceExpressionNet.loadFromUri('/assets/models'),]).then(() => this.startVideo());
    
    }
    
  }

  async detect_Faces() {
    if(this.valorCheckbox==false){

    }
    this.elRef.nativeElement.querySelector('video').addEventListener('play', async () => {
     this.canvas = await faceapi.createCanvasFromMedia(this.videoInput);
     this.canvasEl = this.canvasRef.nativeElement;
     this.canvasEl.appendChild(this.canvas);
     this.canvas.setAttribute('id', 'canvass');
     this.canvas.setAttribute(
        'style',
        `position: relative;
        `
     );
     this.displaySize = {
        width: this.videoInput.width,
        height: this.videoInput.height,
     };
     faceapi.matchDimensions(this.canvas, this.displaySize);
     console.log("FUERA");
     setInterval(async () => {
        this.detection = await faceapi.detectAllFaces(this.videoInput,  new  faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        this.resizedDetections = faceapi.resizeResults(
          this.detection,
          this.displaySize
        );
        this.canvas.getContext('2d').clearRect(0, 0,      this.canvas.width,this.canvas.height);
        faceapi.draw.drawDetections(this.canvas, this.resizedDetections);
        faceapi.draw.drawFaceLandmarks(this.canvas, this.resizedDetections);
        faceapi.draw.drawFaceExpressions(this.canvas, this.resizedDetections);
        console.log(this.valorCheckbox);
        if(this.detection[0]!=undefined && this.valorCheckbox==false){
          this.http.post<any>('http://localhost:8080/emociones',  {
            angry: this.detection[0].expressions.angry,
            disgusted: this.detection[0].expressions.disgusted,
            fearful: this.detection[0].expressions.fearful,
            happy: this.detection[0].expressions.happy,
            neutral: this.detection[0].expressions.neutral,
            sad: this.detection[0].expressions.sad,
            surprised: this.detection[0].expressions.surprised,
          } ).subscribe(data => {
          next: (response) => console.log(response)
         }); 
        } 
    }, 2000);
    });
    }
}
