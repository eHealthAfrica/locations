var _ = require('lodash')
var printf = require('printf')
var Levensthein = require('levenshtein')


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
    location.sortBy('name') // garant order (working with hashes keys...)
    parent.add(location)
    if (!_.isArray(collection)) {
      Location.loadNested(value, location)
    }
  })
  return parent
}

/**
 * Loads Location hierarchy from data
 * @param { object[] } items items to add
 * @param { location | undefined } root parent to add items to
 * @returns the passed or generated `parent` with the items attached to it
 */
Location.loadItems = function (items, root) {
  if (!root) {
    root = new Location()
  }
  // items are assumed to be in order by (id)
  _.forEach(items, function (item, index_key, collection) {
    var location = new Location(item.name, root.getDescendantById(item.parentId), item.id)
    item.ochaId && (location.ochaId = item.ochaId)
    item.coordinates && (location.coordinates = item.coordinates)
    if (location.parent) {
      location.parent.add(location)
    } else {
      root.add(location)
    }
  })
  return root
}


/**
 * Loads Location hierarchy from flat data
 * @param { object[] } data to load
 * @param { Location | undefined } root root to attach the hierarchy. If undefined a new root element will be generated and the created hierarchy attached   to it
 * @returns the passed or generated `parent` with the hierachy attached to it
 */
Location.loadFlatten = function (data, root) {
  if (!root) { root = new Location() }
  _.forEach(data, function (level, index_key, collection) { Location.loadItems(level.items, root) })
  return root
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
  container.items.push(location.toJSON2())
  container.items = Location.sortById(container.items)
  for (var i = 0, len = location.children.length; i < len; i++) {
    Location.toDataModel(location.getChild(i), accumulator)
  }
  return accumulator
}

  /*
   * id sort function
   * @returns sorted collection by id
   */
Location.sortById = function (collection) {
      return _.sortBy(collection, function(element) {
	  var without_dashes = element.id.replace(/-/g, '')
	  var res = 0
	  //check if it can be coerced to number
	  // (+ is number coercion)
	  if (!! +without_dashes) {
	    res = +without_dashes
	  }
	  return res
      })
  },

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
  sortBy: function (property) {
    this.children = _.sortBy(this.children, property)
    return this
  },

  /**
   * overrides function called by JSON.stringify
   */
  toJSON: function (){
    // we want to have the data model representation in case of
    // a root location
    if (this.level() === 0) {
      var names = [
	'root',
	'region',
	'district',
	'chiefdom',
	'section',
	'locality'
      ]
      return Location.toDataModel(this, _.map(
	new Array(this.depth() + 1), function (value, index_key) {
	  return { depth: undefined, name: names[index_key], items: [] }
	}))
    } else {
      this.toJSON2()
    }
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

  getDescendantById: function(i) {
    if (this.getId() === i) {
      return this
    } else if (this.hasChildren()) {
      return _.reduce(this.children, function(acc, child) {
	return child.getDescendantById(i) || acc
      }, undefined)
    } else {
      return undefined
    }
  },


  /**
   * @param {String} name which location we are looking for
   * @param {Number} tolerance if truthy the Levensthein distance considered as match
   * @param {Function} unifier the function used to unify
   * @return {Location|undefined} The location having the name, or undefined if none found
   */
  getDescendantByName: function(name, tolerance, unify) {
    unify = unify || _.identity
    var currentName = unify(this.name)
    var matches = tolerance ?
      (new Levensthein(currentName, unify(name))).distance <= tolerance :
	currentName === unify(name)
	if (matches) {
	  return this
	} else if (this.hasChildren()) {
	  return _.reduce(this.children, function(acc, child) {
	    return child.getDescendantByName(name, tolerance, unify) || acc
	  }, undefined)
	} else {
	  return undefined
	}
  },

  /**
   * @param {String} name which location we are looking for
   * @param {Number} tolerance if truthy the Levensthein distance considered as match
   * @return {Location|undefined} The location having the name, or undefined if none found
   */
  getDescendantByNameWithoutCoordinatesOrOchaId: function(name, tolerance, unify) {
    var currentName = unify(this.name)
    var match = tolerance ?
      (new Levensthein(currentName, unify(name))).distance <= tolerance :
	currentName === unify(name)
	if ((!this.coordinates || !this.ochaId) && match) {
	  return this
	} else if (this.hasChildren()) {
	  return _.reduce(this.children, function(acc, child) {
	    return child.getDescendantByNameWithoutCoordinatesOrOchaId(name, tolerance, unify) || acc
	  }, undefined)
	} else {
	  return undefined
	}
  },

  getChild: function (i) {
    return this.children[i]
  },

  getChildById: function (i) {
    return _.find(this.children, function (node) {
      console.log(node.getId()  + ' vs  ' + i);
      return node.getId() === i
    })
  },

  hasChildren: function () {
    return this.children.length > 0
  },

  /**
   * in general toJSON returns an object and is called by
   * JSON.stringify. In this case this function is named so because
   * its intend is to be passed to a function that will eventually
   * end up used by JSON.stringify
   * @return {Object} An object representation of the Location
   */
  toJSON2: function () {
    res = { name: this.name, id: this.getId() }
    if (this.ochaId) {
      res.ochaId = this.ochaId
    }
    if (this.parent) {
      res.parentId = this.parent.getId()
    }
    if (this.coordinates) {
      res.coordinates = this.coordinates
    }
    return res
  }
}

module.exports = Location
