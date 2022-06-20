import React, {useContext, useRef} from "react";
import {Link} from 'react-router-dom';

import Card from "../ui/Card";
import classes from "./MovieItem.module.css";
import FavoritesContext from "../../store/favorites-context";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {isIterableObject} from "graphql/jsutils/isIterableObject";
import MenuItem from "@mui/material/MenuItem";
import showReviews from "../reviews/showReviews";
import ShowReviews from "../reviews/showReviews";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";

function MovieItem(props) {

    const favoritesCtx = useContext(FavoritesContext);

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
                }
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
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let movieID = data["movieById"]["0"]["id"]
    let title = data["movieById"]["0"]["title"]
    let originalRank = data["movieById"]["0"]["rank"]
    let description = data["movieById"]["0"]["description"]
    let year = data["movieById"]["0"]["year"]
    let image = data["movieById"]["0"]["image"]
    let director = data["movieById"]["0"]["director"]["name"]
    let directorId = data["movieById"]["0"]["director"]["id"]
    // let actors = data["movieById"]["0"]["actors"]

    console.log(data)

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

    const itemIsFavorite = favoritesCtx.itemIsFavorite(movieID);

    function toggleFavoriteStatusHandler(e) {
        if (itemIsFavorite) {
            e.target.style.color = 'white'
            favoritesCtx.removeFavorite(movieID);
        } else {
            e.target.style.color = '#8B0000'
            favoritesCtx.addFavorite({
                id: movieID,
                title: title,
                description: description,
                image: image,
                director: director,
            });
        }
    }

    const handleClick = (e) => {
        if (e.target.style.color == 'white') {
            e.target.style.color = '#8B0000'
        } else {
            e.target.style.color = 'white'
        }
    }

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
                    <EditIcon className={classes.editDetailsBut}/>
                    <Typography component="div">
                        About {title}
                    </Typography>
                </CardContent>
                <CardContent className={classes.director}>
                    <EditIcon className={classes.editDirectorPhotoBut}/>
                    <Typography component="div">
                        Directed by: <Link style={{color: "yellow"}} to={"/directorPage/" + directorId}>{director}</Link>
                        <img src={image} className={classes.directorImage}/>
                    </Typography>
                </CardContent>
                <CardContent className={classes.actors}>
                    <Typography component="div">
                        Actors:
                    </Typography>
                    <h4 style={{color: "yellow"}}>
                        {/*{data.actors.map(({id, name}) => (*/}
                        {/*    <li key={actors.id}>*/}
                        {/*        <Link to={"/actorPage/" + id}  style={{color: "yellow"}}> {name} </Link>*/}
                        {/*    </li>*/}
                        {/*))}*/}
                    </h4>
                </CardContent>
                    <div style={{fontSize: "xxx-large"}}>
                        <Fav>
                            <FavoriteIcon fontSize={'large'} onClick={toggleFavoriteStatusHandler} className={classes.heart} >
                                {itemIsFavorite ? "Remove from Favorites" : "To Favorites"}
                            </FavoriteIcon>
                            <TextBox><text >Click To Add To Favorites!</text></TextBox>
                        </Fav>
                    </div>
            </div>
        </Card>
    )

    return loaded

}

export default MovieItem;