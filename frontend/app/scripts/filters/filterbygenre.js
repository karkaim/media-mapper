'use strict';

angular.module('mediamapApp')
  .filter('filterByGenre', function () {
    return function(cards, genre) {
      var card, n;
      if (! genre || genre === 'ALL') {
        return cards;
      } else {
        n = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = cards.length; i < len; i++) {
            card = cards[i];
            if (card.genres && card.genres.indexOf(genre) >= 0) {
              results.push(card);
            }
          }
          return results;
        })();
        return n;
      }
    };
  });
