/* nests by chiefdom and section
*  @param { Array[Object] }    [{ CHIEFDOM: 'wonde', SECTION: 'manyeh', LOCALITY: 'konia' }, ...]
*  @returns nested { Object } taking keys form 'CHIEFDOM' and 'SECTION',  { wonde: { 'manyeh':  ['konia', ...] }, ... }
*/

var _ = require('lodash')

function nest (data) {
  return _.mapValues(_.groupBy(data, 'CHIEFDOM'), function (x) {
    return _.mapValues(_.groupBy(x, 'SECTION'), function (x) { return _.map(x, 'LOCALITY') })
  })
}

var TransformOnFlush = require('../tools/transform_on_flush.js')

module.exports = function (options) {
  return new TransformOnFlush(
    require('lodash').assign(options || {}, { onFlush: nest })
  )
}
