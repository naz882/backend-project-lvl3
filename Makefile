install:
	npm ci
start:
	npx node bin/index.js
publish:
	npm publish --dry-run
	
lint:
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8