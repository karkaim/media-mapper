'use strict';

describe('Controller: FullcardCtrl', function () {

  // load the controller's module
  beforeEach(module('mediamapApp'));

  var FullcardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FullcardCtrl = $controller('FullcardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
