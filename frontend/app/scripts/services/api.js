'use strict';

/**
 * @ngdoc service
 * @name mediamapApp.Api
 * @description
 * # Api
 * Service in the mediamapApp.
 */
angular.module('mediamapApp')
  .factory('Api', ["$http", "$q", "notify", "$window", function ($http, $q, notify, $window) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var host = '';
    return {
      get: function(path, params) {
        console.log('get', path, params);
        return $http.post(host + path, params)
          .then(
            function(res) {
              console.log(res);
              return res.data;
            },
            function(err) {
              return $q.reject(err);
            });
      },
      getCards: function(params) {
        return $http.post(host + '/api/get-cards', params)
          .then(
            function(res) {
              return res.data;
            },
            function(err) {
              return $q.reject(err);
            });
      },
      deleteCard: function(params) {
        return $http.post(host + '/api/delete-card', params)
          .then(
            function(res) {
              return res.data;
            },
            function(err) {
              return $q.reject(err);
            });
      },
      getCatalogo: function(params) {
        return $http.post(host + '/api/catalogo', params)
          .then(
            function(res) {
              return res.data;
            },
            function(err) {
              return $q.reject(err);
            });
      },
      upsertCatalogo: function(params) {
        return $http.post(host + '/api/upsert-catalogo', params)
          .then(
            function(res) {
              return res.data;
            }, function(err) {
              return $q.reject(err);
            });
      },
      deleteCatalogo: function(params) {
        return $http.post(host + '/api/delete-catalogo', params)
          .then(
            function(res) {
              return res.data;
            }, function(err) {
              return $q.reject(err);
            });
      },
      getMaps: function(params) {
        return $http.post(host + '/api/get-maps', params)
          .then(
            function(res) {
              return res.data;
            },
            function(err) {
              return $q.reject(err);
            });
      },
      saveMap: function(params) {
        return $http.post(host + '/api/upsert-map', params)
          .then(
            function(res) {
              return res.data;
            },
            function(err) {
              return $q.reject(err);
            });
      },
      deleteMap: function(params) {
        return $http.post(host + '/api/delete-map', params)
          .then(
            function(res) {
              return res.data;
            },
            function(err) {
              return $q.reject(err);
            });
      },
      uploadFile: function(file) {
        var fd = new FormData();
        fd.append('file', file);
        return $http.post(host + '/api/file', fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        })
          .success(function(res){
            console.log('result of upload', res);
            return res;
          })
          .error(function(err){
            console.error('error on upload', err);
          });
      },
      upsertCard: function(card){
        return $http.post(host + '/api/upsert-card', card)
          .then(function(res) {
            console.log(res);
            return res;
          }, function(err) {
            console.log('error guardando:', err);
          });
      },
      getUsers: function(param) {
        return $http.post(host + '/api/users', param)
          .then(function(res) {
            return res;
          }, function(err) {
            return err;
          });
      },
      downloadPdf: function(param) {
        $window.open(host + '/api/profile/download?id=' + param);
      },
      sendProfile: function(param) {
        return $http.post(host + '/api/profile/send', param)
          .then(function(res) {
            return res;
          }, function(err) {
            return err;
          });
      },
      upsertUser: function(user){
        return $http.post(host + '/api/create-user', user)
          .then(function(res) {
            return res;
          }, function(err) {
            return err;
          });
      },
      deleteUser: function(user){
        return $http.post(host + '/api/delete-user', user)
          .then(function(res) {
            return res;
          }, function(err) {
            return err;
          });
      },
      whoami: function(params) {
        return $http.post(host + '/whoami', params)
          .then(
            function(res) {
              return res.data;
            },
            function(err) {
              return $q.reject(err);
            });
      }
    };
  }]);
