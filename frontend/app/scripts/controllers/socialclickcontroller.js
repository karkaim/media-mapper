'use strict';

/**
 * @ngdoc function
 * @name mediamapApp.controller:SocialClickController
 * @description
 * # CardCtrl
 * Controller of the mediamapApp
 */
angular.module('mediamapApp')
.controller('SocialClickController', function ($scope) {
  $scope.class = 'social-click';
  $scope.search =  { since : "", until: "", tags: "", summary: ""};
  $scope.moduleState =  'search';
  $scope.openTab = function openTab(tab) {
    $scope.$emit('socialClick', tab);
     //if ($scope.class === "social-click") {
      jQuery('.modal-dialog, .modal-content').css('width', '700px');
    jQuery('.modal-dialog, .modal-content').css('margin-top', '100px');
      var _this = jQuery(".social-click");
      _this.addClass("social-clicked");
      _this.removeClass("social-click");

     //}
  }
  $scope.search = function () {
    $scope.searchState = 'results';
  }
});
