package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi"
	"google.golang.org/genproto/googleapis/type/date"
	"imdbv2/ent"
	"io"
	"log"
	"net/http"
)

func check(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "GET" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		buf, err := io.ReadAll(r.Body)
		fmt.Println(err, string(buf))

		var userData struct {
			GivenUserID string `json:"givenUserID"`
			GivenEmail  string `json:"givenEmail"`
		}

		err = json.Unmarshal(buf, &userData)
		if err != nil {
			log.Fatal(err)
		}

		var result []string

		//checks for movies-lover

		res1 := c.User.QueryMovies()

		newUser := c.User.
			Create().
			SetFirstname(userData.GivenFirstName).
			SetLastname(userData.GivenLastName).
			SetNickname(userData.GivenNickName).
			SetDescription(userData.GivenDesc).
			SetPassword(string(bcrypedPassword)).
			SetProfile(profile).
			SetBirthDay(birthday).
			SetEmail(userData.GivenEmail).
			SetCountry(userData.GivenCountry).
			SetGender(userData.GivenGender).
			SetSignupAt(date.String()).
			SaveX(r.Context())
		fmt.Println("new user added:", newUser)

		newID, err1 := json.Marshal(newUser.ID)
		if err != nil {
			fmt.Println(err1)
		}

		res, err2 := w.Write(newID)
		if err2 != nil {
			fmt.Println(err2)
		}
		fmt.Println(res)
	})
}

func achievementsCheck(router *chi.Mux, client *ent.Client, email string, password string) {
	router.Handle("/achievementsCheck", check(client))
}