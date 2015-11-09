The goal:

https://github.com/eHealthAfrica/sl-ebola-call-admin/issues/1029
add coordinates to adminLevel4

The problem:
The source file './sources/SLadminLv4.json' has names and ids that don't match our '../../../json/sierra_leone.json'

Using the following script

```bash
  node lib/history/sierra_leone/add_coordinates_to_admin_level_4.js
```

we get coordinates added following this heuristics:

- match adminLevel3 code + match adminLevel4 name or,
- match adminLevel3 name + match adminLevel4 name

To match the code we need to **adapt the ids of adminLevel3**. This
is done with a custom mapping. for adminLevel4 the mapping is much more complex.
We also try different **Levensthein distances** for matching the names of levels 3 and 4.

Hereby the matched documents following the heuristics: './output/found.txt'
