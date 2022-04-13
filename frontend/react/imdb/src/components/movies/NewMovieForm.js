import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewMovieForm.module.css";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";

const Input = styled("input")({
  display: "none",
});

function NewMovieForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const directorInputRef = useRef();
  const descriptionInputRef = useRef();
  const reviewInputRef = useRef();
  const rankInputRef = useRef();
  const worthInputRef = useRef();
  const genreInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredDirector = directorInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredReview = reviewInputRef.current.value;
    const enteredRank = rankInputRef.current.value;
    const enteredWorth = worthInputRef.current.value;
    const enteredGenre = genreInputRef.current.value;

    const movieData = {
      title: enteredTitle,
      image: enteredImage,
      director: enteredDirector,
      description: enteredDescription,
      review: enteredReview,
      rank: enteredRank,
      worth: enteredWorth,
      genre: enteredGenre,
    };

    props.onAddMovie(movieData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Movie Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>

        <div className={classes.im}>
          <label htmlFor="image">Movie Image</label>
          <input type="url" id="image" ref={imageInputRef} />
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
          <input type="text" required id="director" ref={directorInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="worth">
            How Much Do You Think This Movie Is worth Waching?
          </label>
          <input type="range" id="worth" min="1" max="5" ref={worthInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="genre">What is the genre of this movie?</label>
          <select name="genre" id="genre" ref={genreInputRef} required>
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
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>

        <div className={classes.control}>
          <label htmlFor="review">Review</label>
          <textarea id="review" rows="5" ref={reviewInputRef}></textarea>
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
          ></input>
        </div>

        <div className={classes.actions}>
          <button>Add Movie</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMovieForm;
