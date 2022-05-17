package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Favorite holds the schema definition for the Favorite entity.
type Favorite struct {
	ent.Schema
}

// Fields of the Favorite.
func (Favorite) Fields() []ent.Field {
	return []ent.Field{
		field.String("movie_title").Annotations(entgql.OrderField("MOVIE_TITLE")),
		field.Int("movie_id").Annotations(entgql.OrderField("MOVIE_ID")),
		field.Int("user_id").Annotations(entgql.OrderField("USER_ID")),
	}
}

// Edges of the Favorite.
func (Favorite) Edges() []ent.Edge {
	return []ent.Edge{}
}
