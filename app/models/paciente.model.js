module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
          nombre: String,
          fechaNacimiento: Date,
          sexo: String,
          contacto: String,
          fechaIngreso: Date,
          fechaAlta: Date,
          monitorizacion: Boolean,
          ingresado: Boolean
        },
        { timestamps: true }
      
  );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Paciente = mongoose.model("paciente", schema);
    return Paciente;
  };