var app = angular.module ('app',[]);


app.controller('TurnoCtrl', function ($scope,$http) {
	// body...
	//$http.get('/falseDate/turno.json')
	

		$http.get('/turnos')
		.success( function (data){
			$scope.turnos = data;
			//$scope.dpto = data[0].coddep;
			//$scope.cargarProv();
		});

	inicio = function(){
		$http.get('/turnos')
		.success( function (data){
			$scope.turnos = data;
			//$scope.dpto = data[0].coddep;
			//$scope.cargarProv();
		});

	}
	
	$scope.restantes= function(){
		var cuenta=0;
		angular.forEach($scope.turnos,function(turno) {
			cuenta+=turno.hecho ? 0 : 1
		});
		return cuenta;
	};

	$scope.agregarTurno = function () {

		var turno = {
						cuando:$scope.textoCuando,
						duracionEstimada:$scope.textoDuracion,
						descripcion:$scope.textoDesc
					}

		$http({
            url: '/turnos',
            method: "POST",
            data: turno,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
                //$scope.mimensaje = data; // assign  $scope.persons here as promise is resolved here 
                		/*$scope.turnos.push(turno);
						*/
						$scope.textoCuando = '';
						$scope.textoDuracion = '';
						$scope.textoDesc = '';
						inicio();

            }).error(function (data, status, headers, config) {
                $scope.status = status;
                //$scope.mimensaje =  status; 
            });
	}

	$scope.eliminarTurno= function (turno) {
		
		var index = $scope.turnos.indexOf(turno);
		$scope.turnos.splice(index,1);
		$scope.mimensaje="Se eliminó el turno " + index + " :" + turno.descripcion;
		
		$http({
            url: '/turnos/' + turno._id,
            method: "DELETE",
            //data: turnojs,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
                $scope.mimensaje = "Turno Editado" ;// + turno._id;
				

            }).error(function (data, status, headers, config) {
                $scope.status = status;
                //$scope.mimensaje =  status; 
            });

	}

	$scope.editarTurno = function (turno){
		//$scope.editar=false;
		//$scope.mimensaje="editar el turno " + turno._id;
		var turnojs = {

						cuando:turno.cuando,
						duracionEstimada:turno.duracionEstimada,
						descripcion:turno.descripcion,
						hecho:turno.hecho
					  }
		$http({
            url: '/turnos/' + turno._id,
            method: "PUT",
            data: turnojs,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
                $scope.mimensaje = "Turno Editado" ;// + turno._id;
				

            }).error(function (data, status, headers, config) {
                $scope.status = status;
                //$scope.mimensaje =  status; 
            });


	}


});