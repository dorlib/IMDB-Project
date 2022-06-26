import React, {useContext, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";

function ToggleFavorite (props) {
    let TOGGLE_FAVORITE

    let REMOVE_FROM_FAVORITES = gql`
        mutation RemoveFromFavorites ($movieID: ID!, $userID: ID!) {
            removeFromFavorites (movieID: $movieID, userID: $userID) {
                id
            }
        }
    `;

    let ADD_TO_FAVORITES = gql`
        mutation AddToFavorite ($movieID: ID!, $userID: ID!, $movieTitle: String!, $movieImage: String!){
            addToFavorite (movieID: $movieID, userID: $userID, movieTitle: $movieTitle, movieImage: $movieImage){
                id
            }
        }
    `;

    if (props.removeOrAdd === true) {
        TOGGLE_FAVORITE = REMOVE_FROM_FAVORITES
    } else {
        TOGGLE_FAVORITE = ADD_TO_FAVORITES
    }


    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE,
        {
            variables: {
                movieID: props.movieID,
                userID: props.userID,
                movieTitle: props.movieTitle,
                movieImage: props.movieImage
            },
        })

    return toggleFavorite()
}

export default ToggleFavorite