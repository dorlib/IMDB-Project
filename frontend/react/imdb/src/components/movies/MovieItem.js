import React, {useContext} from "react";
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
//   return (
//     <li className={classes.item}>
//       <Card>
//         <div className={classes.content}>
//           <h3>{props.title}</h3>
//         </div>
//         <div className={classes.image}>
//           <img src={props.image} alt={props.title} />
//         </div>
//         <div className={classes.content}>
//           <h4>
//             Directed By:
//             <li>
//               <Link to={direc}>{props.director}</Link>
//             </li>
//           </h4>
//           <h5>Short description: {props.description}</h5>
//         </div>
//         <div className={classes.actions}>
//           <button onClick={toggleFavoriteStatusHandler}>
//             {itemIsFavorite ? "Remove from Favorites" : "To Favorites"}
//           </button>
//         </div>
//       </Card>
//     </li>
//   );
// }

function MovieItem() {

    const MOVIE_DATA = gql`
        query MovieById($id : ID!) {
            movieById(id: $id) {
                id
                title
                rank
                description
                genre
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
    let title

    const data = useQuery(MOVIE_DATA,
        {
            variables: {
                id: lastSegment || 0
            },
            onError: function (error) {
                console.log("error:", error)
            },
            onCompleted: function (data) {
                title = JSON.stringify(data["movieById"]["0"]["title"])
        }}).data

    return (
        <Card>
            <div className={classes.title}>
                <label htmlFor="title">Movie Title</label>
                <h1 style={{color: "yellow"}}>{title}</h1>
            </div>
        </Card>
    )



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