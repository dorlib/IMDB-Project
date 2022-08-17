FROM golang:1.19

WORKDIR /src/server

COPY ./ . /src/server/

ADD ./ . /src/server/

EXPOSE 8081

RUN go mod download
RUN go get ./server/
RUN go install ./server/
RUN go install entgo.io/ent/cmd/ent@latest
RUN go get -d github.com/99designs/gqlgen@latest

CMD ["go", "run", "/src/server","-emailAdd", "imdbclonead@gmail.com", "-Pass", "ycrzfpxzbfntcaxp"]
