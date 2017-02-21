'use strict';

/**
 * @ngdoc function
 * @name mediamapApp.controller:MymapsCtrl
 * @description
 * # MymapsCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
  .controller('MyMapsCtrl', function ($scope, $location, $modal, Api) {
    var getMyMaps = function() {
      Api.whoami().then(
        function(res) {
          var whoami = res.username;
          Api.getMaps({author: whoami}).then(
            function(maps) {
              $scope.maps = maps;
            });
        });
    };

    getMyMaps();

    $scope.aMapa = function(id){
      $location.path('/map/' + id);
    };

    $scope.aEditMapa = function(id) {
      $location.path('/create-map/' + id);
    };


    $scope.deleteMap = function(mapa) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'confirm.html',
        controller: 'ModalDeleteCtrl',
        size: 'sm',
        resolve: {
          mapa: function () {
            return mapa;
          }
        }
      });

      modalInstance.result.then(
        function(mapa){
          Api.deleteMap({id: mapa}).then(
            function(res) {
              getMyMaps();
            });
        },
        function() {
          console.log('cancel');
        });

    };

  })

  .controller('ModalDeleteCtrl', function ($scope, $modalInstance, $route, mapa, Api) {
    $scope.confirmDelete = function() {
      console.log('delete', mapa);
      $modalInstance.close(mapa);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
