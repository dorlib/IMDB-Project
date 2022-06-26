import React, {useContext, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./AllMovies.module.css";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

function AllMoviesPage(props) {
    const [itemClicked, setItemClicked] = useState(0)

    let REMOVE_FROM_FAVORITES

    const GET_MOVIES = gql`
        query Movies{
            movies {
                rank
                id
                title
                image
                description
                director {
                    name
                }
            }
        }
    `
    // this will be a function that checks if item is already favorite
    // let itemIsFavorite = true
    //
    const { loading, error, data } = useQuery(GET_MOVIES)
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;
        let loaded
        //let movieId = data["movies"]["id"]

    if (itemClicked !== 0 /*add here condition if item is already favorite*/) {
        ADD_TO_FAVORITE = gql`
            mutation AddToFavorite ($movieID: ID!, $userID: ID!, $movieTitle: String!, $movieImage: String!){
                addToFavorite (movieID: $movieID, userID: $userID, movieTitle: $movieTitle, movieImage: $movieImage){
                    id
                }
            }
        `;
    }

    // const [addToFavorite] = useMutation(ADD_TO_FAVORITE,
    //     {
    //         variables: {
    //             title: itemClickedToFavorite,
    //         },
    //         onCompleted: function () {
    //             setItemClickedToFavorite(0)
    //             return window.location.reload();
    //         }
    //     })

    loaded =
        <ul className={classes.list}>
            {data.movies.map(( {title, rank, id, image, description, director}) => (
            <div>
                <Card sx={{maxWidth: 600}} style={{backgroundColor: "#cc2062", marginBottom: "3cm", borderRadius: "15px", display: "inline-block"}} key={id}>
                    <CardMedia
                        component="img"
                        alt="movie image"
                        height="300"
                        src={image || 'https://pharem-project.eu/wp-content/themes/consultix/images/no-image-found-360x250.png'}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                                    <Link to={"/moviePage/" + id}  style={{color: "yellow" }}  > {title}: {rank} / 100 </Link>
                            </p>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{fontSize: "large", fontWeight: "bolder"}}>
                            Description: {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{fontSize: "large", fontWeight: "bolder"}}>
                            Directed By: {director.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="large">Share</Button>
                        <Link to={"/moviePage/" + id} style={{textDecoration: "none"}}><Button size="large">Go To Movie's Page</Button></Link>
                        <Button size="large" onClick={() => setItemClicked(id)}>
                            { isFavorite ? "Remove from Favorites" : "Add To Favorites"}
                        </Button>
                    </CardActions>
                </Card>
            </div>
            ))};
        </ul>
        return loaded
}

export default AllMoviesPage;
