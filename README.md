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
