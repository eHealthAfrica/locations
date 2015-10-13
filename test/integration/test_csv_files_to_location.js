var test = require('tape')

test('from file to the data model representation', function (t) {
  require('../../lib/integration/csv_files_to_location.js')(
    [
      { name: 'bo', id: '1', path: 'history/sierra_leone/add_sections_localities_admin_divisions/sources/bo_village.csv' },
      { name: 'kono', id: '4', path: 'history/sierra_leone/add_sections_localities_admin_divisions/sources/kono_village.csv' }
    ],
    function (output) {
      t.equals(output[2].items[0].name, 'Badjia', 'location loaded properly')
      t.equals(output[3].items[0].name, 'Damia', 'location loaded properly')
      t.notEquals(output[2].items.length, output[3].items.length, 'location loaded properly')
      t.end()
    })
})
