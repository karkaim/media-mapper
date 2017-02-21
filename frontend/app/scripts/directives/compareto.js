'use strict';

/**
 * @ngdoc directive
 * @name mediamapApp.directive:compareTo
 * @description
 * # compareTo
 */
angular.module('mediamapApp')
  .directive('compareTo', function () {
    return {
      require: 'ngModel',
      scope: {
            otherModelValue: "=compareTo"
      },
      link: function (scope, element, attrs, ngModel) {
        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  });
