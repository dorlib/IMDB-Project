import {gql, useMutation} from "@apollo/client";
import * as React from 'react';
import {useState} from "react";
import classes from "./editComment.module.css";
import CancelIcon from '@mui/icons-material/Cancel';

function EditComment(props) {
    const [edit, setEdit] = useState(true)
    const [text, setText] = useState('')

    const EDIT_COMMENT = gql`
        mutation EditComment ($commentID: ID!, $text: String!) {
            editComment (commentID: $commentID, text: $text)
        }
    `;

    const [editCom] = useMutation(EDIT_COMMENT,
        {
            variables: {
                commentID: parseInt(props.commentID),
                text: text
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