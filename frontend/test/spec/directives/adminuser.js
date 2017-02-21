'use strict';

describe('Directive: adminUser', function () {

  // load the directive's module
  beforeEach(module('mediamapApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<admin-user></admin-user>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the adminUser directive');
  }));
});
