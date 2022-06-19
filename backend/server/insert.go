// this file main purpose is to insert pre-made data for anyone who wish to test this app.

package main

import (
	"fmt"
	"github.com/go-chi/chi"
	"golang.org/x/crypto/bcrypt"
	"imdbv2/ent"
	"imdbv2/ent/director"
	"imdbv2/ent/movie"
	"net/http"
)

func insertHandler(c *ent.Client) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if r.Method != "POST" {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		// creating users
		pass1, _ := bcrypt.GenerateFromPassword([]byte("0508800898"), 14)
		user1 := c.User.Create().
			SetFirstname("Dor").
			SetLastname("Liberman").
			SetNickname("dorlib").
			SetPassword(string(pass1)).
			SetGender("male").
			SetCountry("Israel").
			SetDescription("im the one who created this site").
			SetEmail("dorlib318@gmail.com").
			SetBirthDay("12091997").
			SetSignupAt("2020-01-01").
			SetProfile("https://upload.wikimedia.org/wikipedia/he/c/c2/Peter_Griffin.png").
			SaveX(r.Context())

		pass2, _ := bcrypt.GenerateFromPassword([]byte("0544938401"), 14)
		user2 := c.User.Create().
			SetFirstname("Noam").
			SetLastname("Lavie").
			SetNickname("noam4661").
			SetPassword(string(pass2)).
			SetGender("female").
			SetCountry("Israel").
			SetDescription("behind every great man there is a great woman").
			SetEmail("noam4661@gmail.com").
			SetBirthDay("29121997").
			SetSignupAt("2020-01-01").
			SetProfile("https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ThreeTimeAKCGoldWinnerPembrookeWelshCorgi.jpg/1200px-ThreeTimeAKCGoldWinnerPembrookeWelshCorgi.jpg").
			SaveX(r.Context())

		_, _ = user1, user2

		// creating new directors
		direc1 := c.Director.Create().
			SetName("Quantin Tarantino").
			SetProfileImage("https://m.media-amazon.com/images/M/MV5BMTgyMjI3ODA3Nl5BMl5BanBnXkFtZTcwNzY2MDYxOQ@@._V1_.jpg").
			SetBornAt("27021963").
			SaveX(r.Context())

		direc2 := c.Director.Create().
			SetName("David Fincher").
			SetProfileImage("https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/David_Fincher_%282012%29_3.jpg/220px-David_Fincher_%282012%29_3.jpg").
			SetBornAt("28101962").
			SaveX(r.Context())

		direc3 := c.Director.Create().
			SetName("Stanley Kubrick").
			SetProfileImage("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Kubrick_on_the_set_of_Barry_Lyndon_%281975_publicity_photo%29.jpg/220px-Kubrick_on_the_set_of_Barry_Lyndon_%281975_publicity_photo%29.jpg").
			SetBornAt("26071928").
			SaveX(r.Context())

		_, _, _ = direc1, direc2, direc3

		direc1ID, _ := c.Director.Query().Where(director.Name("Quantin Tarantino")).OnlyID(r.Context())
		direc2ID, _ := c.Director.Query().Where(director.Name("David Fincher")).OnlyID(r.Context())
		direc3ID, _ := c.Director.Query().Where(director.Name("Stanley Kubrick")).OnlyID(r.Context())


		// creating new movies
		mov1 := c.Movie.Create().SetTitle("Pulp Fiction").SetGenre("ctime").SetDescription("best movie of quantin").SetRank(94).SetDirectorID(direc1ID).SetYear(1994).SaveX(r.Context())
		mov2 := c.Movie.Create().SetTitle("Pulp Fiction").SetGenre("ctime").SetDescription("best movie of quantin").SetRank(94).SetDirectorID(direc1ID).SetYear(1994).SaveX(r.Context())
		mov3 := c.Movie.Create().SetTitle("Pulp Fiction").SetGenre("ctime").SetDescription("best movie of quantin").SetRank(94).SetDirectorID(direc1ID).SetYear(1994).SaveX(r.Context())
		mov4 := c.Movie.Create().SetTitle("Pulp Fiction").SetGenre("ctime").SetDescription("best movie of quantin").SetRank(94).SetDirectorID(direc1ID).SetYear(1994).SaveX(r.Context())
		mov5 := c.Movie.Create().SetTitle("Pulp Fiction").SetGenre("ctime").SetDescription("best movie of quantin").SetRank(94).SetDirectorID(direc1ID).SetYear(1994).SaveX(r.Context())
		mov6 := c.Movie.Create().SetTitle("Pulp Fiction").SetGenre("ctime").SetDescription("best movie of quantin").SetRank(94).SetDirectorID(direc1ID).SetYear(1994).SaveX(r.Context())
		mov7 := c.Movie.Create().SetTitle("Pulp Fiction").SetGenre("ctime").SetDescription("best movie of quantin").SetRank(94).SetDirectorID(direc1ID).SetYear(1994).SaveX(r.Context())
		mov8 := c.Movie.Create().SetTitle("Pulp Fiction").SetGenre("ctime").SetDescription("best movie of quantin").SetRank(94).SetDirectorID(direc1ID).SetYear(1994).SaveX(r.Context())

		movie1ID, _ := c.Movie.Query().Where(movie.Title("Pulp Fiction")).OnlyID(r.Context())
		movie2ID, _ := c.Movie.Query().Where(movie.Title("Pulp Fiction")).OnlyID(r.Context())
		movie3ID, _ := c.Movie.Query().Where(movie.Title("Pulp Fiction")).OnlyID(r.Context())
		movie4ID, _ := c.Movie.Query().Where(movie.Title("Pulp Fiction")).OnlyID(r.Context())
		movie5ID, _ := c.Movie.Query().Where(movie.Title("Pulp Fiction")).OnlyID(r.Context())
		movie6ID, _ := c.Movie.Query().Where(movie.Title("Pulp Fiction")).OnlyID(r.Context())
		movie7ID, _ := c.Movie.Query().Where(movie.Title("Pulp Fiction")).OnlyID(r.Context())
		movie8ID, _ := c.Movie.Query().Where(movie.Title("Pulp Fiction")).OnlyID(r.Context())


		// reviews for the movies
		review1 := c.Review.Create().SetTopic("wow").SetText("this is my favorite movie").SetRank(movie.Rank).SetMovieID(mov.ID).SaveX(r.Context())


	}
}

func insert(router *chi.Mux, client *ent.Client) {
	router.Handle("/insert", insertHandler(client))
}
