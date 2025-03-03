install:
	npm i
		
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run 
test-coverage:
	npm test -- --coverage --coverageProvider=v8
lint:
	npx eslint .
