'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    data;

var toTitleCase = function(str){
  return str.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

var getSubRegions = function (index, parentId, indentation, isLast) {
  if(data[index]){
    var subregions = _.filter(data[index].items, function(subregion) {
      return parentId === subregion.parentId;
    });
    isLast = false;
    subregions.forEach(function(region, listNumber){
      var thisIndentation = indentation + '├ ';
      if(subregions.length === listNumber + 1){
        thisIndentation = indentation + '└ ';
        isLast = true;
      }
      console.log(thisIndentation + toTitleCase(region.name)+' ('+region.id+')');
      var subIndentation;
      if(isLast){
        subIndentation = indentation + '  ';
      } else {
        subIndentation = indentation + '| ';
      }
      getSubRegions(index + 1, region.id, subIndentation, isLast);
    });
  }
};

var iterateThroughRegions = function(){
  if(data[0]){
    data[0].items.forEach(function(region, listNumber){
      console.log(listNumber+1+'. '+ toTitleCase(region.name) + ' ('+region.id+')');
      getSubRegions(1, region.id, '   ', false);
    });
  }
};

var getUnderline = function (string) {
  var underline = '';
  while(underline.length < string.length){
    underline += '-';
  }
  console.log(underline);
};

if(process.argv.length === 2){
  console.log('Please add a country parameter, i.e. $node readable.js guinea');
} else {
  var dataString = fs.readFileSync('./json/'+process.argv[2]+'.json').toString();
  data = JSON.parse(dataString);
  var title = 'Administrative regions of '+ process.argv[2];
  getUnderline(title);
  console.log(title);
  getUnderline(title);
  iterateThroughRegions();
}

