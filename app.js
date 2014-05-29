"use strict";

var express = require('express');
var app = express();
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/gcomNODE_db', function (err){
	if(err) console.log('ERROR conectando la db: ' + err);
	else console.log('Base de datos conectada');
});


app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));

});


app.get('/',function (req,res){
	console.log("Estan llamando al raiz");
	res.sendfile('./public/index.html');
});



require('./routes/TurnoRouter')(app);
//require('./routes/ClienteRouter')(app);

app.listen(8080,function (){
	console.log("La magia de Vector Vimana");
});