FROM golang:1.19

WORKDIR C:/Users/dorli/Desktop/go/imdbv4/IMDB-Project

COPY . ../imdbv4/IMDB-Project

ARG emailAdd
ARG Pass

ENV emailAdd $emailAdd
ENV Pass $Pass

EXPOSE 8081
EXPOSE 3000

COPY backend/go.mod ./
COPY backend/go.sum ./

RUN go mod download

RUN sudo apt-get update \
    && \ sudo apt-get install mysql-shell  \
    && go install entgo.io/ent/cmd/ent@latest \
    && go get -d github.com/99designs/gqlgen@VERSION \
    && npx create-react-app my-app \
    && npm install @mui/material @emotion/react @emotion/styled \
    && go build -o /docker-gs-ping \
    && npm start \
    && go run ./server -emailAdd emailAdd -Pass Pass

CMD ["./serve/"]

