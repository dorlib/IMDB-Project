package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Movie holds the schema definition for the Movie entity.
type Movie struct {
	ent.Schema
}

// Fields of the Movie.
func (Movie) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").Unique().Annotations(entgql.OrderField("MOVIE_NAME")),
		field.String("description").Annotations(entgql.OrderField("MOVIE_DESCRIPTION")),
		field.Int("rank").Annotations(entgql.OrderField("MOVIE_RANK")),
		field.Int("director_id").Optional(),
	}
}

// Edges of the Movie.
func (Movie) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("director", Director.Type).
			Ref("movies").
			Field("director_id").
			Unique(),
		edge.From("reviews", Review.Type).Ref("movie"),
	}
}
