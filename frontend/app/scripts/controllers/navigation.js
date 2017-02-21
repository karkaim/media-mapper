'use strict';

/**
 * @ngdoc function
 * @name navi.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
  .controller('NavigationCtrl', function ($location, $scope, Api) {

    $scope.goMaps = function(){$location.path("media-maps");};

    $scope.goProfiles = function(){$location.path("media-profiles");};

    $scope.goCreateProfile = function(){$location.path("create-profile");};

    $scope.goCards = function(){$location.path("cards");};

    $scope.goMyMaps = function(){$location.path("my-maps");};

    $scope.goPublicMaps = function(){$location.path("public-maps");};

    $scope.goCreateMap = function(){$location.path("create-map");};

    $scope.goAdminUser = function(){$location.path("admin-users");};

    $scope.editCatalogo = function(type) {$location.path('/catalogo/' + type);};

    Api.whoami({})
      .then(function(res) {
        $scope.user = res;
      });

  });
