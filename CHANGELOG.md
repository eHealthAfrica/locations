# Change Log

All notable changes to this project will be documented in this
file. This file is structured according to http://keepachangelog.com/

- - -

## 4.1.2 2017-07-20

### Added

- Makeni, Konta, Matotoka, Khafala, and Ka Gbara Sections to Bombali Sebora Chiefdom (SL)

## 4.1.1 2017-02-14

### Changed

All changes are about Sierra Leone

- Switch names in order to have chiefdom Folosaba Dembelia and section Musaia
- Change the name of a chiefdom from Dia to Dea
- Correct the spelling of Bumpe to Bumpeh in Moyamba

## 4.1.0 2016-12-12

### Changed
- [Sierra Leone] Chiefdom and Section levels. Keeping old ones as deprecated
 (and keeping their ids)

## 4.0.2 2016-08-09

### Fixed

  - In Sierra Leone, renamed chiefdom "Dembelia Musaia" to "Musaia"
    and renamed section "Musaia" to "Folosaba Dembelia", according to
    ticket CCSL-1701. Due to the locations being parsed by id, this
    can be considered as a fix, which will not change anything to the
    user, besides a small bug described in CCSL-1757 which can be
    eliminated with a migration

## 4.0.1 [07.12.2015]

### Added
  - Mokpedeh & Kaduawo, removed in previous version.
  They also get the parent's coordinates.

## 4.0.0 [06.12.2015]

This version is breaking, and adds `deprecated`
flag to help clients making the breaks compatible.
Follow-up of changes in version 3.4.0

### Changed
  - sections with missing coordinates get the parent's coordinates as a default.

### Added
   the following are restored after being removed in 3.3.0 and flaged as deprecated
  - Bonthe Town
  - York Island as section of `Dema` chiefdom.
  - Bonthe Central as section of `Sittia` chiefdom.
  - Bonthe Island as chiefdom of `Bonthe` district.

### Removed
  - Mokpedeh & Kaduawo repeated, fixed with OCHA reference.
    - https://github.com/eHealthAfrica/locations/issues/60
    - https://github.com/eHealthAfrica/locations/issues/59


## 3.4.0 [05.01.2016]
### Removed
- (SL):
	- West > Western Urban > West III >  quarry/wilkinson road [https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/1206]
        - bonthe town (we don't use localities).

### Changed
- (SL): moved
	- York Island as section of `Dema` chiefdom.
	- Bonthe Central as section of `Sittia` chiefdom.
	- Bonthe Island as chiefdom of `Bonthe` district.

### Added
- (SL): add Grass Field / lumley (31-08-10)

## 3.3.0 [25.12.2015]

### Changed
- (SL) reorganize tree for western region: use chiefdoms and sections in Western Urban and Western Rural

### Fixed
- (SL) pujehun district remove duplicated: Laimaba 1, Laimaba

## 3.2.0 11.11.2015
### Added
- (SL) added ochaId
- (SL) added coordinates to section

### Changed
- (SL) reordered json file by `id`

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

