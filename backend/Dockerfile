FROM golang:1.19

WORKDIR C:/Users/dorli/Desktop/go/imdbv4/IMDB-Project/backend

COPY .. ../imdbv4/IMDB-Project/backend

ARG emailAdd
ARG Pass

ENV emailAdd $emailAdd
ENV Pass $Pass

EXPOSE 8081

COPY go.mod ./
COPY go.sum ./

RUN go mod download

RUN go install entgo.io/ent/cmd/ent@latest \
    && go get -d github.com/99designs/gqlgen@VERSION \
    && go build -o /docker-gs-ping \
    && go run ./server -emailAdd emailAdd -Pass Pass

CMD ["go run ./server -emailAdd emailAdd -Pass Pass"]

