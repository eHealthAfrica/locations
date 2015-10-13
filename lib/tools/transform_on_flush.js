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
var util = require('util')
var Transform = require('stream').Transform

/* nests by chiefdom and section
*  @param { Array }    [{ chiefdom: 'wonde', section: 'manyeh', locality: 'konia' }, ...]
*  @returns nested { Object } taking keys form 'chiefdom' and 'section',  { wonde: { 'manyeh':  ['konia', ...] }, ... }
*/

// @class FlushTransform < Transform
// stream to transforming a single input data into
// a Location composite tree
//
function FlushTransform (options) {

  // allow calling with or without new
  if (!(this instanceof FlushTransform)) {
    return new FlushTransform(options)
  }

  Transform.call(this, { objectMode: true })
  this.onFlush = options.onFlush
  this.output = []

}

util.inherits(FlushTransform, Transform)

FlushTransform.prototype._transform = function (chunk, enc, cb) {
  this.output.push(chunk) // update hash
  // we are not writing anything out at this
  // time, only at end during _flush
  // so we don't need to call push
  cb()
}

FlushTransform.prototype._flush = function (cb) {
  this.output = this.onFlush(this.output)
  this.push(this.output)
  cb()
}

module.exports = FlushTransform
