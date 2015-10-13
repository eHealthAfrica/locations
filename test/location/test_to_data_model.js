var test = require('tape')
var Location = require('../../lib/location.js')
var _ = require('lodash')

var format = function (location) {
  var names = ['one', 'two', 'three', 'four', 'five']
  return Location.toDataModel(location, _.map(
    new Array(location.depth() + 1), function (value, index_key) {
      return { name: names[index_key], items: [] }
    }))
}

test('loadNested creates a proper hierachy of Location objects', function (t) {
  t.plan(1)
  var fixture = { a: { b: { c: [ '1', '2' ] } } }
  t.equal(format(Location.loadNested(fixture))[4].items[0].name, '1')
})

test('test loading locations from a csv file', function (t) {
  var stream = require('../../lib/integration/csv_to_location.js')(
    { name: 'bo', id: '1', path: 'history/sierra_leone/add_sections_localities_admin_divisions/sources/bo_village.csv' }
  )
  stream.on('finish', function () {
    var f = format(stream.output)
    t.equals(f[0].name, 'one')
    t.equals(format(stream.output)[0].items[0].name, 'root')
    t.equals(format(stream.output)[1].items[0].name, 'badjia')
    t.end()
  })
})
