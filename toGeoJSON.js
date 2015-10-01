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

/*
*
* maps a region to a GeoJSON object
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
  var options
  if (index === LEVEL1) {
    options = { marker_color: '#6a142e', marker_size: 'medium' }
  } else {
    options = { marker_color: '#dbc156', marker_size: 'small' }
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
  console.log('')
  iterateThroughRegions()

  console.log(JSON.stringify(
    { type: 'FeatureCollection', features: geojsonFeatures },
    null,
    2))
}
