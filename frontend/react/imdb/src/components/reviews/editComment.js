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

    let editComment = (
        <form className={classes.formEdit}>
            <div className={classes.controlEdit}>
                <textarea
                    id="topic"
                    type="text"
                    datatype="String"
                    required
                    value={text} onChange={event => setText(event.target.value)}
                    rows="1"
                ></textarea>
            </div>
            <div className={classes.actionsEdit}>
                <button onClick={editCom} className={classes.addReviewButEdit} type="submit">Save</button>
            </div>
            <button className={classes.cancel} style={{backgroundColor: "#cc2062", borderColor: "#cc2062"}}><CancelIcon style={{color: "black"}} /></button>
        </form>
    )

    return editComment
}

export default EditComment