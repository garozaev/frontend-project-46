install:
	npm i
		
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run 
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx test
lint:
	npx eslint .
