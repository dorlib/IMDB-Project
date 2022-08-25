package main

import (
	"context"
	"entgo.io/contrib/entgql"
	"flag"
	"fmt"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
	"imdbv2/ent"
	"imdbv2/ent/migrate"
	"imdbv2/graphql"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	router := chi.NewRouter()

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		Debug:            true,
	}).Handler)

	// Create an ent.Client with in-memory MySQL database.
	client, err := ent.Open("mysql", os.Getenv("DB_URL"))
	if err != nil {
		log.Fatalf("failed opening connection to mysql: %v", err)
	}

	defer client.Close()
	if err != nil {
		log.Fatalf("server closing error")
	}

	ctx := context.Background()

	var email = flag.String("emailAdd", "", "")
	var password = flag.String("Pass", "", "")
	flag.Parse()

	fmt.Printf("My Email: \"%v\"\n", string(*email))
	fmt.Printf("With Password: \"%v\"\n", string(*password))

	// Run the automatic migration tool to create all schema resources.
	if err := client.Schema.Create(ctx, migrate.WithGlobalUniqueID(true)); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	seeded := false

	authentication(router, client, string(*email), string(*password))
	seeder(router, client, seeded)
	achievementsCheck(router, client)

	srv := handler.NewDefaultServer(graphql.NewSchema(client))
	srv.Use(entgql.Transactioner{TxOpener: client})

	// graphql
	router.Handle("/query", srv)
	router.Handle("/playground",
		playground.Handler("Movie", "/query"),
	)

	// server on port 8081
	log.Println("listening on", "localhost:8081")
	if err := http.ListenAndServe("localhost:8081", router); err != nil {
		log.Fatalf("error running server (%s)", err)
	}
}
