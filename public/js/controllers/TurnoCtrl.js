var app = angular.module('app');


app.controller('TurnoCtrl', function ($scope, TurnosService) {

	$scope.turnosService = TurnosService;
	$scope.turnos = $scope.turnosService.turnos;

	$scope.nuevoTurno = {};
	
	$scope.restantes = function(){
		var cuenta=0;
		var cantidad = 0;
		angular.forEach($scope.turnos,function(turno) {
			cuenta+=turno.hecho ? 0 : 1;
			cantidad++;
		});
		return "Faltan " + cuenta + " de " + cantidad;
	};

	$scope.agregarTurno = function () {
		$scope.turnosService.agregarTurno($scope.nuevoTurno).then(function(){
			$scope.nuevoTurno = {};
		}, function(status){
            $scope.status = status;			
		});
	}

	$scope.eliminarTurno= function (idTurno) {
		var turnoActual = $scope.turnos[idTurno];
		$scope.turnosService.eliminarTurno(idTurno).then(function(){
			$scope.mimensaje="Se eliminó el turno " + turnoActual._id + " :" + turnoActual.descripcion;
		}, function(status){
            $scope.status = status;			
		});
	}

	$scope.editarTurno = function (turno){
		$scope.turnosService.editarTurno(turno).then(function(){
			$scope.mimensaje = "Turno Editado " + turno.descripcion;
		}, function(status){
            $scope.status = status;			
		});
	}


});