The goal:

https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/1029
add coordinates to adminLevel4
add ochaids to locations

The problem:
The source file './sources/SLadminLv4.json' has names and ids that don't match our '../../../json/sierra_leone.json'

Using the following script

```bash
  node lib/history/sierra_leone/add_coordinates_to_admin_level_4.js
```

we get coordinates added following this ordered heuristics:

1) match adminLevel3 code + match adminLevel4 name or,
2) match adminLevel3 name + match adminLevel4 name
3) match any level by name

To match the code we need to **adapt the ids of adminLevel3**. This
is done with a custom mapping. for adminLevel4 the mapping is much more complex.
We also try different **Levensthein distances** for matching the names of levels 3 and 4.

Hereby the matched documents following the heuristics: './output/found.txt'

custom manipulations:there is a match that needs to be removed:
- added ochi ids form level 0 and 1
- SLE010210 wrong coordinates, we remove them
- SLE02010203 one 'konta' too much

Gboro-Lokoma "name": "gboro-lokoma", "id": "12-10-02" seems to be repeated
Komboya,Gao,Vahun ? no kmoboya > Gao
Lugbu,Baimba ?



to find the documents without ochaid or without coordinates run respectively:
`
jq 'map(.items) | flatten | map(select(has("ochaId") | not))' json/sierra_leone.json

`
`
jq 'map(.items) | flatten | map(select(has("coordinates") | not))' json/sierra_leone.json

`
