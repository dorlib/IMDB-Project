import React, {useContext, useRef, useState} from "react";
import {Link} from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Card from "../ui/Card";
import classes from "./MovieItem.module.css";
import {gql, useMutation, useQuery} from "@apollo/client";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import ToggleFavorite from "../../favorites/toggle-favorite";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddActor from "../actors/add-actor";
import IconButton from "@mui/material/IconButton";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ChangeProfile from "../accounts/changeProfile";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ActorsOfMovie from "../actors/actorsOfMovie";


function MovieItem(props) {
    const [toggle, setToggle] = useState(false);
    const [addActors, setAddActors] = useState(false);

    const MOVIE_DATA = gql`
        query MovieById($id : ID!) {
            movieById(id: $id) {
                id
                title
                rank
                description
                genre
                image
                year
                reviews{
                    rank
                }
                director {
                    id
                    name
                    profileImage
                    user {
                        id
                    }
                }
                user {
                    id 
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

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const {loading, error, data} = useQuery(MOVIE_DATA,
        {
            variables: {
                id: lastSegment || 0
            }
        })

    const {loading: loading1, error: error1, data: data1} = useQuery(FAVORITES_OF_USER,
        {
            variables: {
                userID: props.userID
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{error}</p>;
    if (loading1) return <p>Loading...</p>
    if (error1) return <p>Error : {error1}</p>

    let movieID = data["movieById"]["0"]["id"]
    let title = data["movieById"]["0"]["title"]
    let originalRank = data["movieById"]["0"]["rank"]
    let description = data["movieById"]["0"]["description"]
    let year = data["movieById"]["0"]["year"]
    let image = data["movieById"]["0"]["image"]
    let director = data["movieById"]["0"]["director"]["name"]
    let directorId = data["movieById"]["0"]["director"]["id"]
    let userId = data["movieById"]["0"]["user"]["id"]
    let directorImage = data["movieById"]["0"]["director"]["profileImage"]
    let userIdOfDirector = data["movieById"]["0"]["director"]["user"]["id"]

    // let actors = data["movieById"]["0"]["actors"]

    let numOfFavorites = data1["favoritesOfUser"].length
    let favorites = [];

    for (let i = 0; i < numOfFavorites; i++) {
        favorites.push(data1["favoritesOfUser"][i]["movieID"])
    }

    let rank = Math.floor((originalRank + props.total) / (props.counter + 1))

    const Fav = styled.div`
        color: white;
        position: absolute;
        display: flex;
        right: 28.4cm;
        margin-top: -0.15cm;
    `;

    let TextBox = styled.text` 
        position: absolute;
        display: none;
        margin-top: 1cm;
        right: 21.9cm;
        background: #fff;
        font-size: small;
        ${Fav}:hover & {
            display: flex;
            right: 10.2cm;
            top: 0.3cm;
            width: 4.5cm;
            color: black;
        }    
    `;

    const handleClick = () => {
        let movieId = JSON.stringify(movieID)
        return (
            window.location.replace("/editMovieDetails/" + movieId.slice(1, movieId.length - 1))
        )
    }

    const handleDirectorClick = () => {
        let directorID = JSON.stringify(directorId)
        return (
            window.location.replace("/editDirectorDetails/" + directorID.slice(1, directorID.length - 1))
        )
    }

    let load = (
        <div>
            <ToggleFavorite userID={props.userID} movieID={movieID} movieTitle={title} movieImage={image} removeOrAdd={favorites.includes(parseInt(movieID)) && movieID !== 0} toggle={toggle}/>
            {() => setToggle(false)}
        </div>
    )

    let loaded = (
        <Card>
            <div>
                <p className={classes.title}>
                    {title} : {rank} {"/100"}
                </p>
            </div>
            <div>
                <p className={classes.year}>
                    Year Of Release : {year}
                </p>
            </div>
            <div className={classes.image}>
                <img src={image}/>
            </div>
            <div>
                <CardContent className={classes.about}>
                    {parseInt(userId) === props.userID ? <EditIcon className={classes.editDetailsBut} /> : null}
                    <Typography component="div">
                        About {title}
                    </Typography>
                    <Typography style={{color: "yellow", fontSize: "xx-large"}}>
                        {description}
                    </Typography>
                </CardContent>
                <CardContent className={classes.director}>
                    {parseInt(userIdOfDirector) === props.userID ? <EditIcon className={classes.editDirectorPhotoBut}/> : null}
                    <Typography component="div">
                        Directed by: <Link style={{color: "yellow"}} to={"/directorPage/" + directorId}>{director}</Link>
                        <img src={directorImage} className={classes.directorImage}/>
                    </Typography>
                </CardContent>
                <CardContent className={classes.actors}>
                    <Typography component="div">
                        Actors:
                    </Typography>
                    {/*<ActorsOfMovie movieID={movieID}/>*/}
                    { parseInt(userId) === props.userID ?
                    <ControlPointIcon color="primary" aria-label="change image" style={{fontSize: "xxx-large", color: "yellow"}} className={classes.addActorsBut}
                                onClick={() => setAddActors(true)} /> : null}
                    {
                        addActors ?
                            <div className={classes.pageMask}>
                                <AddActor movieID={movieID}/>
                                <HighlightOffIcon onClick={() => setAddActors(false)} style={{fontSize: "xxx-large"}} className={classes.close}/>
                            </div>
                            : null
                    }
                    <ActorsOfMovie movieID={lastSegment}/>
                </CardContent>
                {props.userID === parseInt(userId)? <Stack direction="row" spacing={2} className={classes.edit}>
                    {props.userID === parseInt(userId)? <Button variant="edit" className={classes.editBut} onClick={handleClick}>Edit Movie's Details</Button> : null}
                </Stack> : null }
                {props.userID === parseInt(userIdOfDirector)? <Stack direction="row" spacing={2} className={classes.editDirec}>
                    {props.userID === parseInt(userIdOfDirector)? <Button variant="edit" className={classes.editButDirec} onClick={handleDirectorClick}>Edit Director's Details</Button> : null}
                </Stack> : null }
                    <div style={{fontSize: "xxx-large"}}>
                        {props.userID !== 0 ? <Fav>
                            <Button><FavoriteIcon fontSize={'large'} style={{color: favorites.includes(parseInt(movieID)) ? '#8B0000' : 'white'}} onClick={() => setToggle(true)} className={classes.heart} /></Button>
                            <TextBox><text>Click To Add To Favorites!</text></TextBox>
                        </Fav> : null}
                    </div>
            </div>
        </Card>
    )

    return <>{loaded}{toggle? load: null}</>

}

export default MovieItem;