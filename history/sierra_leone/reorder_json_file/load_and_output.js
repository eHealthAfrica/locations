

/**
 * loads the file from the json and outputs it
 * after being reordered
 */

var Location = require('../../../lib/location.js')
var fs = require('fs')
var sourceFile = '../../../json/sierra_leone.json'
var source = require(sourceFile)
var reordered = Location.loadFlatten(source)

fs.writeFile('/tmp/sierra_leone.json', JSON.stringify(reordered, null, 2), function(err) {
  if (err) {
    console.log('error saving file: ' + err.message )
  }
})
