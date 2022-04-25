package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"imdbv2/ent"
	"imdbv2/ent/director"
	"imdbv2/ent/movie"
)

func (r *mutationResolver) CreateMovie(ctx context.Context, movie MovieInput) (*ent.Movie, error) {
	mov, err := r.client.Movie.Create().SetTitle(movie.Title).SetGenre(movie.Genre).SetDescription(movie.Description).SetRank(movie.Rank).SetDirectorID(movie.DirectorID).Save(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return mov, err
}
func (r *mutationResolver) CreateDirector(ctx context.Context, director DirectorInput) (*ent.Director, error) {
	return r.client.Director.Create().
		SetName(director.Name).
		Save(ctx)
}

func (r *mutationResolver) CreateReview(ctx context.Context, text string, rank int, movieID int, topic string) (*ent.Review, error) {
	return r.client.Review.Create().
		SetTopic(topic).
		SetText(text).
		SetRank(rank).
		SetMovieID(movieID).
		Save(ctx)
}

func (r *mutationResolver) CreateUser(ctx context.Context, user UserInput) (*ent.User, error) {
	return r.client.User.Create().
		SetFirstname(user.Firstname).
		SetLastname(user.Lastname).
		SetNickname(user.Nickname).
		SetEmail(user.Email).
		SetPassword(user.Password).
		SetDescription(user.Description).
		SetBirthDay(user.Birthday).
		SetProfile(user.Profile).
		Save(ctx)
}

func (r *queryResolver) Movies(ctx context.Context) ([]*ent.Movie, error) {
	return r.client.Movie.Query().All(ctx)
}

func (r *queryResolver) Directors(ctx context.Context) ([]*ent.Director, error) {
	return r.client.Director.Query().All(ctx)
}

func (r *queryResolver) Users(ctx context.Context) ([]*ent.User, error) {
	return r.client.User.Query().All(ctx)
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

func (r *mutationResolver) CreateMovieAndDirector(ctx context.Context, title string, description string, rank int, genre string, directorName string, image string) (*ent.Movie, error) {
	newDirector, err := r.client.Director.Create().
		SetName(directorName).
		Save(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}

	fmt.Println("new director made", newDirector)

	return r.client.Movie.Create().
		SetTitle(title).
		SetGenre(genre).
		SetDescription(description).
		SetRank(rank).
		SetDirectorID(newDirector.ID).
		SetImage(image).
		Save(ctx)
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

func (r *queryResolver) ReviewsOfMovie(ctx context.Context, movieID int) ([]*ent.Review, error) {
	data, err := r.client.Movie.Query().Where(movie.ID(movieID)).QueryReviews().All(ctx)
	if err != nil {
		return nil, ent.MaskNotFound(err)
	}
	return data, nil
}
