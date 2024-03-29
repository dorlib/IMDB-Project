// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package graphql

type AchievementInput struct {
	Name        string `json:"name"`
	Image       string `json:"image"`
	Description string `json:"description"`
}

type ActorInput struct {
	Name          string `json:"name"`
	CharacterName string `json:"characterName"`
	Image         string `json:"image"`
}

type CommentInput struct {
	Text string `json:"text"`
}

type DirectorInput struct {
	Name         string `json:"name"`
	ProfileImage string `json:"profileImage"`
	BornAt       string `json:"bornAt"`
	Description  string `json:"description"`
}

type FavoriteInput struct {
	MovieID    int    `json:"movieID"`
	UserID     int    `json:"userID"`
	MovieTitle string `json:"movieTitle"`
	MovieImage string `json:"movieImage"`
}

type MovieInput struct {
	Description string `json:"description"`
	Title       string `json:"title"`
	Rank        int    `json:"rank"`
	Genre       string `json:"genre"`
	DirectorID  int    `json:"director_id"`
	Image       string `json:"image"`
	Topic       string `json:"topic"`
	Text        string `json:"text"`
	Year        int    `json:"year"`
	UserID      int    `json:"userID"`
}

type ReviewInput struct {
	Topic         string `json:"topic"`
	Text          string `json:"text"`
	Rank          int    `json:"rank"`
	NumOfComments int    `json:"numOfComments"`
	NumOfLikes    int    `json:"numOfLikes"`
	MovieID       int    `json:"movieID"`
}

type UserInput struct {
	Firstname   string `json:"firstname"`
	Lastname    string `json:"lastname"`
	Nickname    string `json:"nickname"`
	Description string `json:"description"`
	Password    string `json:"password"`
	Profile     string `json:"profile"`
	Email       string `json:"email"`
	Birthday    string `json:"birthday"`
	Country     string `json:"country"`
	Gender      string `json:"gender"`
}
