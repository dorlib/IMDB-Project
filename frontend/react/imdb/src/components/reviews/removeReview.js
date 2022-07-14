import {gql, useMutation} from "@apollo/client";
import * as React from 'react';
import {useState} from "react";

function RemoveReview(props) {
    const [remove, setRemove] = useState(true)

    const REMOVE_REVIEW = gql`
        mutation DeleteReview ($reviewID: ID!, $userID: ID!) {
            deleteReview (reviewID: $reviewID, userID: $userID)
        }
    `;

    const [removeRev] = useMutation(REMOVE_REVIEW,
        {
            variables: {
                userID: parseInt(props.userID),
                reviewID: parseInt(props.reviewID),
            },
            onCompleted: (
                () => window.location.reload()
            )
        })

    if (remove) {
        setRemove(false)
        removeRev().then(() => setRemove(false))
    }

    return null
}

export default RemoveReview