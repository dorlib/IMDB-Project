package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Dashboard holds the schema definition for the Dashboard entity.
type Dashboard struct {
	ent.Schema
}

// Fields of the Dashboard.
func (Dashboard) Fields() []ent.Field {
	return []ent.Field{
		field.String("logged_users"),
		field.String("new_users_24_hours"),
	}
}
