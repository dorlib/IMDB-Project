package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Actor holds the schema definition for the Actor entity.
type Actor struct {
	ent.Schema
}

// Fields of the Actor.
func (Actor) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.String("description"),
		field.String("image"),
	}
}

// Edges of the Actor.
func (Actor) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("actors", Movie.Type),
	}
}