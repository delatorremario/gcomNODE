//service factory provider
app.factory('TurnosService', function ($http, socketFactory) {

	var TurnosService = {};

	TurnosService.turnos = {};

	TurnosService.listarTurnos = function () {
		return $http.get('/turnos').then(function (response) {
			angular.extend(TurnosService.turnos, response.data);
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
			return response;
			//delete TurnosService.turnos[idTurno];
		}, function (response) {
            return response.status;
        });
	}

	TurnosService.editarTurno = function (turno){
		return $http.put('/turnos/' + turno._id, turno).then(function (response) {
			return response;
			//angular.extend(TurnosService.turnos, response.data);
		}, function (response) {
            return response.status; 
        });
	}

	var socket = socketFactory();
	socket.on('altaModificacionPushTurno', function(data){
		angular.extend(TurnosService.turnos, data);
	});

	socket.on('bajaPushTurno', function(data){
		delete TurnosService.turnos[data._id];
	});

	return TurnosService;
});