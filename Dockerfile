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
# CMD ["yarn", "start"]


FROM node:8-alpine

WORKDIR /var/www/mola-web

COPY ./build/package.json .
COPY ./build/yarn.lock .

# Install Node.js dependencies
RUN yarn install --production --no-progress

# Copy application files
COPY ./build .

# Run the container under "node" user by default
USER node

CMD [ "node", "./build/server.js" ]
