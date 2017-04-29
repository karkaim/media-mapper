'use strict';

/**
 * @ngdoc overview
 * @name mediamapApp
 * @description
 * # mediamapApp
 *
 * Main module of the application.
 */
angular
  .module('mediamapApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngDragDrop',
    'tagger',
    'ui.sortable',
    'ui.bootstrap',
    'angularjs-dropdown-multiselect',
    'cgNotify',
    'ngClipboard',
    'ngScrollbar',
  ])
  .config(function ($routeProvider, ngClipProvider, $httpProvider, $windowProvider) {
    $httpProvider.defaults.withCredentials = true;
    ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'NavigationCtrl',
        controllerAs: 'main'
      })
      .when('/cards', {
        templateUrl: 'views/cards.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/create-profile', {
        templateUrl: 'views/create-profile.html',
        controller: 'CreateProfileCtrl',
        controllerAs: 'main'
       })
      .when('/editProfile/:id', {
        templateUrl: 'views/create-profile.html',
        controller: 'CreateProfileCtrl'
      })
      .when('/media-profiles', {
        templateUrl: 'views/media-profiles.html',
        controller: 'NavigationCtrl'
      })
      .when('/media-maps', {
        templateUrl: 'views/media-maps.html',
        controller: 'NavigationCtrl'
      })
      .when('/my-maps', {
        templateUrl: 'views/my-maps.html',
        controller: 'MyMapsCtrl'
      })
      .when('/public-maps', {
        templateUrl: 'views/public-maps.html',
        controller: 'PublicMapsCtrl'
      })
      .when('/create-map', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/create-map/:mapId', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/map/:mapId', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/pdf-map/:mapId', {
        templateUrl: 'views/pdf-map.html',
        controller: 'MapCtrl'
      })
      .when('/home-admin', {
        templateUrl: 'views/home-admin.html',
        controller: 'NavigationCtrl'
      })
      .when('/admin-users', {
        templateUrl: 'views/admin-users.html',
        controller: 'UsersCtrl'
      })
      .when('/new-user', {
        templateUrl: 'views/admin-edit.html',
        controller: 'EditUserCtrl'
      })
      .when('/new-user/:userId', {
        templateUrl: 'views/admin-edit.html',
        controller: 'EditUserCtrl'
      })
      .when('/catalogo/:tipo', {
        templateUrl: 'views/catalogo.html',
        controller: 'CatalogoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

       $windowProvider.fbAsyncInit = function() {
          FB.init({
            appId: '1951133895108704',
            channelUrl: 'views/channel.html',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.9'
          });
      };

  (function (d) {
    var js,
    id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);
  }(document));
  })
  .directive('card', function() {
    return {
      templateUrl: 'views/templates/card.html',
      controller: 'CardCtrl',
      scope: {
        card: '=mycard'
      }
    };
  })
  .directive('arrangeBar', function() {
    return {
      templateUrl: 'views/templates/arrange-bar.html',
      controller: 'ArrangeBarCtrl'
    };
  })
  .directive('adminBar', function() {
    return {
      templateUrl: 'views/templates/admin-bar.html',
      controller: 'ArrangeBarCtrl'
    };
  })
  .directive('selectList', function() {
    return {
      templateUrl: 'views/templates/select-list.html',
      controller: 'SelectListCtrl',
      scope: {
        list: '=list',
        model: '=model',
        cambio: '=cambio',
        classes: '=classes'
      }
    };
  })
  .directive('fullCard', function() {
    return {
      templateUrl: 'views/templates/full-card.html',
      controller: 'FullCardCtrl',
      scope: {
        card: '=mycard'
      }
    };
  });
