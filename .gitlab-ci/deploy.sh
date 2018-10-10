#! /bin/bash
echo "Initialize SSH Keys"
eval $(ssh-agent -s)
ssh-add <(echo "$SSH_PRIVATE_KEY")
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config

echo "Cloning ${DEPLOYMENT_REPO} repo..."
mkdir /deployment
cd /deployment
git clone git@git.sstv.io:infra/$DEPLOYMENT_REPO.git
cd $DEPLOYMENT_REPO

echo "Edit files..."
REPOSITORY_ADDRESS="${REPOSITORY_HOST}/${GCLOUD_PROJECT_ID}/${FOLDER_NAME}/${IMAGE_NAME}"
sed -i "s@image: asia.gcr.io.*@image: ${REPOSITORY_ADDRESS}:${CI_COMMIT_SHA}@g" $NAMESPACE/$APP_NAME/deployment.yaml

echo "Committing and pushing..."
cat $NAMESPACE/$APP_NAME/deployment.yaml
git config --global user.email "kareem.lukitomo@supersoccer.co.id"
git config --global user.name "Kareem Lukitomo"
git commit -am "🚀 Auto-sync ${APP_NAME} with ${REPOSITORY_ADDRESS}:${CI_COMMIT_SHA}"
git push origin master
