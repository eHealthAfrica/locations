/* Groups by chiefdom the way we structure it in the json/*.js locations files
*
*  I -> (String)key -> (Integer)id ->  [{ wonde: [{ 'manyeh':  ['konia', ...] }, ...] ...]
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

module.exports = function (options) {
  return new TransformOnFlush(
    require('lodash').assign(options || {}, {
      onFlush: function (data) {
        return require('../location.js').loadNested(data[0])
      }
    })
  )
}
