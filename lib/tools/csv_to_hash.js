function getParser () {
  var parser = require('csv-parse')({columns: true, auto_parse: true})

  var output = []
  parser.on('readable', function () {
    var record = parser.read()
    while (record) {
      output.push(record)
      record = parser.read()
    }
  })

  // Catch any error
  parser.on('error', function (err) {
    console.log(err.message)
  })
  parser.output = output
  return parser
}

module.exports = getParser
