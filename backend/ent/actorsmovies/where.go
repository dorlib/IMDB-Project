// Code generated by entc, DO NOT EDIT.

package actorsmovies

import (
	"imdbv2/ent/predicate"

	"entgo.io/ent/dialect/sql"
)

// ID filters vertices based on their ID field.
func ID(id int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.In(s.C(FieldID), v...))
	})
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.NotIn(s.C(FieldID), v...))
	})
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// MovieTitle applies equality check predicate on the "movie_title" field. It's identical to MovieTitleEQ.
func MovieTitle(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldMovieTitle), v))
	})
}

// MovieID applies equality check predicate on the "movie_id" field. It's identical to MovieIDEQ.
func MovieID(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldMovieID), v))
	})
}

// ActorName applies equality check predicate on the "actor_name" field. It's identical to ActorNameEQ.
func ActorName(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldActorName), v))
	})
}

// ActorID applies equality check predicate on the "actor_id" field. It's identical to ActorIDEQ.
func ActorID(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldActorID), v))
	})
}

// MovieTitleEQ applies the EQ predicate on the "movie_title" field.
func MovieTitleEQ(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldMovieTitle), v))
	})
}

// MovieTitleNEQ applies the NEQ predicate on the "movie_title" field.
func MovieTitleNEQ(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldMovieTitle), v))
	})
}

// MovieTitleIn applies the In predicate on the "movie_title" field.
func MovieTitleIn(vs ...int) predicate.ActorsMovies {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldMovieTitle), v...))
	})
}

// MovieTitleNotIn applies the NotIn predicate on the "movie_title" field.
func MovieTitleNotIn(vs ...int) predicate.ActorsMovies {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldMovieTitle), v...))
	})
}

// MovieTitleGT applies the GT predicate on the "movie_title" field.
func MovieTitleGT(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldMovieTitle), v))
	})
}

// MovieTitleGTE applies the GTE predicate on the "movie_title" field.
func MovieTitleGTE(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldMovieTitle), v))
	})
}

// MovieTitleLT applies the LT predicate on the "movie_title" field.
func MovieTitleLT(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldMovieTitle), v))
	})
}

// MovieTitleLTE applies the LTE predicate on the "movie_title" field.
func MovieTitleLTE(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldMovieTitle), v))
	})
}

// MovieIDEQ applies the EQ predicate on the "movie_id" field.
func MovieIDEQ(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldMovieID), v))
	})
}

// MovieIDNEQ applies the NEQ predicate on the "movie_id" field.
func MovieIDNEQ(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldMovieID), v))
	})
}

// MovieIDIn applies the In predicate on the "movie_id" field.
func MovieIDIn(vs ...int) predicate.ActorsMovies {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldMovieID), v...))
	})
}

// MovieIDNotIn applies the NotIn predicate on the "movie_id" field.
func MovieIDNotIn(vs ...int) predicate.ActorsMovies {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldMovieID), v...))
	})
}

// MovieIDGT applies the GT predicate on the "movie_id" field.
func MovieIDGT(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldMovieID), v))
	})
}

// MovieIDGTE applies the GTE predicate on the "movie_id" field.
func MovieIDGTE(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldMovieID), v))
	})
}

// MovieIDLT applies the LT predicate on the "movie_id" field.
func MovieIDLT(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldMovieID), v))
	})
}

// MovieIDLTE applies the LTE predicate on the "movie_id" field.
func MovieIDLTE(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldMovieID), v))
	})
}

// ActorNameEQ applies the EQ predicate on the "actor_name" field.
func ActorNameEQ(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldActorName), v))
	})
}

// ActorNameNEQ applies the NEQ predicate on the "actor_name" field.
func ActorNameNEQ(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldActorName), v))
	})
}

// ActorNameIn applies the In predicate on the "actor_name" field.
func ActorNameIn(vs ...int) predicate.ActorsMovies {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldActorName), v...))
	})
}

// ActorNameNotIn applies the NotIn predicate on the "actor_name" field.
func ActorNameNotIn(vs ...int) predicate.ActorsMovies {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldActorName), v...))
	})
}

// ActorNameGT applies the GT predicate on the "actor_name" field.
func ActorNameGT(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldActorName), v))
	})
}

// ActorNameGTE applies the GTE predicate on the "actor_name" field.
func ActorNameGTE(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldActorName), v))
	})
}

// ActorNameLT applies the LT predicate on the "actor_name" field.
func ActorNameLT(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldActorName), v))
	})
}

// ActorNameLTE applies the LTE predicate on the "actor_name" field.
func ActorNameLTE(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldActorName), v))
	})
}

// ActorIDEQ applies the EQ predicate on the "actor_id" field.
func ActorIDEQ(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldActorID), v))
	})
}

// ActorIDNEQ applies the NEQ predicate on the "actor_id" field.
func ActorIDNEQ(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldActorID), v))
	})
}

// ActorIDIn applies the In predicate on the "actor_id" field.
func ActorIDIn(vs ...int) predicate.ActorsMovies {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.In(s.C(FieldActorID), v...))
	})
}

// ActorIDNotIn applies the NotIn predicate on the "actor_id" field.
func ActorIDNotIn(vs ...int) predicate.ActorsMovies {
	v := make([]interface{}, len(vs))
	for i := range v {
		v[i] = vs[i]
	}
	return predicate.ActorsMovies(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(v) == 0 {
			s.Where(sql.False())
			return
		}
		s.Where(sql.NotIn(s.C(FieldActorID), v...))
	})
}

// ActorIDGT applies the GT predicate on the "actor_id" field.
func ActorIDGT(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldActorID), v))
	})
}

// ActorIDGTE applies the GTE predicate on the "actor_id" field.
func ActorIDGTE(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldActorID), v))
	})
}

// ActorIDLT applies the LT predicate on the "actor_id" field.
func ActorIDLT(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldActorID), v))
	})
}

// ActorIDLTE applies the LTE predicate on the "actor_id" field.
func ActorIDLTE(v int) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldActorID), v))
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.ActorsMovies) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.ActorsMovies) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.ActorsMovies) predicate.ActorsMovies {
	return predicate.ActorsMovies(func(s *sql.Selector) {
		p(s.Not())
	})
}