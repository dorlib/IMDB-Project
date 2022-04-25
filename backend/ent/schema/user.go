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
		field.String("nickname").NotEmpty().Unique().Annotations(entgql.OrderField("NICKNAME")),
		field.String("description"),
		field.String("password").MinLen(8).NotEmpty(),
		field.String("email").Unique(),
		field.String("birthDay"),
		field.String("profile"),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("reviews", Review.Type),
	}
}
