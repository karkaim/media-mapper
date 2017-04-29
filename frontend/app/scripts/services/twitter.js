'use strict';

angular.module('mediamapApp')
.factory('Twitter', ['$http',
	function($http) {
		var base = "https://api.instagram.com/v1";
		return {
			'get': function() {
      var url = 'twitter.json';
				var config = {
					'params': {
			//			'client_id': clientId,
					//	'count': count,
						'callback': 'JSON_CALLBACK'
					}
				};
				return $http.get(url);
			},
      'feed': function () {
        var url = 'twitter-feed.json';
        return $http.get(url);
      }
		};
	}
]);
