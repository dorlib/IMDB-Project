// this file main purpose is to insert pre-made data for anyone who wish to test this app.

package main

import (
	"fmt"
	"github.com/go-chi/chi"
	"golang.org/x/crypto/bcrypt"
	"imdbv2/ent"
	"imdbv2/ent/director"
	"imdbv2/ent/movie"
	"imdbv2/ent/user"
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

		user1ID, _ := c.User.Query().Where(user.Firstname("Noam")).OnlyID(r.Context())
		user2ID, _ := c.User.Query().Where(user.Firstname("Dor")).OnlyID(r.Context())

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

		direc4 := c.Director.Create().
			SetName("Steven Spielberg").
			SetProfileImage("https://upload.wikimedia.org/wikipedia/commons/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg").
			SetBornAt("18121946").
			SaveX(r.Context())

		direc5 := c.Director.Create().
			SetName("Frank Darabont").
			SetProfileImage("https://m.media-amazon.com/images/M/MV5BNjk0MTkxNzQwOF5BMl5BanBnXkFtZTcwODM5OTMwNA@@._V1_UY1200_CR168,0,630,1200_AL_.jpg").
			SetBornAt("28011959").
			SaveX(r.Context())

		_, _, _, _, _ = direc1, direc2, direc3, direc4, direc5

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
		mov1 := c.Movie.Create().SetTitle("Pulp Fiction").SetGenre("crime").SetDescription("best movie of quantin").SetRank(94).SetDirectorID(direc1ID).SetYear(1994).SaveX(r.Context())
		mov2 := c.Movie.Create().SetTitle("Kill Bill Vol.1").SetGenre("drama").SetDescription("noam's favorite movie of quantin").SetRank(92).SetDirectorID(direc1ID).SetYear(1991).SaveX(r.Context())
		mov3 := c.Movie.Create().SetTitle("The Shining").SetGenre("horror").SetDescription("very scary").SetRank(82).SetDirectorID(direc3ID).SetYear(1981).SaveX(r.Context())
		mov4 := c.Movie.Create().SetTitle("Clockwork Orange").SetGenre("crime").SetDescription("very disturbing movie").SetRank(94).SetDirectorID(direc3ID).SetYear(1972).SaveX(r.Context())
		mov5 := c.Movie.Create().SetTitle("Fight Club").SetGenre("drama").SetDescription("dor's favorite movie").SetRank(96).SetDirectorID(direc2ID).SetYear(1991).SaveX(r.Context())
		mov6 := c.Movie.Create().SetTitle("Seven").SetGenre("crime").SetDescription("whats in the box?!").SetRank(89).SetDirectorID(direc2ID).SetYear(1998).SaveX(r.Context())
		mov7 := c.Movie.Create().SetTitle("Schindler's List").SetGenre("drama").SetDescription("very sed movie").SetRank(90).SetDirectorID(direc4ID).SetYear(1995).SaveX(r.Context())
		mov8 := c.Movie.Create().SetTitle("Save Private Ryan").SetGenre("war").SetDescription("best ww2 movie").SetRank(85).SetDirectorID(direc4ID).SetYear(1991).SaveX(r.Context())
		mov9 := c.Movie.Create().SetTitle("Jaws").SetGenre("drama").SetDescription("classic movie").SetRank(80).SetDirectorID(direc4ID).SetYear(1971).SaveX(r.Context())
		mov10 := c.Movie.Create().SetTitle("Green Mile").SetGenre("drama").SetDescription("very good movie").SetRank(93).SetDirectorID(direc5ID).SetYear(1982).SaveX(r.Context())
		mov11 := c.Movie.Create().SetTitle("The Shawshank Redemption").SetGenre("drama").SetDescription("best movie one imdb").SetRank(97).SetDirectorID(direc5ID).SetYear(1994).SaveX(r.Context())
		mov12 := c.Movie.Create().SetTitle("Jurrasic Park").SetGenre("fantasy").SetDescription("nice movie").SetRank(79).SetDirectorID(direc4ID).SetYear(1994).SaveX(r.Context())

		_, _, _, _, _, _, _, _, _, _, _, _ = mov1, mov2, mov3, mov4, mov5, mov6, mov7, mov8, mov9, mov10, mov11, mov12
		movie1ID, _ := c.Movie.Query().Where(movie.Title("Pulp Fiction")).OnlyID(r.Context())
		movie2ID, _ := c.Movie.Query().Where(movie.Title("Kill Bill Vol.1")).OnlyID(r.Context())
		movie3ID, _ := c.Movie.Query().Where(movie.Title("The Shining")).OnlyID(r.Context())
		movie4ID, _ := c.Movie.Query().Where(movie.Title("Clockwork Orange")).OnlyID(r.Context())
		movie5ID, _ := c.Movie.Query().Where(movie.Title("Fight Club")).OnlyID(r.Context())
		movie6ID, _ := c.Movie.Query().Where(movie.Title("Seven")).OnlyID(r.Context())
		movie7ID, _ := c.Movie.Query().Where(movie.Title("Schindler's List")).OnlyID(r.Context())
		movie8ID, _ := c.Movie.Query().Where(movie.Title("Save Private Ryan")).OnlyID(r.Context())
		movie9ID, _ := c.Movie.Query().Where(movie.Title("Jaws")).OnlyID(r.Context())
		movie10ID, _ := c.Movie.Query().Where(movie.Title("Green Mile")).OnlyID(r.Context())
		movie11ID, _ := c.Movie.Query().Where(movie.Title("The Shawshank Redemption")).OnlyID(r.Context())
		movie12ID, _ := c.Movie.Query().Where(movie.Title("Jurrasic Park")).OnlyID(r.Context())


		// reviews for the movies
		review1 := c.Review.Create().SetTopic("wow").SetText("this is my favorite movie").SetRank(85).SetMovieID(movie1ID).SetUserID(user1ID).SaveX(r.Context())
		review2 := c.Review.Create().SetTopic("wow2").SetText("this movie is great").SetRank(88).SetMovieID(movie1ID).SetUserID(user2ID).SaveX(r.Context())
		review3 := c.Review.Create().SetTopic("like").SetText("wowww").SetRank(90).SetMovieID(movie2ID).SetUserID(user2ID).SaveX(r.Context())
		review4 := c.Review.Create().SetTopic("like it").SetText("this is my favorite movie").SetRank(80).SetMovieID(movie2ID).SetUserID(user1ID).SaveX(r.Context())
		review5 := c.Review.Create().SetTopic("love it").SetText("this movie is great").SetRank(81).SetMovieID(movie3ID).SetUserID(user2ID).SaveX(r.Context())
		review6 := c.Review.Create().SetTopic("amazing").SetText("this is my favorite movie").SetRank(82).SetMovieID(movie4ID).SetUserID(user1ID).SaveX(r.Context())
		review7 := c.Review.Create().SetTopic("wowwww").SetText("this movie is great").SetRank(92).SetMovieID(movie5ID).SetUserID(user2ID).SaveX(r.Context())
		review8 := c.Review.Create().SetTopic("favortie of mine").SetText("this is my favorite movie").SetRank(95).SetMovieID(movie5ID).SetUserID(user1ID).SaveX(r.Context())
		review9 := c.Review.Create().SetTopic("like it").SetText("this movie is great").SetRank(98).SetMovieID(movie6ID).SetUserID(user2ID).SaveX(r.Context())
		review10 := c.Review.Create().SetTopic("loveee itt").SetText("this is my favorite movie").SetRank(100).SetMovieID(movie6ID).SetUserID(user1ID).SaveX(r.Context())
		review11 := c.Review.Create().SetTopic("this is wow").SetText("this movie is great").SetRank(99).SetMovieID(movie7ID).SetUserID(user2ID).SaveX(r.Context())
		review12 := c.Review.Create().SetTopic("the best").SetText("this is my favorite movie").SetRank(92).SetMovieID(movie7ID).SetUserID(user1ID).SaveX(r.Context())
		review13 := c.Review.Create().SetTopic("the best of the best").SetText("this movie is great").SetRank(88).SetMovieID(movie8ID).SetUserID(user2ID).SaveX(r.Context())
		review14 := c.Review.Create().SetTopic("never seen").SetText("this is my favorite movie").SetRank(89).SetMovieID(movie9ID).SetUserID(user1ID).SaveX(r.Context())
		review15 := c.Review.Create().SetTopic("wonderful").SetText("this movie is great").SetRank(78).SetMovieID(movie10ID).SetUserID(user2ID).SaveX(r.Context())
		review16 := c.Review.Create().SetTopic("amazingg").SetText("this is my favorite movie").SetRank(95).SetMovieID(movie10ID).SetUserID(user1ID).SaveX(r.Context())
		review17 := c.Review.Create().SetTopic("the best movie").SetText("this movie is great").SetRank(68).SetMovieID(movie11ID).SetUserID(user2ID).SaveX(r.Context())
		review18 := c.Review.Create().SetTopic("the best movie!").SetText("this movie is great i love it").SetRank(78).SetMovieID(movie12ID).SetUserID(user2ID).SaveX(r.Context())
		review19 := c.Review.Create().SetTopic("the best movie").SetText("this movie is great").SetRank(98).SetMovieID(movie12ID).SetUserID(user1ID).SaveX(r.Context())

		_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _ = review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14, review15, review16, review17, review18, review19

	}
}

func insert(router *chi.Mux, client *ent.Client) {
	router.Handle("/insert", insertHandler(client))
}
