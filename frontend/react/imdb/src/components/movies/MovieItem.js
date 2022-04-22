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


function MovieItem() {
    const MOVIE_DATA = gql`
        query MovieById($id : ID!) {
            movieById(id: $id) {
                id
                title
                rank
                description
                genre
                image
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
    let rank = data["movieById"]["0"]["rank"]
    let description = data["movieById"]["0"]["description"]
    let image = data["movieById"]["0"]["image"]


    let loaded =  (
        <Card>
        <div>
            <p style={{color: "yellow" ,fontSize: "xx-large"}}>
                {title} : {rank} {"/100"}
            </p>
        </div>
            <div className={classes.image}>
                <img src={image} />
                {image}
            </div>
        <div>
            <h4 style={{color: "yellow"}}>
                Movie description : {description}
            </h4>
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