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
      'western rural',
      'bombali sebora'
    ]
    if (location.level() < 4 && missing.indexOf(location.name) < 0) {
      return _.reduce(location.children, function(total, child) {
	if (!all_levels_have_children(child)) {
	  console.log(child.name);
	}
	return total && all_levels_have_children(child)
      }, location.hasChildren())
    } else {
      return true
    }
  }
  t.ok(all_levels_have_children(res))
})

test('all added section ochiids have correct coordinates', function (t) {
  t.plan(1)
  var currentJSON = require('../../json/sierra_leone.json')
  var source = require('../../history/sierra_leone/add_coordinates_to_admin_level_4_and_ochaid/sources/SLadminLv4.json')
  var res = Location.loadFlatten(currentJSON)
  /**
   * checks the corresponece between admin level 4 ocha ids and coordinates
   */
  function check(location) {
    if (!location.ochaId || !location.coordinates || (location.level() < 4)) {
      return true
    }
    var found =  _.find(source, function(x) {
	return (x.ADM3_CODE === location.ochaId || x.ADM4_CODE === location.ochaId) })
	if (found) {
	  var right =  ((found.LONGITUDE == location.coordinates.lon) && (found.LATITUDE == location.coordinates.lat)) ||
	  ((found.LONGITUDE == location.parent.coordinates.lon) && (found.LATITUDE == location.parent.coordinates.lat))
	  if (!right) {
	    console.log('lon:' + found.LATITUDE + ' ' + location.coordinates.lat + ' lat: ' + found.LONGITUDE + ' ' + location.coordinates.lon);
	  }
	  return right
	}
      else { return true }
  }
  function ochaIdAndCoordinatesCorrect(location) {
    // known admin level 1 has previous coordinates
      return _.reduce(location.children, function(total, child) {
	if (!check(child)) {
	  console.log(child.level() + '  ' + child.name + ' ' + child.ochaId);
	}
	return total && ochaIdAndCoordinatesCorrect(child)
      },  check(location))
  }
  t.ok(ochaIdAndCoordinatesCorrect(res))
})

test('all sections have correct ochaId hierarchy', function (t) {
  t.plan(1)
  var currentJSON = require('../../json/sierra_leone.json')
  var source = require('../../history/sierra_leone/add_coordinates_to_admin_level_4_and_ochaid/sources/SLadminLv4.json')
  var res = Location.loadFlatten(currentJSON)
  /**
   * checks the corresponece between admin level 4 ocha ids and coordinates
   */
  function check(location) {
    if (!location.ochaId || (location.level() < 4)) {
      return true
    }
    var found =  _.find(source, function(x) { return (x.ADM4_CODE === location.ochaId) })
    if (found) {
      var right = (found.ADM3_CODE == location.parent.ochaId) && (found.ADM2_CODE == location.parent.parent.ochaId || found.ADM2_CODE ==="")
      if (!right) {
	console.log(child.level() + '  ' + child.name + ' ' + child.ochaId);
      }
      return right
    } else { return true }
  }
  function ochaIdAndCoordinatesCorrect(location) {
    // known admin level 1 has previous coordinates
      return _.reduce(location.children, function(total, child) {
	return total && ochaIdAndCoordinatesCorrect(child)
      },  check(location))
  }
  t.ok(ochaIdAndCoordinatesCorrect(res))
})
