/*
*
* SCRIPT to solve issue: https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/959
*
* It loads the current locations data ('json/sierra_leone.json')
* generates objects from the locations data for each chiefdom present
* loads the csv source files
* combines both sources into a [Location](../../../lib/location.js) hierarchy
* generates a data-model json to stdout
*
*
*/

var _ = require('lodash')
var locations = require('../../../json/sierra_leone.json')
var taskFolder = '../../../history/sierra_leone/update_west_area_chiefdom_and_section_level'

var lowercase = function (location) {
  location.name = location.name.toLowerCase()
  return location
}

function mapFromMapping (location, mapping) {
  location.name = mapping[location.name] || location.name
  return location
}

// some source file names are not matching some of the current available
// district names
var correctDistrictNames = {
  map: function (location) {
    var mapping = {
      'western urban': 'westernurban',
      'western rural': 'westernrural'
    }
    return mapFromMapping(location, mapping)
  },
  // some district names should be filtered (no csv files for them)
  filter: function (location) {
    return ['western urban', 'western rural'].indexOf(location.name) > -1
  }
}

// adds the path to the files with the new data
var addSourcesPath = function (location) {
  return _.assign(location, { path: taskFolder + '/sources/' + location.name + '.csv' })
}

var chiefdoms = _.chain(locations[1].items)
.map(lowercase)
.filter(correctDistrictNames.filter)
.map(correctDistrictNames.map)
.map(addSourcesPath)
.value()
console.log(chiefdoms)

require('../../integration/csv_files_to_location.js')(chiefdoms,
  function (data) {
    process.stdout.write(JSON.stringify(data))
  })
