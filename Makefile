install:
	npm i
		
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run 
test-coverage:
	NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx test --watch -- --coverage --coverageProvider=v8
lint:
	npx eslint .
