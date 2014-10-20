var mustache = require('mustache');

module.exports = {
  modularise: function(country, data) {
    var template = "angular.module('eHealth.locations').constant('{{name}}', {{&data}});";
    return mustache.render(template, {
      name: 'locations-'+country,
      data: JSON.stringify(data)
    });
  }
};
