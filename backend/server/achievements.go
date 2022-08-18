package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi"
	"imdbv2/ent"
	"imdbv2/ent/movie"
	"imdbv2/ent/review"
	"imdbv2/ent/user"
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
		}

		var userID int

		er := json.Unmarshal(buf, &userID)
		if er != nil {
			log.Fatal(er)
		}

		fmt.Println("user's id: ", userID)

		var result []string

		// checks for movies-lover
		res1 := c.Movie.Query().Where(movie.UserID(userID)).AllX(r.Context())
		if len(res1) >= 10 {
			result = append([]string{"movies-lover"}, result...)
		}

		// checks for king-of-likes
		// reviews id's
		var reviewsIDS []int
		reviewsIDS = c.Review.Query().Where(review.HasUserWith(user.ID(userID))).IDsX(r.Context())

		for i := 0; i < len(reviewsIDS); i++ {
			numOfLikes := c.Review.Query().Where(review.ID(reviewsIDS[i])).QueryLikes().AllX(r.Context())
			if len(numOfLikes) > 10 {
				result = append([]string{"king-of-likes"}, result...)
				break
			}
		}

		// check for the-reviewer
		reviewsIDS := c.Review.Query().Where(review.HasUserWith(user.ID(userID))).IDsX(r.Context())
		var moviesReviewed = make(map[*ent.MovieQuery]int)

		for i := 0; i < len(reviewsIDS); i++ {
			movieID := c.Movie.Query().Where(movie.HasReviewsWith(review.ID(reviewsIDS[i])))
			if moviesReviewed[movieID] == 0.0 {
				moviesReviewed[movieID] = reviewsIDS[i]
			}
		}

		if len(moviesReviewed) > 20 {
			result = append([]string{"the-reviewer"}, result...)
		}

		// check for the-commenter

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
