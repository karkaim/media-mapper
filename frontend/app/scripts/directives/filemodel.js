'use strict';

/**
 * @ngdoc directive
 * @name mediamapApp.directive:fileModel
 * @description
 * # fileModel
 */
angular.module('mediamapApp')
  .directive('fileModel', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        console.log('model', modelSetter);
        console.log('scope', scope);
        console.log('element', element[0].files);


        element.bind('change', function(){
          scope.$apply(function(){
            console.log('changed!', element[0].files[0]);
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  });
