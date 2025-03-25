gendiff:
	node bin/gendiff.js

.PHONY: 
	publish

publish:
	npm publish --dry-run