'use strict';

/**
 * @ngdoc function
 * @name mediamapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
  .controller('SelectListCtrl', function ($scope) {

    $scope.setVal = function(e) {
      console.log('nuevo', e);
      $scope.model = e;
    };
  });
