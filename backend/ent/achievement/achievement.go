// Code generated by ent, DO NOT EDIT.

package achievement

const (
	// Label holds the string label denoting the achievement type in the database.
	Label = "achievement"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldImage holds the string denoting the image field in the database.
	FieldImage = "image"
	// FieldDescription holds the string denoting the description field in the database.
	FieldDescription = "description"
	// Table holds the table name of the achievement in the database.
	Table = "achievements"
)

// Columns holds all SQL columns for achievement fields.
var Columns = []string{
	FieldID,
	FieldName,
	FieldImage,
	FieldDescription,
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
