FROM node:18.7.0-alpine3.15
RUN apk update && apk add git

ENV PATH="/app/node_modules/.bin:$PATH"

WORKDIR /src/client

COPY ./package.json . /src/client/
COPY ./package-lock.json . /src/client/
COPY .././package.json . /src/
COPY .././package-lock.json . /src/
COPY .././node_modules/ ./ /src/
COPY ./node_modules/ ./ /src/client/


RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm install @apollo/client graphql
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install --save styled-components

# add app
COPY ./ .

EXPOSE 3001

CMD ["cd", "./frontend"]
CMD ["cd", "./react"]
CMD ["cd", "./imdb"]
CMD ["npm", "start"]