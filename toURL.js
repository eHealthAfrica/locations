/* outputs an url from a json object using the format specified in the
*  geojson.io API http://geojson.io
*/

var concat = require('concat-stream')
process.stdin.pipe(concat(function (body) {
  console.log('http://geojson.io/#data=data:application/json,' + encodeURIComponent(JSON.stringify(JSON.parse(body))))
}))
