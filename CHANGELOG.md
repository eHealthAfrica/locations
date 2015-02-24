### 1.6.0 -- 20 February 2015

#### Unreleased

Fix:
- Changed Liberia level 2 name to "zone or district"

#### Major

Add DHIS locations for Liberia, deprecate current ones, see story
1149. This is not breaking because currently there are just locations
belonging to county `1`, Montserrado, in the database. We are keeping
them, although we are changing the name in order to make it clear that
they are deprecated
