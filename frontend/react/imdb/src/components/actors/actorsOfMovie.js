import React, {useState} from 'react'
import {gql, useQuery} from "@apollo/client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./actorsOfMovie.module.css";
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// ActorsOfMovie function show a list of actors in the movie's page
function ActorsOfMovie(props) {
    const [numOfSet, setNumOfSet] = useState(0)

    const ACTORS_OF_MOVIE = gql`
        query ActorsOfMovie($movieID: ID!) {
            actorsOfMovie(movieID: $movieID) {
                id
                name
                characterName
                image
            }
        }
    `
    const {loading, error, data} = useQuery(ACTORS_OF_MOVIE,
        {
            variables: {
                movieID: props.movieID
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    let numOfActors = data.actorsOfMovie.length
    let numOfSets = numOfActors - 3
    if (numOfSets < 0) {
        numOfSets = 0
    }

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


    let newData = data.actorsOfMovie.slice(numOfSet , numOfSet + 8)

    let loaded = (
        <div style={{position: "absolute"}}>
            {numOfSet === numOfSets || numOfActors <= 3 ? null : <ArrowForwardIosIcon className={classes.forward} onClick={handleClickForward} style={{fontSize: "xx-large"}} id={"Forward"}/>}
            {numOfSet === 0 || numOfActors <= 3 ? null : <ArrowBackIosNewIcon className={classes.backward} onClick={handleClickBackward} style={{fontSize: "xx-large"}} id={"Backward"}/>}
            <ul className={classes.list}>
                {newData.map(({id, name, characterName, image}) => (
                    <div>
                        <img
                            className={classes.image}
                            alt="movie image"
                            height="90"
                            src={image || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'}
                        />
                        <Typography >
                            <Link to={"/actorPage/" + id} className={classes.actorName}>{name}</Link>
                        </Typography>
                        <Typography className={classes.actorName} style={{color: "rgba(0,0,0,0.61)"}}>{characterName}</Typography>
                        <div className={classes.outOf}>{numOfSet + 1  + "/" + (numOfSets+1)}</div>
                    </div>
                ))}
            </ul>
        </div>
    );

    return <>{loaded}</>

}

export default ActorsOfMovie