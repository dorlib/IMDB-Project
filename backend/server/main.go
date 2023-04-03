package main

import (
	"context"
	"entgo.io/contrib/entgql"
	"flag"
	"fmt"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	_ "github.com/go-sql-driver/mysql"
	"imdbv2/ent"
	"imdbv2/ent/migrate"
	"imdbv2/graphql"
	"imdbv2/middlewares"
	"imdbv2/server/authorizer"
	"log"
	"net/http"
)

func main() {
	router := chi.NewRouter()

	// Add CORS middleware around every request.
	// See https://github.com/rs/cors for full option listing.
	router.Use(middlewares.CorsMiddleware())
	router.Use(middlewares.RecoveryMiddleware)

	// Create an ent.Client with in-memory MySQL database.
	// root:pass@tcp(127.0.0.1:3306)/test.
	client, err := ent.Open("mysql", "root:pass@tcp(127.0.0.1:3306)/test")
	if err != nil {
		log.Fatalf("failed opening connection to mysql: %v", err)
	}

	defer client.Close()

	if err != nil {
		log.Printf("server closing error")
	}

	ctx := context.Background()

	var email = flag.String("emailAdd", "", "")

	var password = flag.String("Pass", "", "")

	flag.Parse()

	fmt.Printf("My Email: \"%v\"\n", *email)
	fmt.Printf("With Password: \"%v\"\n", *password)

	// Run the automatic migration tool to create all schema resources.
	if err := client.Schema.Create(ctx, migrate.WithGlobalUniqueID(true)); err != nil {
		log.Printf("failed creating schema resources: %v", err)
	}

	seeded := false

	authorizer.Authentication(router, client, *email, *password)
	seeder(router, client, seeded)
	achievementsCheck(router, client)

	srv := handler.NewDefaultServer(graphql.NewSchema(client))
	srv.Use(entgql.Transactioner{TxOpener: client})

	// graphql.
	router.Handle("/query", srv)
	router.Handle("/playground",
		playground.Handler("Movie", "/query"),
	)

	// server on port 8081.
	log.Println("listening on", "localhost:8081")

	if err := http.ListenAndServe("localhost:8081", router); err != nil {
		log.Printf("error running server (%s)", err)
	}
}
