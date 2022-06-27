import React, {useContext, useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";

function ToggleFavorite(props) {
    const [toggle, setToggle] = useState(false)
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
            }
        })

    useEffect(() => {
        if (toggle) {
            toggleFav().then(() => setToggle(false))
        }
    })

    return (
        <div>
        </div>
    )
}

export default ToggleFavorite