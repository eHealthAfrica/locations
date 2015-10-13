var fs=require('fs'),
    parse = require('csv-parse'),
    pd = require('pretty-data').pd,
    _ = require('lodash'),
    content = fs.readFileSync('input.csv', 'utf-8'),
    nested = {},
    parsed;

parse(content, function(err, output) {
  parsed = output;
  // slice to eliminate the first row, containing the CSV header
  parsed.slice(1).map(single);
  fs.writeFileSync('nested.json', pd.json(nested))
});

function nest(root, path, leaf) {
  var value = path.shift();
  if (!root[value]) {
    root[value] = {};
  }
  var r = root[value];
  if (path[0]) {
    if (!r.childs) {
      r.childs = {};
    }
    nest(r.childs, path, leaf);
  } else {
    r.info = leaf;
  }
}

function single(row) {
  var county = row[3],
      district = row[4],
      community = row[5],
      village = row[6],
      leaf = {
        name: row[0],
        DHISCode: row[1],
        DHISCompleteName: row[2]
      };
  nest(nested, [county, district, community, village], leaf);
}
