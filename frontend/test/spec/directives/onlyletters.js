'use strict';

describe('Directive: onlyletters', function () {

  // load the directive's module
  beforeEach(module('mediamapApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<onlyletters></onlyletters>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the onlyletters directive');
  }));
});
