// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"imdbv2/ent/comment"
	"imdbv2/ent/like"
	"imdbv2/ent/movie"
	"imdbv2/ent/review"
	"imdbv2/ent/user"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// ReviewCreate is the builder for creating a Review entity.
type ReviewCreate struct {
	config
	mutation *ReviewMutation
	hooks    []Hook
}

// SetTopic sets the "topic" field.
func (rc *ReviewCreate) SetTopic(s string) *ReviewCreate {
	rc.mutation.SetTopic(s)
	return rc
}

// SetText sets the "text" field.
func (rc *ReviewCreate) SetText(s string) *ReviewCreate {
	rc.mutation.SetText(s)
	return rc
}

// SetRank sets the "rank" field.
func (rc *ReviewCreate) SetRank(i int) *ReviewCreate {
	rc.mutation.SetRank(i)
	return rc
}

// SetNumOfLikes sets the "num_of_likes" field.
func (rc *ReviewCreate) SetNumOfLikes(i int) *ReviewCreate {
	rc.mutation.SetNumOfLikes(i)
	return rc
}

// SetNumOfComments sets the "num_of_comments" field.
func (rc *ReviewCreate) SetNumOfComments(i int) *ReviewCreate {
	rc.mutation.SetNumOfComments(i)
	return rc
}

// SetMovieID sets the "movie" edge to the Movie entity by ID.
func (rc *ReviewCreate) SetMovieID(id int) *ReviewCreate {
	rc.mutation.SetMovieID(id)
	return rc
}

// SetNillableMovieID sets the "movie" edge to the Movie entity by ID if the given value is not nil.
func (rc *ReviewCreate) SetNillableMovieID(id *int) *ReviewCreate {
	if id != nil {
		rc = rc.SetMovieID(*id)
	}
	return rc
}

// SetMovie sets the "movie" edge to the Movie entity.
func (rc *ReviewCreate) SetMovie(m *Movie) *ReviewCreate {
	return rc.SetMovieID(m.ID)
}

// SetUserID sets the "user" edge to the User entity by ID.
func (rc *ReviewCreate) SetUserID(id int) *ReviewCreate {
	rc.mutation.SetUserID(id)
	return rc
}

// SetNillableUserID sets the "user" edge to the User entity by ID if the given value is not nil.
func (rc *ReviewCreate) SetNillableUserID(id *int) *ReviewCreate {
	if id != nil {
		rc = rc.SetUserID(*id)
	}
	return rc
}

// SetUser sets the "user" edge to the User entity.
func (rc *ReviewCreate) SetUser(u *User) *ReviewCreate {
	return rc.SetUserID(u.ID)
}

// AddCommentIDs adds the "comments" edge to the Comment entity by IDs.
func (rc *ReviewCreate) AddCommentIDs(ids ...int) *ReviewCreate {
	rc.mutation.AddCommentIDs(ids...)
	return rc
}

// AddComments adds the "comments" edges to the Comment entity.
func (rc *ReviewCreate) AddComments(c ...*Comment) *ReviewCreate {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return rc.AddCommentIDs(ids...)
}

// AddLikeIDs adds the "likes" edge to the Like entity by IDs.
func (rc *ReviewCreate) AddLikeIDs(ids ...int) *ReviewCreate {
	rc.mutation.AddLikeIDs(ids...)
	return rc
}

// AddLikes adds the "likes" edges to the Like entity.
func (rc *ReviewCreate) AddLikes(l ...*Like) *ReviewCreate {
	ids := make([]int, len(l))
	for i := range l {
		ids[i] = l[i].ID
	}
	return rc.AddLikeIDs(ids...)
}

// Mutation returns the ReviewMutation object of the builder.
func (rc *ReviewCreate) Mutation() *ReviewMutation {
	return rc.mutation
}

// Save creates the Review in the database.
func (rc *ReviewCreate) Save(ctx context.Context) (*Review, error) {
	var (
		err  error
		node *Review
	)
	if len(rc.hooks) == 0 {
		if err = rc.check(); err != nil {
			return nil, err
		}
		node, err = rc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*ReviewMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = rc.check(); err != nil {
				return nil, err
			}
			rc.mutation = mutation
			if node, err = rc.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(rc.hooks) - 1; i >= 0; i-- {
			if rc.hooks[i] == nil {
				return nil, fmt.Errorf("ent: uninitialized hook (forgotten import ent/runtime?)")
			}
			mut = rc.hooks[i](mut)
		}
		v, err := mut.Mutate(ctx, rc.mutation)
		if err != nil {
			return nil, err
		}
		nv, ok := v.(*Review)
		if !ok {
			return nil, fmt.Errorf("unexpected node type %T returned from ReviewMutation", v)
		}
		node = nv
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (rc *ReviewCreate) SaveX(ctx context.Context) *Review {
	v, err := rc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (rc *ReviewCreate) Exec(ctx context.Context) error {
	_, err := rc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rc *ReviewCreate) ExecX(ctx context.Context) {
	if err := rc.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rc *ReviewCreate) check() error {
	if _, ok := rc.mutation.Topic(); !ok {
		return &ValidationError{Name: "topic", err: errors.New(`ent: missing required field "Review.topic"`)}
	}
	if _, ok := rc.mutation.Text(); !ok {
		return &ValidationError{Name: "text", err: errors.New(`ent: missing required field "Review.text"`)}
	}
	if _, ok := rc.mutation.Rank(); !ok {
		return &ValidationError{Name: "rank", err: errors.New(`ent: missing required field "Review.rank"`)}
	}
	if _, ok := rc.mutation.NumOfLikes(); !ok {
		return &ValidationError{Name: "num_of_likes", err: errors.New(`ent: missing required field "Review.num_of_likes"`)}
	}
	if v, ok := rc.mutation.NumOfLikes(); ok {
		if err := review.NumOfLikesValidator(v); err != nil {
			return &ValidationError{Name: "num_of_likes", err: fmt.Errorf(`ent: validator failed for field "Review.num_of_likes": %w`, err)}
		}
	}
	if _, ok := rc.mutation.NumOfComments(); !ok {
		return &ValidationError{Name: "num_of_comments", err: errors.New(`ent: missing required field "Review.num_of_comments"`)}
	}
	if v, ok := rc.mutation.NumOfComments(); ok {
		if err := review.NumOfCommentsValidator(v); err != nil {
			return &ValidationError{Name: "num_of_comments", err: fmt.Errorf(`ent: validator failed for field "Review.num_of_comments": %w`, err)}
		}
	}
	return nil
}

func (rc *ReviewCreate) sqlSave(ctx context.Context) (*Review, error) {
	_node, _spec := rc.createSpec()
	if err := sqlgraph.CreateNode(ctx, rc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (rc *ReviewCreate) createSpec() (*Review, *sqlgraph.CreateSpec) {
	var (
		_node = &Review{config: rc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: review.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: review.FieldID,
			},
		}
	)
	if value, ok := rc.mutation.Topic(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: review.FieldTopic,
		})
		_node.Topic = value
	}
	if value, ok := rc.mutation.Text(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: review.FieldText,
		})
		_node.Text = value
	}
	if value, ok := rc.mutation.Rank(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: review.FieldRank,
		})
		_node.Rank = value
	}
	if value, ok := rc.mutation.NumOfLikes(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: review.FieldNumOfLikes,
		})
		_node.NumOfLikes = value
	}
	if value, ok := rc.mutation.NumOfComments(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: review.FieldNumOfComments,
		})
		_node.NumOfComments = value
	}
	if nodes := rc.mutation.MovieIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   review.MovieTable,
			Columns: []string{review.MovieColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: movie.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.review_movie = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rc.mutation.UserIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   review.UserTable,
			Columns: []string{review.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.user_reviews = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rc.mutation.CommentsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: true,
			Table:   review.CommentsTable,
			Columns: []string{review.CommentsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: comment.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rc.mutation.LikesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   review.LikesTable,
			Columns: review.LikesPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: like.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// ReviewCreateBulk is the builder for creating many Review entities in bulk.
type ReviewCreateBulk struct {
	config
	builders []*ReviewCreate
}

// Save creates the Review entities in the database.
func (rcb *ReviewCreateBulk) Save(ctx context.Context) ([]*Review, error) {
	specs := make([]*sqlgraph.CreateSpec, len(rcb.builders))
	nodes := make([]*Review, len(rcb.builders))
	mutators := make([]Mutator, len(rcb.builders))
	for i := range rcb.builders {
		func(i int, root context.Context) {
			builder := rcb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*ReviewMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, rcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, rcb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				if specs[i].ID.Value != nil {
					id := specs[i].ID.Value.(int64)
					nodes[i].ID = int(id)
				}
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, rcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (rcb *ReviewCreateBulk) SaveX(ctx context.Context) []*Review {
	v, err := rcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (rcb *ReviewCreateBulk) Exec(ctx context.Context) error {
	_, err := rcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rcb *ReviewCreateBulk) ExecX(ctx context.Context) {
	if err := rcb.Exec(ctx); err != nil {
		panic(err)
	}
}
