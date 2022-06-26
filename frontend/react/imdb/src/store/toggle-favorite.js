import React, {useContext, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./AllMovies.module.css";

function ToggleFavorite () {
    let TOGGLE = gql`
        mutation AddToFavorite ($movieID: ID!, $userID: ID!, $movieTitle: String!, $movieImage: String!){
            addToFavorite (movieID: $movieID, userID: $userID, movieTitle: $movieTitle, movieImage: $movieImage){
                id
            }
        }
    `;

    let REMOVE_FROM_FAVORITES = gql`
        mutation RemoveFromFavorites ($movieID: ID!) {
            removeFromFavorites (movieID: $movieID) {
                id
            }
        }
    `;
}

export default ToggleFavorite