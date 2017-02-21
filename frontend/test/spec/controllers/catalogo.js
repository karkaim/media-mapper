'use strict';

describe('Controller: CatalogoCtrl', function () {

  // load the controller's module
  beforeEach(module('mediamapApp'));

  var CatalogoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CatalogoCtrl = $controller('CatalogoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
