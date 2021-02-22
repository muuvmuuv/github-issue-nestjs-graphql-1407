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

# Build
build:
	docker-compose build --pull --parallel
