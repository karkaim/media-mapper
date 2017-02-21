'use strict';

describe('Filter: customOrder', function () {

  // load the filter's module
  beforeEach(module('mediamapApp'));

  // initialize a new instance of the filter before each test
  var customOrder;
  beforeEach(inject(function ($filter) {
    customOrder = $filter('customOrder');
  }));

  it('should return the input prefixed with "customOrder filter:"', function () {
    var text = 'angularjs';
    expect(customOrder(text)).toBe('customOrder filter: ' + text);
  });

});
