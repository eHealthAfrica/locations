/* global describe it */
var lib = require('../lib/make')
var assert = require('assert')
describe('the library', function () {
  it('modularises a single country', function () {
    var code = lib.modularise({
      name: 'italy',
      data: {region: 'Sicily'}
    })
    assert.equal(code, 'angular.module(\'eHealth.locations\', []).constant(\'locations_italy\', {"region":"Sicily"});')
  })
  it('modularises a single country twice', function () {
    var country = {
      name: 'italy',
      data: {region: 'Sicily'}
    }
    var code = lib.modularise(country)
    code = lib.modularise(country)
    assert.equal(code, 'angular.module(\'eHealth.locations\', []).constant(\'locations_italy\', {"region":"Sicily"});')
  })
  it('modularises multiple countries', function () {
    var code = lib.modulariseMultiple([{
      name: 'i',
      data: {r: 's'}
    }, {
      name: 's',
      data: {r: 'a'}
    }])
    assert.equal(code, 'angular.module(\'eHealth.locations\', []).constant(\'locations_i\', {"r":"s"}).constant(\'locations_s\', {"r":"a"});')
  })
})
