module.exports = function (app){

	var Turno =  require('./Turno');
	
	//get
	listarTurnos = function (req,res){
		
		Turno.find( function (err,turnos){
			if(!err) res.send(turnos);
			else console.log("Error" + err);
		});


	}

	//post
	insertTurno = function (req,res){
		console.log('POST');
		console.log(req.body);

		var turno = new Turno({
			cuando: req.body.cuando,
			duracionEstimada: req.body.duracionEstimada,
			descripcion : req.body.descripcion,
		});

		turno.save(function (err){
			if(!err) console.log('Turno guardado!');
			else console.log('Error al guardar el Turno:' + err);

		});

		res.send(turno);

	}


	app.get('/turnos', listarTurnos);
	app.post('/turnos',insertTurno);
}
