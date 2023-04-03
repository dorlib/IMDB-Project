package authorizer

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
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
	"net/http"
	"strconv"
	"time"
)

// signHandler function is responsible for making new users.
func signHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// makes sure that the method is post.
		if r.Method != http.MethodPost {
			http.Redirect(w, r, "/", http.StatusSeeOther)

			return
		}

		// parsing the form sent from the client.
		err := r.ParseForm()

		if err != nil {
			log.Fatal(err)
		}

		// read the parsed data.
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

		// from json to format that go can work with.
		err = json.Unmarshal(buf, &userData)
		if err != nil {
			log.Fatal(err)
		}

		// decrypting password.
		bcrypedPassword, _ := bcrypt.GenerateFromPassword([]byte(userData.GivenPassword), 14)

		profile := userData.GivenTextProfile
		if userData.GivenFileProfile != "" {
			profile = userData.GivenFileProfile
		}

		birthday := userData.GivenDayOfBirth + userData.GivenMonthOfBirth + userData.GivenYearOfBirth

		date := time.Now()

		// creating new user with ent client.
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

		// converting new user data back to json.
		newID, err1 := json.Marshal(newUser.ID)
		if err != nil {
			fmt.Println(err1)
		}

		// sending response to the client.
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
	Cookie    string
}

var SecretKey []byte
var cookieData string

// logInHandler function is responsible for the Authentication progress when user tries to login.
func logInHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Redirect(w, r, "/", http.StatusSeeOther)

			return
		}

		// parsing the form sent from the client.
		err := r.ParseForm()
		if err != nil {
			log.Fatal(err)
		}

		// reading the data.
		buf, er := io.ReadAll(r.Body)
		fmt.Println(er, string(buf))

		var userData struct {
			GivenNickName string `json:"givenNickName"`
			GivenEmail    string `json:"givenEmail"`
			GivenPassword string `json:"givenPassword"`
		}

		// converting the data from json to a format thar golang can work with.
		er = json.Unmarshal(buf, &userData)
		if er != nil {
			log.Fatal(er)
		}

		var userID int

		// logic for checking if the user is authenticated.
		if userData.GivenNickName != "" {
			userID = c.User.Query().Where(user.Nickname(userData.GivenNickName)).OnlyIDX(r.Context())
		} else {
			userID = c.User.Query().Where(user.Email(userData.GivenEmail)).OnlyIDX(r.Context())
		}

		data := c.User.GetX(r.Context(), userID)

		currentPassword := data.Password

		// comparing given password with hashed password.
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

		// generating a key.
		key, err5 := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
		if err5 != nil {
			log.Fatal(err5)
		}

		fmt.Println("generated key: ", key)

		fmt.Println("issuer: ", userID)

		// starting a token
		claims := &jwt.StandardClaims{
			Issuer:    strconv.Itoa(userID),
			ExpiresAt: jwt.NewTime(float64(time.Now().Add(time.Hour * 24).Unix())), // 1 day
		}

		token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
		fmt.Println("token :", token)

		tokenString, err4 := token.SignedString(key)
		if err4 != nil {
			log.Fatal("error sign claims ", err4)
		}

		fmt.Println("token string :", tokenString)

		privateKey, publicKey, err3 := pemKeyPair(key)
		if err3 != nil {
			fmt.Println("err with pemKey function :", err3)
		}

		_ = publicKey

		SecretKey = privateKey

		// initialize Cookie because login was successful.
		userCookie := http.Cookie{
			Name:     "jwt",
			Value:    tokenString,
			Expires:  time.Now().Add(time.Hour * 24),
			HttpOnly: true,
		}

		// setting the Cookie.
		http.SetCookie(w, &userCookie)

		var cookie = userCookie.Value

		cookieData = cookie
		fmt.Println("Cookie: ", cookie)

		// building the info struct that will be sent as a response.
		info := loaded{
			FirstName: data.Firstname,
			ID:        userID,
			Cookie:    cookie,
		}

		// turns info to JSON encoding.
		resInfo, err1 := json.Marshal(info)
		if err1 != nil {
			fmt.Println(err1)
		}

		// writing the response for successful login.
		res2, e := w.Write(resInfo)
		if e != nil {
			fmt.Println(e)
		}

		fmt.Println("res : ", res2)
	})
}

// pemKeyPair function generates a key for the login process.
func pemKeyPair(key *ecdsa.PrivateKey) (privKeyPEM []byte, pubKeyPEM []byte, err error) {
	der, err6 := x509.MarshalECPrivateKey(key)
	if err6 != nil {
		return nil, nil, err6
	}

	privKeyPEM = pem.EncodeToMemory(&pem.Block{
		Type:  "EC PRIVATE KEY",
		Bytes: der,
	})

	der, err = x509.MarshalPKIXPublicKey(key.Public())
	if err != nil {
		return nil, nil, err
	}

	pubKeyPEM = pem.EncodeToMemory(&pem.Block{
		Type:  "EC PUBLIC KEY",
		Bytes: der,
	})

	return
}

// UserHandler function makes sure that the user is authenticated and in authenticated zone.
func UserHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		private, err6 := jwt.ParseECPrivateKeyFromPEM(SecretKey)
		if err6 != nil {
			fmt.Println("error with PasrseECPrivate :", err6)
		}

		fmt.Println("cookie :", cookieData)

		token, err := jwt.ParseWithClaims(cookieData, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
			return private, nil
		})

		if err != nil {
			fmt.Println("unauthenticated", err)
		}

		claims := token.Claims.(*jwt.StandardClaims)

		fmt.Println("issuer", claims.Issuer)

		id, err2 := strconv.Atoi(claims.Issuer)

		if err2 != nil {
			fmt.Println("error with converting issuer to string", err2)
		}

		fmt.Println("id :", id)

		userData, err3 := c.User.Query().Where(user.ID(id)).All(r.Context())

		if err3 != nil {
			http.Error(w, fmt.Sprintf("error executing template (%s)", err3), http.StatusInternalServerError)
		}

		fmt.Println("auth user: ", userData)

		// turns info to JSON encoding.
		resInfo, err1 := json.Marshal(userData)

		if err1 != nil {
			fmt.Println(err1)
		}

		fmt.Println("resInfo :", resInfo)

		// writing the response for successful login.
		res2, e := w.Write(resInfo)

		if e != nil {
			fmt.Println(e)
		}

		fmt.Println("res : ", res2)
	})
}

// LogoutHandler function responsible for the logout process.
func LogoutHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// set the cookie in the past, same affect as deleting the cookie.
		cookie := http.Cookie{
			Name:     "jwt",
			Value:    "",
			Expires:  time.Now().Add(-time.Hour),
			HttpOnly: true,
		}

		http.SetCookie(w, &cookie)

		SecretKey = []byte{}
		cookieData = ""

		// turns info to JSON encoding.
		msg, err1 := json.Marshal("logout successful")

		if err1 != nil {
			fmt.Println(err1)
		}

		// writing the response for successful login.
		res, e := w.Write(msg)

		if e != nil {
			fmt.Println(e)
		}

		fmt.Println("result : ", res)
	})
}

// Authentication makes the routes and handler to any function of the Authentication process.
func Authentication(router *chi.Mux, client *ent.Client, email string, password string) {
	router.Handle("/signupForm", signHandler(client))
	router.Handle("/loginForm", logInHandler(client))
	router.Handle("/resetForm", resetHandler(client))
	router.Handle("/user", UserHandler(client))
	router.Handle("/logout", LogoutHandler())
	router.Handle("/forgot", Forgot(client, email, password))
}
