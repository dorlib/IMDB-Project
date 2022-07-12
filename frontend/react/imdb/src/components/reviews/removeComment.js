import {gql, useMutation} from "@apollo/client";
import * as React from 'react';
import {useState} from "react";

function RemoveComment(props) {
    const [remove, setRemove] = useState(true)

    const REMOVE_COMMENT = gql`
        mutation DeleteComment ($commentID: ID!, $reviewID: ID!, $userID: ID!) {
            deleteComment (commentID: $commentID, reviewID: $reviewID, userID: $userID)
        }
    `;

    console.log("ya")

    const [removeCom] = useMutation(REMOVE_COMMENT,
        {
            variables: {
                userID: parseInt(props.userID),
                reviewID: parseInt(props.reviewID),
                commentID: parseInt(props.commentID),
            },
            onCompleted: (
                () => window.location.reload()
            )
        })

    if (remove) {
        setRemove(false)
        removeCom().then(() => setRemove(false))
    }

    return null
}

export default RemoveComment