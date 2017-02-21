'use strict';

describe('Filter: filterByGenre', function () {

  // load the filter's module
  beforeEach(module('mediamapApp'));

  // initialize a new instance of the filter before each test
  var filterByGenre;
  beforeEach(inject(function ($filter) {
    filterByGenre = $filter('filterByGenre');
  }));

  it('should return the input prefixed with "filterByGenre filter:"', function () {
    var text = 'angularjs';
    expect(filterByGenre(text)).toBe('filterByGenre filter: ' + text);
  });

});
