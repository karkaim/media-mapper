'use strict';

/**
 * @ngdoc function
 * @name mediamapApp.controller:CardCtrl
 * @description
 * # CardCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
  .controller('CardCtrl', function ($scope) {
    var img = $scope.card.img;
    if (! img) {
      $scope.card.img = 'images/profile-img.png';
    }
  });
