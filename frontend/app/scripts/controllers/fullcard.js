'use strict';

angular.module('mediamapApp')
  .controller('FullCardCtrl',["$scope", "Api", "notify", "Instagram", "Facebook", "Twitter", function ($scope, Api, notify, instagram, facebook, twitter) {
    var img = $scope.card.img;
    $scope.moduleState = 'details';
    $scope.emailList = '';
    $scope.toggle = false;
    $scope.searchState =  'search';
    $scope.search =  { from : "", to: "", tags: "", summary: "", caption:""};

    if (! img) {
      $scope.card.img = 'images/profile-img.png';
    }

    $scope.$on('socialClick', function(event, tab) {
      $scope.searchState =  'search';
      $scope.moduleState = 'social';
      $scope.socialState = tab;
      switch(tab){
        case 'instagram':
          instagram.feed($scope.card.instagramlink).success(function (response) {
            $scope.feed = response.body.user.media.nodes;
          });
          break;
        case 'facebook':
          facebook.feed($scope.card.facebooklink).then(function (response) {
            $scope.feed = response.data;
          });
          break;
        case 'twitter':
          twitter.feed($scope.card.twitterlink, {}).success(function (response) {
            $scope.feed = response.body || {};
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

    instagram.get($scope.card.instagramlink).success(function(response) {
			$scope.instagram = response.body.user;
      $scope.card.instagram = response.body.user.followed_by.count;
      Api.upsertCard($scope.card);
    });

    facebook.get($scope.card.facebooklink).then(function(response) {
			$scope.facebook = response;
      $scope.card.facebook = Object.keys(response.insights.data[0].values[2].value).reduce(function (previous, key) {
        return previous + response.insights.data[0].values[2].value[key];
      }, 0)
      Api.upsertCard($scope.card);
    });

    twitter.get($scope.card.twitterlink).success(function(response) {
			$scope.twitter = response.body;
      $scope.card.twitter = response.body.followers_count;
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

    $scope.searchClick = function () {
       $scope.searchState = 'results';
      switch($scope.socialState){
        case 'instagram':
          instagram.search($scope.card.instagramlink, $scope.search).success(function (response) {
            var filtered = [];
            var summary = {likes: 0, comments: 0, count: 0};
            var nodes = response.body.user.media.nodes;
            var from = new Date($scope.search.from);
            var to = new Date($scope.search.to);
            var re = new RegExp( "(" + $scope.search.tags.split(" ").join("|") + ")");
            for (var node in nodes) {
                if (
                    (($scope.search.from.length  < 2 ) || (new Date(nodes[node].date * 1000) >= from))
                    && (($scope.search.to.length  < 2 ) || (new Date(nodes[node].date * 1000) <= to))
                   ) {

                  if (($scope.search.tags.length < 2) || (nodes[node].caption.match(re))) {
                    filtered.push(nodes[node]);
                    summary.count++;
                    summary.likes+= nodes[node].likes.count;
                    summary.comments+= nodes[node].comments.count;
                  }
                }
            }
            $scope.search.summary = summary;
            $scope.feed = filtered;
          });
          break;
        case 'facebook':
          //facebook.search($scope.card.facebooklink, $scope.search).then(function (response) {
          //  $scope.feed = response.data || {};
          //});
          break;
        case 'twitter':
          twitter.search($scope.card.twitterlink,  $scope.search).success(function (response) {
            var filtered = [];
            var summary = {likes: 0, comments: 0, count: 0};
            var nodes = response.body;
            var from = new Date($scope.search.from);
            var to = new Date($scope.search.to);
            var re = new RegExp( "(" + $scope.search.tags.split(" ").join("|") + ")");
            for (var node in nodes) {
                if (
                    (($scope.search.from.length  < 2 ) || (new Date(nodes[node].date * 1000) >= from))
                    && (($scope.search.to.length  < 2 ) || (new Date(nodes[node].date * 1000) <= to))
                   ) {

                  if (($scope.search.tags.length < 2) || (nodes[node].text.match(re))) {
                    filtered.push(nodes[node]);
                    summary.count++;
                    summary.likes+= nodes[node].favorite_count;
                    summary.comments+= nodes[node].retweet_count;
                  }
                }
            }
            $scope.search.summary = summary;
            $scope.feed = filtered;
          });
          break;
      }
    }
  }]);
