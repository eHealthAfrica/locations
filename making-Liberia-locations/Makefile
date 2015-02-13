input = Liberia\ zones\ -\ DHIS2-ET-OrgUnits.csv

output.json: nested.json flatten.js
	node flatten.js

nested.json: $(input) nest.js node_modules
	node nest.js

node_modules:
	npm install
