'use strict';
// patz.mooo.com
/**
 * @ngdoc function
 * @name mediamapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
  .controller('CreateProfileCtrl', function ($scope, $http, notify, Api, fileReader, $location, $routeParams, $modal) {
    if ($routeParams.id) {
      $http.post('/api/get-cards', {id: $routeParams.id})
        .then(function(res){
          if(!res.data[0]){
            $location.path('/');
          } else {
            $scope.card = res.data[0];
            console.log('card', $scope.card);
          }
        }, function(err) {
          console.error('unable to get card', err);
        });
    } else {
      $scope.card = {rating: '', storylines: []};
    }

    $scope.$watch('myFile', function(nuevo) {
      if (nuevo) {
        console.log('new file', nuevo);

        fileReader.readAsDataUrl($scope.myFile, $scope)
          .then(function(result) {
            console.log('res', result);
            var i = new Image();
            i.src = result;
          //  if (i.width != i.height )
          //    return notify({message: 'image must be square (eg. 400h x 400w pixels)',
          //                   duration: 5000,
          //                   classes: 'alert-danger alerta-fixed'
          //                  });
            return $scope.card.img = result;
          });
      }
    });

    function el(id){return document.getElementById(id);} // Get elem by ID

    $scope.clickUploadFile = function() {
      el('imgup').click();
    };

    $scope.uploadImg = function() {
      console.log('le file', $scope.myFile);
      var file = $scope.myFile;
      Api.uploadFile(file)
        .then(function(r) {
          console.log('img', r.data.img);
          $scope.card.img = r.data.img;
        });
    };

    $scope.showRating = true;

    $scope.setRating = function(r) {
      if ( r === 'R' )
        r = '';
      $scope.card.rating = r;
      $scope.showRating = !$scope.showRating;
    };

    Api.getCatalogo({tipo: 'media'})
      .then(function(res) {
        $scope.options = res.map(
          function(e) {
            return e.value;
          });
      });

    Api.getCatalogo({tipo: 'position'})
      .then(function(res) {
        $scope.positions = res.map(
          function(e) {
            return e.value;
          });
      });

    Api.getCatalogo({tipo: 'communities'})
      .then(function(res) {
        $scope.communities = res.map(
          function(e) {
            return e.value;
          });
      });

    Api.getCatalogo({tipo: 'functions'})
      .then(function(res) {
        $scope.functions = res.map(
          function(e) {
            return e.value;
          });
      });

    Api.getCatalogo({tipo: 'genre'})
      .then(function(res) {
        $scope.genres = res.map(
          function(e) {
            return e.value;
          });
      });

    Api.getCatalogo({tipo: 'territory'})
      .then(function(res) {
        $scope.territories = res.map(
          function(e) {
            return e.value;
          });
        console.log('territories', $scope.territories);
      });

    Api.getCatalogo({tipo: 'storyline'})
      .then(function(res) {
        console.log('storylines', res);
        $scope.listx = res.map(
          function(e){
            return e.value;
          });
      });

    $scope.$watchGroup(['territories', 'genres', 'positions'], function(newValues, oldValues, scope) {
      setTimeout(function (){
        $('select').selectpicker('refresh');
      }, 500);
    });

    $scope.toCards = function() {
      $location.path('/cards');
    };

    $scope.saveCard = function() {
      if ($scope.card.rating === '' ) {
        delete $scope.card.rating;
      };
      if ($scope.card.positions && typeof($scope.card.positions) == 'string') {
        $scope.card.positions = $scope.card.positions
          .match(/[^,]+/g)
          .map(function(e){return e.trim();});
      }
      if ($scope.card.medias  && typeof($scope.card.medias) == 'string' ) {
        $scope.card.medias = $scope.card.medias
          .match(/[^,]+/g)
          .map(function(e){return e.trim();});
      }
      if ($scope.myFile) {
        console.log('a guardar imagen');
        var file = $scope.myFile;
        Api.uploadFile(file)
          .then(function(r) {
            console.log('img', r.data.img);
            $scope.card.img = r.data.img;
            console.log('card to upload', $scope.card);
            Api.upsertCard($scope.card).then(
              function(res) {
                notify({message: 'saved profile ' + $scope.card.name,
                        duration: 5000,
                        classes: 'alerta-fixed greencard'
                       });
                $scope.card = {rating: '', storylines: []};});
          });
      } else {
        Api.upsertCard($scope.card).then(
          function(res) {
            notify({message: 'saved profile ' + $scope.card.name,
                    duration: 5000,
                    classes: 'alerta-fixed greencard'
                   });
            //$scope.card = {medias: [], rating: ''};
            });
      }
    };

    $scope.delete = function(card) {
      console.log('delete', card);

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'delete-card.html',
        controller: 'deleteCardCtrl',
        resolve: {
          card: function () {
            return card;
          }
        }
      });

      modalInstance.result.then(function (deletedItem) {
        $location.path('/cards');
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };
  })

  .controller('deleteCardCtrl', function ($scope, $modalInstance, Api, card) {
    console.log('modal card', card);
    $scope.card = card;
    $scope.delete = function() {
      console.log('delete', $scope.card);
      Api.deleteCard($scope.card)
        .then(function(res){
          console.log('deleted', res);
          $modalInstance.close($scope.card);
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
