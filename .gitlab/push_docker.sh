#! /bin/bash

# Set image name
REPOSITORY_ADDRESS="${REPOSITORY_HOST}/${GCLOUD_PROJECT_ID}/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME}"
IMAGE_NAME="${REPOSITORY_ADDRESS,,}:${CI_PIPELINE_IID}"

# Auth gcloud
gcloud auth configure-docker --quiet

# Build Docker!
docker build --tag $IMAGE_NAME .

gsutil -m -h "Cache-Control:public,max-age=31556952" cp -r build/public/assets/* ${GCS_PATH}/assets/
gsutil -m -h "Cache-Control:public,max-age=31556952" cp -r src/global/assets-global/* ${GCS_PATH}/assets-global/

# Push docker image
docker push $IMAGE_NAME
