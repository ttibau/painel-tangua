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

.controller('novoComunicadoCtrl', ['$scope', '$stateParams', '$firebaseArray', '$http', '$ionicLoading',
function ($scope, $stateParams, $firebaseArray, $http, $ionicLoading) {

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
      $scope.imagem = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });

    // PRECISO DESCOBRIR EM QUE MOMENTO ELE INICIARÁ IONICLOADING...
    $ionicLoading.show({
      template: 'Enviando imagem p/ servidor'
    });

    $http({
      url: 'https://api.imgur.com/3/image',
      authorization: '92fe4e9a9655805',
      method: 'POST',
      data: {
        image: $scope.imagem
      }
    })
      .success(function(data){
        console.log(data);
        $ionicLoading.hide();
      })
      .error(function(error){
        console.log(error);
        $ionicLoading.hide();
      });

  };

  $scope.adicionarComunicado = function(titulo, autor, corpo){
    $ionicLoading.show({
      template: "Enviando dados..."
    });
    var date = new Date();
    var dia = date.getDate();
    var mes = date.getMonth();
    var ano = date.getFullYear();
    var data = dia + '/' + (mes++) + '/' + ano;
    console.log(titulo, autor, corpo);
    $scope.comunicados.$add({
      autor: autor,
      data: data,
      corpo: corpo,
      titulo: titulo
    }).then(function(response){
      // APÓS O ENVIO, SERÁ CHAMADO UM MODAL INFORMANDO O SUCESSO OU ERRO E VOLTARÁ PARA A TELA DE COMUNICADOS
      console.log(response);
      $ionicLoading.hide();
    });
  };

}])

.controller('principalCtrl', ['$scope', '$stateParams', '$ionicPopup', function ($scope, $stateParams, $ionicPopup) {

  $ionicPopup.alert({
    title: 'Atenção',
    template: "Selecione a opção e lembre-se de que os dados incluidos ou alterados são de <strong> sua </strong> responsabilidade."
  })

}])

.controller('onibusCtrl', ['$scope', '$ionicPopup', '$firebaseArray', function($scope, $ionicPopup, $firebaseArray){

  var ref = new Firebase('https://transporte-tangua.firebaseio.com/');
  $scope.buses = $firebaseArray(ref.child('onibus'));

  console.log($scope.buses);

}])

.controller('representantesCtrl', function($scope){

})
