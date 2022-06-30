// Code generated by entc, DO NOT EDIT.

package like

const (
	// Label holds the string label denoting the like type in the database.
	Label = "like"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldUserID holds the string denoting the user_id field in the database.
	FieldUserID = "user_id"
	// FieldReviewID holds the string denoting the review_id field in the database.
	FieldReviewID = "review_id"
	// EdgeUser holds the string denoting the user edge name in mutations.
	EdgeUser = "user"
	// EdgeReview holds the string denoting the review edge name in mutations.
	EdgeReview = "review"
	// Table holds the table name of the like in the database.
	Table = "likes"
	// UserTable is the table that holds the user relation/edge. The primary key declared below.
	UserTable = "user_likes"
	// UserInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	UserInverseTable = "users"
	// ReviewTable is the table that holds the review relation/edge. The primary key declared below.
	ReviewTable = "like_review"
	// ReviewInverseTable is the table name for the Review entity.
	// It exists in this package in order to avoid circular dependency with the "review" package.
	ReviewInverseTable = "reviews"
)

// Columns holds all SQL columns for like fields.
var Columns = []string{
	FieldID,
	FieldUserID,
	FieldReviewID,
}

var (
	// UserPrimaryKey and UserColumn2 are the table columns denoting the
	// primary key for the user relation (M2M).
	UserPrimaryKey = []string{"user_id", "like_id"}
	// ReviewPrimaryKey and ReviewColumn2 are the table columns denoting the
	// primary key for the review relation (M2M).
	ReviewPrimaryKey = []string{"like_id", "review_id"}
)

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}