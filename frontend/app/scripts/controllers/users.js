'use strict';

angular.module('mediamapApp')
  .controller('UsersCtrl', function ($scope, $location, $modal, Api) {
    $scope.goNewClient = function() {$location.path('/new-user');};
    Api.getUsers({})
      .then(function(res) {
        $scope.users = res.data;
      });
    $scope.editUser = function(userId) {
      $location.path('/new-user/' + userId);
    };

    $scope.deleteUser = function(user) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'delete-user-modal.html',
        controller: 'deleteUserModalCtrl',
        resolve: {
          user: function () {
            return user;
          }
        }
      });

      modalInstance.result.then(function (deletedItem) {
        Api.getUsers({})
          .then(function(res) {
            $scope.users = res.data;
          });
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };
  })

  .controller('deleteUserModalCtrl', function ($scope, $modalInstance, Api, user) {
    $scope.user = user;
    $scope.delete = function() {
      console.log('delete', $scope.user);
      Api.deleteUser($scope.user)
        .then(function(res){
          console.log('deleted', res);
          $modalInstance.close($scope.user);
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
