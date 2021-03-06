//service factory provider
app.factory('TurnosService', function ($http, socketFactory) {

	var TurnosService = {};

	TurnosService.turnosCompleto={};
	TurnosService.turnosRecientes = {};
	TurnosService.turnosXdia={};
	TurnosService.turnosSinTerminar={}
	
	TurnosService.listarTurnosInicio = function()
	{

		TurnosService.turnosSinTerminar = TurnosService.listarTurnosSinTerminarAnteriores();
		var fecha = moment().format('YYYY-MM-DD');
		return TurnosService.listarTurnosXfecha(fecha);

	}

TurnosService.listarTurnosSinTerminarAnteriores = function () {
		

		return $http.get('/turnos/anteriores').then(function (response) {
				//TurnosService.turnos = angular.copy(response.data)
			//angular.copy(response.data, TurnosService.turnos) ;
			angular.copy(response.data, TurnosService.turnosSinTerminar) ;
			//TurnosService.turnos = response.data;

        }, function (response) {
            return response.status;
        });
	}


	TurnosService.listarTurnosXfecha = function (fecha) {
		return $http.get('/turnos/'+ fecha).then(function (response) {
				//TurnosService.turnos = angular.copy(response.data)
			//angular.copy(response.data, TurnosService.turnos) ;
			angular.copy(response.data, TurnosService.turnosXdia) ;
			//TurnosService.turnos = response.data;

        }, function (response) {
            return response.status;
        });
	}

	TurnosService.listarTurnosCompleto = function () {
		return $http.get('/turnos').then(function (response) {
			angular.copy(response.data, TurnosService.turnosCompleto) ;
        }, function (response) {
            return response.status;
        });
	}

	TurnosService.agregarTurno = function (turno) {
		return $http.post('/turnos', turno).then(function (response) {
			return response;
			//angular.extend(TurnosService.turnos, response.data);
		}, function (response) {
            return response.status; 
        });
	}

	TurnosService.eliminarTurno= function (idTurno) {
		return $http.delete('/turnos/' + idTurno).then(function (response) {
			TurnosService.turnosSinTerminar = TurnosService.listarTurnosSinTerminarAnteriores ();
			return response;
			//delete TurnosService.turnos[idTurno];
		}, function (response) {
            return response.status;
        });
	}

	TurnosService.editarTurno = function (turno){
		return $http.put('/turnos/' + turno._id, turno).then(function (response) {
			TurnosService.turnosSinTerminar = TurnosService.listarTurnosSinTerminarAnteriores ();
			return response;
			//angular.extend(TurnosService.turnos, response.data);
		}, function (response) {
            return response.status; 
        });
	}

	var socket = socketFactory();
	socket.on('altaModificacionPushTurno', function(data){
			angular.extend(TurnosService.turnosXdia, data);
	});

	socket.on('bajaPushTurno', function(data){
		delete TurnosService.turnosXdia[data._id];
		
	});

	return TurnosService;
});