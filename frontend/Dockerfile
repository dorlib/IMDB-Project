FROM node:18.7.0-alpine3.15
RUN apk update && apk add git

WORKDIR /app

ENV PATH="/app/node_modules/.bin:$PATH"

COPY ./frontend/react/imdb/package-lock.json ./
COPY ./frontend/react/imdb/package.json ./
COPY ./frontend/react/imdb/node_modules ./
COPY ./frontend/react/package.json ./
COPY ./frontend/react/package-lock.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g
#RUN npm install @mui/material @emotion/react @emotion/styled
#RUN npm install --save styled-components

# add app
COPY ./ .

EXPOSE 3000

CMD ["npm", "start"]