// this files contains favorites of user in order to show them on userPage

import React, {useState} from 'react'
import {gql, useQuery} from "@apollo/client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./favoritesOfUser.module.css";
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function FavoritesOfUser(props) {
    const [numOfSet, setNumOfSet] = useState(0)

    const FAVORITRES_OF_USER = gql`
        query FavoritesOfUser($userID: ID!) {
            favoritesOfUser(userID: $userID) {
                movieID
                movieTitle
                movieImage
            }
        }
    `
    const {loading, error, data} = useQuery(FAVORITRES_OF_USER,
        {
            variables: {
                userID: props.userID
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    let numOfFavorites = data.favoritesOfUser.length
    let numOfSets = 1 + Math.floor(numOfFavorites / 9)

    function handleClickForward () {
        if (numOfSet >= 0 && numOfSet < numOfSets) {
            setNumOfSet(numOfSet + 1)
        }
    }

    function handleClickBackward () {
        if (numOfSet > 0 && numOfSet <= numOfSets) {
            setNumOfSet(numOfSet - 1)
        }
    }


    let newData = data.favoritesOfUser.slice(numOfSet , numOfSet + 8)

    let loaded = (
        <div style={{position: "absolute"}}>
            {numOfSet === numOfSets || numOfFavorites <= 8 ? null : <ArrowForwardIosIcon className={classes.forward} onClick={handleClickForward} style={{fontSize: "xx-large"}} id={"Forward"}/>}
            {numOfSet === 0 || numOfFavorites <= 8 ? null : <ArrowBackIosNewIcon className={classes.backward} onClick={handleClickBackward} style={{fontSize: "xx-large"}} id={"Backward"}/>}
            <ul className={classes.list}>
                {newData.map(({movieID, movieTitle, movieImage}) => (
                    <div>
                        <Card sx={{maxWidth: 100}} style={{
                            backgroundColor: "#cc2062",
                            borderRadius: "50px",
                            width: "90px",
                            display: "inline-block",
                            marginTop: "0.7cm"
                        }} key={movieID}>
                            <CardMedia
                                component="img"
                                alt="movie image"
                                height="90"
                                src={movieImage || 'https://pharem-project.eu/wp-content/themes/consultix/images/no-image-found-360x250.png'}
                            />
                            <CardContent className={classes.card}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <p style={{color: "yellow"}} className={classes.movie}>
                                        <Link to={"/moviePage/" + movieID} className={classes.movieTitle}> {movieTitle}</Link>
                                    </p>
                                </Typography>
                                <div className={classes.outOf}>{numOfSet + 1  + "/" + (numOfSets+1)}</div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </ul>
        </div>
    );

    return <>{loaded}</>

}

export default FavoritesOfUser