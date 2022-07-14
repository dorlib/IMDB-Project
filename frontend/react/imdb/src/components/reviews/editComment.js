import {gql, useMutation} from "@apollo/client";
import * as React from 'react';
import {useState} from "react";
import CancelIcon from '@mui/icons-material/Cancel';

function EditComment(props) {
    const [edit, setEdit] = useState(true)

    const EDIT_COMMENT = gql`
        mutation EditComment($commentID: ID!, $text: String!) {
            editComment(commentID: $commentID, text: $text) {
                id
            }
        }
    `;

    console.log(props.commentID, console.log(props.text))

    const [editCom] = useMutation(EDIT_COMMENT,
        {
            variables: {
                commentID: parseInt(props.commentID),
                text: JSON.stringify(props.text)
            },
            onCompleted: (
                () => window.location.reload()
            )
        })

    if (edit) {
        setEdit(false)
        editCom().then(() => setEdit(false))
    }

    return null
}

export default EditComment