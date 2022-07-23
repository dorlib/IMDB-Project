import React, {useState} from 'react'
import {gql, useQuery} from "@apollo/client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./moviesByUser.module.css";
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function MoviesByUser(props) {
    const [numOfSet, setNumOfSet] = useState(0)

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

    let numOfMovies = data.moviesOfUser.length
    let numOfSets = 1 + numOfMovies % 9

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


    let newData = data.moviesOfUser.slice(numOfSet , numOfSet + 8)

    let loaded = (
        <div style={{position: "absolute"}}>
            {numOfSet === numOfSets || numOfMovies <= 8 ? null : <ArrowForwardIosIcon className={classes.forward} onClick={handleClickForward} style={{fontSize: "xx-large"}} id={"Forward"}/>}
            {numOfSet === 0 || numOfMovies <= 8 ? null : <ArrowBackIosNewIcon className={classes.backward} onClick={handleClickBackward} style={{fontSize: "xx-large"}} id={"Backward"}/>}
            <ul className={classes.list}>
                {newData.map(({id, title, image}) => (
                    <div>
                        <Card sx={{maxWidth: 100}} style={{
                            backgroundColor: "#cc2062",
                            borderRadius: "50px",
                            width: "90px",
                            display: "inline-block",
                            marginTop: "0.7cm"
                        }} key={id}>
                            <CardMedia
                                component="img"
                                alt="movie image"
                                height="90"
                                src={image || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'}
                            />
                            <CardContent className={classes.card}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <p style={{color: "yellow"}} className={classes.movie}>
                                        <Link to={"/moviePage/" + id} className={classes.movieTitle}> {title}</Link>
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

export default MoviesByUser