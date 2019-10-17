#! /bin/bash

# Set image name
REPOSITORY_ADDRESS="${REPOSITORY_HOST}/${GCLOUD_PROJECT_ID}/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME}"
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
  --build-arg CDN_PATH \
  --build-arg VIDEO_ENDPOINT \
  --build-arg AUTH_ENDPOINT \
  --build-arg SUBSCRIPTION_API_URL \
  --build-arg OAUTH_APP_KEY_WEB \
  --build-arg OAUTH_APP_SECRET_WEB \
  --build-arg OAUTH_APP_KEY_MOBILE \
  --build-arg OAUTH_APP_SECRET_MOBILE \

  .

mkdir /temp-assets
docker_temp=$(docker create ${IMAGE_NAME})
docker cp $docker_temp:/mola-web/build/public/assets/. /temp-assets/.
docker rm -v $docker_temp
gsutil -m -h "Cache-Control:public,max-age=31556952" cp -r /temp-assets/* ${GCS_PATH}/assets/
gsutil -m -h "Cache-Control:public,max-age=31556952" cp -r src/global/assets-global/* ${GCS_PATH}/assets-global/
rm -fr /temp-assets

# Push docker image
docker push $IMAGE_NAME
docker push $CACHE_IMAGE
