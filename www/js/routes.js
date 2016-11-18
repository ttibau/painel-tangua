angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('entrar', {
    url: '/entrar',
    templateUrl: 'templates/entrar.html',
    controller: 'entrarCtrl'
  })

  .state('comunicados', {
    url: '/comunicados',
    templateUrl: 'templates/comunicados.html',
    controller: 'comunicadosCtrl'
  })

  .state('novoComunicado', {
    url: '/novo-comunicado',
    templateUrl: 'templates/novoComunicado.html',
    controller: 'novoComunicadoCtrl'
  })

  .state('principal', {
    url: '/principal',
    templateUrl: 'templates/principal.html',
    controller: 'principalCtrl'
  })

$urlRouterProvider.otherwise('/entrar')

  

});