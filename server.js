const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
var corsOptions = {
  origin: "https://medilor.herokuapp.com"
};

app.options('*', cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use(cors());
app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



var algoritmo=require("./algoritmo.js");
var escalaAbbey = new algoritmo.EscalaAbbey();

// simple route
const db = require("./app/models");
const { json } = require("express/lib/response");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
      console.log(db);
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  app.use(express.static(__dirname + '/cliente/dist/deteccion-dolor'));

app.get("/", function(request,response){
    var contenido=fs.readFileSync(__dirname+"/cliente/dist/deteccion-dolor/index.html");
    //var nick=request.user.email;
    //var res=juego.agregarJugador(nick);
    //var res={nick:request.user.email};
    response.setHeader("Content-type","text/html");
    response.send(contenido);
});

// set port, listen for requests
require("./app/routes/tutorial.routes")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.post("/vocalizacionManual", (req, res) => {
  console.log();
  escalaAbbey.setVocalizacion(req.body.valorVocalizacion.vocalizacion);
  res.send({resultado: escalaAbbey.puntuacionTotal});
});

app.post("/facialManual", (req, res) => {
  console.log(req.body.valorExpresionFacial.expresionFacial);
  escalaAbbey.setExpresionFacial(req.body.valorExpresionFacial.expresionFacial);
  res.send({resultado: escalaAbbey.puntuacionTotal});
});

app.post("/lenguajeCorporalManual", (req, res) => {
  console.log(req.body.valorLenguajeCorporal.lenguajeCorporal);
  escalaAbbey.setLenguajeCorporal(req.body.valorLenguajeCorporal.lenguajeCorporal);
  res.send({resultado: escalaAbbey.puntuacionTotal});
});

app.post("/cambiosComportamiento", (req, res) => {
  console.log("-------"+req.body.cambioComportamiento.cambioComportamiento);
  escalaAbbey.setCambiosDeComportamiento(req.body.cambioComportamiento.cambioComportamiento);
  res.send({resultado: escalaAbbey.puntuacionTotal});
  
});

app.post("/fisiologicosManual", (req, res) => {
  console.log("fisiologicosManualBODY" + req.body.valorCambiosFisiologicos);
  escalaAbbey.setCambiosFisicologicos(req.body.valorCambiosFisiologicos);
  res.send({resultado: escalaAbbey.puntuacionTotal});
});

app.post("/cambiosFisicos", (req, res) => {
  escalaAbbey.setCambiosFisicos(req.body.cambioFisico.cambioFisico);
  console.log(req.body.cambioFisico.cambioFisico);
  res.send({resultado: escalaAbbey.puntuacionTotal});
});

app.post("/emociones", (req, res) => {
  console.log("LLAMADA /EMOCIONES");
  escalaAbbey.calcularExpresionFacial(
    req.body.sad,
    req.body.angry,
    req.body.fearful,
    req.body.disgusted,
    req.body.neutral,
    req.body.happy);
    res.send({"res":"OK"});
});

app.post("/cambiosLenguajeCorporal", (req, res) => {
  console.log("LLAMADA CAMBIOS LENGUAJE CORPORAL AUTO");
  if(escalaAbbey.manualActivadoCambiosLenguajeCorporal==false){
    console.log("Movimioento-----------------");
    if(req.body.data!=1){
      console.log("ENTRAAAAAAAAAAAAAAA")
      escalaAbbey.horaUltimoMov=Date.now();
    } else{
      escalaAbbey.calcularCambiosLenguajeCorporal();
    }
  }
  res.send({"res":"OK"});
});

app.post("/vocalizacion", (req, res) => {
  console.log("LLAMADA vocalizacion AUTO");
  console.log(req.body);
  escalaAbbey.calcularVolacizacion(req.body);
  
  res.send({"res":"OK"});
});

app.post("/cambiosFisicologicos", (req, res) => {
  console.log("LLAMADA cambiosFisicologicos AUTO");
  console.log(req.body.rate);
  escalaAbbey.ritmoCardiaco=req.body.rate;
  console.log("------------- ritmo ------------" + escalaAbbey.ritmoCardiaco);
  escalaAbbey.calcularCambiosFisicologicos(req.body.rate);
  
  
  res.send({"res":"OK"});
});

app.post("/manualActivadoCambiosFisicologicos", (req, res) => {
  console.log("manualActivadoCambiosFisicologicos");
  if(req.body.bool==true){
    escalaAbbey.manualActivadoCambiosFisicologicos=true;
  } else{
    escalaAbbey.manualActivadoCambiosFisicologicos=false;
  }
  res.send({"res":"OK"});
});

app.post("/manualActivadoCambiosLenguajeCorporal", (req, res) => {
  console.log("manualActivadoCambiosFisicologicos");
  if(req.body.bool==true){
    escalaAbbey.manualActivadoCambiosLenguajeCorporal=true;
  } else {
    console.log("PASA manualActivadoCambiosLenguajeCorporal false");
    escalaAbbey.manualActivadoCambiosLenguajeCorporal=false;
  }
  res.send({"res":"OK"});
});

app.get("/obtenerVocalizacion", (req, res) => {
  if(escalaAbbey){
    let vocalizacion=escalaAbbey.vocalizacion;
    res.send(vocalizacion.toString());
  }
});

app.get("/obtenerRitmoCardiaco", (req, res) => {
  if(escalaAbbey){
    let lpm=escalaAbbey.ritmoCardiaco;
    res.send(lpm.toString());
  }

});

app.get("/obtenerExpresionFacial", (req, res) => {
  if(escalaAbbey){
    let expresionFacial=escalaAbbey.expresionFacial;
    res.send(expresionFacial.toString());
  }

});

app.get("/obtenerLenguajeCorporal", (req, res) => {
  if(escalaAbbey){
    let lenguajeCorporal=escalaAbbey.cambiosLenguajeCorporal;
    res.send(lenguajeCorporal.toString());
  }

});

app.get("/obtenerFisiologicos", (req, res) => {
  if(escalaAbbey){
    let cambiosFisiologicos=escalaAbbey.cambiosFisicologicos;
    res.send(cambiosFisiologicos.toString());
  }
});

app.get("/obtenerPuntuaciones", (req, res) => {
  if(escalaAbbey){
    res.send(JSON.stringify({vocalizacion:escalaAbbey.vocalizacion,
      expresionFacial:escalaAbbey.expresionFacial,
      cambiosLenguajeCorporal:escalaAbbey.cambiosLenguajeCorporal,
      cambiosComportamiento:escalaAbbey.cambiosComportamiento,
      cambiosFisicologicos:escalaAbbey.cambiosFisicologicos,
      cambiosFisicos:escalaAbbey.cambiosFisicos,
      puntuacionTotal:escalaAbbey.puntuacionTotal}));
  }
});


app.get("/obtenerPuntuacionFinal", (req, res) => {
  if(escalaAbbey){
    console.log(escalaAbbey.puntuacionTotal.toString());
    res.send(escalaAbbey.puntuacionTotal.toString());
  }
});

app.get("/obtenerAlertas", (req, res) => {
  if(escalaAbbey){
    console.log(escalaAbbey.alertas);
    res.send(escalaAbbey.alertas);
  }
});