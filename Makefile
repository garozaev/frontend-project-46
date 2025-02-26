install: install
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10
		
gendiff:
	 node bin/gendiff.js
publish:
	npm publish --dry-run 
lint:
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch