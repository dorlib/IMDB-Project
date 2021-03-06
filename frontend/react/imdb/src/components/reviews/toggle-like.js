import {gql, useMutation, useQuery} from "@apollo/client";
import * as React from 'react';
import {useState} from "react";

function ToggleLike(props) {
    const [toggle, setToggle] = useState(true)

    const ADD_LIKE = gql`
        mutation AddLike ($reviewID: ID! ,$userID: ID!) {
            addLike (reviewID: $reviewID, userID: $userID){
                id
            }
        }
    `;

    const REMOVE_LIKE = gql`
        mutation DeleteLike ($likeID: ID! ,$userID: ID!, $reviewID: ID!) {
            deleteLike (likeID: $likeID, userID: $userID, reviewID: $reviewID){
                id
            }
        }
    `;

    let userID = props.userID
    let reviewID = props.reviewID
    let likeID

    let TOGGLE

    if (props.remove) {
        TOGGLE = REMOVE_LIKE
        likeID = parseInt(props.likeID)
    } else {
        TOGGLE = ADD_LIKE
    }

    const [toggleLike] = useMutation(TOGGLE,
        {
            variables: {
                userID: userID,
                reviewID: reviewID,
                likeID: likeID || 0
            }, onCompleted: function (data) {
                window.location.reload();
            },
            onError: function (error) {
                console.log("error:", error)
            }
        })

    if (toggle) {
        setToggle(false)
        toggleLike().then(() => setToggle(false))
    }

    return null
}

export default ToggleLike