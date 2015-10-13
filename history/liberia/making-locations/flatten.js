var fs=require('fs'),
    pd = require('pretty-data').pd,
    _ = require('lodash'),
    content = fs.readFileSync('nested.json', 'utf-8'),
    parsed = JSON.parse(content),
    levels = [{
      depth: 0,
      name: 'county',
      plural: 'counties',
      items: []
    }, {
      depth: 1,
      name: 'district',
      plural: 'districts',
      items: []
    }, {
      depth: 2,
      name: 'community',
      plural: 'communities',
      items: []
    }, {
      depth: 3,
      name: 'village',
      plural: 'villages',
      items: []
    }];

addToLevel(parsed, 0);
fs.writeFileSync('output.json', pd.json(levels))

function addToLevel(obj, depth, parent) {
  _.map(obj, function(value, key) {
    if (value.info) {
      value.info.id = value.info.DHISCompleteName;
      if (parent) {
        value.info.parentId = parent;
      }
      levels[depth].items.push(value.info);
      addToLevel(value.childs, depth+1, value.info.id);
    } else {
      console.log('warning, '+JSON.stringify(value)+' has no info');
    }
  });
}
