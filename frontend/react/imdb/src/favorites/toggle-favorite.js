import React, {useContext, useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";

function ToggleFavorite(props) {
    const [toggle, setToggle] = useState(true)
    let TOGGLE_FAVORITE

    let REMOVE_FROM_FAVORITES = gql`
        mutation RemoveFromFavorites ($movieID: ID!, $userID: ID!) {
            removeFromFavorites (movieID: $movieID, userID: $userID) {
                id
            }
        }
    `;

    let ADD_TO_FAVORITES = gql`
        mutation AddToFavorites ($movieID: ID!, $userID: ID!, $movieTitle: String!, $movieImage: String!){
            addToFavorites (movieID: $movieID, userID: $userID, movieTitle: $movieTitle, movieImage: $movieImage){
                id
            }
        }
    `;

    if (props.removeOrAdd) {
        TOGGLE_FAVORITE = REMOVE_FROM_FAVORITES
    } else {
        TOGGLE_FAVORITE = ADD_TO_FAVORITES
    }

    let movieID = props.movieID
    let userID = props.userID
    let movieTitle = props.movieTitle
    let movieImage = props.movieImage

    const [toggleFav] = useMutation(TOGGLE_FAVORITE,
        {
            variables: {
                movieID: movieID,
                userID: userID,
                movieTitle: movieTitle,
                movieImage: movieImage
            }, onCompleted: function (data) {
                window.location.reload();
            },
            onError: function (error) {
                console.log("error:", error)
            }
        })

    if (toggle) {
        setToggle(false)
        toggleFav().then(() => setToggle(false))
    }
    return null
}

export default ToggleFavorite