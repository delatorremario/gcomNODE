
var app = angular.module ('app', ['ngRoute', 'btford.socket-io']);

app.config(function($httpProvider, $routeProvider){
	$httpProvider.defaults.headers.common = {'Content-Type': 'application/json'};
	$routeProvider.when('/turnos', {
		templateUrl: 'views/turnos.html',
		controller: 'TurnoCtrl',
		resolve: {
			turnos: function($q, TurnosService){
				
				var defer = $q.defer();
				
				TurnosService.listarTurnos().then(function(){
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