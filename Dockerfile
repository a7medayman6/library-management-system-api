# node js based production image
FROM node:18-alpine3.14

# set working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# expose port 3000
EXPOSE 3000

# run app
CMD ["npm", "start"]
