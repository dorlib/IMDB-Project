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

// function MovieItem(props) {
//   const favoritesCtx = useContext(FavoritesContext);
//
//   const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
//
//   function toggleFavoriteStatusHandler() {
//     if (itemIsFavorite) {
//       favoritesCtx.removeFavorite(props.id);
//     } else {
//       favoritesCtx.addFavorite({
//         id: props.id,
//         title: props.title,
//         description: props.description,
//         image: props.image,
//         director: props.director,
//       });
//     }
//   }
//
//   const direc = props.director
//


function MovieItem(props) {
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

    let title = data["movieById"]["0"]["title"]
    let originalRank = data["movieById"]["0"]["rank"]
    let description = data["movieById"]["0"]["description"]
    let year = data["movieById"]["0"]["year"]
    let image = data["movieById"]["0"]["image"]
    let director = data["movieById"]["0"]["director"]["name"]
    let directorId = data["movieById"]["0"]["director"]["id"]

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
            left: 1cm;
            top: -0.5cm;
            width: 4.5cm;
            color: black;
        }    
    `;

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
                <p style={{color: "yellow", fontSize: "xx-large"}}>
                    {title} : {rank} {"/100"}
                </p>
            </div>
            <div>
                <p style={{color: "yellow", fontSize: "x-large"}}>
                    Year Of Release : {year}
                </p>
            </div>
            <div className={classes.image}>
                <img src={image}/>
                {image}
            </div>
            <div>
                <h4 style={{color: "yellow"}}>
                    Movie description : {description}
                </h4>
                <h4 style={{color: "yellow"}}>
                    Directed by: <Link style={{color: "yellow"}} to={"/directorPage/" + directorId}>{director}</Link>
                </h4>
                    <div style={{fontSize: "xxx-large"}}>
                        <Fav>
                            <FavoriteIcon fontSize={'large'} onClick={handleClick} />
                            <TextBox><text >Click To Add To Favorites!</text></TextBox>
                        </Fav>
                    </div>
            </div>
        </Card>
    )

    return loaded

    // const favoritesCtx = useContext(FavoritesContext);
    // const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
    //
    // function toggleFavoriteStatusHandler() {
    //     if (itemIsFavorite) {
    //         favoritesCtx.removeFavorite(props.id);
    //     } else {
    //         favoritesCtx.addFavorite({
    //             id: props.id,
    //             title: props.title,
    //             description: props.description,
    //             image: props.image,
    //             director: props.director,
    //         });
    //     }
    // }

}

export default MovieItem;