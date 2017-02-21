'use strict';

describe('Controller: AllmapsCtrl', function () {

  // load the controller's module
  beforeEach(module('mediamapApp'));

  var AllmapsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllmapsCtrl = $controller('AllmapsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AllmapsCtrl.awesomeThings.length).toBe(3);
  });
});
