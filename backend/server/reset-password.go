package main

import (
	"encoding/json"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"imdbv2/ent"
	"imdbv2/ent/user"
	"io"
	"log"
	"math/rand"
	"net/http"
	"net/smtp"
)

func Forgot() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		err := r.ParseForm()
		if err != nil {
			log.Fatal(err)
		}

		buf, err1 := io.ReadAll(r.Body)
		fmt.Println(err1, string(buf))

		var PasswordReset struct {
			Id    uint   `json:"id"`
			Email string `json:"email"`
			Token string `gorm:"unique"`
		}

		email := PasswordReset.Email
		token := RandStringRunes(16)

		from := "admin@IMDB_Clone.com"

		to := []string{
			email,
		}

		url := "http://localhost:3000/reset/" + token

		message := []byte("click <a href=\"" + url + "\">here</a> to reset your password!")

		err2 := smtp.SendMail("0.0.0.0:1025", nil, from, to, message)

		if err2 != nil {
			log.Println(err2)
			return
		}

	})
}

func RandStringRunes(n int) string {
	var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzACDEFGHIJKLMNOPQRSTUVWXYZ")

	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

func resetHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		err := r.ParseForm()
		if err != nil {
			log.Fatal(err)
		}

		buf, err := io.ReadAll(r.Body)
		fmt.Println(err, string(buf))

		var userData struct {
			GivenPassword        string `json:"GivenPassword"`
			GivenPasswordConfirm string `json:"GivenPasswordConfirm"`
			GivenID              int    `json:"GivenID"`
		}

		err = json.Unmarshal(buf, &userData)
		if err != nil {
			log.Fatal(err)
		}

		if userData.GivenPassword != userData.GivenPasswordConfirm {
			fmt.Println("Passwords do not match!")
			return
		}

		bcrypedPassword, _ := bcrypt.GenerateFromPassword([]byte(userData.GivenPassword), 14)

		newUser := c.User.
			Update().Where(user.ID(userData.GivenID)).
			SetPassword(string(bcrypedPassword)).
			SaveX(r.Context())
		fmt.Println("new user added:", newUser)

	})
}
