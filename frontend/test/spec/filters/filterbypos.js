'use strict';

describe('Filter: filterByPos', function () {

  // load the filter's module
  beforeEach(module('mediamapApp'));

  // initialize a new instance of the filter before each test
  var filterByPos;
  beforeEach(inject(function ($filter) {
    filterByPos = $filter('filterByPos');
  }));

  it('should return the input prefixed with "filterByPos filter:"', function () {
    var text = 'angularjs';
    expect(filterByPos(text)).toBe('filterByPos filter: ' + text);
  });

});
