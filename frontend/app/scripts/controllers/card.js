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
    $scope.getFlag = function (territory) {
        switch(territory) {
            case "Mexico":
                return "flag-mx";
            case "Southeast Asia":
                return "flag-sae";
            case "Pacific":
                return "flag-pac";
            case "Brasil":
                return "flag-br";
            case "India":
                return "flag-in";
            case "Korea":
                return "flag-kr";
            case "CHILE":
                return "flag-cl";
            case "ARGENTINA":
                return "flag-ar";
            case "THAILAND":
                return "flag-th";
            case "INDONESIA":
                return "flag-id";
            case "SINGAPORE":
                return "flag-sg";
            case "PHILLIPINES":
                return "flag-ph";
            case "SOCO":
                return "flag-soco";
            case "FRANCE":
                return "flag-fr";
        }    
    }
  });
