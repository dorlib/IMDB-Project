package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("firstname").NotEmpty(),
		field.String("lastname").NotEmpty(),
		field.String("nickname").Unique().NotEmpty().Annotations(entgql.OrderField("NICKNAME")),
		field.String("description"),
		field.String("password").NotEmpty().Sensitive(),
		field.String("email").Unique(),
		field.String("birthDay"),
		field.String("profile"),
		field.String("country"),
		field.String("gender"),
		field.String("signup_at"),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("reviews", Review.Type),
		edge.To("comments", Comment.Type),
		edge.To("likes", Like.Type),
		edge.To("movies", Movie.Type),
		edge.To("directors", Director.Type),
	}
}
