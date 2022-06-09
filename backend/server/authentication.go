package main

import (
	"encoding/json"
	"fmt"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/go-chi/chi"
	"golang.org/x/crypto/bcrypt"
	"imdbv2/ent"
	"imdbv2/ent/user"
	"io"
	"log"
	"net/http"
	"time"
)

const SecretKey = "secret"

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

		buf, err := io.ReadAll(r.Body)
		fmt.Println(err, string(buf))

		var userData struct {
			GivenFirstName    string `json:"givenFirstName"`
			GivenLastName     string `json:"givenLastName"`
			GivenNickName     string `json:"givenNickName"`
			GivenEmail        string `json:"givenEmail"`
			GivenDayOfBirth   string `json:"givenDayOfBirth"`
			GivenMonthOfBirth string `json:"givenMonthOfBirth"`
			GivenYearOfBirth  string `json:"givenYearOfBirth"`
			GivenCountry      string `json:"givenCountry"`
			GivenPassword     string `json:"givenPassword"`
			GivenDesc         string `json:"givenDesc"`
			GivenFileProfile  string `json:"givenFileProfile"`
			GivenTextProfile  string `json:"givenTextProfile"`
			GivenGender       string `json:"givenGender"`
			GivenDate         string `json:"GivenDate"`
		}

		err = json.Unmarshal(buf, &userData)
		if err != nil {
			log.Fatal(err)
		}

		bcrypedPassword, _ := bcrypt.GenerateFromPassword([]byte(userData.GivenPassword), 14)

		profile := userData.GivenTextProfile
		if userData.GivenFileProfile != "" {
			profile = userData.GivenFileProfile
		}

		birthday := string(userData.GivenDayOfBirth) + string(userData.GivenMonthOfBirth) + string(userData.GivenYearOfBirth)

		date := time.Now()

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

type loaded struct {
	FirstName string
	ID        int
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

		buf, err := io.ReadAll(r.Body)
		fmt.Println(err, string(buf))

		var userData struct {
			GivenNickName string `json:"givenNickName"`
			GivenEmail    string `json:"givenEmail"`
			GivenPassword string `json:"givenPassword"`
		}

		err = json.Unmarshal(buf, &userData)
		if err != nil {
			log.Fatal(err)
		}

		userID := c.User.Query().Where(user.Nickname(userData.GivenNickName)).OnlyIDX(r.Context())
		data := c.User.GetX(r.Context(), userID)

		currentPassword := data.Password

		err2 := bcrypt.CompareHashAndPassword([]byte(currentPassword), []byte(userData.GivenPassword))
		if err2 != nil {
			http.Error(w, fmt.Sprintf("error executing template (%s)", err2), http.StatusInternalServerError)

			errorMsg, err4 := json.Marshal(err2)
			if err4 != nil {
				fmt.Println(err4)
			}

			res1, err5 := w.Write(errorMsg)
			if err5 != nil {
				fmt.Println(err5)
			}
			fmt.Println(res1)
			return
		}

		// starting a token
		claims := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.StandardClaims{
			Issuer:    string(rune(data.ID)),
			ExpiresAt: jwt.NewTime(86400), //1 day
		})

		token, err4 := claims.SignedString([]byte(SecretKey))
		if err4 != nil {
			log.Fatal(err4)
		}

		// initialize Cookie because login was successful
		userCookie := http.Cookie{
			Name:     "Username",
			Value:    token,
			Expires:  time.Now().Add(time.Hour * 24),
			HttpOnly: true,
		}

		//setting the Cookie
		http.SetCookie(w, &userCookie)
		var cookie = userCookie.Value
		fmt.Println("Cookie: ", cookie)

		// building the info struct that will be sent as a response
		info := loaded{
			FirstName: data.Firstname,
			ID:        userID,
		}

		// turns info to JSON encoding
		resInfo, err1 := json.Marshal(info)
		if err1 != nil {
			fmt.Println(err1)
		}

		// writing the response for successful login
		res2, e := w.Write(resInfo)
		if e != nil {
			fmt.Println(e)
		}
		fmt.Println(res2)

	})
}

func authentication(router *chi.Mux, client *ent.Client) {
	router.Handle("/signupForm", signHandler(client))
	router.Handle("/loginForm", logInHandler(client))
}
