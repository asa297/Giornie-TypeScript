FROM node:alpine as builder
WORKDIR '/usr/app'

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start"]