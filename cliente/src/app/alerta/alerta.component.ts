import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  avisos;
  avisosOriginal;
  colorAlerta;
  selected="Todas";
  searchText = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.conseguirAvisos();
  }

  conseguirAvisos(){
    this.http.get('http://localhost:8080/obtenerAlertas').subscribe(data => {
      console.log("avisos" + data);
      this.avisos=data;
      this.avisosOriginal=data;
      for(let paciente of this.avisos){
        let split1 = paciente.fecha.split('T');
        let dia = split1[0];
        let split2= split1[1].split('.');
    
        let nuevaFecha=dia.concat(' ', split2[0]);
        paciente.fecha=nuevaFecha;

        console.log(paciente.fecha);
      }
    });
  }

  Buscar(){
    if(this.selected!="Todas" || this.searchText!= ""){

      console.log(this.selected + " ------- valor priodidad")
      let searchValue = this.searchText.toLocaleUpperCase();
      this.avisos = this.avisosOriginal.filter(object => {
        console.log(this.avisosOriginal);
        let paciente = object['paciente'].includes(searchValue) && object['color'].includes(this.selected);
        return paciente;
      });
    } else{
      this.conseguirAvisos();
    } 

  } 


}
