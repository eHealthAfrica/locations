var util = require('util')
var Transform = require('stream').Transform

// @class FlushTransform < Transform
// stream that accumulates data in an { Array }
// add applies to it the function passed in `options.onFlush`
// when flushing
//
function FlushTransform (options) {

  // allow calling with or without new
  if (!(this instanceof FlushTransform)) {
    return new FlushTransform(options)
  }

  Transform.call(this, { objectMode: true })
  this.onFlush = options.onFlush // { Function } expecting one parameter,
                                 // to be called when flushing
  this.output = [] // { Array } data collector

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
