'use strict';

angular.module('mediamapApp')
  .directive('onlynumbers', function ($parse) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var onlynumbers = function(inputValue){
          if (inputValue === void 0) {
            inputValue = '';
          }
          onlynumbers = inputValue.replace(/[^0-9]/, '');
          if (onlynumbers !== inputValue) {
            modelCtrl.$setViewValue(onlynumbers);
            modelCtrl.$render();
          }
          return onlynumbers;
        };
        modelCtrl.$parsers.push(onlynumbers);
        return onlynumbers($parse(attrs.ngModel)(scope));
      }
    };
  });
