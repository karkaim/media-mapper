'use strict';

describe('Directive: catalogoUnique', function () {

  // load the directive's module
  beforeEach(module('mediamapApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<catalogo-unique></catalogo-unique>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the catalogoUnique directive');
  }));
});
