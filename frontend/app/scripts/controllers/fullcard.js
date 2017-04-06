'use strict';

angular.module('mediamapApp')
  .controller('FullCardCtrl',["$scope", "Api", "notify", function ($scope, Api, notify) {
    var img = $scope.card.img;
    $scope.emailList = '';
    $scope.toggle = false;
    if (! img) {
      $scope.card.img = 'images/profile-img.png';
    }
    
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
