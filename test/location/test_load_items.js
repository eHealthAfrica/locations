var test = require('tape')
var Location = require('../../lib/location.js')
var root = function () { return new Location('root', null, 'root-id') }

test('no id in childs', function (t) {
  t.plan(1)
  t.equal(root().getDescendantById('some'), undefined, 'is undefined')
})

test('loading an array of items', function (t) {
  t.plan(1)
  var fixture = [{ name: 'lalo', id: 'N' }]
  t.equal(Location.loadItems(fixture, root()).getDescendantById('N').getId(), 'N', 'should be "N"')
})

test('loading a fixture of our json representation', function (t) {
  t.plan(1)
  var fixture = [{ items: [ { name: 'lalo', id: 'N'}] }, { items: [ { name: 'lalochild', id: 'N-1' }] }]
  t.equal(Location.loadFlatten(fixture).getDescendantById('N-1').getId(), 'N-1', 'should be "N-1"')
})

test('loading our json representation', function (t) {
  t.plan(2)
  var fixture = require('../../json/sierra_leone.json')
  var res = Location.loadFlatten(fixture)
  t.equal(Location.loadFlatten(fixture).getDescendantById('4-12-10').name, 'balollay', 'should be "balollay"')
  t.equal(Location.loadFlatten(fixture).getDescendantById('24-07').coordinates.lat, 8.72440348197477, 'should load cooddinates')
})

test('toJSON outputs an ordered by id representation', function (t) {
  t.plan(2)
  var fixture = require('../../json/sierra_leone.json')
  var res = Location.loadFlatten(fixture)
  t.equal((JSON.parse(JSON.stringify(res)))[4].items[0].id, '1-01-01', 'should be well ordered')
  var items = (JSON.parse(JSON.stringify(res)))[3].items
  console.log(items)
  t.equal(items[items.length-1].id, '32-06', 'last section has id 32-06')
})
