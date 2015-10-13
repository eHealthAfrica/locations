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

var _ = require('lodash')
var util = require('util')
var Transform = require('stream').Transform

// @class ToDataModel < Transform
// stream to transform a Location hierachy
// into a data model compatible result
//
function ToDataModel (options) {
  // allow calling with or without new
  if (!(this instanceof ToDataModel)) {
    return new ToDataModel(options)
  }

  Transform.call(this, { objectMode: true })

  this.output = []

}

util.inherits(ToDataModel, Transform)

ToDataModel.prototype._transform = function (chunk, enc, cb) {
  this.output = chunk // expects one time entry
  // we are not writing anything out at this
  // time, only at end during _flush
  // so we don't need to call push
  cb()
}

ToDataModel.prototype._flush = function (cb) {

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

  this.output = toDataModel(this.output)
  this.push(this.output)
  cb()
}

module.exports = ToDataModel
