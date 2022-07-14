import {gql, useMutation} from "@apollo/client";
import * as React from 'react';
import {useState} from "react";
import {parse} from "graphql";

function EditReview(props) {
    const [edit, setEdit] = useState(true)

    const EDIT_REVIEW = gql`
        mutation EditReview($reviewID: ID!, $rank: Int! $text: String!, $topic: String!) {
            editReview(reviewID: $reviewID, rank: $rank, text: $text, topic: $topic) {
                id
            }
        }
    `;

    const [editRev] = useMutation(EDIT_REVIEW,
        {
            variables: {
                reviewID: parseInt(props.reviewID),
                rank: parseInt(props.rank),
                text: props.text.slice(1,props.text.length -1),
                topic: props.topic.slice(1,props.topic.length -1)
            },
            onCompleted: (
                () => window.location.reload()
            )
        })

    if (edit) {
        setEdit(false)
        editRev().then(() => setEdit(false))
    }

    return null
}

export default EditReview