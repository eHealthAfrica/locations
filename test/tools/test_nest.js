var test = require('tape')

test('empty imput', function (t) {
  var nest = require('../../lib/tools/nest.js')()
  nest.on('finish', function () {
      t.deepEqual(nest.output, { undefined: { undefined: [ undefined ] } }, 'nests objects with undefined keys')
      t.end()
    })
  nest.write([])
  nest.end()
})

test('with input', function (t) {
  var nest = require('../../lib/tools/nest.js')()
  var data = [
    {
      'CHIEFDOM': 'badjia',
      'SECTION': 'damia',
      'LOCALITY': 'ngelehun'
    },
    {
      'CHIEFDOM': 'badjia',
      'SECTION': 'damia',
      'LOCALITY': 'gondama'
    }
  ]
  nest.on('finish', function () {
      t.deepEqual(nest.output['badjia']['damia'], ['ngelehun', 'gondama'], 'loads objects correctly into a nested output')
      t.end()
    })
  nest.write(data[0])
  nest.write(data[1])
  nest.end()
})
