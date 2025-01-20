PORT ?= 3000

install:
	npm install

start:
	node index.js

run:
	@echo "Running the server..."
	PORT=$(PORT) npm start

check-deps:
	@echo "Checking for missing dependencies..."
	npm ls --depth=0 || npm install

test:
	npm test

db-init:
	node db-init.js

clean:
	rm -rf node_modules logs/*.log

start-dev:
	NODE_ENV=development PORT=$(PORT) node index.js

start-prod:
	NODE_ENV=production PORT=$(PORT) node index.js
