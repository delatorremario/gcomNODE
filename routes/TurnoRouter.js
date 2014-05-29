module.exports = function (app){

	var Turno =  require('./../schemas/Turno');
	
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

	//PUT

	updateTurno = function (req,res){
		Turno.findById(req.params.id,function ( err,turno){
				turno.modificado = Date.now();
				turno.cuando= req.body.cuando;
				turno.duracionEstimada= req.body.duracionEstimada;
				turno.descripcion= req.body.descripcion;
				turno.hecho= req.body.hecho;


				turno.save(function(err){
					if(!err) console.log('Turno actualizado');
					else console.log('Error:' + err);
				});
				res.send(turno);
		});
	}

	deleteTurno = function(req,res){
		Turno.findById(req.params.id,function ( err,turno){
			turno.remove(function (err){
				if(!err) console.log('Turno borrado:' + turno.descripcion);
				else console.log('Error:' + err);
			});
		});
	}

	app.get('/turnos', listarTurnos);
	app.post('/turnos',insertTurno);
	app.put('/turnos/:id',updateTurno);
	app.delete('/turnos/:id',deleteTurno);
}
