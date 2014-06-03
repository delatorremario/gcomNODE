
var app = angular.module ('app', ['ngRoute', 'btford.socket-io','angularMoment']);

app.run(function(amMoment) {
    amMoment.changeLanguage('es');
});

app.config(function($httpProvider, $routeProvider){
	var fecha = moment().format('YYYY-MM-DD');
	$httpProvider.defaults.headers.common = {'Content-Type': 'application/json'};
	
	$routeProvider.when('/turnos', {
		templateUrl: 'views/turnos.html',
		controller: 'TurnoCtrl',
		resolve: {
			turnos: function($q, TurnosService){
				
				var defer = $q.defer();
				
				TurnosService.listarTurnosXfecha(fecha).then(function(){
					defer.resolve();
				}, function(){
					defer.reject();
				});
				
				return defer.promise;
			}
		}
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.otherwise({redirectTo: '/turnos'});
});