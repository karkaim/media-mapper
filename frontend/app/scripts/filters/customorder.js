'use strict';

angular.module('mediamapApp')
  .filter('customOrder', function (orderByFilter) {
    return  function(cards, key) {
      if (key === 'story angles') {
        key = 'storylines';
      }
      var ords = orderByFilter(cards,key);
      if (key === 'rating') {
        return ords.reverse();
      }
      return ords;
    };
});
