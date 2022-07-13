FROM golang:1.18

COPY . ../imdbv3

RUN   sudo apt-get update \
    && \ sudo apt-get install mysql-shell  \
    && go install entgo.io/ent/cmd/ent@latest \
    && go get -d github.com/99designs/gqlgen@VERSION \
    && npx create-react-app my-app \
    && npm install @mui/material @emotion/react @emotion/styled \


CMD = []