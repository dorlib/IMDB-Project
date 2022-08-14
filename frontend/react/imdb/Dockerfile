FROM node:18.7.0-alpine3.15

WORKDIR C:/Users/dorli/Desktop/go/imdbv4/IMDB-Project/frontend/react/imdb

COPY .. ../imdbv4/IMDB-Project/frontend/react/imdb

EXPOSE 3000

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install --save styled-components

# add app
COPY . ./


CMD ["npm", "start"]
