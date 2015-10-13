var test = require('tape')
var Location = require('../../lib/location.js')
var root = function () { return new Location('root', null, 'root-id') }

test('location inintialized with id "root-id"', function (t) {
  t.plan(1)
  t.equal(root().getId(), 'root-id', 'returns id "root-id"')
})

test('location inintialized with no parent and no id', function (t) {
  t.plan(1)
  t.equal(new Location().getId(), '', 'returns id " "')
})

test('location of level 1 and parent with "root-id" id', function (t) {
  t.plan(1)
  var fixture = { a: { b: { c: [ '1', '2' ] } } }
  t.equal(Location.loadNested(fixture, root()).getChild(0).getId(), 'root-id-01', 'returns "root-id-01"')
})

test('build from default root (id "") generates proper ids', function (t) {
  var fixture = { a: { b: { c: [ '1', '2' ] } } }
  t.equal(Location.loadNested(fixture).getChild(0).getId(), '01', 'level one location returns id 01')
  t.equal(Location.loadNested(fixture).getChild(0).getChild(0).getId(), '01-01', 'level 2 location returns id 01-01')
  t.equal(Location.loadNested(fixture).getChild(0).getChild(0).getChild(0).getId(), '01-01-01', 'level 3 location returns id 01-01-01')
  t.equal(Location.loadNested(fixture).getChild(0).getChild(0).getChild(0).getChild(1).getId(), '01-01-01-02', 'level 4 location on index 1 returns id 01-01-01-02')
  t.end()
})
