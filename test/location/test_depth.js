var test = require('tape')
var Location = require('../../lib/location.js')

test('depth when no children', function (t) {
  t.plan(1)
  t.equal(new Location('root', null, 'root-id').depth(), 0, 'depth is 0')
})

test('depth when children have same depth', function (t) {
  t.plan(1)
  var fixture = { a: { b: { c: [ '1', '2' ] } } }
  t.equal(Location.loadNested(fixture).depth(), 4)
})

test('depth when children have same depth', function (t) {
  t.plan(1)
  var fixture = { a: { b: { c: [ '1', '2' ], d: { e: { f: ['3'] } } } } }
  t.equal(Location.loadNested(fixture).depth(), 6)
})
