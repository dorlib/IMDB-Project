package middlewares

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func RecoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			err := recover()

			if err != nil {
				fmt.Println(err) // May be log this error? Send to sentry?

				jsonBody, _ := json.Marshal(map[string]string{
					"error": "There was an internal server error",
				})

				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				_, err := w.Write(jsonBody)
				if err != nil {
					_ = fmt.Errorf(err.Error())
				}
			}
		}()

		next.ServeHTTP(w, r)
	})
}
