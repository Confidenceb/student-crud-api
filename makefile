PORT ?= 3000
IMAGE_NAME = student-crud-api
CONTAINER_NAME = student-crud-container

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

docker-build:
	docker build -t $(IMAGE_NAME) .

docker-run:
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):3000 \
		-v $(PWD)/data:/app/data \
		-v $(PWD)/logs:/app/logs \
		$(IMAGE_NAME)

docker-stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

docker-logs:
	docker logs $(CONTAINER_NAME)

docker-shell:
	docker exec -it $(CONTAINER_NAME) /bin/bash

docker-clean: docker-stop
	docker rmi $(IMAGE_NAME)

.PHONY: install start run check-deps test db-init clean start-dev start-prod docker-build docker-run docker-stop docker-logs docker-shell docker-clean
