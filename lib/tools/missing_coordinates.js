// match locations names with names from the coordinates files, and add the coordinates
// @param loc Object a locations json object
// @return {Array[Object]} and array of location objects without coordinates
//
function withMissingCoordinates (loc) {
  function hasCoordinates (x) { return !!x.coordinates }
  return loc.map(function (level) {
    if (level.depth > 0) {
      level.items = level.items.filter(function (item) { return !hasCoordinates(item) })
    }
    return level
  })
}

module.exports = withMissingCoordinates;
