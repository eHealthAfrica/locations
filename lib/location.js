var _ = require('lodash')
var printf = require('printf')

// class Location follows the Composite pattern
// it is used to load data from different formats and
// output to other formats
// @param { String } name
// @param { Location } parent
// @param { String | Integer } id
var Location = function (name, parent, id) {
  this.children = []
  this.name = (name || 'root').toLowerCase() // the { String } location name.
  this.parent = parent
  this.id = id
}

/**
* Loads Location hierarchy from data
* @param data an Object representing a location hierarchy. Each level is represented by a nested object, the leaves represented by an array.
* ej:  { wonde: { 'manyeh':  ['konia', ...] }, ... }
* @param { Location | undefined } the parent to attach the hierarchy. If undefined a new root element will be generated and the created hierarchy attached   to it
* @returns the passed or generated `parent` with the hierachy attached to it
*/
Location.loadNested = function (data, parent) {
  if (!parent) {
    parent = new Location()
  }
  _.forEach(data, function (value, index_key, collection) {
    var location = new Location(_.isArray(collection) ? value : index_key, parent)
    location.sort('name') // garant order (working with hashes keys...)
    parent.add(location)
    if (!_.isArray(collection)) {
      Location.loadNested(value, location)
    }
  })
  return parent
}

/*
*
* Returns a representation of a locations tree following the reference data-model
* @param { Location } location , root of the location tree that wants to be represented
* @param { Array }  a location's depth length empty array
* @returns an { Array } of { Objects } represented the location tree and compatible with the data-model
*
*/
Location.toDataModel = function (location, accumulator) {
  var container = accumulator[location.level()]
  container.depth = location.level()
  container.items.push(location.toObject())
  for (var i = 0, len = location.children.length; i < len; i++) {
    Location.toDataModel(location.getChild(i), accumulator)
  }
  return accumulator
}

// INSTANCE METHODS

Location.prototype = {

  /*
  * @returns the depth of the location from the root of the hierarchy point of view
  * the root object has a level of 0
  */

  level: function () {
    return this.parent ? this.parent.level() + 1 : 0
  },

  /*
  * modify the childrens sortinb by @param { String } property
  * @returns chainable this
  */
  sort: function (property) {
    this.children = _.sortBy(this.children, property)
    return this
  },

  /*
  * @returns the depth of the location
  * being the depth of the longest branch
  */

  depth: function () {
    return this.hasChildren() ?
    _.max(_.map(this.children, function (child) { return child.depth() + 1 }))
    : 0
  },

  // ads the { Location } child to the parent's children { Array }
  // changes the child by settings its `parent` property
  add: function (child) {
    child.parent = this
    this.children.push(child)
  },

  // @returns the id as is defined in the data-model
  // the id is build with all the ancestor's ids
  // id1-id2-id3
  //
  getId: function () {
    if (this.id) {
      return this.id
    } else {
      if (this.parent) {
        if (this.parent.getId()) {
          return this.parent.getId() + '-' + printf('%02d', this.parent.children.indexOf(this) + 1)
        } else {
          return printf('%02d', this.parent.children.indexOf(this) + 1)
        }
      } else {
        return ''
      }
    }
  },

  getChild: function (i) {
    return this.children[i]
  },

  getChildById: function (i) {
    return _.find(this.children, function (node) {
      return node.getId() === i
    })
  },

  hasChildren: function () {
    return this.children.length > 0
  },

  toObject: function () {
    if (this.parent) {
      return { name: this.name, id: this.getId(), parentId: this.parent.getId() }
    } else {
      return { name: this.name, id: this.getId() }
    }
  }
}

module.exports = Location
