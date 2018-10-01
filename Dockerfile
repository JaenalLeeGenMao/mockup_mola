# FROM node:8-alpine

# WORKDIR /var/www/mola-web

# # copy all package*.json files into current WORKDIR
# COPY package*.json ./

# # installing dependencies
# RUN yarn

# # copy all files and folders into container
# COPY . .

# # Run the container under "node" user by default
# USER node

# EXPOSE 3000
# CMD ["yarn", "dev"]


# Before RUNNING Dockerfile, Please make sure to run `yarn build-{env} --release`
FROM node:8-alpine

WORKDIR /var/www/mola-web

COPY package*.json .
COPY yarn.lock .

# Install Node.js dependencies
RUN yarn install --no-progress

COPY . .
RUN yarn build --release

# Run the container under "node" user by default
USER node

CMD [ "node", "./build/server.js" ]
