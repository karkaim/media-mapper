'use strict';

angular.module('mediamapApp')
  .controller('FullCardCtrl',["$scope", "Api", "notify", "Instagram", "Facebook", "Twitter", function ($scope, Api, notify, instagram, facebook, twitter) {
    var img = $scope.card.img;
    $scope.moduleState = 'details';
    $scope.emailList = '';
    $scope.toggle = false;

    if (! img) {
      $scope.card.img = 'images/profile-img.png';
    }

    $scope.$on('socialClick', function(event, tab) {
      $scope.moduleState = 'social';
      $scope.socialState = tab;
      switch(tab){
        case 'instagram':
          instagram.feed().success(function (response) {
            $scope.feed = response.user.media.nodes;
          });
          break;
        case 'facebook':
          facebook.feed().then(function (response) {
            $scope.feed = response.data;
          });
          break;
        case 'twitter':
          twitter.feed().success(function (response) {
            $scope.feed = response;
          });
          break;
      }
    });

    $scope.getFlag = function (territory) {
        switch(territory) {
            case "Mexico":
                return "flag-mx";
            case "Southeast Asia":
                return "flag-sae";
            case "Pacific":
                return "flag-pac";
            case "Brasil":
                return "flag-br";
            case "India":
                return "flag-in";
            case "Korea":
                return "flag-kr";
            case "CHILE":
                return "flag-cl";
            case "ARGENTINA":
                return "flag-ar";
            case "THAILAND":
                return "flag-th";
            case "INDONESIA":
                return "flag-id";
            case "SINGAPORE":
                return "flag-sg";
            case "PHILLIPINES":
                return "flag-ph";
            case "SOCO":
                return "flag-soco";
            case "FRANCE":
                return "flag-fr";
        }
    }

    instagram.get().success(function(response) {
			$scope.instagram = response.user;
      $scope.card.instagram = response.user.followed_by.count;
      Api.upsertCard($scope.card);
    });

    facebook.get($scope.card.facebooklink).then(function(response) {
			$scope.facebook = response;
      $scope.card.facebook = Object.keys(response.insights.data[0].values[2].value).reduce(function (previous, key) {
        return previous + response.insights.data[0].values[2].value[key];
      }, 0)
      Api.upsertCard($scope.card);
    });

    twitter.get().success(function(response) {
			$scope.twitter = response;
      $scope.card.twitter = response.followers_count;
      Api.upsertCard($scope.card);
    });

    $scope.numberToK = function (num) {
      return num > 10000 ? (num/1000).toFixed(1) + 'K' : num;
    }

    $scope.download = function () {
        Api.downloadPdf($scope.card.id);
    }

    $scope.share = function () {
        $scope.toggle = !$scope.toggle;
    }

    $scope.send = function () {
        Api.sendProfile({card: $scope.card, emails: $scope.emailList}).then(
          function(res) {
            notify({message: 'Profile sent' + $scope.card.name,
                    duration: 5000,
                    classes: 'alerta-fixed greencard'
                   });
                   $scope.emailList = '';
            });
        $scope.toggle = !$scope.toggle;
    }
  }]);
