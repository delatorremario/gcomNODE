var app = angular.module('app');


app.controller('TurnoCtrl', function ($scope, TurnosService) {

	moment.lang('es', {
	    calendar : {
	        lastDay : '[Ayer] dddd DD',
	        sameDay : '[HOY] dddd DD [de] MMMM',
	        nextDay : '[Mañana] dddd DD',
	        lastWeek : '[El Pasado] DD [de] MMMM',
        	nextWeek : 'dddd DD [de] MMMM',
	        sameElse : 'LL'
	    }
	});




	$scope.turnosService = TurnosService;
	//$scope.turnos = TurnosService.turnos;
	$scope.turnosXdia =TurnosService.turnosXdia;
	$scope.turnosRecientes = TurnosService.turnosRecientes;
	$scope.nuevoTurno = {};
	$scope.nuevoTurno.cuando = moment();

//	$scope.DisplayFechaTurnos=$scope.nuevoTurno.cuando.format("YYYY-MM-DD");

	
	$scope.sumarUnDia =function()
	{
		//fechaDelTurno.add('days', 1).calendar();
		$scope.nuevoTurno.cuando.add('days', 1);// = fechaDelTurno.calendar(); 
		verTurnoDelDia();
	}
	$scope.restarUnDia =function()
	{
		$scope.nuevoTurno.cuando.subtract('days', 1);
		verTurnoDelDia();
		//$scope.DisplayFechaTurnos =  fechaDelTurno.calendar(); 
	}

	var verTurnoDelDia = function(){
			var fecha = $scope.nuevoTurno.cuando;
			//$scope.turnos={};
			//$scope.DisplayFechaTurnos=$scope.nuevoTurno.cuando.format("YYYY-MM-DD");
			//$scope.turnos={};
			$scope.turnosService.listarTurnosXfecha(fecha.format('YYYY-MM-DD'));
			
		}

	$scope.restantes = function(){
		var cuenta=0;
		var cantidad = 0;
		angular.forEach($scope.turnosXdia,function(turno) {
			cuenta+=turno.hecho ? 0 : 1;
			cantidad++;
		});
		return "Faltan " + cuenta + " de " + cantidad;
	};

	

	$scope.agregarTurno = function () {
		var fecha = $scope.nuevoTurno.cuando;
		$scope.nuevoTurno.cuando = fecha.format('YYYY-MM-DD');
		$scope.turnosService.agregarTurno($scope.nuevoTurno).then(function(){
			//if($scope.nuevoTurno.cuando==fecha)
			//	$scope.mimensaje=fecha;
			$scope.nuevoTurno = {cuando:fecha};
		}, function(status){
            $scope.status = status;			
		});
	}

	$scope.eliminarTurno= function (idTurno) {
		var turnoActual = $scope.turnosDelDia[idTurno];
		$scope.turnosService.eliminarTurno(idTurno).then(function(){
			$scope.mimensaje="Se eliminó el turno "  + turnoActual.descripcion;
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