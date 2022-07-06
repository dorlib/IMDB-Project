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
        mutation DeleteLike ($likeID: ID! ,$userID: ID!) {
            deleteLike (likeID: $likeID, userID: $userID){
                id
            }
        }
    `;

    const LIKE_ID = gql`
        query LikeByUserAndReview($userID: ID! ,$reviewID: ID!) {
            LikeByUserAndReview( userID: $userID, reviewID: $reviewID) {
                id
            }
        }
    `

    let TOGGLE

    // in case we need the like's id in order to remove it
    const {data, loading, error} = useQuery(LIKE_ID,
        {
            variables: {
                userID : props.userID || 0,
                reviewID: props.reviewID || 0,
            }
        })

    let userID = props.userID
    let reviewID = props.reviewID
    let likeID

    if (props.remove) {
        TOGGLE = REMOVE_LIKE
        likeID = data["likeByUserAndReview"]["0"]
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
                console.log("yay")
            },
            onError: function (error) {
                console.log("error:", error)
            }
        })

    if (error) return <div>Error!</div>
    if (loading) return <div>Loading...</div>

    if (toggle) {
        setToggle(false)
        toggleLike().then(() => setToggle(false))
    }
}

export default ToggleLike