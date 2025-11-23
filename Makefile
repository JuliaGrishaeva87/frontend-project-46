install: 
	npm ci
	
gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

test-watch:
	npm run test-watch