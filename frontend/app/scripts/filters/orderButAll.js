'use strict';

angular.module('mediamapApp')
  .filter('orderButAll', function (orderByFilter) {
    return function(collection, key) {
      var all = collection.splice(collection.indexOf('ALL'),1);
      var ords = orderByFilter(collection,key);
      ords.unshift(all);
      return ords;
    };
});
