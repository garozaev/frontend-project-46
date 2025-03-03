install:
	npm i
		
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run 
test-coverage:
	npx test -- --coverage --coverageProvider=v8
lint:
	npx eslint .
