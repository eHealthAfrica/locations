# Change Log

All notable changes to this project will be documented in this
file. This file is structured according to http://keepachangelog.com/

- - -
## 3.2.0 11.11.2015
### Added
- (SL) added ochaId
- (SL) added coordinates to section

### Changed
- reordered sl json file by `id`

###Fixed
- removed dummy entry: added dummy line for `bombali sebora`
- corrected in moyamba: fix Gbengbasoke -> Gbengbatoke

## 3.1.3 03.11.2015

###Fixed
- corrected locations with parentId '11-15' refering to unexistant parent (2) part

## 3.1.2 27.10.2015

###Fixed
- corrected locations with parentId '11-15' refering to unexistant parent

## 3.1.1 14.10.2015

Note that this version is not breaking, because version 3.1 did not
make it to any production system

### Removed
- feat(locations): level 5 (locality); wasn't required.

## 3.1.0 13.10.2015
### Changed
- docs(license): added Apache-2.0

### Added
- feat(locations): add level4 (section) and level 5 (locality) to some SL districts
- feat(tools): library around a Location model to transform csv -> JSON locations file format
- feat(tools): tranform to GeoJSON
- feat(tools): add pipe script to get URL ready to be used with http://geojson.io

## [3.0.1] 02.09.2015
### Added
missing AdminDivision3 location to restore for SL (31-01)

## [3.0.0] 25.08.2015
### Added
- Deprecated some chiefdoms (from version 1.7.0 Sierra Leona) with deprecated flag
- Centroid coordinates to Sierra Leone locations. In case of no info, parent's coordinates

### Removed
- Build functionality & tests moved to https://github.com/eHealthAfrica/angular-locations

## [2.0.0] 02.07.2015

### Changed
Changes some chiefdoms for Sierra Leone! This is a breaking change,
see https://github.com/eHealthAfrica/locations/issues/27

## [1.7.0] 12.06.2015

### Added
Add clans locations for Liberia as new country option,
the DHIS locations remains with same code.

## [1.6.1] 24.02.2015

### Fixed
- Changed Liberia level 2 name to "zone or district"

## [1.6.0] 20.02.2015

### Added
Add DHIS locations for Liberia, deprecate current ones, see story
1149. This is not breaking because currently there are just locations
belonging to county `1`, Montserrado, in the database. We are keeping
them, although we are changing the name in order to make it clear that
they are deprecated

