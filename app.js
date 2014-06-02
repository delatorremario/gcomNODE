"use strict";

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gcomNODE_db', function (err){
	if(err) return console.log('ERROR conectando la db: ' + err);
	console.log('Base de datos conectada');

	var express = require('express');
	var http = require('http');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var app = express();

	app.use(bodyParser());
	app.use(methodOverride());
	app.use(express.static('public'));

	var server = http.createServer(app).listen(8080, function (){
		console.log("La magia de Vector Vimana");
	});
	var io = require("socket.io")(server);

	app.use('/turnos', require('./routes/TurnoRouter')(io));
	//app.use('/turnos', require('routes/TurnoRouter'));
	//app.use('/turnos', require('routes/TurnoRouter'));

});