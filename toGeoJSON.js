'use strict'

var fs = require('fs')
var _ = require('lodash')
var data

var getSubRegions = function (index, parentId, isLast) {
  if (data[index]) {
    var subregions = _.filter(data[index].items, function (subregion) {
      return parentId === subregion.parentId
    })
    isLast = false
    subregions.forEach(function (region, listNumber) {
      if (subregions.length === listNumber + 1) {
        isLast = true
      }
      if (region.coordinates) {
        geojsonFeatures.push(geojsonFeature(region, index))
      }
      getSubRegions(index + 1, region.id, isLast)
    })
  }
}

function rgb2hex(r,g,b) {
	if (g !== undefined)
		return Number(0x1000000 + r*0x10000 + g*0x100 + b).toString(16).substring(1);
	else
		return Number(0x1000000 + r[0]*0x10000 + r[1]*0x100 + r[2]).toString(16).substring(1);
}
/*
*
* maps a region to a GeoJSON object
* produces a different colored marked for levels 1/2/3
*
* @param region {Object} with coordinates.lon, coordinates.lat name and id required fields
* @param index {integer} the admin divison level
* @return a GeoJSON {Object} of type 'Feature'
*
*
* */
var geojsonFeatures = []
var geojsonFeature = function (region, index) {
  var LEVEL1 = 1
  var LEVEL2 = 2
  var LEVEL3 = 3
  var options
  // an effort to make the markers have a different color by id.
  // may be easier just to use the id(`-` removed) modulo 255
  if (index === LEVEL3) {
	var r = 123 * parseInt(region.parentId.split('-')[0]) % 255
	var g = 413 * parseInt(region.parentId.split('-')[0]) % 255
	var b = 123 * parseInt(region.parentId.split('-')[1]) % 255
    options = { marker_color: '#' + rgb2hex(r, g, b), marker_size: 'small' }
  } else if (index === LEVEL2) {
	var r = 123 * parseInt(region.id.split('-')[0]) % 255
	var g = 413 * parseInt(region.id.split('-')[0]) % 255
	var b = 123 * parseInt(region.id.split('-')[1]) % 255
    options = { marker_color: '#' + rgb2hex(r, g, b), marker_size: 'medium' }
  } else {
    options = { marker_color: '#6a142e', marker_size: 'large' }
  }
  return {
    geometry: {
      coordinates: [ region.coordinates.lon, region.coordinates.lat ],
      type: 'Point'
    },
    properties: {
      'marker-color': options.marker_color,
      'marker-size': options.marker_size,
      name: region.name,
      id: region.id
    },
    type: 'Feature'
  }
}

var iterateThroughRegions = function () {
  if (data[0]) {
    data[0].items.forEach(function (region, listNumber) {
      getSubRegions(1, region.id, false)
    })
  }
}

if (process.argv.length === 2) {
  console.log('Please add a country parameter, i.e. $node readable.js guinea')
} else {
  try {
    var dataString = fs.readFileSync('./json/' + process.argv[2] + '.json').toString()
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Error: File not found: ./json/' + process.argv[2] + '.json')
    } else {
      throw err
    }
    process.exit(1)
  }
  data = JSON.parse(dataString)
  iterateThroughRegions()

  console.log(JSON.stringify(
    { type: 'FeatureCollection', features: geojsonFeatures },
    null,
    2))
}
