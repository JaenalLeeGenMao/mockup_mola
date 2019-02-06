FROM node:8-alpine as builder
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
# Build!
COPY . .
RUN node_modules/.bin/babel-node tools/run build -- --release --docker
# Run the container under "node" user by default
USER node
# Start App!
CMD [ "node", "/mola-web/build/server.js" ]
