import React, {useContext, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import NewMovieForm from "../components/movies/NewMovieForm";
import App from "../App";
import FavoritesContext from "../store/favorites-context";

function AllMoviesFavorite(props) {
    const favoritesCtx = useContext(FavoritesContext);

    let id = props.id
    let title = props.title
    let description = props.description
    let image = props.image
    let director = props.director

    function ToggleFavoriteStatusHandler(id, title, description, image, director) {

        let itemIsFavorite = favoritesCtx.itemIsFavorite(id);

        if (itemIsFavorite) {
            favoritesCtx.removeFavorite(id);
        } else {
            favoritesCtx.addFavorite({
                id: id,
                title: title,
                description: description,
                image: image,
                director: director,
            });
        }
    }

    ToggleFavoriteStatusHandler(id, title, description, image, director)
}

export default AllMoviesFavorite