package main

import (
	"imdbv2/ent"
	"log"
	"net/http"
	"testing"
)

func checkTest(t *testing.T) {
	t.helper()
	client, err := ent.Open("mysql", "root:pass@tcp(127.0.0.1:3306)/test")
	if err != nil {
		log.Fatalf("failed opening connection to mysql: %v", err)
	}

	defer client.Close()

	insertHandler(client, false)

	testCases := []struct {
		Name           string
		Client         ent.Client
		result         []string
		userID         int
		r              *http.Request
		ExpectedResult []string
		ExpectedError  error
	}{
		{},
		{},
	}

	for _, tc := range testCases {
		t.Run(tc.Name, func(t *testing.T) {

		})
	}
}
