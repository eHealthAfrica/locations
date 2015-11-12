var test = require('tape')
var Location = require('../../lib/location.js')
var root = function () { return new Location('root', null, 'root-id') }


test('no id in childs', function (t) {
  t.plan(1)
  t.equal(root().getDescendantByName('some'), undefined, 'is undefined')
})

test('loading an array of items', function (t) {
  t.plan(1)
  var fixture = [{ name: 'lalo', id: 'N' }]
  t.equal(Location.loadItems(fixture, root()).getDescendantByName('lalo').name, 'lalo', 'should be "N"')
})

test('loading a fixture of our json representation', function (t) {
  t.plan(1)
  var fixture = [{ items: [ { name: 'lalo', id: 'N'}] }, { items: [ { name: 'lalochild', id: 'N-1' }] }]
  t.equal(Location.loadFlatten(fixture).getDescendantByName('lalochild').name, 'lalochild', 'should be "lalochild"')
})

test('loading our json representation', function (t) {
  t.plan(1)
  var fixture = require('../../json/sierra_leone.json')
  var res = Location.loadFlatten(fixture)
  t.equal(Location.loadFlatten(fixture).getDescendantByName('balollay').getId(), '4-12-10', 'should be "4-12-10"')
})

test('using a comparator', function (t) {
  t.plan(1)
  var fixture = require('../../json/sierra_leone.json')
  t.equal(Location.loadFlatten(fixture).getDescendantByName('balollay').getId(), '4-12-10', 'should be "4-12-10"')
})

test('using name tolerance', function (t) {
  t.plan(2)
  var fixture = require('../../json/sierra_leone.json')
  t.equal((Location.loadFlatten(fixture).getDescendantByName('bagollay', 1)).getId(), '4-12-10', 'should be "4-12-10"')
  t.equal((Location.loadFlatten(fixture).getDescendantByName('bagollay', 0)), undefined, 'should be undefined"')
})
