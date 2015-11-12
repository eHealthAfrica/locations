/*
 *
 * SCRIPT to solve issue: https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/1029
 *
 * It loads the current locations data ('json/sierra_leone.json')
 * it loads the source file with coordinates in format send by the GIS team ('history/sierra_leone/add_coordinates_to_admin_level_4/sources/SLadminLv4.json')
 * matches our Location with the Loction (based on the ADM3_CODE and the AMD4NAME or the ADM3_NAME and the AMD4NAME) and adds the coordinates
 *
 *
 * the following admindivision2 ids are not found
 *
 */

var _ = require('lodash')
var assert = require('assert')
var Location = require('./../../location.js')
var locations = Location.loadFlatten(require('../../../json/sierra_leone.json'))
var locations_with_coordinates = require('../../../history/sierra_leone/add_coordinates_to_admin_level_4/sources/SLadminLv4.json')


/**
 * unify some numbers in different formats to downcased roman literals
 * @param {String} s the string containing the numbers
 * @return {String} string with updated numbers
 */
function unifyNumbers(s) {
  var mapping =  {
    '1': 'i',
    '2': 'ii',
    '3': 'iii',
    '4': 'iv',
    '5': 'v',
    '6': 'vi',
    '7': 'vii',
    'one': 'i',
    'two': 'ii',
    'three': 'iii',
    'four': 'iv',
    'five': 'v',
    'six': 'vi',
    'seven': 'vii'
  }
  _.each(mapping, function(value, key) {
    s = s.replace(new RegExp(' ' + key + '$'), ' ' +  value)
  })
  return s
}

/**
 * remove some characters -'"
 * @param {String} s input string
 * @return {String} s were some characters are removed
 */
function unifyCharacters(s) {
  return s.replace(/[\'\-\" ()]/g, '')
}


/**
 * in some names the parent's name is prepended
 * @param {String} s input string
 * @return {String} s were parent name is removed
 */
function replacePrependedParent(s) {
  return s.replace(/^(york|waterloo|mountain|koya) - /g, '')
}

assert.equal(unifyCharacters('some-\'()  "three'), 'somethree')
assert.equal(unifyCharacters('some-\'  "three'), 'somethree')
assert.equal(unifyCharacters('some-three'), 'somethree')
assert.equal(unifyNumbers('some three'), 'some iii')
assert.equal(unifyNumbers('some four'), 'some iv')

/**
 * @param {String} s the string to unify
 * @return {String} a unified string
 */

function unify(s) {
  return unifyCharacters(replacePrependedParent(unifyNumbers(s).toLowerCase())).substring(0,10)
}

assert.equal(unify('york - goderich - funkia'), 'goderichfu')
assert.equal(unify('waterloo - goderich - funkia'), 'goderichfu')
assert.equal(unify('mountain - goderich - funkia'), 'goderichfu')

/**
 * adapts the source ADM[N]_CODE to our source's ids
 * example: SLE030412
 * will be adapted to 4-12, since we don't use
 * 1) country code `SLE`
 * 2) adminLevel1 code `03` (would be `S` for us)
 * 3) we start referencing from admin level 2 code, no 0 padded
 * @param {String} code admin division 3 code `ADM3_CODE`
 * @return {String} an id in the format we are using
 */


function adaptId(id) {
  /**
   * we have this mismatch with the level1 ids
   *     name       | their id      |    our id
   *  ------------- | ------------- | -------------
   *  southern      |            3  |       0
   *  east          |            1  |       1
   *  northern      |            2  |       2
   *  western       |            4  |       3
   */
  function mapIds(id) {
    return { '3': '0',
      '1': '1',
      '2': '2',
      '4': '3' }[id]
  }

  /*
   *
   * furthermore in level 2 we have the following mismatch
   *     name       | their id      |    our id
   *  ------------- | ------------- | -------------
   *  western urban |           42  |       31
   *  western rural |           41  |       32
   *
   *  @param {String} id a 2 letter representing a numerical id
   *  @return {String} a 2 letter string id
   *
   */
  function mapIdsAdminDivision2(id) {
    switch (id) {
	    case '32':
		    return id.replace('32', '31')
		    break;
	    case '31':
		    return id.replace('31', '32')
		    break;
	    default:
		    return id

    }
  }

  /*
   *
   * furthermore in level 2 we have the following mismatch
   *     name       | their id      |    our id
   *  ------------- | ------------- | -------------
   *  western urban |           42  |       31
   *  western rural |           41  |       32
   *
   *  @param {String} id a 2 letter representing a numerical id
   *  @return {String} a 2 letter string id
   *
   */
  function mapIdsAdminDivision2(id) {
    switch (id) {
	    case '32':
		    return id.replace('32', '31')
		    break;
	    case '31':
		    return id.replace('31', '32')
		    break;
	    default:
		    return id

    }
  }

  if (id == 'SLE42') {
    return '31'
  }  else if (id == 'SLE41') {
    return '32'
  } else {
    var level3Id = id.slice('SLE0'.length).split('')
    var adminDivision3Id = level3Id.slice(-2).join('')
    var adminDivision2Id = level3Id.slice(-6,-2)
    adminDivision2Id[0] = mapIds(adminDivision2Id[0])
    var adminDivision2Id = adminDivision2Id.join('').replace(/0/g, '')
    adminDivision2Id = mapIdsAdminDivision2(adminDivision2Id)
    return adminDivision2Id + '-' + adminDivision3Id
  }
}

assert.equal(adaptId('SLE040203'), '31-03')
assert.equal(adaptId('SLE04020506'), '25-06')
assert.equal(adaptId('SLE42'), '31')

function addCoordinatesToSection(section, sourceItem, found) {
      if (!section) {
	return false
      }
      !section.ochaId && (section.ochaId = sourceItem.ADM4_CODE)
      !section.coordinates && ( section.coordinates = {
	lat: sourceItem.json_geometry.coordinates[1],
	lon: sourceItem.json_geometry.coordinates[0]
      })
      found.push([ sourceItem.ADM4_NAME,
		 sourceItem.ADM4_CODE,
		 section.name,
		 section.getId() ])

    sourceItem.processed = true
}
/**
 * Adds coordinates to an admin level 4 location
 * note: if coordinates get added, it modifies sourceItem and location
 * @param {location} location location to add coordinates to
 * @param {string} adaptedName name of the source location
 * @param {object} sourceItem object containing location data
 * @param {number} tolerance the Levensthein distance allowed
 * @param {string[]} found the accumulated found matches btw source and locations
 * @return {boolean} true iff a coordinate was added to any location
 */
function addCoordinatesToAD4(location, sourceItem, tolerance, unify, found) {
  var foundSection = false
  var adaptedName = unify(sourceItem.ADM4_NAME)
  if (location) {
    !location.ochaId && (location.ochaId = sourceItem.ADM3_CODE)
    var section = location.getDescendantByNameWithoutCoordinatesOrOchaId(adaptedName, tolerance, unify)
    if (section) {
      addCoordinatesToSection(section, sourceItem, found)
      foundSection = true
    }
  }
  return foundSection
}

/**
 * looks for a match at the admin division 3 based on id or name.
 * if found looks for a match at the admin division 4 name, and adds
 * coordinates to it
 *
 * note the function modifies source, location, and found
 *
 * @param {object[]} source data containing location data from GIS team
 * @param {location} location our current location data
 * @param {number} tolerance the Levensthein distance allowed
 * @param {boolean}
 *
 *
 */
function findAD3(source, location, tolerance) {
   var found = [['source name', 'source unified', 'source id', 'matched name', 'matched unified', 'matched id']]
  _.chain(source)
  .reject('processed')
  .forEach(function (sourceItem, index) {
    var adaptedId = ['SLE42','SLE41'].indexOf(sourceItem.ADM2_CODE) > -1 ? adaptId(sourceItem.ADM2_CODE) :  adaptId(sourceItem.ADM3_CODE)
    addCoordinatesToAD4(location.getDescendantById(adaptedId),
		   sourceItem,
		   tolerance, unify, found) ||
    addCoordinatesToAD4(
      location.getDescendantByName(sourceItem.ADM3_NAME, 0, unify),
      sourceItem, tolerance, unify, found) ||
    addCoordinatesToSection(
      location.getDescendantByNameWithoutCoordinatesOrOchaId(sourceItem.ADM4_NAME, tolerance, unify),
      sourceItem, found)
  }).value()
  return found
}


var fs = require('fs');

// apply several times with different Levensthein distance toolerance

var logStream = fs.createWriteStream('/tmp/found.txt', {'flags': 'w'});
// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
_.each( _.range(3), function(n) {
  var found = findAD3(locations_with_coordinates, locations, n)
  logStream.write('\n\n---- with Levensthein distance  ' + n + ' found ' + found.length + ' -----\n\n')
  logStream.write(_.map(found, function(x) { return x.join(', ') }).join('\n'))
})
logStream.end('\n\n-------')

logStream = fs.createWriteStream('/tmp/locations_with_coordinates.json', {'flags': 'w'});
// print the different versions
logStream.end(JSON.stringify(locations))

var missing = require('./../../tools/missing_coordinates.js')(JSON.parse(JSON.stringify(locations)))
logStream = fs.createWriteStream('/tmp/missing.json', {'flags': 'w'});
logStream.end(JSON.stringify(missing[3].items))
