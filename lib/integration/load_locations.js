var async = require('async')
var _ = require('lodash')
var Location = require('./../location.js')

module.exports = function (locations, cb) {
  var accumulator = []
  async.each(locations, function (location, callback) {
    require('../../lib/integration/csv_to_location.js')(location)
      .on('finish', function () {
        var parent = new Location(location.name, null, location.id)
        _.each(this.output.children, parent.add, parent)
        accumulator.push(parent)
        this.end()
        callback()
      })
  },
    function () {
      var formatter = require('../tools/to_data_model.js')()
      formatter.on('finish', function () {
        cb(formatter.output)
      })
      var root = new Location()
      _.each(accumulator, root.add, root)
      root.sort('id') // sorts the chiefdoms by id. Garantees equally sorted output
      formatter.write(root)
      formatter.end()
    })
}
