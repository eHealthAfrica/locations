task description: https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/959

Sources to be found in https://drive.google.com/file/d/0B8l3237Malk7TnBpeG9WTG1GbU9NdURiQ25HQVBQbnpfUXpn/view?usp=drive_web


Add the admin division 4 (section) and 5 (locality) from the files

steps:

1)  transform xls to csv
using [csvkit](https://csvkit.readthedocs.org/en/0.9.0/tutorial/1_getting_started.html#in2csv-the-excel-killer)


```bash
for a in List\ of\ Localities/*  ; do in2csv $(basename $a) > $(basename -a .xls $a).csv ; done
```

2) Reorder the records on the csv files to match the 'chiefdom' ids of the current locations

output a list of all the chiefdoms to add `sections` to:

```bash
cat history/sierra_leone/add_sections_localities_admin_divisions/sources/* | cut -d ',' -f 1 | uniq | tr '[:upper:]' '[:lower:]'
```

output a list of all the current chiefdoms and its id numbers

```bash
cat json/sierra_leone.json| jq '.[2] | .items[] | .name, .id' | sed 's/"//g'
```

by comparing both lists we can know how we need to reorder the csv rows groups (by district) to
match the already present id in the json/sierra_leone.json file.

changes:
- bo:  exchange `bagbe` and `bagbo`
- bobmali: added dummy line for `bombali sebora`
- kailahun :  put kissi tongi after kissi teng. Fix mispell error in the source: Corrected Kisis Tongi to Kissi Tongi
- kambia: exchange `bramaia` with `gbinle dixin`
- koinadugu NOTE making `dembelia musaia` === `folosaba dembelia` see comments in https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/959
- pujehun  Kpanga - Kabonde  moved after `Mano Sakrim`. `Futa Pejeh` moved after `Panga Krim`
- moyamba: fix Gbengbasoke -> Gbengbatoke
- pujehun: Laimaba 1 and Laimaba made one. (on the other source there is only one)

3)  Execute the script:

```bash
cd lib/history/sierra_leone && node generate_data_model_from_csv_sections_and_localities.js > DESTINATION_FILE
```

It loads the cvs and the current data and outputs a file json compatible with the data-models format

- csv -> Array[Object (having as key the colum name)]

```
 I -> csv
 O -> [{ CHIEFDOM: 'wonde', SECTION: 'manyeh', LOCALITY: 'konia' }, ...]
```

- Array[Object (having as key the colum name)] -> Array[Object] nested objects

```
 I -> [{ CHIEFDOM: 'wonde', SECTION: 'manyeh', LOCALITY: 'konia' }, ...]
 O -> { Object } taking keys form 'CHIEFDOM' and 'SECTION',  { wonde: { 'manyeh':  ['konia', ...] }, ... }
 ```

- Array[Object] nested objects -> Array[[Location](../../../lib/location.js)] tree composite

```
 I -> { Object } taking keys form 'CHIEFDOM' and 'SECTION',  { wonde: { 'manyeh':  ['konia', ...] }, ... }
 O -> [{ name: wonde, id: undefined, children: [... ] }, ...]
 ```

-> Array[[Location](../../../lib/location.js)] tree composite -> JSON(data-models compatible)

```
I ->  [{ name: wonde, id: undefined, children: [... ] }, ...]
O ->
     {
      'depth': 3,
      'name': 'chiefdom',
      'items': [
      ...
        ,
        {
          'name': 'manyeh',
          'id': '1-1',
          'parentId': '1'
        },
       ..
      ]
     }
```

4) manually add the generated level 4 and 5 to the locations file
