'use strict';

/**
 * @ngdoc function
 * @name mediamapApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
  .controller('MapCtrl', function ($scope, $http, $routeParams, Api, $modal) {
    var map;

    $scope.mapId = $routeParams.mapId;
    $scope.mapUrl = '/map.html#/' + $scope.mapId;
    $scope.copyTooltip = 'link copied';

    Api.getMaps({id: $scope.mapId})
      .then(function(res) {
        map = res[0];
        console.log(map);
        $scope.title = map.name;
        Api.getCards({id: {$in: map.cards}})
          .then(function(cards) {
            $scope.cards = cards;
          });
        console.log('map', map);
      });

    $scope.print = function() {
      window.print();
    };


    $scope.open = function(card) {
      console.log('open');
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

    $scope.downloadPdf = function() {
      console.log('download pdf');
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'pdfModal.html',
        controller: 'PDFInstanceCtrl',
        resolve: {
          id: function () {
            return map.id;
          }
        }
      });
    };
  })

  .controller('PDFInstanceCtrl', function($scope, $http, $modalInstance, id) {
    $scope.id = id;

    $scope.ok = function() {
      $modalInstance.dismiss('chau');
    };

    $http.post('/api/pdf',
               {id: $scope.id})
      .then(function(res){
        $scope.pdfReady = true;
        console.log('ok1', res);
      }, function(err) {
        console.error('no', err);
      });
  });
