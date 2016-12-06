# Start the server
s:
	node server.js

# Build
build:
	npm install
	cd functions/mom && npm install
	cd functions/mom && node index.js

# Deploy to AWS Lambda
deploy: build
	apex deploy

# Test
test: build
	./node_modules/mocha/bin/mocha
