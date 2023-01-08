package middlewares

import (
	"github.com/rs/cors"
	"net/http"
)

func CorsMiddleware() func(handlerFunc http.Handler) http.Handler {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		Debug:            true,
	}).Handler

	return c
}
