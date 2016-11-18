angular.module('app.controllers', [])

.controller('entrarCtrl', ['$scope', '$stateParams', '$http', '$firebaseAuth', '$location',
function ($scope, $stateParams, $http, $firebaseAuth, $location) {

  var ref = new Firebase('https://transporte-tangua.firebaseio.com/');
  var Auth = $firebaseAuth(ref);

  console.log(Auth);
  $scope.vaiporra = function(email, password){

    $location.path('/principal');

  };

}])

.controller('comunicadosCtrl', ['$scope', '$stateParams', '$firebaseArray',
function ($scope, $stateParams, $firebaseArray) {

  var ref = new Firebase('https://transporte-tangua.firebaseio.com/');
  $scope.comunicados = $firebaseArray(ref.child('comunicados'));
  console.log($scope.comunicados);

}])

.controller('novoComunicadoCtrl', ['$scope', '$stateParams', '$firebaseArray',
function ($scope, $stateParams, $firebaseArray) {

  var ref = new Firebase('https://transporte-tangua.firebaseio.com/');
  $scope.comunicados = $firebaseArray(ref.child('comunicados'));

  $scope.adicionarComunicado = function(titulo, data, autor, mensagem){
    console.log(titulo, data, autor, mensagem);
    $scope.comunicados.$add({
      autor: autor,
      data: data,
      corpo: mensagem,
      titulo: titulo
    });
  };

}])

.controller('principalCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
