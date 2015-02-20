input = Liberia\ zones\ -\ DHIS2-ET-OrgUnits.csv

compatible.json: output.json oldLiberia.json merge.js
	node merge.js

output.json: nested.json flatten.js
	node flatten.js

nested.json: input.csv nest.js node_modules
	node nest.js

input.csv: $(input)
	cp "$<" $@

node_modules:
	npm install
