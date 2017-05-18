'use strict';

angular.module('mediamapApp')
  .controller('CatalogoCtrl', function ($scope, $routeParams, $modal, Api) {
    switch ($routeParams.tipo) {
    case 'territories':
      $scope.tipo = 'territory';
      break;
    case 'categories':
      $scope.tipo = 'genre';
      $scope.tipostr = 'categories';
      break;
    case 'storyAngles':
      $scope.tipo = 'storyline';
      $scope.tipostr = 'initiatives';
      break;
    case 'functions':
      $scope.tipo = 'functions';
      $scope.tipostr = 'functions';
      break;
    case 'communities':
      $scope.tipo = 'communities';
      $scope.tipostr = 'communities';
      break;
    };
    $scope.new = {tipo: $scope.tipo};

    Api.getCatalogo({tipo: $scope.tipo})
      .then(function(res) {
        console.log(res);
        $scope.items = res;
      });

    $scope.createNew = function() {
      $scope.createActivated = true;
    };

    $scope.cancelNew = function() {
      $scope.createActivated = false;
      $scope.new = {tipo: $scope.tipo};
    };

    $scope.saveItem = function(){
      if ( $scope.newItem.$invalid)
        return console.log('problema guardando');
      $scope.new.value = $scope.new.value.toUpperCase();
      return Api.upsertCatalogo($scope.new)
        .then(function(res) {
          $scope.new = {tipo: $scope.tipo};
          $scope.createActivated = false;
          Api.getCatalogo({tipo: $scope.tipo})
            .then(function(res) {
              console.log(res);
              return $scope.items = res;
            });
        });
    };

    $scope.delete = function(item) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'delete-modal.html',
        controller: 'deleteModalCtrl',
        resolve: {
          item: function () {
            return item;
          }
        }
      });

      modalInstance.result.then(function (deletedItem) {
        Api.getCatalogo({tipo: $scope.tipo})
          .then(function(res) {
            console.log('nuevos items', res);
            return $scope.items = res;
          });
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

  })

  .controller('deleteModalCtrl', function ($scope, $modalInstance, Api, item) {
    $scope.item = item;
    $scope.delete = function() {
      console.log('delete', $scope.item);
      Api.deleteCatalogo($scope.item)
        .then(function(res){
          console.log('deleted', res);
          $modalInstance.close($scope.item);
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
