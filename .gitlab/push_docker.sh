#! /bin/bash

# Set image name
REPOSITORY_ADDRESS="${REPOSITORY_HOST}/${GCLOUD_PROJECT_ID}/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}"
IMAGE_NAME="${REPOSITORY_ADDRESS,,}:${CI_PIPELINE_IID}"
# Build docker image
docker build \
  --tag $IMAGE_NAME \
  --build-arg REACT_APP_ENV \
  --build-arg NODE_ENV \
  .
# Push docker image
gcloud auth configure-docker --quiet
docker push $IMAGE_NAME
