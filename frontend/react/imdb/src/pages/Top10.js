import React, {useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import classes from "./top10.module.css"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ToggleFavorite from "../favorites/toggle-favorite";

function Top10Page(props) {
    const [itemClickedID, setItemClickedID] = useState(0)
    const [itemClickedTitle, setItemClickedTitle] = useState('')
    const [itemClickedImage, setItemClickedImage] = useState('')
    const [toggle, setToggle] = useState(false)

    const GET_TOP10_MOVIES = gql`
        query Top10Movies{
            top10Movies {
                title
                rank
                id
                image
            }
        }
    `;

    // getting all the favorites of the user
    const FAVORITES_OF_USER = gql`
        query FavoritesOfUser ($userID: ID!){
            favoritesOfUser (userID: $userID) {
                movieID
            }
        }
    `;

    const {loading, error, data} = useQuery(GET_TOP10_MOVIES)
    const {loading: loading1, error: error1, data: data1} = useQuery(FAVORITES_OF_USER,
        {
            variables: {
                userID: props.userID
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{error}</p>;
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

    let loaded = data.top10Movies.map(({title, rank, id, image}) => (
        <div>
            <Card sx={{maxWidth: 600}} style={{backgroundColor: "#cc2062", marginBottom: "3cm", borderRadius: "15px"}} key={id}>
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
                    {props.userID !== 0? <Button size="large" onClick={() => handleFirstClick(id, title, image)}>
                        {favorites.includes(parseInt(id)) ? "Remove from Favorites" : "Add To Favorites"}
                    </Button>: null}
                </CardActions>
            </Card>
        </div>
    ))
    return <>{loaded}{toggle? load: null}</>
}

export default Top10Page;
