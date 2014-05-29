module.exports = function (app){

	verListadoDeClientes = function (req,res){
		res.send("Listado de Clientes");
	}

	app.get('/clientes', verListadoDeClientes);
}