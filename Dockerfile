FROM node:10-alpine as builder
# Install additional dependencies
RUN apk --no-cache update && apk --no-cache add g++ make bash zlib-dev libpng-dev && rm -fr /var/cache/apk/*
# Set Workdir
WORKDIR /mola-web
# Copy minimal required files
COPY .npmrc .
COPY package.json .
COPY yarn.lock .
# Install Node.js dependencies
RUN yarn install --no-progress --production=false
# Consume required ENVs
ARG REACT_APP_ENV
ARG NODE_ENV
ARG CDN_PATH
ARG REACT_APP_ENV
ARG NODE_ENV
ARG CDN_PATH
ARG VIDEO_ENDPOINT
ARG AUTH_ENDPOINT
ARG SUBSCRIPTION_API_URL
ARG OAUTH_APP_KEY_WEB
ARG OAUTH_APP_SECRET_WEB
ARG OAUTH_APP_KEY_MOBILE
ARG OAUTH_APP_SECRET_MOBILE

RUN echo "test dong auth $AUTH_ENDPOINT"
RUN echo "oauth app key $OAUTH_APP_KEY_WEB"

# Build!
COPY . .
RUN node_modules/.bin/babel-node tools/run build -- --release --docker
# Run the container under "node" user by default
USER node
# Start App!
CMD [ "node", "/mola-web/build/server.js" ]
