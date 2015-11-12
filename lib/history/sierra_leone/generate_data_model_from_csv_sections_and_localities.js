/*
*
* SCRIPT to solve issue: https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/1029
*
* It loads the current locations data ('json/sierra_leone.json')
* it loads the source file with coordinates in format send by the GIS team ('history/sierra_leone/add_coordinates_to_admin_level_4/sources/SLadminLv4.json')
* matches our Location with the Loction (based on the ADM3_CODE and the AMD4NAME) and adds the coordinates
*
*
* the following admindivision2 ids are not  found
*
* SLE010291, SLE010391, SLE020191, SLE030191, SLE030291
*
*/

var _ = require('lodash')
var assert = require('assert')
var fs = require('fs')
var Location = require('./../../location.js')
var locations = Location.loadFlatten(require('../../../json/sierra_leone.json'))
var locations_with_coordinates = require('../../../history/sierra_leone/add_coordinates_to_admin_level_4/sources/SLadminLv4.json')


/**
 * unify some numbers in roman literal to arabic notation
 * @param {String} s the string containing the numbers
 * @return {String} string with updated numbers
 */
function unifyNumbers(s) {
  var mapping =  {
     '1': 'I', 
     '2': 'II', 
     '3': 'III', 
     '4': 'IV', 
     '5': 'V',
     '6': 'VI'
  }
  _.each(mapping, function(key, value) {
    s = s.replace(new RegExp(' ' + key + '$'), ' ' +  value)
  })
  return s
}



/**
 * adapts the source ADM[N]_CODE to our source's ids
 * example: SLE030412
 * will be adapted to 4-12, since we don't use
 * 1) country code `SLE`
 * 2) adminLevel1 code `03` (would be `S` for us)
 * 3) we start referencing from admin level 2 code, no 0 padded
 * @param {String} code admin division 3 code `ADM3_CODE`
 * @return {String} an id in the format we are using
 */


function adaptId(id) {
  /**
   * we have this mismatch with the level1 ids 
   *     name       | their id      |    our id
   *  ------------- | ------------- | -------------
   *  southern      |            3  |       0
   *  east          |            1  |       1
   *  northern      |            2  |       2
   *  western       |            4  |       3
   */
  function mapIds(id) {
    return { '3': '0',
             '1': '1',
             '2': '2',
             '4': '3' }[id]
  }

  /*
   *
   * furthermore in level 2 we have the following mismatch
   *     name       | their id      |    our id
   *  ------------- | ------------- | -------------
   *  western urban |           42  |       31
   *  western rural |           41  |       32
   *
   *  @param {String} id a 2 letter representing a numerical id
   *  @return {String} a 2 letter string id
   *
   */
  function mapIdsAdminDivision2(id) {
	  switch (id) {
	  	case '32':
			return id.replace('32', '31')
	  		break;
	  	case '31':
			return id.replace('31', '32')
	  		break;
	  	default:
			return id
	  		
	  }
  }

  var level3Id = id.slice('SLE0'.length).split('')
  var adminDivision3Id = level3Id.slice(-2).join('')
  var adminDivision2Id = level3Id.slice(-6,-2)
  adminDivision2Id[0] = mapIds(adminDivision2Id[0])
  var adminDivision2Id = adminDivision2Id.join('').replace(/0/g, '')
  adminDivision2Id = mapIdsAdminDivision2(adminDivision2Id)
  return adminDivision2Id + '-' + adminDivision3Id
}


var res =  _.map(locations_with_coordinates, function interate(source_item) {
   var location = locations.getDescendantById(adaptId(unifyNumbers(source_item.ADM3_CODE)))
   if (!location) {
     return '[ not found ' + source_item.ADM3_CODE + ']'
   }
   var correctLocation = location.getDescendantByName(source_item.ADM4_NAME, 0)
   return  correctLocation ?  
   '[ ' + source_item.ADM4_NAME + ' - ' + source_item.ADM3_CODE + ' ]'  +
   '[ ' + correctLocation.name + ' - ' + correctLocation.getId() + ' ]' 
   :
   '[ ' + source_item.ADM4_NAME + ' - ' + source_item.ADM3_CODE + ' ]'

 })
assert.equal(adaptId('SLE030412'), '4-12')
assert.equal(adaptId('SLE010212'), '12-12')
assert.equal(adaptId('SLE020412'), '24-12')
assert.equal(adaptId('SLE040212'), '31-12')
assert.equal(adaptId('SLE040101'), '32-01')
assert.equal(adaptId('SLE040208'), '31-08')

console.log(res)
