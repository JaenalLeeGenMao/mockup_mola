#! /bin/bash

# Set image name
REPOSITORY_ADDRESS="${REPOSITORY_HOST}/${GCLOUD_PROJECT_ID}/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}"
IMAGE_NAME="${REPOSITORY_ADDRESS,,}:${CI_PIPELINE_IID}"
CACHE_IMAGE="${REPOSITORY_ADDRESS,,}:latest"

# Auth gcloud
gcloud auth configure-docker --quiet

# Try get node_modules cache first
docker pull $CACHE_IMAGE || true

# Build Docker!
docker build \
  --cache-from $CACHE_IMAGE \
  --tag $IMAGE_NAME \
  --tag $CACHE_IMAGE \
  --build-arg REACT_APP_ENV \
  --build-arg NODE_ENV \
  .

# Push docker image
docker push $IMAGE_NAME
docker push $CACHE_IMAGE
