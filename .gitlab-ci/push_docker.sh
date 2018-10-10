#! /bin/bash

echo "Getting package.json version..."
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
echo $PACKAGE_VERSION
echo "Building docker image..."
REPOSITORY_ADDRESS="${REPOSITORY_HOST}/${GCLOUD_PROJECT_ID}/${FOLDER_NAME}/${IMAGE_NAME}"
docker build --tag "${REPOSITORY_ADDRESS}:${CI_COMMIT_SHA}" .

echo "Pushing docker image..."
gcloud auth configure-docker --quiet
docker push ${REPOSITORY_ADDRESS}:${CI_COMMIT_SHA}
