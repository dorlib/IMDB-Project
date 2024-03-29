// Code generated by ent, DO NOT EDIT.

package favorite

const (
	// Label holds the string label denoting the favorite type in the database.
	Label = "favorite"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldMovieTitle holds the string denoting the movie_title field in the database.
	FieldMovieTitle = "movie_title"
	// FieldMovieImage holds the string denoting the movie_image field in the database.
	FieldMovieImage = "movie_image"
	// FieldMovieID holds the string denoting the movie_id field in the database.
	FieldMovieID = "movie_id"
	// FieldUserID holds the string denoting the user_id field in the database.
	FieldUserID = "user_id"
	// Table holds the table name of the favorite in the database.
	Table = "favorites"
)

// Columns holds all SQL columns for favorite fields.
var Columns = []string{
	FieldID,
	FieldMovieTitle,
	FieldMovieImage,
	FieldMovieID,
	FieldUserID,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}
