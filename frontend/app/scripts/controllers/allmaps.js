'use strict';

/**
 * @ngdoc function
 * @name mediamapApp.controller:AllmapsCtrl
 * @description
 * # AllmapsCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
  .controller('AllMapsCtrl', function ($scope, Api) {
    Api.getMaps({author: whoami}).then(
      function(maps) {
        $scope.maps = maps;
      });
  });
