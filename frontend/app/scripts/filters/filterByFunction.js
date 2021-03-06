'use strict';

angular.module('mediamapApp')
  .filter('filterByFn', function () {
    return function(cards, position) {
      var card, n;
      if (! position || position === 'ALL') {
        return cards;
      } else {
        n = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = cards.length; i < len; i++) {
            card = cards[i];
            if (card.functions && card.functions.indexOf(position) >= 0) {
              results.push(card);
            }
          }
          return results;
        })();
        return n;
      }
    };
  });
