.PHONY: help

# Print help
help:
	@cat $(MAKEFILE_LIST) | docker run --pull --rm -i xanders/make-help

# Use npm scripts please
app:
	@echo "Start or build with npm scripts please, see package.json scripts section"

##
## Docker
##

# Start
start:
	docker-compose up -d

# Start
start-prod:
	docker-compose -f docker-compose.prod.yml up -d --build

# Build
build:
	docker-compose build --pull --parallel

# Build server image
build-image:
	docker build --build-arg NODE_VERSION=14 .

# Destroy
destroy:
	docker-compose down
