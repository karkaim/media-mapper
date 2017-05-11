'use strict';

angular.module('mediamapApp')
.factory('Twitter', ['$http',
	function($http) {
		var base = "/api/twitter-user?username=";
		return {
			'get': function(twitterlink) {
      var url = base + twitterlink;
				var config = {
					'params': {
			//			'client_id': clientId,
					//	'count': count,
					//	'callback': 'JSON_CALLBACK'
					}
				};
				return $http.get(url);
			},
      'feed': function (twitterlink) {
        var url = '/api/twitter-timeline?username=' + twitterlink;
        return $http.get(url);
      },
      'search': function (twitterlink, search) {
        var url = '/api/twitter-search?username=' + twitterlink
            + 'from=' + search.from + 'to=' + search.to + '&hashtags=' + search.tags;
        return $http.get(url);
      }

		};
	}
]);
