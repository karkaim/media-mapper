'use strict';

angular.module('mediamapApp')
  .controller('ArrangeBarCtrl', function ($scope, Api, $location, orderByFilter) {
    Api.getCatalogo({tipo: 'territory'})
      .then(function(res){
        $scope.territories = {
          title: 'Emerging Markets',
          opts: [{tipo: 'territory', value: 'ALL'}].concat(orderByFilter(res,'value'))
        };
      });

    Api.getCatalogo({tipo: 'genre'})
      .then(function(res) {
        $scope.genres = {
          title: 'Category',
          opts: [{tipo: 'genre', value: 'ALL'}].concat(orderByFilter(res,'value'))
        };
      });

  //  Api.getCatalogo({tipo: 'storyline'})
  //    .then(function(res) {
  //      $scope.storylines = {
  //        title: 'Preference',
  //        opts: [{tipo: 'storyline', value: 'ALL'}].concat(orderByFilter(res,'value'))
  //      };
  //    });
      
    Api.getCatalogo({tipo: 'communities'})
      .then(function(res) {
        $scope.communities = {
          title: 'Communities',
          opts: [{tipo: 'communities', value: 'ALL'}].concat(orderByFilter(res,'value'))
        };
      });

    Api.getCatalogo({tipo: 'functions'})
      .then(function(res) {
        $scope.functions = {
          title: 'Functions',
          opts: [{tipo: 'functions', value: 'ALL'}].concat(orderByFilter(res,'value'))
        };
      });

    $scope.orders = {
      title: 'Order by',
      opts: [{value: 'None'}, {value: 'name'}, {value: 'rating'}, {value: 'territories'}, {value: 'story angles'}] //
    };

    $scope.noHome = $location.path() != '/home-admin';

  });
