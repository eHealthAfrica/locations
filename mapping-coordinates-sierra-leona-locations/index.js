/*
*  this one time script
*  1) adds coordinates to the
* locations from sierra leona and saves that to a file in the tmp folder (`/tmp/locations`)
*  2) from the result of 1) obtain the locations with missing coordinates and save it to (`/tmp/locations_missing_coordinates`)
* the added coordiantes have this format
*  "coordinates": {
*      "lat": 7.96276438159488,
*      "lon": -11.7196907051462
*  }
*
*  The coordinates are extracted from the file `./sources/sl_coordinates_levels_2_3.json`, obtained from the provided by the GIS team:
*  - ./sources/sl-level-2.json
*  - ./sources/sl-level-3.json
*
*/

var fs = require('fs')
var locations = require('./json/sierra_leone.json')
var coordinates = require('./sources/sl_coordinates_levels_2_3.json')

// match locations names with names from the coordinates files, and add the coordinates
function extract () {
  return locations.map(function (level) {
    if (level.depth > 0) {
      level.items = level.items.map(function (item) {
        var c = coordinates['adminDivision' + (level.depth + 1)][item.name]
        if (c) {
          item.coordinates = c
        }
        return item
      })
    }
    return level
  })
}

// match locations names with names from the coordinates files, and add the coordinates
// @param loc Object a loctations json object
function missing (loc) {
  return loc.map(function (level) {
    if (level.depth > 0) {
      level.items = level.items.filter(function (item) { return !!item.coordinates })
    }
    return level
  })
}

var locations_with_coordinates = extract()
fs.writeFile('/tmp/locations', JSON.stringify(locations_with_coordinates), function (err) {
  if (err) {
    return console.log(err)
  }

  console.log('locations saved!')
})

fs.writeFile('/tmp/locations_missing_coordinates', JSON.stringify(missing(locations_with_coordinates)), function (err) {
  if (err) {
    return console.log(err)
  }

  console.log('locations with missing coordiantes saved!')
})
