package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi"
	"golang.org/x/crypto/bcrypt"
	"imdbv2/ent"
	"imdbv2/ent/user"
	"io"
	"log"
	"net/http"
)

func signHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		err := r.ParseForm()
		if err != nil {
			log.Fatal(err)
		}

		fmt.Println(r.PostForm)
		buf, err := io.ReadAll(r.Body)
		fmt.Println(err, string(buf))
		var userData struct {
			firstName   string `json:"firstname"`
			lastName    string `json:"lastName"`
			nickName    string `json:"nickName"`
			email       string `json:"email"`
			dayOfBirth  string `json:"dayOfBirth"`
			dayOfMonth  string `json:"dayOfMonth"`
			dayOfYear   string `json:"dayOfYear"`
			country     string `json:"country"`
			password    string `json:"password"`
			description string `json:"description"`
			fileProfile string `json:"fileProfile"`
			textProfile string `json:"textProfile"`
			gender      string `json:"gender"`
		}
		err = json.Unmarshal(buf, &userData)

		//firstname := r.PostForm.Get("firstname")
		//lastname := r.PostForm.Get("lastname")
		//nickname := r.PostForm.Get("nickname")
		//email := r.PostForm.Get("email")
		//dayOfBirth := r.PostForm.Get("day")
		//monthOfBirth := r.PostForm.Get("month")
		//yearOfBirth := r.PostForm.Get("year")
		//birthday := dayOfBirth + "." + monthOfBirth + "." + yearOfBirth
		//country := r.PostForm.Get("country")
		//password := r.PostForm.Get("password")
		//description := r.PostForm.Get("description")
		//fileProfile := r.PostForm.Get("fileProfile")
		//textProfile := r.PostForm.Get("textProfile")
		//gender := r.PostForm.Get("gender")

		bcrypedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)

		profile := textProfile

		if fileProfile != "" {
			profile = fileProfile
		}

		newUser := c.User.
			Create().
			SetFirstname(userDate.Firstname).
			SetLastname(lastname).
			SetNickname(nickname).
			SetDescription(description).
			SetPassword(string(bcrypedPassword)).
			SetProfile(profile).
			SetBirthDay(birthday).
			SetEmail(email).
			SetCountry(country).
			SetGender(gender).
			SaveX(r.Context())
		fmt.Println("new user added:", newUser)

	})
}

func logInHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		err := r.ParseForm()
		if err != nil {
			log.Fatal(err)
		}

		nickname := r.PostForm.Get("nickname")
		//email := r.PostForm.Get("email")
		password := r.PostForm.Get("password")

		userID := c.User.Query().Where(user.Nickname(nickname)).OnlyIDX(r.Context())
		data := c.User.GetX(r.Context(), userID)

		currentPassword := data.Password

		err2 := bcrypt.CompareHashAndPassword([]byte(currentPassword), []byte(password))
		if err2 != nil {
			http.Error(w, fmt.Sprintf("error executing template (%s)", err2), http.StatusInternalServerError)
		} else {
			userData, err3 := c.User.Query().Where(user.ID(userID)).All(r.Context())
			if err3 != nil {
				panic(err3)
			}
			_ = userData
		}
	})
}

func authentication(router *chi.Mux, client *ent.Client) {
	//signPageTpl := template.Must(template.ParseFiles("../frontend/react/imdb/src/components/accounts/signupForm.jsx"))
	//loginPageTpl := template.Must(template.ParseFiles("../frontend/react/imdb/src/components/accounts/loginForm.jsx"))

	router.Handle("/loginForm", signHandler(client))
	router.Handle("/signupForm", logInHandler(client))
}
