'use strict';

describe('Filter: queryFilter', function () {

  // load the filter's module
  beforeEach(module('mediamapApp'));

  // initialize a new instance of the filter before each test
  var queryFilter;
  beforeEach(inject(function ($filter) {
    queryFilter = $filter('queryFilter');
  }));

  it('should return the input prefixed with "queryFilter filter:"', function () {
    var text = 'angularjs';
    expect(queryFilter(text)).toBe('queryFilter filter: ' + text);
  });

});
