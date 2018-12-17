# Before RUNNING Dockerfile, Please make sure to run `yarn build-{env} --release`
FROM node:8-alpine as builder
# Install additional dependencies
RUN apk --no-cache update && apk --no-cache add g++ make bash zlib-dev libpng-dev && rm -fr /var/cache/apk/*
# Set Workdir
WORKDIR /mola-web
# Consume required ENVs
ARG REACT_APP_ENV
ARG NODE_ENV
# Copy minimal required files
COPY .npmrc .
COPY package*.json .
COPY yarn.lock .
# Install Node.js dependencies
RUN yarn install --no-progress
# Build!
COPY . .
RUN node_modules/.bin/babel-node tools/run build -- --release --docker REACT_APP_ENV=${REACT_APP_ENV} NODE_ENV=${NODE_ENV}

# Base Image
FROM node:8-alpine
# Set Workdir
WORKDIR /mola-web
# Copy built files
COPY --from=builder /mola-web/build ./build
COPY --from=builder /mola-web/node_modules ./node_modules
# Run the container under "node" user by default
USER node
# Start App!
CMD [ "node", "/mola-web/build/server.js" ]
