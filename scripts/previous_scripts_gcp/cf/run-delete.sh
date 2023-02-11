#!/bin/bash

source .env

# nvm install 10.13.0
# nvm use 10.13.0

rm -rf node_modules

npm install &> /dev/null

node cf-delete-dns-records.js "$@"
# --es-module-specifier-resolution=node