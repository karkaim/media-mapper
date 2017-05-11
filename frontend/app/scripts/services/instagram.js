'use strict';
//https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code
//http://your-redirect-uri?code=CODE
//https://api.instagram.com/v1/users/{user-id}/?access_token=ACCESS-TOKEN
angular.module('mediamapApp')
.factory('Instagram', ['$http',
	function($http) {
		var base = "https://api.instagram.com/v1";
		// get your own client id http://instagram.com/developer/
   // var instagramToken = '3822793732.630e1e4.47bc774afc2c469db2fe12b06ceefce5';// localStorage.getItem('instagramToken');
 //   if(!instagramToken) {
 //     $window.open('https://api.instagram.com/oauth/authorize/?client_id=630e1e4434814e9ca706ca332f4a3532&redirect_uri=http://localhost:3000/instagram-token&response_type=code');
 //     return {};
 //   }
		return {
			'get': function(instagramlink) {
          var url = '/api/instagram-user?username=' + instagramlink;

				return $http.get(url);
      },
      'feed': function (instagramlink) {
        var url = '/api/instagram-user?username=' + instagramlink;
        return $http.get(url);
      },
      'search': function (instagramlink, search) {
        var url = '/api/instagram-user?username=' + instagramlink;
        return $http.get(url);
      }
		};
	}
]);
