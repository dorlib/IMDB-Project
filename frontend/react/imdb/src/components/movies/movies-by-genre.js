import React from 'react'
import {gql, useQuery} from "@apollo/client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "../../pages/top10.module.css";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function MoviesByGenre() {
    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const MOVIES_BY_GENRE = gql`
        query MoviesByGenre($genre: String!) {
            moviesBYGenre(genre: $genre) {
                id
                title
                rank
                description
                genre
                image
                director {
                    id
                    name
                }
            }
        }
    `
    const {loading, error, data} = useQuery(MOVIES_BY_GENRE,
        {
            variables: {
                genre: lastSegment || 'action'
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let loaded

    loaded = data.moviesByGenre.map(({title, rank, id, image}) => (
        <div>
            <Card sx={{maxWidth: 600}} style={{backgroundColor: "#cc2062", marginBottom: "3cm"}} key={id}>
                <CardMedia
                    component="img"
                    alt="movie image"
                    height="300"
                    src={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {title} : {rank} / 100
                        </p>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">Share</Button>
                    <Link to={"/moviePage/" + id} style={{textDecoration: "none"}}><Button size="large">Go To Movie's Page</Button></Link>
                </CardActions>
            </Card>
        </div>
    ))
    return <>{loaded}</>

}

export default MoviesByGenre

