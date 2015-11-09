var _ = require('lodash')
var test = require('tape')
var Location = require('../../lib/location.js')

test('all branch levels have children', function (t) {
  t.plan(1)
  var fixture = require('../../json/sierra_leone.json')
  var res = Location.loadFlatten(fixture)
  function all_levels_have_children(location) {
    // known admin level 1 division which children have no children
    var missing = [
      'bonthe island',
      'western urban',
      'western rural'
    ]
    if (location.level() < 4 && missing.indexOf(location.name) < 0) {
      return _.reduce(location.children, function(total, child) {
	return total && all_levels_have_children(child)
      }, location.hasChildren())
    } else {
      return true
    }
  }
  t.ok(all_levels_have_children(res))
})
