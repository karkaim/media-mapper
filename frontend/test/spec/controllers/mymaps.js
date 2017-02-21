'use strict';

describe('Controller: MymapsCtrl', function () {

  // load the controller's module
  beforeEach(module('mediamapApp'));

  var MymapsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MymapsCtrl = $controller('MymapsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MymapsCtrl.awesomeThings.length).toBe(3);
  });
});
