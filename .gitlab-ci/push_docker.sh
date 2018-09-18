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
REPOSITORY_ADDRESS="${REPOSITORY_HOST}/${GCLOUD_PROJECT_ID}/applications/${IMAGE_NAME}"
docker build --tag "${REPOSITORY_ADDRESS}:${PACKAGE_VERSION}" --tag "${REPOSITORY_ADDRESS}:${CI_COMMIT_SHA}" --tag "${REPOSITORY_ADDRESS}:latest" .

echo "Pushing docker image..."
gcloud auth configure-docker --quiet
docker push ${REPOSITORY_ADDRESS}:${CI_COMMIT_SHA}
# docker push ${REPOSITORY_ADDRESS}:${PACKAGE_VERSION}
# docker push ${REPOSITORY_ADDRESS}:latest
