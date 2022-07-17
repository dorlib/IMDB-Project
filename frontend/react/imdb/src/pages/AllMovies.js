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
import ToggleFavorite from "../favorites/toggle-favorite";

function AllMoviesPage(props) {
    const [itemClickedID, setItemClickedID] = useState(0)
    const [itemClickedTitle, setItemClickedTitle] = useState('')
    const [itemClickedImage, setItemClickedImage] = useState('')
    const [toggle, setToggle] = useState(false)

    // getting all movies query
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
    const {loading: loading, error: error, data: data} = useQuery(GET_MOVIES)

    // getting all the favorites of the user
    const FAVORITES_OF_USER = gql`
        query FavoritesOfUser ($userID: ID!){
            favoritesOfUser (userID: $userID) {
                movieID
            }
        }
    `;

    const {loading: loading1, error: error1, data: data1} = useQuery(FAVORITES_OF_USER,
        {
            variables: {
                userID: props.userID
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    if (loading1) return <p>Loading Favorites...</p>;
    if (error1) return <p>Error Loading Favorites :</p>;

    let sumOfFavorites = data1["favoritesOfUser"].length
    let favorites = [];

    for (let i = 0; i < sumOfFavorites; i++) {
        favorites.push(data1["favoritesOfUser"][i]["movieID"])
    }

    function handleFirstClick (id, title, image) {
        setItemClickedID(parseInt(id))
        handleSecondClick(id, title, image)
    }

    // handling click on add/remove from favorites
    function handleSecondClick(id, title, image) {
        setItemClickedTitle(title)
        setItemClickedImage(image)
        setToggle(true)
    }

    let load = (
        <div>
            <ToggleFavorite userID={props.userID} movieID={itemClickedID} movieTitle={itemClickedTitle} movieImage={itemClickedImage} removeOrAdd={favorites.includes(itemClickedID) && itemClickedID !== 0} toggle={toggle}/>
            {() => setToggle(false)}
        </div>
    )

    let loaded =
        <ul className={classes.list}>
            {data.movies.map(({title, rank, id, image, description, director}) => (
                <div>
                    <Card sx={{maxWidth: 600}} style={{
                        backgroundColor: "#cc2062",
                        marginBottom: "4rem",
                        borderRadius: "15px",
                        display: "inline-block"
                    }} key={id}>
                        <CardMedia
                            component="img"
                            alt="movie image"
                            height="300"
                            src={image || 'https://pharem-project.eu/wp-content/themes/consultix/images/no-image-found-360x250.png'}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <p style={{color: "yellow", fontSize: "xx-large", textDecoration: "none"}} className={classes.movie}>
                                    <Link to={"/moviePage/" + id} style={{color: "yellow"}}> {title}</Link>
                                </p>
                                <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.rank}>
                                    {rank} / 100
                                </p>
                            </Typography>
                            <Typography variant="body2" color="text.secondary"
                                        style={{fontSize: "large", fontWeight: "bolder"}}>
                                Description: {description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary"
                                        style={{fontSize: "large", fontWeight: "bolder"}}>
                                Directed By: {director.name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="large">Share</Button>
                            <Link to={"/moviePage/" + id} style={{textDecoration: "none"}}><Button size="large">Go To
                                Movie's Page</Button></Link>
                            {props.userID? <Button size="large" onClick={() => handleFirstClick(id, title, image)}>
                                {favorites.includes(parseInt(id)) ? "Remove from Favorites" : "Add To Favorites"}
                            </Button>: null}
                        </CardActions>
                    </Card>
                </div>
            ))}
        </ul>
    return <>{loaded}{toggle? load: null}</>
}

export default AllMoviesPage;
