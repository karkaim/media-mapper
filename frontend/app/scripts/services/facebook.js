'use strict';

angular.module('mediamapApp')
.factory('Facebook', ['$http','$q',
	function($http, $q) {
		return {
			'get': function (facebooklink) {
          var deferred = $q.defer();
          FB.api(
            '/' + facebooklink,
            'GET',
            {"fields":"about,engagement,fan_count,talking_about_count,insights.metric(page_fans_country){values},picture.type(large),name"},
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
      'feed': function (facebooklink) {
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
      'search': function (facebooklink, search) {
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
      }
		};
	}
]);
