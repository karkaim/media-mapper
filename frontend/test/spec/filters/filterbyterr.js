'use strict';

describe('Filter: filterByTerr', function () {

  // load the filter's module
  beforeEach(module('mediamapApp'));

  // initialize a new instance of the filter before each test
  var filterByTerr;
  beforeEach(inject(function ($filter) {
    filterByTerr = $filter('filterByTerr');
  }));

  it('should return the input prefixed with "filterByTerr filter:"', function () {
    var text = 'angularjs';
    expect(filterByTerr(text)).toBe('filterByTerr filter: ' + text);
  });

});
