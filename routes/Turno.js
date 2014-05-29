var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var turno = new Schema({
	cuando: String,
	duracionEstimada: String,
	descripcion : String,
	activo: { type:Boolean, default:true},
	creado: { type: Date, default:Date.now},
	modificado: { type : Date, default: Date.now},
	inicia : { type: String, default:""},
	termina :{ type: String, default:""}

});

module.exports = mongoose.model('Turno',turno);
