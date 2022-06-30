package graphql

import (
	"github.com/99designs/gqlgen/graphql"
	"imdbv2/ent"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{ client *ent.Client }

func (r *Resolver) Comment() CommentResolver {
	//TODO implement me
	panic("implement me")
}

func (r *Resolver) Review() ReviewResolver {
	//TODO implement me
	panic("implement me")
}

func (r *Resolver) Movie() MovieResolver {
	//TODO implement me
	panic("implement me")
}

func NewSchema(client *ent.Client) graphql.ExecutableSchema {
	return NewExecutableSchema(Config{
		Resolvers: &Resolver{client},
	})
}
