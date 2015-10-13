var fs = require('fs')
module.exports = function (options) {
  var read = fs.createReadStream(options.path)
  read.on('error', function (err) { console.log(err)})
  return read
  .pipe(require('../tools/csv_to_hash.js')())
  .pipe(require('../tools/nest.js')())
  .pipe(require('../tools/to_location.js')())
}
