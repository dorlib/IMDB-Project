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

    let TOGGLE_FAVORITE

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
    `;

    const FAVORITES_OF_USER = gql`
        query FavoritesOfUser ($userID: ID!){
            favoritesOfUser (userID: $userID) {
                movieID
            }
        }
    `;

    const { loading: loading, error: error, data: data } = useQuery(GET_MOVIES)
    const { loading: loading1, error: error1, data: data1 } = useQuery(FAVORITES_OF_USER,
        {
            variables: {
                userID: props.userID
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    if (loading1) return <p>Loading Favorites...</p>;
    if (error1) return <p>Error Loading Favorites :</p>;

    let loaded
    let sumOfFavorites = data1["favoritesOfUser"].length
    let favorites = [];

    for (let i = 0; i < sumOfFavorites; i++) {
        favorites.push(data1["favoritesOfUser"][i]["movieID"])
    }

    if (itemClicked !== 0 && favorites.indexOf(itemClicked) === -1) {
        TOGGLE_FAVORITE = gql`
            mutation AddToFavorite ($movieID: ID!, $userID: ID!, $movieTitle: String!, $movieImage: String!){
                addToFavorite (movieID: $movieID, userID: $userID, movieTitle: $movieTitle, movieImage: $movieImage){
                    id
                }
            }
        `;
    }

    if (itemClicked !== 0 && favorites.indexOf(itemClicked) !== -1) {
        TOGGLE_FAVORITE = gql`
            mutation RemoveFromFavorites ($ID: ID!) {
                removeFromFavorites (ID: $ID) {
                    id
                }
            }
        `;
    }

    // const [toggleFavorite] = useMutation(ADD_TO_FAVORITE,
    //     {
    //         variables: {
    //             title: itemClickedToFavorite,
    //         },
    //         onCompleted: function () {
    //             setItemClickedToFavorite(0)
    //             return window.location.reload();
    //         }
    //     })

    function handleClick (id) {
        setItemClicked(parseInt(id))

    }

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
                        <Button size="large" onClick={() => handleClick(id)}>
                            { favorites.includes(parseInt(id)) ? "Remove from Favorites" : "Add To Favorites"}
                        </Button>
                    </CardActions>
                </Card>
            </div>
            ))};
        </ul>
        return loaded
}

export default AllMoviesPage;
