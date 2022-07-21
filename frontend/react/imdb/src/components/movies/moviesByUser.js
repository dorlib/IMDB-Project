import React from 'react'
import {gql, useQuery} from "@apollo/client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./moviesByUser.module.css";
import {Link} from "react-router-dom";

function MoviesByUser(props) {
    const MOVIE_OF_USER = gql`
        query MoviesOfUser($userID: ID!) {
            moviesOfUser(userID: $userID) {
                id
                title
                image
            }
        }
    `
    const {loading, error, data} = useQuery(MOVIE_OF_USER,
        {
            variables: {
                userID: props.userID
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    let loaded = (
        <ul className={classes.list}>
            {data.moviesOfUser.map(( {id, title, image} ) => (
                <div>
                    <Card sx={{maxWidth: 100}} style={{backgroundColor: "#cc2062", borderRadius: "50px", width: "90px", display: "inline-block", marginTop:"0.7cm"}} key={id}>
                        <CardMedia
                            component="img"
                            alt="movie image"
                            height="90"
                            src={image || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'}
                        />
                        <CardContent className={classes.card}>
                            <Typography gutterBottom variant="h5" component="div">
                                <p style={{color: "yellow"}} className={classes.movie}>
                                    <Link to={"/directorPage/" + id} className={classes.movieTitle}> {title}</Link>
                                </p>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </ul>
    );

    return <>{loaded}</>

}

export default MoviesByUser