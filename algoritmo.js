
function EscalaAbbey(){

    this.vocalizacion=0;
    this.expresionFacial=0;
    this.cambiosLenguajeCorporal=0;
    this.cambiosComportamiento=0;
    this.cambiosFisicologicos=0;
    this.cambiosFisicos=0;
    this.ritmoCardiaco=0;
    
    this.manualActivadoCambiosFisicologicos=false;
    this.manualActivadoCambiosLenguajeCorporal=false;
    this.horaUltimoMov = undefined;

    this.puntuacionTotal=0;
    console.log("Puntuacion final" + this.puntuacionTotal);

    this.alertas = [
        {
            "id": '0',
            "paciente": "ANTONIO CALDERON LOPEZ",
            "fecha": new Date('May 24, 2022 13:24:00'),
            "tipo": 'cambiosLenguajeCorporal',
            "color": 'orange',
            "atendida": 'false'
        },
        {
            "id": '1',
            "paciente": "ANTONIO CALDERON LOPEZ",
            "fecha": new Date('May 24, 2022 18:24:00'),
            "tipo": 'cambiosFisicologicos',
            "color": 'red',
            "atendida": 'true'
        },
        {
            "id": '2',
            "paciente": "ANTONIO CALDERON LOPEZ",
            "fecha": new Date('1995-12-17T19:24:00'),
            "tipo": 'cambiosFisicos',
            "color": 'yellow',
            "atendida": 'false'
        },
        {
            "id": '3',
            "paciente": "ANTONIO CALDERON LOPEZ",
            "fecha": new Date('May 24, 2022 10:24:00'),
            "tipo": 'cambiosComportamiento',
            "color": 'red',
            "atendida": 'true'
        },
        {
            "id": '4',
            "paciente": "BRUNO GRAU SOLIS",
            "fecha": new Date('May 24, 2022 10:24:00'),
            "tipo": 'cambiosComportamiento',
            "color": 'red',
            "atendida": 'true'
        }
    ];

    this.setVocalizacion= function(valorVocalizacion){
        console.log("Set valorVocalizacion" + valorVocalizacion)
        this.vocalizacion=JSON.parse(valorVocalizacion);
        this.calcularPuntuacionFinal();
    }

    this.setExpresionFacial= function(valorExpresionFacial){
        console.log("Set valorExpresionFacial" + valorExpresionFacial)
        this.expresionFacial=JSON.parse(valorExpresionFacial);
        this.calcularPuntuacionFinal();
    }

    this.setLenguajeCorporal= function(valorLenguajeCorporal){
        console.log("Set valorLenguajeCorporal" + valorLenguajeCorporal)
        this.cambiosLenguajeCorporal=JSON.parse(valorLenguajeCorporal);
        this.calcularPuntuacionFinal();
    }

    this.setCambiosDeComportamiento=  function(valorCambioComportamiento){
        console.log("Set cambios comportamiento" + valorCambioComportamiento);
        this.cambiosComportamiento=JSON.parse(valorCambioComportamiento);
        this.calcularPuntuacionFinal();
    }

    this.setCambiosFisicologicos= function(valorFisicologicos){
        console.log("Set Fisicologicos" + valorFisicologicos)
        this.cambiosFisicologicos=JSON.parse(valorFisicologicos);
        this.calcularPuntuacionFinal();
    }

    this.setCambiosFisicos=async function(valorCambioFisico){
        console.log("Set cambios fisicos" + valorCambioFisico)
        this.cambiosFisicos=JSON.parse(valorCambioFisico);
        this.calcularPuntuacionFinal();
    }

    

    this.calcularVolacizacion=function(valorVocalizacion){
        switch (true){
            case valorVocalizacion < 25:
                this.valorVocalizacion=0;
                this.calcularPuntuacionFinal();
                break;    
            case valorVocalizacion >= 25 &&  valorVocalizacion < 40:
                this.valorVocalizacion=1;
                this.calcularPuntuacionFinal();
                break;
        
            case valorVocalizacion >= 40 &&  valorVocalizacion < 75:
                this.valorVocalizacion=2;
                this.calcularPuntuacionFinal();
                break;
            case valorVocalizacion >=75:
                this.valorVocalizacion=3;
                nuevoelemento= {
                    "paciente": "ANTONIO CALDERON LOPEZ",
                    "fecha": new Date(Date.now()),
                    "tipo": 'vocalizacion',
                    "color": 'red'
                };
                this.alertas.push(nuevoelemento);
                this.calcularPuntuacionFinal();
                break;
        }
    }

    this.calcularExpresionFacial=function(sad, angry, fearful, disgusted, neutral, happy){
        console.log(happy);
        switch (true){ 
            case ( ( neutral || happy) >=0.85):
                this.expresionFacial=0;
                this.calcularPuntuacionFinal();
                break;
            case ( 
                ((( sad || angry || fearful || disgusted) >0.1) &&  (( sad || angry || fearful || disgusted) <0.5))
                ||
                (((neutral || happy) >= 0.5) && ((neutral || happy) <= 0.85))
                ):
                this.expresionFacial=1;
                this.calcularPuntuacionFinal();
                break;
            case ( 
                ((( sad || angry || fearful || disgusted) >=0.5) &&  (( sad || angry || fearful || disgusted ) <0.85))
                ||
                (((neutral || happy) > 0.1) && ((neutral || happy) <= 0.5))
                ):
                this.expresionFacial=1;
                this.calcularPuntuacionFinal();
                break;
            case ( ( sad || angry || fearful || disgusted ) >=0.85):
                this.expresionFacial=3;
                nuevoelemento= {
                    "paciente": "ANTONIO CALDERON LOPEZ",
                    "fecha": new Date(Date.now()),
                    "tipo": 'expresionFacial',
                    "color": 'red'
                };
                this.alertas.push(nuevoelemento);
                this.calcularPuntuacionFinal();
                break;
            
                
        }
    }

    this.calcularCambiosFisicologicos= function(bpm){
        switch (true){
            case bpm < 60:
                this.cambiosFisicologicos=0;
                console.log(this.cambiosFisicologicos);
                this.calcularPuntuacionFinal();
                break;    
            case bpm >= 60 &&  bpm < 75:
                this.cambiosFisicologicos=1;
                console.log(this.cambiosFisicologicos);
                this.calcularPuntuacionFinal();
                break;
        
            case bpm >= 75 &&  bpm < 90:
                this.cambiosFisicologicos=2;
                console.log(this.cambiosFisicologicos);
                this.calcularPuntuacionFinal();
                break;
            case bpm >=90:
                this.cambiosFisicologicos=3;
                console.log(this.cambiosFisicologicos);
                nuevoelemento= {
                    "paciente": "ANTONIO CALDERON LOPEZ",
                    "fecha": new Date(Date.now()),
                    "tipo": 'cambiosFisicologicos',
                    "color": 'red'
                };
                this.alertas.push(nuevoelemento);
                this.calcularPuntuacionFinal();
                break;
        }
    }

    this.calcularCambiosLenguajeCorporal = function(){
        horaActual = Date.now();
        console.log("HORA ACTUAL" + horaActual);
        console.log("HOAR ULTIMO" + this.horaUltimoMov);
        tiempoPasado = (horaActual-this.horaUltimoMov)/1000;
        console.log("----------------------------TIEMPOPASADO" + tiempoPasado);
        switch (true){ 
            case ( (tiempoPasado > 10) && (tiempoPasado < 20) ):
                this.cambiosLenguajeCorporal=1;
                this.calcularPuntuacionFinal();
                break;
            case ( (tiempoPasado >= 20) && (tiempoPasado < 30) ):
                this.cambiosLenguajeCorporal=2;
                this.calcularPuntuacionFinal();
                break;
            case ( tiempoPasado >= 30 ):
                this.cambiosLenguajCorporal=3;
                nuevoelemento= {
                    "paciente": "ANTONIO CALDERON LOPEZ",
                    "fecha": new Date(Date.now()),
                    "tipo": 'cambiosLenguajeCorporal',
                    "color": 'red'
                };
                this.calcularPuntuacionFinal();
                break;
            default:
                this.cambiosLenguajeCorporal=0;
                this.calcularPuntuacionFinal();
        }
    }

    this.calcularPuntuacionFinal= async function(){
        console.log("VALORES FINALES--------------------")
        console.log("Vocalizacion" + this.vocalizacion);
        console.log("Expresion facial" + this.expresionFacial);
        console.log("Lenguaje corporal"+this.cambiosLenguajeCorporal);
        console.log("Cambios comportamiento" + this.cambiosComportamiento);
        console.log("cambiosFisicologicos" + this.cambiosFisicologicos);
        console.log("cambiosFisicos" + this.cambiosFisicos);
        var suma = this.vocalizacion+this.expresionFacial+this.cambiosLenguajeCorporal+this.cambiosComportamiento+this.cambiosFisicologicos+this.cambiosFisicos;
        this.puntuacionTotal=suma;
        console.log("Puntuacion final" + this.puntuacionTotal);
    }

}

module.exports.EscalaAbbey=EscalaAbbey;