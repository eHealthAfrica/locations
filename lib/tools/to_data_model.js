/* Groups by chiefdom the way we structure it in data-models and in
* the json/*.js locations files
*
*  I -> Location tree composite
*  O ->
* {
*  'depth': 3,
*  'name': 'chiefdom',
*  'items': [
*  ...
*    ,
*    {
*      'name': 'manyeh',
*      'id': '1-1',
*      'parentId': '1'
*    },
*   ..
*  ]
* }
*/

var TransformOnFlush = require('../tools/transform_on_flush.js')
var _ = require('lodash')

function toDataModel (data) {
  var names = [
    'root',
    'district',
    'chiefdom',
    'section',
    'locality'
  ]
  return require('../location.js').toDataModel(data, _.map(
    new Array(data.depth() + 1), function (value, index_key) {
      return { name: names[index_key], items: [] }
    }))
}

module.exports = function (options) {
  return new TransformOnFlush(
    _.assign(options || {}, { onFlush: function (data) {
        return toDataModel(data[0])
      }
    })
  )
}
