'use strict';

angular.module('mediamapApp')
.factory('Facebook', ['$http','$q',
	function($http, $q) {
		return {
			'get': function (facebooklink) {
          var deferred = $q.defer();
          FB.api(
            '/' + facebooklink + '/feed',
            'GET',
            {"fields":"attachments,message,likes.limit(1).summary(true)"},
            function(response) {
              if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
              }
            });

            return deferred.promise;
			},
      // facebook hashtag search is not allowed anymore.
      // curl -i -X GET \ "https://graph.facebook.com/v2.9/ZazilAbrahamFP/feed?access_token=EAACEdEose0cBAH9QXK3HHbsz2gIlJ3WxsfQOd61e1TdTqLuhbLYoLw5HajiGKrHm7yH7JPZCZBvis3uDTYZBZBEd4PFzPZAuHrru6UhfUwIWL2scv5YEtmm5qJyKM3rFrcb4pb9wXeO1jRD47PIL5nj39wmtGn0JPizfxyZB5v2pGJ8pI1un4zShMEh21TSh8ZD"
      'feed': function () {
        var url = 'facebook-feed.json';
        return $http.get(url);
      }
		};
	}
]);
