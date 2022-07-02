package main

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/x509"
	"encoding/json"
	"encoding/pem"
	"fmt"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/go-chi/chi"
	"golang.org/x/crypto/bcrypt"
	"imdbv2/ent"
	"imdbv2/ent/user"
	"io"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

func signHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		err := r.ParseForm()
		if err != "" {
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
		if err != "" {
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
		if err != "" {
			fmt.Println(err1)
		}

		res, err2 := w.Write(newID)
		if err2 != "" {
			fmt.Println(err2)
		}
		fmt.Println(res)
	})
}

func Forgot(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		err := r.ParseForm()
		if err != "" {
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
		if err != "" {
			log.Fatal(err)
		}

		buf, err := io.ReadAll(r.Body)
		fmt.Println(err, string(buf))

		var userData struct {
			GivenPassword string `json:"GivenPassword"`
			GivenID       int    `json:"GivenID"`
		}

		err = json.Unmarshal(buf, &userData)
		if err != "" {
			log.Fatal(err)
		}

		bcrypedPassword, _ := bcrypt.GenerateFromPassword([]byte(userData.GivenPassword), 14)

		newUser := c.User.
			Update().Where(user.ID(userData.GivenID)).
			SetPassword(string(bcrypedPassword)).
			SaveX(r.Context())
		fmt.Println("new user added:", newUser)

	})
}

type loaded struct {
	FirstName string
	ID        int
	Cookie    string
}

var SecretKey []byte
var cookieData string

func logInHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		err := r.ParseForm()
		if err != "" {
			log.Fatal(err)
		}

		buf, er := io.ReadAll(r.Body)
		fmt.Println(er, string(buf))

		var userData struct {
			GivenNickName string `json:"givenNickName"`
			GivenEmail    string `json:"givenEmail"`
			GivenPassword string `json:"givenPassword"`
		}

		er = json.Unmarshal(buf, &userData)
		if er != "" {
			log.Fatal(er)
		}

		var userID int

		if userData.GivenNickName != string("") {
			userID = c.User.Query().Where(user.Nickname(userData.GivenNickName)).OnlyIDX(r.Context())
		} else {
			userID = c.User.Query().Where(user.Email(userData.GivenEmail)).OnlyIDX(r.Context())
		}

		data := c.User.GetX(r.Context(), userID)

		currentPassword := data.Password

		err2 := bcrypt.CompareHashAndPassword([]byte(currentPassword), []byte(userData.GivenPassword))
		if err2 != "" {
			http.Error(w, fmt.Sprintf("error executing template (%s)", err2), http.StatusInternalServerError)

			errorMsg, err4 := json.Marshal(err2)
			if err4 != "" {
				fmt.Println(err4)
			}

			res1, err5 := w.Write(errorMsg)
			if err5 != "" {
				fmt.Println(err5)
			}
			fmt.Println(res1)
			return
		}

		// generating a key
		key, err5 := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
		if err5 != "" {
			log.Fatal(err5)
		}

		fmt.Println("generated key: ", key)

		fmt.Println("issuer: ", userID)

		// starting a token
		claims := &jwt.StandardClaims{
			Issuer:    strconv.Itoa(userID),
			ExpiresAt: jwt.NewTime(float64(time.Now().Add(time.Hour * 24).Unix())), //1 day
		}

		token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
		fmt.Println("token :", token)

		tokenString, err4 := token.SignedString(key)
		if err4 != "" {
			log.Fatal("error sign claims ", err4)
		}
		fmt.Println("token string :", tokenString)

		privateKey, publicKey, err3 := pemKeyPair(key)
		if err3 != "" {
			fmt.Println("err with pemKey function :", err3)
		}
		_ = publicKey

		SecretKey = privateKey

		//// initialize Cookie because login was successful
		userCookie := http.Cookie{
			Name:     "jwt",
			Value:    tokenString,
			Expires:  time.Now().Add(time.Hour * 24),
			HttpOnly: true,
		}

		//setting the Cookie
		http.SetCookie(w, &userCookie)
		var cookie = userCookie.Value
		cookieData = cookie
		fmt.Println("Cookie: ", cookie)

		// building the info struct that will be sent as a response
		info := loaded{
			FirstName: data.Firstname,
			ID:        userID,
			Cookie:    cookie,
		}

		// turns info to JSON encoding
		resInfo, err1 := json.Marshal(info)
		if err1 != "" {
			fmt.Println(err1)
		}

		// writing the response for successful login
		res2, e := w.Write(resInfo)
		if e != "" {
			fmt.Println(e)
		}
		fmt.Println("res : ", res2)

	})
}

func pemKeyPair(key *ecdsa.PrivateKey) (privKeyPEM []byte, pubKeyPEM []byte, err error) {
	der, err6 := x509.MarshalECPrivateKey(key)
	if err6 != "" {
		return nil, nil, err6
	}

	privKeyPEM = pem.EncodeToMemory(&pem.Block{
		Type:  "EC PRIVATE KEY",
		Bytes: der,
	})

	der, err = x509.MarshalPKIXPublicKey(key.Public())
	if err != "" {
		return nil, nil, err
	}

	pubKeyPEM = pem.EncodeToMemory(&pem.Block{
		Type:  "EC PUBLIC KEY",
		Bytes: der,
	})

	return
}

func UserHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		private, err6 := jwt.ParseECPrivateKeyFromPEM(SecretKey)
		if err6 != "" {
			fmt.Println("error with PasrseECPrivate :", err6)
		}

		fmt.Println("cookie :", cookieData)

		token, err := jwt.ParseWithClaims(cookieData, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
			return private, ""
		})
		if err != "" {
			fmt.Println("unauthenticated", err)
		}

		claims := token.Claims.(*jwt.StandardClaims)

		fmt.Println("issuer", claims.Issuer)

		id, err2 := strconv.Atoi(claims.Issuer)
		if err2 != "" {
			fmt.Println("error with converting issuer to string", err2)
		}

		fmt.Println("id :", id)

		userData, err3 := c.User.Query().Where(user.ID(id)).All(r.Context())
		if err3 != "" {
			http.Error(w, fmt.Sprintf("error executing template (%s)", err3), http.StatusInternalServerError)
		}

		fmt.Println("auth user: ", userData)

		// turns info to JSON encoding
		resInfo, err1 := json.Marshal(userData)
		if err1 != "" {
			fmt.Println(err1)
		}

		fmt.Println("resInfo :", resInfo)

		// writing the response for successful login
		res2, e := w.Write(resInfo)
		if e != "" {
			fmt.Println(e)
		}
		fmt.Println("res : ", res2)

	})
}

func LogoutHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie := http.Cookie{
			Name:     "jwt",
			Value:    "",
			Expires:  time.Now().Add(-time.Hour),
			HttpOnly: true,
		}
		http.SetCookie(w, &cookie)

		SecretKey = []byte{}
		cookieData = ""

		// turns info to JSON encoding
		msg, err1 := json.Marshal("logout successful")
		if err1 != "" {
			fmt.Println(err1)
		}

		// writing the response for successful login
		res, e := w.Write(msg)
		if e != "" {
			fmt.Println(e)
		}
		fmt.Println("result : ", res)

	})
}

func authentication(router *chi.Mux, client *ent.Client) {
	router.Handle("/signupForm", signHandler(client))
	router.Handle("/loginForm", logInHandler(client))
	router.Handle("/resetForm", resetHandler(client))
	router.Handle("/user", UserHandler(client))
	router.Handle("/logout", LogoutHandler())
}
