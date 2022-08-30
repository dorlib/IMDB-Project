FROM golang:1.19

WORKDIR /src/server

COPY ./ ./ ./

ADD ./ ./ ./

EXPOSE 8081

RUN go get ./server/
RUN go mod download
RUN go install entgo.io/ent/cmd/ent@latest
RUN go get -d github.com/99designs/gqlgen@latest

CMD ["go", "run", "./server/","-emailAdd", "imdbclonead@gmail.com", "-Pass", "ycrzfpxzbfntcaxp"]
