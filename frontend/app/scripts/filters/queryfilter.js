'use strict';

angular.module('mediamapApp')
  .filter('queryFilter', function () {
    return function (cards, query) {
      var re = [];
      if (! query) {
        query = '';
      }
      angular.forEach(cards, function(c) {
        var cCampos = c.name + "!!" + c.storylines + "!!" + c.medias + "!!" + c.Notes + "!!" + c.territories + "!!" + c['personal_interests'];
        if (cCampos.toLowerCase().match(query.toLowerCase())) {
          re.push(c);
        }
      });
      return re;
    };
  });
