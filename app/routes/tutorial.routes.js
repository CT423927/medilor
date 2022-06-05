module.exports = app => {
    const tutorials = require("../controllers/paciente.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", tutorials.create);
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
    // Retrieve a single Tutorial with id

    router.get("/pacientesMonitorizados", tutorials.findMonitorizados);
    
    router.get("/:id", tutorials.findOne);

    
    
    app.use('/api/tutorials', router);
 };