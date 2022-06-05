import { Injectable, Output,EventEmitter } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class ComunicacionComponentesService {

  @Output() disparadorEnviar : EventEmitter<any> = new EventEmitter();

  @Output() disparadorEnviarCambiosFisicos : EventEmitter<any> = new EventEmitter();

  @Output() disparadorVocalizacion : EventEmitter<any> = new EventEmitter();

  @Output() disparadorExpresionFacial : EventEmitter<any> = new EventEmitter();

  @Output() disparadorLenguajeCorporal : EventEmitter<any> = new EventEmitter();

  @Output() disparadorFisicologicos : EventEmitter<any> = new EventEmitter();

  constructor() { }
}
