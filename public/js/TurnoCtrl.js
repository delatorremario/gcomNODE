var app = angular.module ('app',[]);

app.controller('TurnoCtrl', function ($scope,$http) {
	// body...
	$http.get('/falseDate/turno.json')
	//$http.get('/turnos')
		.success( function (data){
			$scope.turnos = data;
			//$scope.dpto = data[0].coddep;
			//$scope.cargarProv();
		});

});