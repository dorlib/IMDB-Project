import {useRef} from "react";

import Card from "../ui/Card";
import classes from "./NewMovieForm.module.css";

import {styled} from "@mui/material/styles";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";

function NewMovieForm() {
    let NEW

    let NEW_MOVIE = gql`
        mutation CreateMovie ($title: String!, $description: String!, $genre: String!, $rank: Int!, $director_id: ID!, $image: String!) {
            createMovie(movie: {title: $title , description: $description, genre: $genre , rank: $rank, director_id: $director_id, image: $image}) {
                id
            }
        }
    `;

    const DIRECTOR_ID = gql`
        query DirectorIdByName($director: String!) {
            directorIdByName(name: $director)
        }
    `;

    let NEW_MOVIE_AND_DIRECTOR = gql`
        mutation CreateMovieAndDirector ($title: String!, $description: String!, $genre: String!, $rank: Int!, $director_name: String!, $image: String!){
            createMovieAndDirector(title: $title , description: $description, genre: $genre , rank: $rank, directorName: $director_name, image: $image) {
                id
            }
        }
    `;

    let NEW_REVIEW = gql `
        mutation CreateReview ($topic: String!, $text: String!, $rank: Int!, $movieID: Int!) {
            createReview(review: {topic: $topic, text: $text, rank: $rank, movieID: $movieID }) {
                id
            }
        }
    `;

    const titleInputRef = useRef();
    const directorInputRef = useRef();
    const descriptionInputRef = useRef();
    const reviewInputRef = useRef();
    const rankInputRef = useRef();
    const worthInputRef = useRef();
    const genreInputRef = useRef();
    const imageInputRef = useRef();
    const topicInputRef = useRef();

    const Input = styled("input")({
        display: "none",
    });

    const id = useQuery(DIRECTOR_ID,
        {
            variables: {
                director: directorInputRef.current?.value || 'no director',
            }
        }).data

    let int = NaN
    let index = NaN
    let data = JSON.stringify(id)

    if (id && id["directorIdByName"]) {
        index = data.indexOf(":")
        int = parseInt(data.slice(index + 2, data.length - 2), 10)
        NEW = NEW_MOVIE
    } else {
        NEW = NEW_MOVIE_AND_DIRECTOR
    }

    const [addMovie] = useMutation(NEW,
        {
            variables: {
                title: titleInputRef.current?.value || 'Unknown',
                image: imageInputRef.current?.value || 'No Picture',
                description: descriptionInputRef.current?.value || 'No Description',
                review: reviewInputRef.current?.value || 'Doesnt Have Any Reviews',
                rank: rankInputRef.current?.value || 'No Rank Was Given',
                worth: worthInputRef.current?.value || 'No Worth Was Given',
                genre: genreInputRef.current?.value || 'No Genre Given',
                director_id: int || 0,
                director_name: directorInputRef.current?.value || 'No Director Given',
            },
            onCompleted: function (data) {
                console.log("data:", data)
                const uniqe = data["createMovieAndDirector"]["id"]
                return window.location.replace("/moviePage/" + uniqe)
            },
            onError: function (error) {
                console.log("error:",error)
            }
        });

    const [addReview] = useMutation(NEW_REVIEW,
        {
            variables: {
                review: reviewInputRef.current?.value || 'Doesnt Have Any Reviews',
                rank: rankInputRef.current?.value || 'No Rank Was Given',
                topic: topicInputRef.current?.value || 'no topic given',
                movieID: addMovie(id) || 'no id for review',
            },
            onError: function (error) {
                console.log("error:",error)
            },
        });

    return (
        <Card>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor="title">Movie Title</label>
                    <input type="text" datatype="String" required id="title" ref={titleInputRef}/>
                </div>

                <div className={classes.im}>
                    <label htmlFor="image">Movie Image</label>
                    <input datatype="string" type="url" id="image" ref={imageInputRef}/>
                </div>

                <Stack direction="row" alignItems="center" spacing={2} className={classes.but}>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            multiple
                            type="file"
                            id="contained-button-file"
                            ref={imageInputRef}
                        />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                </Stack>

                <div className={classes.control}>
                    <label htmlFor="director">Director's Name</label>
                    <input type="text" required id="director" ref={directorInputRef} datatype="String"/>
                </div>

                <div className={classes.control}>
                    <label htmlFor="worth">
                        How Much Do You Think This Movie Is worth Waching?
                    </label>
                    <input type="range" datatype="Int" id="worth" min="1" max="5" ref={worthInputRef}/>
                </div>

                <div className={classes.control}>
                    <label htmlFor="genre">What is the genre of this movie?</label>
                    <select name="genre" id="genre" ref={genreInputRef} required datatype="String">
                        <option value="action">Action</option>
                        <option value="drama">Drama</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="animation">Animation</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="romance">Romance</option>
                        <option value="thriller">Thriller</option>
                        <option value="horror">Horror</option>
                        <option value="science fiction">Science Fiction</option>
                        <option value="historical">Historical</option>
                        <option value="western">Western</option>
                    </select>
                </div>

                <div className={classes.control}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        type="text"
                        datatype="String"
                        required
                        rows="5"
                        ref={descriptionInputRef}
                    ></textarea>
                </div>

                <div className={classes.control}>
                    <label htmlFor="topic">Review title</label>
                    <textarea
                        id="topic"
                        type="text"
                        datatype="String"
                        required
                        rows="1"
                        ref={topicInputRef}
                    ></textarea>
                </div>

                <div className={classes.control}>
                    <label htmlFor="review">Review Text</label>
                    <textarea id="review" rows="5" datatype="String" ref={reviewInputRef}></textarea>
                </div>

                <div className={classes.ctrl}>
                    <label htmlFor="rank">Add Your Rank</label>
                    <input
                        type="number"
                        name="ranking"
                        id="ranking"
                        min="0"
                        max="100"
                        ref={rankInputRef}
                        datatype="Int"
                    ></input>
                </div>

                <div className={classes.actions}>
                    <button onClick={addMovie, addReview} type="button">Add Movie</button>
                </div>
            </form>
        </Card>
    );
}

export default NewMovieForm;