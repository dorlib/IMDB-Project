package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi"
	"imdbv2/ent"
	"imdbv2/ent/comment"
	"imdbv2/ent/favorite"
	"imdbv2/ent/movie"
	"imdbv2/ent/review"
	"imdbv2/ent/user"
	"io"
	"log"
	"net/http"
	"time"
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
			GivenUserID int `json:"givenUserID"`
		}

		userID := userData.GivenUserID

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
		reviewsIDS2 := c.Review.Query().Where(review.HasUserWith(user.ID(userID))).IDsX(r.Context())
		var moviesReviewed = make(map[*ent.MovieQuery]int)

		for i := 0; i < len(reviewsIDS); i++ {
			movieID := c.Movie.Query().Where(movie.HasReviewsWith(review.ID(reviewsIDS2[i])))
			if moviesReviewed[movieID] == 0.0 {
				moviesReviewed[movieID] = reviewsIDS2[i]
			}
		}

		if len(moviesReviewed) > 20 {
			result = append([]string{"the-reviewer"}, result...)
		}

		// check for the-commenter
		commentsIDS := c.Comment.Query().Where(comment.HasUserWith(user.ID(userID))).IDsX(r.Context())
		var reviewsCommented = make(map[*ent.ReviewQuery]int)

		for i := 0; i < len(commentsIDS); i++ {
			reviewID := c.Review.Query().Where(review.HasCommentsWith(comment.ID(commentsIDS[i])))
			if reviewsCommented[reviewID] == 0.0 {
				reviewsCommented[reviewID] = commentsIDS[i]
			}
		}

		if len(reviewsCommented) > 15 {
			result = append([]string{"the-commenter"}, result...)
		}

		// check for fast-contributor
		userData2 := c.User.GetX(r.Context(), userID)
		creationTimeOfUser, _ := time.Parse("2021-11-22", userData2.SignupAt)
		moviesOfUser := c.User.QueryMovies(c.User.GetX(r.Context(), userID)).AllX(r.Context())

		for i := 0; i < len(moviesOfUser); i++ {
			creationTime, _ := time.Parse("2021-11-22", moviesOfUser[i].CreatedAt)
			if creationTime.Sub(creationTimeOfUser) < time.Hour {
				result = append([]string{"fast-contributor"}, result...)
				break
			}
		}

		// check for favorites-lover
		favoritesOfUser := c.Favorite.Query().Where(favorite.UserID(userID)).AllX(r.Context())
		if len(favoritesOfUser) > 20 {
			result = append([]string{"favorites-lover"}, result...)
		}

		// end of checks

		res, err1 := json.Marshal(result)
		if err != nil {
			fmt.Println(err1)
		}

		writeRes, err2 := w.Write(res)
		if err2 != nil {
			fmt.Println(err2)
		}
		fmt.Println(writeRes)
	})
}

func achievementsCheck(router *chi.Mux, client *ent.Client) {
	router.Handle("/achievementsCheck", check(client))
}
