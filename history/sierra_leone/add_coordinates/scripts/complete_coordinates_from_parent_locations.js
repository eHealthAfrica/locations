/*
*  this one time script
*  1) adds coordinates to the
* locations from sierra leona and saves that to a file in the tmp folder (`/tmp/locations`)
*  2) from the result of 1) obtain the locations with missing coordinates and save it to (`/tmp/locations_missing_coordinates`)
* the added coordinates have this format
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
var locations = require('../../json/sierra_leone.json')
function hasCoordinates (x) { return !!x.coordinates }
//  gets parent from level 1 for children from level2
function parent (x) {
  return locations[1].items.filter(function (item) { return item.id === x.parentId })[0]
}

function parentCoordinates (x) {
  return parent(x).coordinates
}

// complete location mising information using parent's location information
// @param loc Object a loctations json object
function complete (loc) {
  return loc.map(function (level) {
    if (level.depth > 1) {
      level.items = level.items.map(function (item) {
        if (!hasCoordinates(item)) {
          item.coordinates = parentCoordinates(item)
        }
        return item
      })
    }
    return level
  })
}

fs.writeFile('/tmp/locations_with_parent_coordinates.json', JSON.stringify(complete(locations)), function (err) {
  if (err) {
    return console.log(err)
  }

  console.log('locations with missing coordinates completed with parent\'s coordiantes saved!')
})
