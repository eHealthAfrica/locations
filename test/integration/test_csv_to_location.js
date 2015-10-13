var test = require('tape')

test('from file to location object', function (t) {
  var stream = require('../../lib/integration/csv_to_location.js')(
    { name: 'bo',
      id: '1',
      path: 'history/sierra_leone/add_sections_localities_admin_divisions/sources/bo_village.csv'
    })
  stream.on('finish', function () {
    t.equals(stream.output.children[0].name, 'Badjia', 'location loaded properly')
    t.end()
  })
})
