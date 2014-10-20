'use strict'

var fs = require('fs'),
    lib = require('./lib/make');

[
  'sierra-leone',
  'liberia'
].forEach(function(country) {
  var data = require('./json/'+country+'.json');
  var code = lib.modularise(country, data);
  var fileName = 'angular-modules/'+country+'.js';
  fs.writeFile(fileName, code, function(err) {
    if (err) throw err;
    console.log(fileName+' written');
  });
});
