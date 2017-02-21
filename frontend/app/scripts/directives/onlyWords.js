'use strict';

angular.module('mediamapApp')
  .directive('onlyWords', function ($parse) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var onlyWords = function(inputValue) {
          if (inputValue === void 0) {
            inputValue = '';
          }
          onlyWords = inputValue.toUpperCase().replace('Á', 'A').replace('É', 'E').replace('Í', 'I').replace('Ó', 'O').replace('Ú', 'U').replace(/[^A-Z ]+/, '');
          if (onlyWords !== inputValue) {
            modelCtrl.$setViewValue(onlyWords);
            modelCtrl.$render();
          }
          return onlyWords;
        };
        modelCtrl.$parsers.push(onlyWords);
        return onlyWords($parse(attrs.ngModel)(scope));

      }
    };
  });
