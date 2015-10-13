var test = require('tape')
var Location = require('../../lib/location.js')
var root = function () { return new Location('root', null, 'root-id') }

test('no id in childs', function (t) {
  t.plan(1)
  t.equal(root().getChildById('some'), undefined, 'is undefined')
})

test('depth 1 id request with root parent and i root-id', function (t) {
  t.plan(1)
  var fixture = { a: { b: { c: [ '1', '2' ] } } }
  t.equal(Location.loadNested(fixture, root()).getChildById('root-id-01').getId(), 'root-id-01', 'should be "root-id-01"')
})
