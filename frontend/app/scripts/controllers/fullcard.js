'use strict';

angular.module('mediamapApp')
  .controller('FullCardCtrl', function ($scope) {
    var img = $scope.card.img;
    if (! img) {
      $scope.card.img = 'images/profile-img.png';
    }
  });
