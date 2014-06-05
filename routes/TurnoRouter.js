
module.exports = function(io){

	var router = require('express').Router();

	var Turno =  require('./../schemas/Turno');
	var _ = require('lodash');

	var moment = require('moment');
		moment('America/Argentina/Buenos_Aires').format();
	

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
 //
 var listarTurnosXfecha = function (req,res){
		
		var turnos = {};
		var start= moment(req.params.fecha);//new Date(req.params.fecha);// + "T00:00:00.000Z"); //  "2014-01-02T03:00:00.000Z");
		//console.log(start);
	/*
		Turno.find({
 		 		cuando: { $lte: start },
		 		 	hecho:false


 			}).exec(function (err,turnosArray){

			
			_.forEach(turnosArray, function(turno, key){
				turnos[turno.id] = turno;
			});

			
			if(!err) 
*/
				Turno.find({
					cuando: { $gte: start, $lte: start }
		 		 
		 			}).exec(function (err,turnosArray){

					
					_.forEach(turnosArray, function(turno, key){
						turnos[turno.id] = turno;
					});
					if(!err)
						res.send(turnos);
					else console.log("Error" + err);
				/*});
			else console.log("Error" + err);*/
		});

 		
		
		
}

var listarTurnosSinTerminarAnteriores = function (req,res){
			var end= moment();//new Date(req.params.fecha);// + "T00:00:00.000Z"); //  "2014-01-02T03:00:00.000Z");
	
		
			
/*		Turno.find({
					hecho: false,
 		 			cuando: { $lte: end }
 		 		}).exec(function (err,turnosArray){

				var turnos = {};
				_.forEach(turnosArray, function(turno, key){
					turnos[turno.id] = turno;
				});

			if(!err) res.send(turnos);
			else console.log("Error" + err); 
		  // do something with the array of posts
		});
*/


 		 Turno
			.find()
			.where('hecho').equals(false)
			.where('cuando').lte(end)
			.limit(10)
			.sort('-cuando')
			.exec(function (err,turnosArray){

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
		var f = moment(req.body.cuando ); //+ " " + req.body.hora );
		
		var turno = new Turno({
			cuando: f,
			//hora: '12:12' , //req.body.hora,
			duracionEstimada: req.body.duracionEstimada,
			descripcion : req.body.descripcion,
		});

		turno.save(function (err){
			if(!err){

			 console.log('Turno guardado!');
			// console.log(turno);
			}
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
			turno.hora = req.body.hora;
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
	router.get('/anteriores', listarTurnosSinTerminarAnteriores);
	router.get('/:fecha', listarTurnosXfecha);
	router.post('/',insertTurno);
	router.put('/:id',updateTurno);
	router.delete('/:id',deleteTurno);

	return router;

}