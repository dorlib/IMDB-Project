package main

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"html/template"
	"imdbv2/ent"
	"imdbv2/ent/user"
	"log"
	"net/http"
)

func signHandler(t *template.Template, c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if err := t.Execute(w, nil); err != nil {
			http.Error(w, fmt.Sprintf("error excuting template (%s)", err), http.StatusInternalServerError)
		}
		if r.Method != "POST" {
			http.Redirect(w, r, "/site", http.StatusSeeOther)
			return
		}

		err := r.ParseForm()
		if err != nil {
			log.Fatal(err)
		}

		firstname := r.PostForm.Get("firstname")
		lastname := r.PostForm.Get("lastname")
		nickname := r.PostForm.Get("nickname")
		email := r.PostForm.Get("email")
		dayOfBirth := r.PostForm.Get("day")
		monthOfBirth := r.PostForm.Get("month")
		yearOfBirth := r.PostForm.Get("year")
		birthday := dayOfBirth + "." + monthOfBirth + "." + yearOfBirth
		country := r.PostForm.Get("country")
		password := r.PostForm.Get("password")
		description := r.PostForm.Get("description")
		fileProfile := r.PostForm.Get("fileProfile")
		textProfile := r.PostForm.Get("textProfile")

		bcrypedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)

		profile := textProfile

		if fileProfile != "" {
			profile = fileProfile
		}

		newUser := c.User.
			Create().
			SetFirstname(firstname).
			SetLastname(lastname).
			SetNickname(nickname).
			SetDescription(description).
			SetPassword(string(bcrypedPassword)).
			SetProfile(profile).
			SetBirthDay(birthday).
			SetEmail(email).
			SetCountry(country).
			SaveX(r.Context())
		fmt.Println("new user added:", newUser)

	})
}

func logInHandler(t *template.Template, c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if err := t.Execute(w, nil); err != nil {
			http.Error(w, fmt.Sprintf("error excuting template (%s)", err), http.StatusInternalServerError)
		}

		if r.Method != "POST" {
			http.Redirect(w, r, "/site", http.StatusSeeOther)
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

		error := bcrypt.CompareHashAndPassword([]byte(currentPassword), []byte(password))
		if error != nil {
			return error
		} else {
			return c.User.Query().Where(user.ID(userID)).AllX(ctx)
		}

	})
}

func main() {
	signPageTpl := template.Must(template.ParseFiles("imdbv2/frontend/react/imdb/src/components/accounts/signupForm.jsx"))
	loginPageTpl := template.Must(template.ParseFiles("imdbv2/frontend/react/imdb/src/components/accounts/loginForm.jsx"))

	http.Handle("/sign-submission", signHandler(signPageTpl, client))
	http.Handle("/login-submission", logInHandler(loginPageTpl, client))

}
