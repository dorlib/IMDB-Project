package main

//package main
//
//import (
//	"fmt"
//	"html/template"
//	"imdbv2/ent"
//	"log"x
//	"net/http"
//)
//
//func signHandler(t *template.Template, c *ent.Client) http.Handler {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//		if err := t.Execute(w, nil); err != nil {
//			http.Error(w, fmt.Sprintf("error excuting template (%s)", err), http.StatusInternalServerError)
//		}
//		if r.Method != "POST" {
//			http.Redirect(w, r, "/site", http.StatusSeeOther)
//			return
//		}
//
//		err := r.ParseForm()
//		if err != nil {
//			log.Fatal(err)
//		}
//
//		firstname := r.PostForm.Get("firstname")
//		lastname := r.PostForm.Get("lastname")
//		nickname := r.PostForm.Get("nickname")
//		description := r.PostForm.Get("desc")
//		password := r.PostForm.Get("password")
//		profile := r.PostForm.Get("")
//		mDateYear := r.PostForm.Get("year")
//		mDateMonth := r.PostForm.Get("month")
//		mDateDay := r.PostForm.Get("day")
//		mBirthDay := mDateDay + "." + mDateMonth + "." + mDateYear
//		mEmail := r.PostForm.Get("email")
//		mDesc := r.PostForm.Get("desc")
//
//		newUser := c.User.
//			Create().
//			SetFirstname(firstname).
//			SetLastname(lastname).
//			SetNickname(nickname).
//			SetDescription(description).
//			SetPassword(password).
//			SetEmail(mEmail).
//			SetBirthDay(mBirthDay).
//			SaveX(r.Context())
//		fmt.Println("new user added:", newUser)
//
//	})
//}
//
//func logInHandler(t *template.Template) http.Handler {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//		if err := t.Execute(w, nil); err != nil {
//			http.Error(w, fmt.Sprintf("error excuting template (%s)", err), http.StatusInternalServerError)
//		}
//
//		if r.Method != "POST" {
//			http.Redirect(w, r, "/site", http.StatusSeeOther)
//			return
//		}
//
//		err := r.ParseForm()
//		if err != nil {
//			log.Fatal(err)
//		}
//
//	})
//}
//
//func main() {
//	signPageTpl := template.Must(template.ParseFiles("imdbv2/frontend/react/imdb/src/components/accounts/signupform.jsx"))
//
//	http.Handle("/sign-submission.html", signHandler(signPageTpl, client))
//
//}
