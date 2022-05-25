// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"imdbv2/ent/favorite"
	"strings"

	"entgo.io/ent/dialect/sql"
)

// Favorite is the model entity for the Favorite schema.
type Favorite struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// MovieTitle holds the value of the "movie_title" field.
	MovieTitle string `json:"movie_title,omitempty"`
	// MovieID holds the value of the "movie_id" field.
	MovieID int `json:"movie_id,omitempty"`
	// UserID holds the value of the "user_id" field.
	UserID int `json:"user_id,omitempty"`
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Favorite) scanValues(columns []string) ([]interface{}, error) {
	values := make([]interface{}, len(columns))
	for i := range columns {
		switch columns[i] {
		case favorite.FieldID, favorite.FieldMovieID, favorite.FieldUserID:
			values[i] = new(sql.NullInt64)
		case favorite.FieldMovieTitle:
			values[i] = new(sql.NullString)
		default:
			return nil, fmt.Errorf("unexpected column %q for type Favorite", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Favorite fields.
func (f *Favorite) assignValues(columns []string, values []interface{}) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case favorite.FieldID:
			value, ok := values[i].(*sql.NullInt64)
			if !ok {
				return fmt.Errorf("unexpected type %T for field id", value)
			}
			f.ID = int(value.Int64)
		case favorite.FieldMovieTitle:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field movie_title", values[i])
			} else if value.Valid {
				f.MovieTitle = value.String
			}
		case favorite.FieldMovieID:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field movie_id", values[i])
			} else if value.Valid {
				f.MovieID = int(value.Int64)
			}
		case favorite.FieldUserID:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field user_id", values[i])
			} else if value.Valid {
				f.UserID = int(value.Int64)
			}
		}
	}
	return nil
}

// Update returns a builder for updating this Favorite.
// Note that you need to call Favorite.Unwrap() before calling this method if this Favorite
// was returned from a transaction, and the transaction was committed or rolled back.
func (f *Favorite) Update() *FavoriteUpdateOne {
	return (&FavoriteClient{config: f.config}).UpdateOne(f)
}

// Unwrap unwraps the Favorite entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (f *Favorite) Unwrap() *Favorite {
	tx, ok := f.config.driver.(*txDriver)
	if !ok {
		panic("ent: Favorite is not a transactional entity")
	}
	f.config.driver = tx.drv
	return f
}

// String implements the fmt.Stringer.
func (f *Favorite) String() string {
	var builder strings.Builder
	builder.WriteString("Favorite(")
	builder.WriteString(fmt.Sprintf("id=%v", f.ID))
	builder.WriteString(", movie_title=")
	builder.WriteString(f.MovieTitle)
	builder.WriteString(", movie_id=")
	builder.WriteString(fmt.Sprintf("%v", f.MovieID))
	builder.WriteString(", user_id=")
	builder.WriteString(fmt.Sprintf("%v", f.UserID))
	builder.WriteByte(')')
	return builder.String()
}

// Favorites is a parsable slice of Favorite.
type Favorites []*Favorite

func (f Favorites) config(cfg config) {
	for _i := range f {
		f[_i].config = cfg
	}
}