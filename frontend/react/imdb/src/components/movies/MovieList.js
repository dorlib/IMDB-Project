// this component shows list of favorite movies!

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import React from "react";
import classes from "./MovieList.module.css"

function MovieList(props) {
  let movies = props.movies

  return (
    <ul className={classes.list}>
      {movies.favoritesOfUser.map(( {movieID, movieTitle, movieImage} ) => (
          <div>
            <Card sx={{maxWidth: 500}} style={{backgroundColor: "#cc2062", borderRadius: "15px", width: "400px", display: "inline-block"}} key={movieID}>
              <CardMedia
                  component="img"
                  alt="movie image"
                  height="400"
                  src={movieImage || 'https://pharem-project.eu/wp-content/themes/consultix/images/no-image-found-360x250.png'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                    <Link to={"/moviePage/" + movieID} className={classes.movieTitle} > {movieTitle}</Link>
                  </p>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="large">Share</Button>
                <Link to={"/moviePage/" + movieID} style={{textDecoration: "none"}}><Button size="large">Go To Movie's Page</Button></Link>
              </CardActions>
            </Card>
          </div>
      ))}
    </ul>
  );
}

export default MovieList;