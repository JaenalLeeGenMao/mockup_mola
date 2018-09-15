FROM node:8-alpine

WORKDIR /var/www/mola-web

# copy all package*.json files into current WORKDIR
COPY package*.json ./

# installing dependencies
RUN npm install --force --only=production && npm rebuild

# copy all files and folders into container
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
