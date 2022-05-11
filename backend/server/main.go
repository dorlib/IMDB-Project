package main

import (
	"context"
	"entgo.io/contrib/entgql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
	"imdbv2/ent"
	"imdbv2/ent/migrate"
	"imdbv2/graphql"
	"log"
	"net/http"

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
	client, err := ent.Open("mysql", "root:pass@tcp(127.0.0.1:3306)/test")
	if err != nil {
		log.Fatalf("failed opening connection to sqlite: %v", err)
	}

	defer client.Close()
	if err != nil {
		log.Fatalf("server closing error")
	}

	ctx := context.Background()

	// Run the automatic migration tool to create all schema resources.
	if err := client.Schema.Create(ctx, migrate.WithGlobalUniqueID(true)); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	srv := handler.NewDefaultServer(graphql.NewSchema(client))
	srv.Use(entgql.Transactioner{TxOpener: client})

	router.Handle("/query", srv)
	router.Handle("/playground",
		playground.Handler("Movie", "/query"),
	)

	log.Println("listening on", "localhost:8081")
	if err := http.ListenAndServe("localhost:8081", router); err != nil {
		log.Fatalf("error running server (%s)", err)
	}
}
