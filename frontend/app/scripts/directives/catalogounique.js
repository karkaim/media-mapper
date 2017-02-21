'use strict';

/**
 * @ngdoc directive
 * @name mediamapApp.directive:catalogoUnique
 * @description
 * # catalogoUnique
 */
angular.module('mediamapApp')
  .directive('catalogoUnique', function ($q, $timeout, Api) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        return ctrl.$asyncValidators.catalogoUnique = function(modelValue, viewValue) {
          var def;
          if (ctrl.$isEmpty(modelValue))
            return $q.when();
          def = $q.defer();
          var data = {value: modelValue, tipo: scope.tipo};
          Api.getCatalogo(data)
            .then(function(res) {
              console.log('res', res, data);
              if (res.length > 0)
                return def.reject();
              return def.resolve();
            }, function (err) {
              console.error('error getting catalogo', err);
              return def.resolve();
            });
          return def.promise;
        };
      }
    };
  });
