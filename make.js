'use strict'

var fs = require('fs'),
    lib = require('./lib/make');

var modulesDir = './angular-modules/';

console.log('fetching data');
var countries = [
  'sierra_leone',
  'liberia',
  'guinea',
  'mali'
].map(function(country) {
  var data = require('./json/'+country+'.json');
  return ({
    name: country,
    data: data
  });
});

console.log('generating modules containing a single country data each');
countries.forEach(function(country) {
  var code = lib.modularise(country);
  var fileName = modulesDir+'loose/'+country.name+'.js';
  fs.writeFile(fileName, code, function(err) {
    if (err) throw err;
    console.log(fileName+' written');
  });
});

console.log('generating one module containing all country data');
var code = lib.modulariseMultiple(countries);
var fileName = modulesDir+'all.js';
fs.writeFile(fileName, code, function(err) {
  if (err) throw err;
  console.log(fileName+' written');
});
