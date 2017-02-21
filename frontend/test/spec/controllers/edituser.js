'use strict';

describe('Controller: EdituserctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('mediamapApp'));

  var EdituserctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EdituserctrlCtrl = $controller('EdituserctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
