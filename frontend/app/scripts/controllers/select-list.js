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
    $scope.list = {
      opts: [
        {name: 'hola'},
        {name: 'mundo'}
      ],
      title: 'test'
    };
  });
