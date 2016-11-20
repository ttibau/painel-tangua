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

  $scope.capturaImagem = function(){

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });


  };

  $scope.adicionarComunicado = function(titulo, data, autor, mensagem){
    var date = new Date();
    var dia = date.getDate();
    var mes = date.getMonth();
    var ano = date.getFullYear();
    var data = dia + '/' + (mes++) + '/' + ano;
    console.log(data);
    console.log(titulo, autor, mensagem);
    $scope.comunicados.$add({
      autor: autor,
      data: data,
      corpo: mensagem,
      titulo: titulo
    });
  };

}])

.controller('principalCtrl', ['$scope', '$stateParams', '$ionicPopup', function ($scope, $stateParams, $ionicPopup) {

  $ionicPopup.alert({
    title: 'Atenção',
    template: "Selecione a opção e lembre-se de que os dados incluidos ou alterados são de <strong> sua </strong> responsabilidade."
  })

}])

.controller('onibusCtrl', ['$scope', '$ionicPopup', function($scope, $ionicPopup){



}])

.controller('representantesCtrl', function($scope){

})
