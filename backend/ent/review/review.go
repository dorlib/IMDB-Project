// Code generated by entc, DO NOT EDIT.

package review

const (
	// Label holds the string label denoting the review type in the database.
	Label = "review"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldTopic holds the string denoting the topic field in the database.
	FieldTopic = "topic"
	// FieldText holds the string denoting the text field in the database.
	FieldText = "text"
	// FieldRank holds the string denoting the rank field in the database.
	FieldRank = "rank"
	// FieldNumOfLikes holds the string denoting the num_of_likes field in the database.
	FieldNumOfLikes = "num_of_likes"
	// EdgeMovie holds the string denoting the movie edge name in mutations.
	EdgeMovie = "movie"
	// EdgeUser holds the string denoting the user edge name in mutations.
	EdgeUser = "user"
	// EdgeComments holds the string denoting the comments edge name in mutations.
	EdgeComments = "comments"
	// EdgeLikes holds the string denoting the likes edge name in mutations.
	EdgeLikes = "likes"
	// Table holds the table name of the review in the database.
	Table = "reviews"
	// MovieTable is the table that holds the movie relation/edge.
	MovieTable = "reviews"
	// MovieInverseTable is the table name for the Movie entity.
	// It exists in this package in order to avoid circular dependency with the "movie" package.
	MovieInverseTable = "movies"
	// MovieColumn is the table column denoting the movie relation/edge.
	MovieColumn = "review_movie"
	// UserTable is the table that holds the user relation/edge.
	UserTable = "reviews"
	// UserInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	UserInverseTable = "users"
	// UserColumn is the table column denoting the user relation/edge.
	UserColumn = "user_reviews"
	// CommentsTable is the table that holds the comments relation/edge. The primary key declared below.
	CommentsTable = "comment_review"
	// CommentsInverseTable is the table name for the Comment entity.
	// It exists in this package in order to avoid circular dependency with the "comment" package.
	CommentsInverseTable = "comments"
	// LikesTable is the table that holds the likes relation/edge. The primary key declared below.
	LikesTable = "like_review"
	// LikesInverseTable is the table name for the Like entity.
	// It exists in this package in order to avoid circular dependency with the "like" package.
	LikesInverseTable = "likes"
)

// Columns holds all SQL columns for review fields.
var Columns = []string{
	FieldID,
	FieldTopic,
	FieldText,
	FieldRank,
	FieldNumOfLikes,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the "reviews"
// table and are not defined as standalone fields in the schema.
var ForeignKeys = []string{
	"review_movie",
	"user_reviews",
}

var (
	// CommentsPrimaryKey and CommentsColumn2 are the table columns denoting the
	// primary key for the comments relation (M2M).
	CommentsPrimaryKey = []string{"comment_id", "review_id"}
	// LikesPrimaryKey and LikesColumn2 are the table columns denoting the
	// primary key for the likes relation (M2M).
	LikesPrimaryKey = []string{"like_id", "review_id"}
)

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	for i := range ForeignKeys {
		if column == ForeignKeys[i] {
			return true
		}
	}
	return false
}

var (
	// NumOfLikesValidator is a validator for the "num_of_likes" field. It is called by the builders before save.
	NumOfLikesValidator func(int) error
)
