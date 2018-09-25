# Preinstalation on docker
# docker run -ti alpine
# apk add --no-cache python nodejs


FROM node:8-alpine

WORKDIR /var/www/mola-web

# copy all package*.json files into current WORKDIR
COPY package*.json ./

# installing dependencies
# RUN npm install --production && npm install node-gyp
RUN npm install --force

# copy all files and folders into container
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
