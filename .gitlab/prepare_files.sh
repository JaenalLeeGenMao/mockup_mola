#!/bin/bash

echo 'Preparing files...'
sed -i '/node_modules/d' .dockerignore
mv Dockerfile.deploy Dockerfile
