'use strict';

/**
 * @ngdoc directive
 * @name mediamapApp.directive:adminUser
 * @description
 * # adminUser
 */
angular.module('mediamapApp')
  .directive('adminUsername', function ($q, $timeout, Api) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        return ctrl.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
          var def;
          if (ctrl.$isEmpty(modelValue)) {
            return $q.when();
          }
          def = $q.defer();
          var data = {username: modelValue};
          if (scope.user.id) {
            data.id = {$ne: scope.user.id};
          };
          Api.getUsers(data)
            .then(function(res) {
              if (res.data[0]) {
                return def.reject();
              } else {
                return def.resolve();
              }}, function(err) {
                console.error('error getting users', err);
                return def.resolve();
              });
          return def.promise;
        };
      }};
  })

  .directive('adminEmail', function ($q, $timeout, Api) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        return ctrl.$asyncValidators.uniqueEmail = function(modelValue, viewValue) {
          console.log('check-email');
          var def;
          if (ctrl.$isEmpty(modelValue)) {
            return $q.when();
          }
          def = $q.defer();
          var data = {email: modelValue};
          if (scope.user.id) {
            data.id = {$ne: scope.user.id};
          };
          Api.getUsers(data)
            .then(function(res) {
              console.log('res', res);
              if (res.data[0]) {
                return def.reject();
              } else {
                return def.resolve();
              }}, function(err) {
                console.error('error getting users', err);
                return def.resolve();
              });
          return def.promise;
        };
      }};
  });
