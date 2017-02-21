'use strict';

describe('Controller: ArrangebarCtrl', function () {

  // load the controller's module
  beforeEach(module('mediamapApp'));

  var ArrangebarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArrangebarCtrl = $controller('ArrangebarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
