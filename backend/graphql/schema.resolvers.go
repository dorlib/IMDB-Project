package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"imdbv2/ent"
	achievement2 "imdbv2/ent/achievement"
	"imdbv2/ent/actor"
	"imdbv2/ent/director"
	"imdbv2/ent/favorite"
	"imdbv2/ent/like"
	"imdbv2/ent/movie"
	"imdbv2/ent/review"
	"imdbv2/ent/user"
)

func (r *mutationResolver) CreateMovie(ctx context.Context, movie MovieInput) (*ent.Movie, error) {
	mov, err := r.client.Movie.Create().
		SetTitle(movie.Title).
		SetGenre(movie.Genre).
		SetDescription(movie.Description).
		SetRank(movie.Rank).
		SetDirectorID(movie.DirectorID).
		SetYear(movie.Year).
		SetUserID(movie.UserID).
		SetUser(r.client.User.GetX(ctx, movie.UserID)).
		Save(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}

	review, error := r.client.Review.Create().SetTopic(movie.Topic).SetText(movie.Text).SetRank(movie.Rank).SetMovieID(mov.ID).Save(ctx)
	fmt.Println("new review made", review)
	if error != nil {
		return nil, ent.MaskNotFound(err)
	}

	return mov, err
}

func (r *mutationResolver) EditMovieDetails(ctx context.Context, movieID int, title string, genre string, image string, description string, year int) (*ent.Movie, error) {
	return r.client.Movie.UpdateOneID(movieID).
		SetTitle(title).
		SetGenre(genre).
		SetImage(image).
		SetDescription(description).
		SetYear(year).
		Save(ctx)
}

func (r *mutationResolver) CreateDirector(ctx context.Context, director DirectorInput) (*ent.Director, error) {
	return r.client.Director.Create().
		SetName(director.Name).
		SetProfileImage("https://hope.be/wp-content/uploads/2015/05/no-user-image.gif").
		SetBornAt("1.1.1111").
		Save(ctx)
}

func (r *mutationResolver) EditDirectorDetails(ctx context.Context, directorID int, director DirectorInput) (*ent.Director, error) {
	return r.client.Director.UpdateOneID(directorID).
		SetName(director.Name).
		SetProfileImage(director.ProfileImage).
		SetBornAt(director.BornAt).
		SetDescription(director.Description).
		Save(ctx)
}

func (r *mutationResolver) CreateReview(ctx context.Context, text string, rank int, movieID int, userID int, topic string) (*ent.Review, error) {
	user, _ := r.client.User.Get(ctx, userID)

	return r.client.Review.Create().
		SetTopic(topic).
		SetText(text).
		SetRank(rank).
		SetMovieID(movieID).
		SetUserID(userID).
		SetUser(user).
		SetNumOfLikes(0).
		SetNumOfComments(0).
		Save(ctx)
}

func (r *queryResolver) Movies(ctx context.Context) ([]*ent.Movie, error) {
	return r.client.Movie.Query().Order(ent.Asc(movie.FieldTitle)).All(ctx)
}

func (r *queryResolver) Directors(ctx context.Context) ([]*ent.Director, error) {
	return r.client.Director.Query().All(ctx)
}

func (r *queryResolver) Users(ctx context.Context) ([]*ent.User, error) {
	return r.client.User.Query().All(ctx)
}

func (r *queryResolver) Reviews(ctx context.Context) ([]*ent.Review, error) {
	return r.client.Review.Query().All(ctx)
}

func (r *queryResolver) Node(ctx context.Context, id int) (ent.Noder, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Nodes(ctx context.Context, ids []int) ([]ent.Noder, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) DirectorIDByName(ctx context.Context, name string) (*int, error) {
	id, err := r.client.Director.Query().Where(director.Name(name)).OnlyID(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return &id, nil
}

func (r *mutationResolver) CreateMovieAndDirector(ctx context.Context, title string, description string, rank int, genre string, directorName string, image string, topic string, text string, profileImage string, bornAt string, year int, userID int) (*ent.Movie, error) {
	newDirector, err := r.client.Director.Create().
		SetName(directorName).
		SetProfileImage(profileImage).
		SetBornAt(bornAt).
		SetUserID(userID).
		SetUser(r.client.User.GetX(ctx, userID)).
		Save(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}

	fmt.Println("new director made", newDirector)

	movieData, err := r.client.Movie.Create().
		SetTitle(title).
		SetGenre(genre).
		SetDescription(description).
		SetRank(rank).
		SetDirectorID(newDirector.ID).
		SetImage(image).
		SetYear(year).
		SetUserID(userID).
		SetUser(r.client.User.GetX(ctx, userID)).
		Save(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}

	review, e := r.client.Review.Create().SetTopic(topic).SetText(text).SetRank(rank).SetMovieID(movieData.ID).Save(ctx)
	if e != nil {
		return nil, ent.MaskNotFound(err)
	}

	fmt.Println("new review made", review)

	return movieData, err
}

// Mutation returns imdbv2.MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns imdbv2.QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }

type queryResolver struct{ *Resolver }

func (r *queryResolver) MovieByID(ctx context.Context, id int) ([]*ent.Movie, error) {
	data, err := r.client.Movie.Query().Where(movie.ID(id)).All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *queryResolver) DirectorByID(ctx context.Context, id int) ([]*ent.Director, error) {
	return r.client.Director.Query().Where(director.ID(id)).All(ctx)
}

func (r *queryResolver) UserByID(ctx context.Context, id int) ([]*ent.User, error) {
	return r.client.User.Query().Where(user.ID(id)).All(ctx)
}

func (r *queryResolver) ReviewsOfMovie(ctx context.Context, movieID int) ([]*ent.Review, error) {
	data, err := r.client.Movie.Query().Where(movie.ID(movieID)).QueryReviews().All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *queryResolver) Top10Movies(ctx context.Context) ([]*ent.Movie, error) {
	data, err := r.client.Movie.Query().Order(ent.Desc(movie.FieldRank)).Limit(10).All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *mutationResolver) UpdateRank(ctx context.Context, id int, rank int) (*ent.Movie, error) {
	data, err := r.client.Movie.UpdateOneID(id).SetRank(rank).Save(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *mutationResolver) UpdateDirectorDetails(ctx context.Context, id int, bornAt string, profileImage string, description string) (*ent.Director, error) {
	data, err := r.client.Director.UpdateOneID(id).SetBornAt(bornAt).SetProfileImage(profileImage).SetDescription(description).Save(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *queryResolver) Last5Added(ctx context.Context) ([]*ent.Movie, error) {
	data, err := r.client.Movie.Query().Order(ent.Desc(movie.FieldID)).Limit(5).All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *queryResolver) MoviesByGenre(ctx context.Context, genre string) ([]*ent.Movie, error) {
	data, err := r.client.Movie.Query().Order(ent.Desc(movie.FieldRank)).Where(movie.Genre(genre)).All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *queryResolver) FavoritesOfUser(ctx context.Context, userID int) ([]*ent.Favorite, error) {
	data, err := r.client.Favorite.Query().Where(favorite.UserID(userID)).All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *mutationResolver) AddToFavorites(ctx context.Context, movieID int, userID int, movieTitle string, movieImage string) (*ent.Favorite, error) {
	return r.client.Favorite.Create().
		SetMovieID(movieID).
		SetMovieTitle(movieTitle).
		SetMovieImage(movieImage).
		SetUserID(userID).
		Save(ctx)
}

func (r *mutationResolver) RemoveFromFavorites(ctx context.Context, movieID int, userID int) ([]*ent.Favorite, error) {
	favoriteID := r.client.Favorite.Query().Where(favorite.UserID(userID)).Where(favorite.MovieID(movieID)).OnlyIDX(ctx)
	favoriteItem := r.client.Favorite.GetX(ctx, favoriteID)
	r.client.Favorite.DeleteOne(favoriteItem).ExecX(ctx)

	data, err := r.client.Favorite.Query().Where(favorite.UserID(userID)).All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *queryResolver) ActorByID(ctx context.Context, actorID int) ([]*ent.Actor, error) {
	data, err := r.client.Actor.Query().Where(actor.ID(actorID)).All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *mutationResolver) AddComment(ctx context.Context, userID int, reviewID int, text string) (*ent.Comment, error) {
	reviewData := r.client.Review.GetX(ctx, reviewID)
	numOfCommentsBefore := reviewData.NumOfComments

	r.client.Review.UpdateOneID(reviewID).SetNumOfComments(numOfCommentsBefore + 1).SaveX(ctx)

	return r.client.Comment.Create().
		SetText(text).
		SetReviewID(reviewID).
		SetUserID(userID).
		Save(ctx)
}

func (r *mutationResolver) EditComment(ctx context.Context, commentID int, text string) (*ent.Comment, error) {
	return r.client.Comment.UpdateOneID(commentID).
		SetText(text).
		Save(ctx)
}

func (r *mutationResolver) DeleteComment(ctx context.Context, commentID int, reviewID int, userID int) (int, error) {
	reviewData := r.client.Review.GetX(ctx, reviewID)
	numOfCommentsBefore := reviewData.NumOfComments

	r.client.Review.UpdateOneID(reviewID).SetNumOfComments(numOfCommentsBefore - 1).SaveX(ctx)

	userIdOfComment := r.client.Comment.GetX(ctx, commentID).QueryUser().OnlyIDX(ctx)
	if userIdOfComment == userID {
		comment := r.client.Comment.GetX(ctx, commentID)
		r.client.Comment.DeleteOne(comment).ExecX(ctx)
	}

	return userID, nil
}

func (r *queryResolver) CommentsOfReview(ctx context.Context, reviewID int) ([]*ent.Comment, error) {
	data, err := r.client.Review.Query().Where(review.ID(reviewID)).QueryComments().All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *queryResolver) LikesOfUser(ctx context.Context, UserID int) ([]*ent.Like, error) {
	data := r.client.Like.Query().Where(like.UserID(UserID)).AllX(ctx)
	return data, nil
}

func (r *queryResolver) TotalLikesOfReviewsOfMovie(ctx context.Context, movieID int) ([]*ent.Like, error) {
	data := r.client.Movie.Query().Where(movie.ID(movieID)).QueryReviews().QueryLikes().AllX(ctx)
	return data, nil
}

func (r *queryResolver) LikeByUserAndReview(ctx context.Context, userID int, reviewID int) (*ent.Like, error) {
	data := r.client.Like.Query().Where(like.UserID(userID)).Where(like.ReviewID(reviewID)).OnlyX(ctx)
	return data, nil
}

func (r *mutationResolver) AddLike(ctx context.Context, userID int, reviewID int) (*ent.Like, error) {
	userData := r.client.User.GetX(ctx, userID)
	reviewData := r.client.Review.GetX(ctx, reviewID)
	numOfLikesBefore := reviewData.NumOfLikes

	r.client.Review.UpdateOne(reviewData).SetNumOfLikes(numOfLikesBefore + 1).SaveX(ctx)

	return r.client.Like.Create().
		SetUserID(userID).
		SetReviewID(reviewID).
		AddUser(userData).
		AddReview(reviewData).
		Save(ctx)
}

func (r *mutationResolver) DeleteLike(ctx context.Context, likeID int, userID int, reviewID int) ([]*ent.Like, error) {
	reviewData := r.client.Review.GetX(ctx, reviewID)
	numOfLikesBefore := reviewData.NumOfLikes
	r.client.Review.UpdateOne(reviewData).SetNumOfLikes(numOfLikesBefore - 1).SaveX(ctx)

	var userIdOfLike = r.client.Like.GetX(ctx, likeID).QueryUser().OnlyIDX(ctx)
	if userIdOfLike == userID {
		like := r.client.Like.GetX(ctx, likeID)
		r.client.Like.DeleteOne(like).ExecX(ctx)
	}

	data, err := r.client.Like.Query().Where(like.UserID(userID)).All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}

func (r *mutationResolver) UpdateUserDetails(ctx context.Context, userID int, firstname string, lastname string, nickname string, description string, profile string, email string, birthday string, country string, gender string) (*ent.User, error) {
	updatedUser := r.client.User.UpdateOneID(userID).
		SetFirstname(firstname).
		SetLastname(lastname).
		SetNickname(nickname).
		SetProfile(profile).
		SetGender(gender).
		SetDescription(description).
		SetCountry(country).
		SetEmail(email).
		SetBirthDay(birthday).
		SaveX(ctx)

	return updatedUser, nil
}

func (r *mutationResolver) EditReview(ctx context.Context, reviewID int, rank int, text string, topic string) (*ent.Review, error) {
	return r.client.Review.UpdateOneID(reviewID).
		SetText(text).
		SetRank(rank).
		SetTopic(topic).
		Save(ctx)
}

func (r *mutationResolver) DeleteReview(ctx context.Context, reviewID int, userID int) (int, error) {
	// when we delete a review we need to delete the comments of that review
	userIdOfReview := r.client.Review.GetX(ctx, reviewID).QueryUser().OnlyIDX(ctx)
	rev := r.client.Review.GetX(ctx, reviewID)

	if userIdOfReview == userID {
		// here we get an array of ids of comments that need to be deleted
		commentsOfReview := r.client.Review.QueryComments(rev).IDsX(ctx)
		// here we delete every comment from the list
		for i := 0; i < len(commentsOfReview); i++ {
			r.client.Comment.DeleteOneID(commentsOfReview[i])
		}

		r.client.Review.DeleteOne(rev).ExecX(ctx)
	}

	return userID, nil
}

func (r *queryResolver) MoviesOfUser(ctx context.Context, id int) ([]*ent.Movie, error) {
	data := r.client.User.QueryMovies(r.client.User.GetX(ctx, id)).AllX(ctx)
	return data, nil
}

func (r *queryResolver) DirectorsOfUser(ctx context.Context, id int) ([]*ent.Director, error) {
	data := r.client.User.QueryDirectors(r.client.User.GetX(ctx, id)).AllX(ctx)
	return data, nil
}

func (r *queryResolver) MostLikedReviews(ctx context.Context, userID int) ([]*ent.Review, error) {
	data := r.client.User.
		QueryReviews(r.client.User.GetX(ctx, userID)).
		Where(review.Not(review.Text(""))).
		Where(review.Not(review.Topic(""))).
		Order(ent.Desc(review.FieldNumOfLikes)).
		Limit(5).AllX(ctx)
	return data, nil
}

func (r *mutationResolver) ChangeUserProfile(ctx context.Context, userID int, profile string) (*ent.User, error) {
	data := r.client.User.UpdateOneID(userID).SetProfile(profile).SaveX(ctx)
	return data, nil
}

func (r *mutationResolver) AddActorToMovie(ctx context.Context, movieID int, name string, characterName string, image string) (*ent.Actor, error) {

	// let's check if the actor exist
	actorExist := r.client.Actor.Query().Where(actor.Name(name)).ExistX(ctx)

	if actorExist {
		actorId := r.client.Actor.Query().Where(actor.Name(name)).OnlyIDX(ctx)
		r.client.Movie.UpdateOneID(movieID).AddActor(r.client.Actor.GetX(ctx, actorId)).SaveX(ctx)
		return r.client.Actor.GetX(ctx, actorId), nil
	} else {
		data := r.client.Actor.Create().SetMovieID(movieID).SetName(name).SetCharacterName(characterName).SetImage(image).SaveX(ctx)
		r.client.Movie.UpdateOneID(movieID).AddActor(data).SaveX(ctx)
		return data, nil
	}
}

func (r *queryResolver) ActorsOfMovie(ctx context.Context, movieID int) ([]*ent.Actor, error) {
	data := r.client.Actor.Query().Where(actor.MovieID(movieID)).AllX(ctx)
	return data, nil
}

func (r *queryResolver) AchievementsOfUser(ctx context.Context, userID int) ([]*ent.Achievement, error) {
	var result []*ent.Achievement
	userData := r.client.User.GetX(ctx, userID)

	// check for movies lover - has contributed more than 10 movies
	numOfMoviesContributed := r.client.User.QueryMovies(userData).IDsX(ctx)
	if len(numOfMoviesContributed) > 10 {
		achievement := r.client.Achievement.Query().Where(achievement2.Name("movies lover")).OnlyX(ctx)
		result = append(result, achievement)
	}

	// check for king of likes - has a review with more than 10 likes
	reviewsOfUser := r.client.User.Query().Where(user.ID(userID)).QueryReviews().AllX(ctx)
	for i := 0; i < len(reviewsOfUser); i++ {
		if reviewsOfUser[i].NumOfLikes > 10 {
			achievement := r.client.Achievement.Query().Where(achievement2.Name("king of likes")).OnlyX(ctx)
			result = append(result, achievement)
		}
	}

	// check for the reviewer - reviewed more than 20 movies
	if len(reviewsOfUser) > 20 {
		achievement := r.client.Achievement.Query().Where(achievement2.Name("the reviewer")).OnlyX(ctx)
		result = append(result, achievement)
	}

	// check of the commenter - commented on  more than 15 reviews
	commentsOfUser := r.client.User.Query().Where(user.ID(userID)).QueryComments().IDsX(ctx)
	if len(commentsOfUser) > 15 {
		achievement := r.client.Achievement.Query().Where(achievement2.Name("the commenter")).OnlyX(ctx)
		result = append(result, achievement)
	}

}
