'use strict';

angular.module('mediamapApp')
  .controller('EditUserCtrl', function ($scope, $routeParams, Api, notify, $location, fileReader) {
    $scope.user = {};
    $scope.clickUploadFile = function() {
      document.getElementById('imgup').click();
    };
    $scope.$watch('myFile', function(nuevo) {
      if (nuevo) {
        console.log('new file', nuevo);

        fileReader.readAsDataUrl($scope.myFile, $scope)
          .then(function(result) {
            console.log('res', result);
            var i = new Image();
            i.src = result;
            return $scope.user.img = result;
          });
      }
    });
    if ( $routeParams.userId )
      Api.getUsers({id: $routeParams.userId})
      .then(function(res) {
        if (! res.data[0])
          return $location.path('/admin-users');
        $scope.user = res.data[0];
        $scope.user.password = 'notapassword';
        return $scope.user.confirmPass = 'notapassword';
      }, function(err) {
        console.error('err');
      });

    $scope.save = function(){
      if ( $scope.newUser.$invalid) {
        console.log('invalid form');
        return $scope.newUser.$setSubmitted(true);
      } else {
        delete $scope.user.confirmPass;
        if ($scope.user.password === 'notapassword')
          delete $scope.user.password;
        if ($scope.myFile) {
          var file = $scope.myFile;
          Api.uploadFile(file)
            .then(function(r) {
              console.log('img', r.data.img);
              $scope.user.img = r.data.img;
              console.log('user to upload', $scope.user);
              return Api.upsertUser($scope.user)
                .then(function(res) {
                  notify({message: 'user created',
                          duration: 5000,
                          classes: 'alerta-fixed greencard'
                         });
                  return $location.path('/admin-users');
                });
            });
        } else {
          return Api.upsertUser($scope.user)
            .then(function(res) {
              notify({message: 'user created',
                      duration: 5000,
                      classes: 'alerta-fixed greencard'
                     });
              return $location.path('/admin-users');
            });
        };
      };
    };
  });
