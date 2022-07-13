import {gql, useMutation} from "@apollo/client";
import * as React from 'react';
import {useState} from "react";

function EditComment(props) {
    const [edit, setEdit] = useState(true)

    const EDIT_COMMENT = gql`
        mutation EditComment ($commentID: ID!, $text: String!) {
            editComment (commentID: $commentID, text: $text)
        }
    `;
    
    const [editCom] = useMutation(EDIT_COMMENT,
        {
            variables: {
                commentID: parseInt(props.commentID),
                text: prop.editedText
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