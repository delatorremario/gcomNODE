var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var turno = new Schema({
	cuando: {type : Date, required: true},
	duracionEstimada: {type : Number , required: true},
	descripcion : {type : String, required: true},
	activo: { type:Boolean, default:true},
	creado: { type: Date, default:Date.now},
	modificado: { type : Date, default: Date.now},
	inicia : { type: String, default:""},
	termina :{ type: String, default:""},
	hecho: { type:Boolean, default:false}

});

module.exports = mongoose.model('Turno',turno);
