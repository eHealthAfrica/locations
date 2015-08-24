Task
==
From task https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/952
This folder aims to complete:  `Add geocoords to locations.json file + identify missing / mismatched entries`

From https://github.com/eHealthAfrica/search/blob/master/resources/elasticsearch/scripts/transform/GeoLocations.groovy
we extract the the file [./sources/sl_coordinates_levels_2_3.json]. It is used as coordinates sources in [./index.js]

The source file from the GIS team is added to the sources folder
- [./sources/sierra_leone.json]
- [./sources/sl-level-3.json]


coordinates are added to each matched entries:

```
"coordinates": {
    "lat": 7.96276438159488,
    "lon": -11.7196907051462
}
```

files:
- [./index.js] is the code used to produce the locations with coordinates
- [./locations_with_missing_coordinates.txt] lists the names of the locations missing coordinates.
- [./locations_with_coordinates_manually_completed.json] is the end file with the added coordinates both by the script and manually.

In order to complete the `locations_with_missing_coordinates` the following manual mappings have been identified and applied: [./manual_mapping.csv]

Since there are a lot of missing locations we'll followup with the GIS team.
