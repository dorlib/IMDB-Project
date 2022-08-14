FROM golang:1.19

WORKDIR C:/Users/dorli/Desktop/go/imdbv4/IMDB-Project/backend

COPY .. ../imdbv4/IMDB-Project/backend

EXPOSE 8081

COPY go.mod ./
COPY go.sum ./

RUN go mod download

RUN go install entgo.io/ent/cmd/ent@latest
RUN go get -d github.com/99designs/gqlgen@latest
RUN go run ./server -emailAdd imdbclonead@gmail.com -Pass ycrzfpxzbfntcaxp

CMD ["go run ./server -emailAdd emailAdd -Pass Pass"]

