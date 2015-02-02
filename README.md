[![Build Status](https://travis-ci.org/eHealthAfrica/locations.svg?branch=develop)](https://travis-ci.org/eHealthAfrica/locations)

## locations

JSON files listing locations in
- Guinea
- Liberia
- Mali
- Sierra Leone
- Madagascar

### Adding locations and Making

Data is provided as JSON files in order to be used in all
environments.

Adding a country requires 3 steps:

1. Add a `country_name.json` file to the `json` folder
(read the `README.md` in there, too).
2. Add the country to `make.js` (just add the filename to the
`countries` array near the top of the file).
3. Execute `$ node make.js` to generate the angular module
for that country.

### Providing Human-Readable Locations

There's a node.js CLI tool called `readable.js` in root. Run it with `$ node readable.js [countryName]`, for example `$ node readable.js guinea`.

To save the output to a text file, do `$ node readable.js guinea > guinea.txt`
