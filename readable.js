'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    data;

var getSubRegions = function (index, parentId, indentation, isLast) {
  if(data[index]){
    var subregions = _.filter(data[index].items, function(subregion) {
      return parentId === subregion.parentId;
    });
    isLast = false;
    subregions.forEach(function(region, listNumber){
      if(subregions.length === listNumber + 1){
        console.log(indentation+'└ '+ region.name+' ('+region.id+')');
        if(subregions.length === 1 ){
          isLast = true;
        }
      } else {
        console.log(indentation+'├ '+ region.name+' ('+region.id+')');
      }
      var subIndentation;
      if(isLast){
        subIndentation = indentation+'  ';
      } else {
        subIndentation = indentation+'| ';
      }
      getSubRegions(index + 1, region.id, subIndentation);
    });
  }
};

var iterateThroughRegions = function(){
  if(data[0]){
    data[0].items.forEach(function(region, listNumber){
      console.log(listNumber+1+'. '+ region.name);
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

