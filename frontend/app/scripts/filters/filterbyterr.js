'use strict';

angular.module('mediamapApp')
  .filter('filterByTerr', function () {
    return function(cards, terr) {
      var card, n;
      if (! terr || terr === 'ALL') {
        return cards;
      } else {
        n = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = cards.length; i < len; i++) {
            card = cards[i];
            if (card.territories && card.territories.indexOf(terr) >= 0) {
              results.push(card);
            }
          }
          return results;
        })();
        return n;
      }
    };
  });
