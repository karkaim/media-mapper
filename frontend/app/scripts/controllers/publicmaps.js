'use strict';

/**
 * @ngdoc function
 * @name mediamapApp.controller:AllmapsCtrl
 * @description
 * # AllmapsCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
  .controller('PublicMapsCtrl', function ($scope, Api, $location) {
    Api.getMaps().then(
      function(maps) {
        $scope.maps = maps;
      });

    $scope.aMapa = function(id){
      $location.path('/map/' + id);
    };
  });
