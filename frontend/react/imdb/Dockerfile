FROM golang:1.19

WORKDIR C:/Users/dorli/Desktop/go/imdbv4/IMDB-Project/frontend/react/imdb

COPY .. ../imdbv4/IMDB-Project/frontend/react/imdb

EXPOSE 3000

RUN apt-get update \
    && npx create-react-app my-app \
    && npm install @mui/material @emotion/react @emotion/styled \
    && go build -o /docker-gs-ping \
    && npm start \

CMD ["./server/"]

