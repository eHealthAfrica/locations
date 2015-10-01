## locations

JSON files listing locations in
- Guinea
- Liberia (Health division)
- Liberia (Clans division)
- Mali
- Sierra Leone
- Madagascar

### Adding locations

Data is provided as JSON files in order to be used in all
environments.

Adding a country requires 3 steps:

1. Add a `country_name.json` file to the `json` folder
(read the `README.md` in there, too).

### Providing Human-Readable Locations

There's a node.js CLI tool called `readable.js` in root. Run it with `$ node readable.js [countryName]`, for example `$ node readable.js guinea`.

To save the output to a text file, do `$ node readable.js guinea > guinea.txt`

### Providing GeoJson Locations (for locations with coordinates)

There's a node.js CLI tool called `toGeoJSON.js` in root. Run it with `$ node toGeoJSON.js [countryName]`, for example `$ node toGeoJSON.js`.

To save the output to a text file, do `$ node toGeoJSON.js guinea > geojson.json`

It provides an output conforming with the [GeoJSON format](http://geojson.org/), ready to be loaded in tools like [geojson.io](http://geojson.io), were the
locations can be visualized in the map if they have coordinates

### Fast visualizing geocoordinates

the `toURL.js` script will output a url ready to be consumed by [geojson.io](http://geojson.io)

example:
`$ url=$(node toGeoJSON.js [countryName] | node toURL.js)  && open -a Firefox $url`

