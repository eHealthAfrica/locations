Task
===
From task https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/952
This folder aims to complete:  `Add geocoords to locations.json file + identify missing / mismatched entries`

`coordinates` are administrative region centroids. In case it is missing, the parent's admin coordinates are used.

`tree scripts`

scripts
- ├── [add_coordinates_from_sources.js](add_coordinates_from_sources.js) is the code used to produce the locations with coordinates. It currently takes as input the locations file for Sierra Leona
- └── [complete_coordinates_from_parent_locations.js](complete_coordinates_from_parent_locations.js) is the code used to complete missing coordinates with parent coordiantes

`tree sources`

sources
- ├── [sierra_leone.json](sierra_leone.json) source file without coordinates
- ├── [sl-level-2.json](sl-level-2.json) GIS provided file with locations + coordinates
- ├── [sl-level-3.json](sl-level-3.json) GIS provided file with locations + coordinates
- └── [sl_coordinates_levels_2_3.json](sl_coordinates_levels_2_3.json) Generated source file from https://github.com/eHealthAfrica/search/blob/master/resources/elasticsearch/scripts/transform/GeoLocations.groovy


coordinates are added to each matched entries:

```
"coordinates": {
    "lat": 7.96276438159488,
    "lon": -11.7196907051462
}
```

files:

- [locations_with_missing_coordinates.txt](./locations_with_missing_coordinates.txt) lists the names of the locations missing coordinates.
- [manual_mapping.csv](./manual_mapping.csv) In order to complete the [](./locations_with_missing_coordinates.txt) this manual mappings have been applied
- [locations_with_coordinates_manually_completed.json](./locations_with_coordinates_manually_completed.json) is the end file with the added coordinates both by the script and manually.
- [diff_sierra_leona.diff](./diff_sierra_leona.diff) diff with deprecated readable locations. Used for [adding deprecated locations](https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/904 )
- [diff_sierra_leona_json.diff](./diff_sierra_leona_json.diff) diff with deprecated locations. Used for [adding deprecated locations](https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/904 )


Run
===

cd into the project's folder:

`cd mapping-coordinates-sierra-leona-locations`

run the scripts:

`node scripts/add_coordinates_from_sources.js`
`node scripts/complete_coordinates_from_parent_locations.js`

Since there are a lot of missing locations we'll followup with the GIS team.
