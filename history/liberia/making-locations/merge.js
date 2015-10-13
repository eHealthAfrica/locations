var fs = require('fs'),
    assert = require('assert'),
    pd = require('pretty-data').pd,
    _ = require('lodash'),
    newFile = 'output.json',
    oldFile = 'oldLiberia.json',
    newLocations = JSON.parse(fs.readFileSync(newFile, 'utf-8')),
    oldLocations = JSON.parse(fs.readFileSync(oldFile, 'utf-8')),
    oldMontserradoDistricts = oldLocations[1]
      .items
      .filter(function(district){
        return district.parentId === 1;
      })
      .map(function(district) {
        district.name = 'OLD -- '+district.name;
        return district;
      });

assert.equal(newLocations[1].items.length, 163);
assert.equal(oldLocations[1].items.length, 73);

assert.equal(oldMontserradoDistricts.length, 17);
newLocations[0].items
  .push({
    name: 'OLD -- Montserrado',
    id: 1
  });
newLocations[1].items = newLocations[1].items
  .concat(oldMontserradoDistricts);

fs.writeFileSync('compatible.json', pd.json(newLocations))
