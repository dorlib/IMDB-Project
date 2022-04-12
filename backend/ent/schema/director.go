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
	}
}

// Edges of the Director.
func (Director) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("movies", Movie.Type),
	}
}
