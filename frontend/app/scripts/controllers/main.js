'use strict';

/**
 * @ngdoc function
 * @name mediamapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
  .controller('MainCtrl', function ($scope, Api, $http, $modal, notify, $routeParams, $location) {

    if ($routeParams.mapId) {
      Api.getMaps({id: $routeParams.mapId})
        .then(function(res) {
          $scope.map = res[0];
        });
    } else {
      $scope.map = {cards: []};
    }

    $scope.addToArray = function(id) {
      $scope.map.cards.push(id);
    };

    $scope.removeFromArray = function(id) {
      var index = $scope.map.cards.indexOf(id);
      $scope.map.cards.splice(index, 1);
    };


    //    $scope.order = 'NONE';

    $scope.cards = [];


    $http.post('/api/get-cards', {})
      .then(function(res) {
        var i, j, len, ref;
        ref = res.data;
        for (j = 0, len = ref.length; j < len; j++) {
          i = ref[j];
          i.Id = j;
          i.Label = i.name;
          $scope.cards.push(i);
        }
//        $scope.cardsO = $scope.cards;
      }, function(err) {
        console.error('error', err);
      });

    $scope.edit = function(card) {
      $location.path('/editProfile/' + card.id);
    };

    $scope.open = function(card) {
      console.log('open modal', card);
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'cardModal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          card: function () {
            return card;
          }
        }
      });
    };

    var saveMap = function() {
      var monthNames = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
      ];
      var date = new Date();
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      $scope.map.modified = year + '/' + monthNames[monthIndex] + '/'+ day;
      Api.whoami({}).then(
        function(res) {
          $scope.map.author = res.username;
          console.log($scope.map);
          Api.saveMap($scope.map)
            .then(function(res){
              console.log('saved', res);
              $scope.map.id = res.id;
              notify({message: 'Saved map ' + $scope.map.name + '!',
                      duration: 5000,
                      classes: 'alerta-fixed greencard'
                     });
            }, function(err) {
              console.error('error saving', err);
            });
        });
    };


    $scope.saveMap = function(){
      if (! $scope.map.name ) {
        notify({message: 'Name of map is required',
                classes: 'alert-danger alerta-fixed',
                duration: 15000});
        return null;
      } else {
        saveMap();
        $scope.saved = true;
        return true;
      }
    };

    $scope.aMisMapas = function() {
      $location.path('/my-maps');
    };

    $scope.aMapa = function(){
      if ($scope.map.id)
        $scope.saveMap();
        return $location.path('/map/' + $scope.map.id);
      if (! $scope.map.name)
        return notify({message: 'Name of map is required',
                       classes: 'alert-danger alerta-fixed',
                       duration: 15000});
      Api.getMaps({name: $scope.map.name})
        .then(function(maps) {
          if (! maps[0] )
            return notify({message: 'First save the map!',
                           classes: 'alert-danger alerta-fixed',
                           duration: 15000});
          return $location.path('/map/' + maps[0].id);
        });

    };

  })

  .controller('ModalInstanceCtrl', function($scope, $modalInstance, card) {
    $scope.card = card;
    $scope.ok = function () {
      $modalInstance.dismiss('chau');
    };
  })

  .filter('joinArray', function() {
    return function(a) {
      if (a) {
        if(Array.isArray(a)) {
            return a.join(', ')
        } else {
            return a;
        }
      } else {
        return '';
      }
    };
  });
