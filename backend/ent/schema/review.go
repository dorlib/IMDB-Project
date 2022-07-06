package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Review holds the schema definition for the Review entity.
type Review struct {
	ent.Schema
}

// Fields of the Review.
func (Review) Fields() []ent.Field {
	return []ent.Field{
		field.String("topic"),
		field.String("text"),
		field.Int("rank"),
		field.Int("num_of_likes").Min(0).Default(0),
	}
}

// Edges of the Review.
func (Review) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("movie", Movie.Type).
			Unique(),
		edge.From("user", User.Type).
			Ref("reviews").
			Unique(),
		edge.From("comments", Comment.Type).Ref("review"),
		edge.From("likes", Like.Type).Ref("review"),
	}
}
