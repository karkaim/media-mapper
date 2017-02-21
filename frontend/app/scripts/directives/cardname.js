'use strict';

angular.module('mediamapApp')
  .directive('cardName', function ($q, $timeout, $http, notify) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        return ctrl.$asyncValidators.configname = function(modelValue, viewValue){
          var def;
          if (ctrl.$isEmpty(modelValue)) {
            return $q.when();
          }
          def = $q.defer();
          var data = {name: modelValue};
          if (scope.card.id) {
            data.id = {$ne: scope.card.id};
          }
          $http.post('/api/get-cards',
                     data)
            .then(function(res) {
              if (res.data[0]) {
                console.log('error de nombre', res.data[0]);
                notify({message: 'El nombre de usuario ya existe', classes: 'alert-danger alerta-fixed', duration: 3000000});
                return def.reject();
              } else {
                return def.resolve();}
            }, function(err) {
              console.error('error getting cards', err);
              return def.resolve();
            });
          return def.promise;
        };
      }
    };
  });
