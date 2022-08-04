// Code generated by entc, DO NOT EDIT.

package migrate

import (
	"entgo.io/ent/dialect/sql/schema"
	"entgo.io/ent/schema/field"
)

var (
	// AchievementsColumns holds the columns for the "achievements" table.
	AchievementsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "name", Type: field.TypeString, Unique: true},
		{Name: "user_id", Type: field.TypeInt},
	}
	// AchievementsTable holds the schema information for the "achievements" table.
	AchievementsTable = &schema.Table{
		Name:       "achievements",
		Columns:    AchievementsColumns,
		PrimaryKey: []*schema.Column{AchievementsColumns[0]},
	}
	// ActorsColumns holds the columns for the "actors" table.
	ActorsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "name", Type: field.TypeString, Unique: true},
		{Name: "character_name", Type: field.TypeString},
		{Name: "image", Type: field.TypeString},
		{Name: "movie_id", Type: field.TypeInt},
	}
	// ActorsTable holds the schema information for the "actors" table.
	ActorsTable = &schema.Table{
		Name:       "actors",
		Columns:    ActorsColumns,
		PrimaryKey: []*schema.Column{ActorsColumns[0]},
	}
	// CommentsColumns holds the columns for the "comments" table.
	CommentsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "text", Type: field.TypeString},
		{Name: "comment_review", Type: field.TypeInt, Nullable: true},
		{Name: "user_comments", Type: field.TypeInt, Nullable: true},
	}
	// CommentsTable holds the schema information for the "comments" table.
	CommentsTable = &schema.Table{
		Name:       "comments",
		Columns:    CommentsColumns,
		PrimaryKey: []*schema.Column{CommentsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "comments_reviews_review",
				Columns:    []*schema.Column{CommentsColumns[2]},
				RefColumns: []*schema.Column{ReviewsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "comments_users_comments",
				Columns:    []*schema.Column{CommentsColumns[3]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// DirectorsColumns holds the columns for the "directors" table.
	DirectorsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "name", Type: field.TypeString, Unique: true},
		{Name: "profile_image", Type: field.TypeString},
		{Name: "born_at", Type: field.TypeString, Default: "00.00.0000"},
		{Name: "description", Type: field.TypeString, Default: "not given"},
		{Name: "user_id", Type: field.TypeInt, Nullable: true},
	}
	// DirectorsTable holds the schema information for the "directors" table.
	DirectorsTable = &schema.Table{
		Name:       "directors",
		Columns:    DirectorsColumns,
		PrimaryKey: []*schema.Column{DirectorsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "directors_users_directors",
				Columns:    []*schema.Column{DirectorsColumns[5]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// FavoritesColumns holds the columns for the "favorites" table.
	FavoritesColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "movie_title", Type: field.TypeString},
		{Name: "movie_image", Type: field.TypeString},
		{Name: "movie_id", Type: field.TypeInt},
		{Name: "user_id", Type: field.TypeInt},
	}
	// FavoritesTable holds the schema information for the "favorites" table.
	FavoritesTable = &schema.Table{
		Name:       "favorites",
		Columns:    FavoritesColumns,
		PrimaryKey: []*schema.Column{FavoritesColumns[0]},
	}
	// LikesColumns holds the columns for the "likes" table.
	LikesColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "user_id", Type: field.TypeInt},
		{Name: "review_id", Type: field.TypeInt},
	}
	// LikesTable holds the schema information for the "likes" table.
	LikesTable = &schema.Table{
		Name:       "likes",
		Columns:    LikesColumns,
		PrimaryKey: []*schema.Column{LikesColumns[0]},
	}
	// MoviesColumns holds the columns for the "movies" table.
	MoviesColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "title", Type: field.TypeString, Unique: true},
		{Name: "description", Type: field.TypeString},
		{Name: "rank", Type: field.TypeInt},
		{Name: "genre", Type: field.TypeString},
		{Name: "year", Type: field.TypeInt},
		{Name: "image", Type: field.TypeString, Nullable: true},
		{Name: "director_id", Type: field.TypeInt, Nullable: true},
		{Name: "user_id", Type: field.TypeInt, Nullable: true},
	}
	// MoviesTable holds the schema information for the "movies" table.
	MoviesTable = &schema.Table{
		Name:       "movies",
		Columns:    MoviesColumns,
		PrimaryKey: []*schema.Column{MoviesColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "movies_directors_movies",
				Columns:    []*schema.Column{MoviesColumns[7]},
				RefColumns: []*schema.Column{DirectorsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "movies_users_movies",
				Columns:    []*schema.Column{MoviesColumns[8]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// ReviewsColumns holds the columns for the "reviews" table.
	ReviewsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "topic", Type: field.TypeString},
		{Name: "text", Type: field.TypeString},
		{Name: "rank", Type: field.TypeInt},
		{Name: "num_of_likes", Type: field.TypeInt},
		{Name: "num_of_comments", Type: field.TypeInt},
		{Name: "review_movie", Type: field.TypeInt, Nullable: true},
		{Name: "user_reviews", Type: field.TypeInt, Nullable: true},
	}
	// ReviewsTable holds the schema information for the "reviews" table.
	ReviewsTable = &schema.Table{
		Name:       "reviews",
		Columns:    ReviewsColumns,
		PrimaryKey: []*schema.Column{ReviewsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "reviews_movies_movie",
				Columns:    []*schema.Column{ReviewsColumns[6]},
				RefColumns: []*schema.Column{MoviesColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "reviews_users_reviews",
				Columns:    []*schema.Column{ReviewsColumns[7]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// UsersColumns holds the columns for the "users" table.
	UsersColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "firstname", Type: field.TypeString},
		{Name: "lastname", Type: field.TypeString},
		{Name: "nickname", Type: field.TypeString, Unique: true},
		{Name: "description", Type: field.TypeString},
		{Name: "password", Type: field.TypeString},
		{Name: "email", Type: field.TypeString, Unique: true},
		{Name: "birth_day", Type: field.TypeString},
		{Name: "profile", Type: field.TypeString},
		{Name: "country", Type: field.TypeString},
		{Name: "gender", Type: field.TypeString},
		{Name: "signup_at", Type: field.TypeString},
	}
	// UsersTable holds the schema information for the "users" table.
	UsersTable = &schema.Table{
		Name:       "users",
		Columns:    UsersColumns,
		PrimaryKey: []*schema.Column{UsersColumns[0]},
	}
	// ActorActorsColumns holds the columns for the "actor_actors" table.
	ActorActorsColumns = []*schema.Column{
		{Name: "actor_id", Type: field.TypeInt},
		{Name: "movie_id", Type: field.TypeInt},
	}
	// ActorActorsTable holds the schema information for the "actor_actors" table.
	ActorActorsTable = &schema.Table{
		Name:       "actor_actors",
		Columns:    ActorActorsColumns,
		PrimaryKey: []*schema.Column{ActorActorsColumns[0], ActorActorsColumns[1]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "actor_actors_actor_id",
				Columns:    []*schema.Column{ActorActorsColumns[0]},
				RefColumns: []*schema.Column{ActorsColumns[0]},
				OnDelete:   schema.Cascade,
			},
			{
				Symbol:     "actor_actors_movie_id",
				Columns:    []*schema.Column{ActorActorsColumns[1]},
				RefColumns: []*schema.Column{MoviesColumns[0]},
				OnDelete:   schema.Cascade,
			},
		},
	}
	// LikeReviewColumns holds the columns for the "like_review" table.
	LikeReviewColumns = []*schema.Column{
		{Name: "like_id", Type: field.TypeInt},
		{Name: "review_id", Type: field.TypeInt},
	}
	// LikeReviewTable holds the schema information for the "like_review" table.
	LikeReviewTable = &schema.Table{
		Name:       "like_review",
		Columns:    LikeReviewColumns,
		PrimaryKey: []*schema.Column{LikeReviewColumns[0], LikeReviewColumns[1]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "like_review_like_id",
				Columns:    []*schema.Column{LikeReviewColumns[0]},
				RefColumns: []*schema.Column{LikesColumns[0]},
				OnDelete:   schema.Cascade,
			},
			{
				Symbol:     "like_review_review_id",
				Columns:    []*schema.Column{LikeReviewColumns[1]},
				RefColumns: []*schema.Column{ReviewsColumns[0]},
				OnDelete:   schema.Cascade,
			},
		},
	}
	// UserLikesColumns holds the columns for the "user_likes" table.
	UserLikesColumns = []*schema.Column{
		{Name: "user_id", Type: field.TypeInt},
		{Name: "like_id", Type: field.TypeInt},
	}
	// UserLikesTable holds the schema information for the "user_likes" table.
	UserLikesTable = &schema.Table{
		Name:       "user_likes",
		Columns:    UserLikesColumns,
		PrimaryKey: []*schema.Column{UserLikesColumns[0], UserLikesColumns[1]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "user_likes_user_id",
				Columns:    []*schema.Column{UserLikesColumns[0]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.Cascade,
			},
			{
				Symbol:     "user_likes_like_id",
				Columns:    []*schema.Column{UserLikesColumns[1]},
				RefColumns: []*schema.Column{LikesColumns[0]},
				OnDelete:   schema.Cascade,
			},
		},
	}
	// UserAchievementsColumns holds the columns for the "user_achievements" table.
	UserAchievementsColumns = []*schema.Column{
		{Name: "user_id", Type: field.TypeInt},
		{Name: "achievement_id", Type: field.TypeInt},
	}
	// UserAchievementsTable holds the schema information for the "user_achievements" table.
	UserAchievementsTable = &schema.Table{
		Name:       "user_achievements",
		Columns:    UserAchievementsColumns,
		PrimaryKey: []*schema.Column{UserAchievementsColumns[0], UserAchievementsColumns[1]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "user_achievements_user_id",
				Columns:    []*schema.Column{UserAchievementsColumns[0]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.Cascade,
			},
			{
				Symbol:     "user_achievements_achievement_id",
				Columns:    []*schema.Column{UserAchievementsColumns[1]},
				RefColumns: []*schema.Column{AchievementsColumns[0]},
				OnDelete:   schema.Cascade,
			},
		},
	}
	// Tables holds all the tables in the schema.
	Tables = []*schema.Table{
		AchievementsTable,
		ActorsTable,
		CommentsTable,
		DirectorsTable,
		FavoritesTable,
		LikesTable,
		MoviesTable,
		ReviewsTable,
		UsersTable,
		ActorActorsTable,
		LikeReviewTable,
		UserLikesTable,
		UserAchievementsTable,
	}
)

func init() {
	CommentsTable.ForeignKeys[0].RefTable = ReviewsTable
	CommentsTable.ForeignKeys[1].RefTable = UsersTable
	DirectorsTable.ForeignKeys[0].RefTable = UsersTable
	MoviesTable.ForeignKeys[0].RefTable = DirectorsTable
	MoviesTable.ForeignKeys[1].RefTable = UsersTable
	ReviewsTable.ForeignKeys[0].RefTable = MoviesTable
	ReviewsTable.ForeignKeys[1].RefTable = UsersTable
	ActorActorsTable.ForeignKeys[0].RefTable = ActorsTable
	ActorActorsTable.ForeignKeys[1].RefTable = MoviesTable
	LikeReviewTable.ForeignKeys[0].RefTable = LikesTable
	LikeReviewTable.ForeignKeys[1].RefTable = ReviewsTable
	UserLikesTable.ForeignKeys[0].RefTable = UsersTable
	UserLikesTable.ForeignKeys[1].RefTable = LikesTable
	UserAchievementsTable.ForeignKeys[0].RefTable = UsersTable
	UserAchievementsTable.ForeignKeys[1].RefTable = AchievementsTable
}
