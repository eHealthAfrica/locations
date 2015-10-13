var test = require('tape')
var Location = require('../../lib/location.js')
var root = function () { return new Location('root', null, 'root-id') }
var fixture = { a: { b: { c: [ '1', '2' ] } } }

test('level when no ancestor', function (t) {
  t.plan(1)
  t.equal(root().level(), 0, 'level is 0')
})

test('level when one ancestor', function (t) {
  t.plan(1)
  t.equal(Location.loadNested(fixture, root()).getChildById('root-id-01').level(), 1, 'level is 1')
})

test('level when ancestor chain is longer than 1', function (t) {
  t.plan(1)
  t.equal(Location.loadNested(fixture, root()).getChild(0).getChild(0).level(), 2, 'level is the length of the ancestor chain')
})
