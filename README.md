[![Build Status](https://travis-ci.org/eHealthAfrica/locations.svg?branch=develop)](https://travis-ci.org/eHealthAfrica/locations)

## locations

JSON files listing locations in Sierra Leone and Liberia

### Adding locations and Making

Data is provided as JSON files in order to be used in all
environments.

Adding a country requires 3 steps:

When you add a country, add a `country_name.json` file to the `json` folder (read the `README.md` in there, too). Then add the country to `make.js` (just add the filename to the `countries` array near the top of the file). Then `$ node make.js` to generate the angular module for that country.
