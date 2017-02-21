'use strict';

angular.module('mediamapApp')
  .filter('filterByStory', function () {
    return function(cards, story) {
      var card, n;
      if (! story || story === 'ALL') {
        return cards;
      } else {
        n = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = cards.length; i < len; i++) {
            card = cards[i];
            if (card.storylines && card.storylines.indexOf(story) >= 0) {
              results.push(card);
            }
          }
          return results;
        })();
        return n;
      }
    };
  });
