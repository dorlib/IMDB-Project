// this component shows list of favorite movies!

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import React from "react";
import classes from "../../pages/AllMovies"

function MovieList(props) {
  let movies = props.movies

  return (
    <ul className={classes.list}>
      {movies.map((movie) => (
          <div>
            <Card sx={{maxWidth: 600}} style={{backgroundColor: "#cc2062", marginBottom: "3cm", borderRadius: "15px"}} key={movies["favoritesOfUser"]["0"]["id"]}>
              <CardMedia
                  component="img"
                  alt="movie image"
                  height="300"
                  src={props.image || 'https://pharem-project.eu/wp-content/themes/consultix/images/no-image-found-360x250.png'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                    <Link to={"/moviePage/" + movies["favoritesOfUser"]["0"]["id"]} style={{color: "yellow" }}> {movies["favoritesOfUser"]["0"]["movieTitle"]}</Link>
                  </p>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="large">Share</Button>
                <Link to={"/moviePage/" + movies["favoritesOfUser"]["0"]["id"]} style={{textDecoration: "none"}}><Button size="large">Go To Movie's Page</Button></Link>
              </CardActions>
            </Card>
          </div>
      ))}
    </ul>
  );
}

export default MovieList;