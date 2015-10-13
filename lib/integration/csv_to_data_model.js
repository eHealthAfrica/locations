module.exports = function (options) {
  return require('../integration/csv_to_location.js')(options)
  .pipe(require('../tools/to_data_model.js')())
}
