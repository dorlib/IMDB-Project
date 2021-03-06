package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Director holds the schema definition for the Director entity.
type Director struct {
	ent.Schema
}

// Fields of the Director.
func (Director) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").Unique().Annotations(entgql.OrderField("DIRECTOR_NAME")),
		field.String("profileImage"),
		field.String("bornAt").Default("00.00.0000"),
		field.String("description").Default("not given"),
		field.Int("user_id").Optional(),
	}
}

// Edges of the Director.
func (Director) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("directors").
			Field("user_id").
			Unique(),
		edge.To("movies", Movie.Type),
	}
}
