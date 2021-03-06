'use strict';

angular.module('mediamapApp')
  .controller('EditProfileCtrl', function ($scope, $routeParams, $http, $location) {
    $scope.showRating = true;
    $scope.setRating = function(r) {
      if ( r === 'R' )
        r = '';
      $scope.card.rating = r;
      $scope.showRating = !$scope.showRating;
    };
      $http.post('/api/get-cards', {id: $routeParams.id})
      .then(function(res){
        if(!res.data[0]){
          $location.path('/');
        } else {
          $scope.card = res.data[0];
          console.log('card', $scope.card);
        }
      }, function(err) {
        console.error('unable to get card', err);
      });

    $scope.clickUploadFile = function() {
      document.getElementById('imgup').click();
    };

    function el(id){return document.getElementById(id);} // Get elem by ID

    $scope.fileNameChanged = function() {
      var t = el('imgup');
      var FR = new FileReader();
      FR.onload = function(e) {
        $scope.card.img = 'url(' + e.target.result + ')';
        $scope.$apply();
      };
      console.log('this', t);
      FR.readAsDataURL( t.files[0] );
    };

    $scope.genres = [
      'Business corporate',
      'Fashion & lifestyle',
      'Football',
      'Running',
      'Olympic innovations/athletes',
      'Training & lifestyle',
      'Sneaker culture',
      'Sustainability'
    ];

    $scope.territories = [
      'Korea',
      'Brasil',
      'SoCo',
      'Pacific',
      'India',
      'Mexico'
    ];

    $scope.list1 = {title: 'AngularJS - Drag Me'};
    $scope.list2 = {};

    $scope.options = [
      "Text", "Markdown", "HTML", "PHP", "Python",
      "Java", "JavaScript", "Ruby", "VHDL",
      "Verilog", "C#", "C/C++"];

    $scope.saveCard = function() {
      console.log('guardando');
      if ($scope.card.rating === '') {
        delete $scope.card.rating;
      };
      if ($scope.card.position) {
        $scope.card.position = $scope.card.position
          .match(/[^,]+/g)
          .map(function(e){return e.trim();});
      }
      var img = $scope.card.img;
      console.log('img', img.length);
      //        delete $scope.card.img
      $http.post('/api/upsert-card', $scope.card)
        .then(function(res) {
          alert('saved result');
          $scope.card = {img: 'url(../images/profile-img.png)', medias: [], rating: ''};
        }, function(err) {
          console.log('error guardando:', err);
        });
    };
  });
