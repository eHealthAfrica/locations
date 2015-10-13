var test = require('tape')

test('transforms csv data in an Object with keys being the first column of the csv file', function (t) {
  var parser = require('../../lib/tools/csv_to_hash.js')()
  parser.on('finish', function () {
    t.equal(parser.output[0].CHIEFDOM, 'Biriwa', 'correctly transformed')
    t.end()
  })
  parser.write('CHIEFDOM,SECTION,LOCALITY\nBiriwa,Bumban,Kasena\nBiriwa,Bumban,Kasengbe')
  parser.end()
})
