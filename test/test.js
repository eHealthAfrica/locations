var lib = require('../lib/make'),
    assert = require('assert');
describe('modularise', function() {
  it('works', function() {
    var code = lib.modularise('country', {region: 'Sicily'});
    assert.equal(code, "angular.module('eHealth.locations').constant('locations-country', {\"region\":\"Sicily\"});");
  });
});
