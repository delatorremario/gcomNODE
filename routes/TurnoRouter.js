
module.exports = function(io){

	var router = require('express').Router();

	var Turno =  require('./../schemas/Turno');
	var _ = require('lodash');
		
	//get
	var listarTurnos = function (req,res){
		
		Turno.find( function (err,turnosArray){

			var turnos = {};
			_.forEach(turnosArray, function(turno, key){
				turnos[turno.id] = turno;
			});

			if(!err) res.send(turnos);
			else console.log("Error" + err);
			
		});


	}

	//post
	var insertTurno = function (req,res){
		console.log('POST');
		console.log(req.body);
		var fecha =  new Date(req.body.cuando);
			console.log (fecha);
		var turno = new Turno({
			cuando: fecha,
			duracionEstimada: req.body.duracionEstimada,
			descripcion : req.body.descripcion,
		});

		turno.save(function (err){
			if(!err) console.log('Turno guardado!');
			else console.log('Error al guardar el Turno:' + err);
			
			var retorno = {};
			retorno[turno.id] = turno;

			io.emit('altaModificacionPushTurno', retorno);
			
		});

		var retorno = {};
		retorno[turno.id] = turno;
		res.send(retorno);

	}

	//PUT

	var updateTurno = function (req,res){
		Turno.findById(req.params.id,function ( err,turno){
			turno.modificado = Date.now();
			turno.cuando= req.body.cuando;
			turno.duracionEstimada= req.body.duracionEstimada;
			turno.descripcion= req.body.descripcion;
			turno.hecho= req.body.hecho;


			turno.save(function(err){
				if(!err) console.log('Turno actualizado');
				else console.log('Error:' + err);

				var retorno = {};
				retorno[turno.id] = turno;

				io.emit('altaModificacionPushTurno', retorno);
			});

			var retorno = {};
			retorno[turno.id] = turno;
			res.send(retorno);
		});
	}

	var deleteTurno = function(req,res){
		Turno.findById(req.params.id,function ( err,turno){
			turno.remove(function (err){
				if(!err) console.log('Turno borrado:' + turno.descripcion);
				else console.log('Error:' + err);
				io.emit('bajaPushTurno', turno);
			});

			var retorno = {};
			retorno[turno.id] = turno;
			res.send(retorno);
		});
	}

	router.get('/', listarTurnos);
	router.post('/',insertTurno);
	router.put('/:id',updateTurno);
	router.delete('/:id',deleteTurno);

	return router;

}