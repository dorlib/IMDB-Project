import {gql, useMutation, useQuery} from "@apollo/client";
import * as React from 'react';
import {useState} from "react";
import classes from "./addComment.module.css";
import {Link} from "@mui/material";

function AddComment(props) {
    const [text, setText] = useState('')

    const ADD_COMMENT = gql`
        mutation AddComment ($userID: ID!, $reviewID: ID!, $text: String!) {
            addComment (userID: $userID, reviewID: $reviewID, text: $text){
                id
            }
        }
    `;

    const [add] = useMutation(ADD_COMMENT,
        {
            variables: {
                userID: parseInt(props.userID),
                reviewID: parseInt(props.reviewID),
                text: text,
            },
            onCompleted: (
                () => window.location.reload()
            )
        })

    function handleSignClick() {
        window.location.replace("/register-sign-in")
    }

    function handleRegClick() {
        window.location.replace("/register-sign-in")
    }

    let loaded = (
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor="topic" style={{color: "yellow"}} className={classes.add}>Add Comment</label>
                    <textarea
                        id="topic"
                        type="text"
                        datatype="String"
                        required
                        value={text} onChange={event => setText(event.target.value)}
                        rows="1"
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    {text !== ''? <button onClick={add} className={classes.addReviewBut} type="submit">Add</button>: null}
                </div>
            </form>
    )

    let notSignedIn = (
        <div style={{color: "yellow"}}>
                <div className={classes.actions}> &ensp; &ensp; Want To Share your thoughts about this comment?
                    <Link type="button" onClick={handleSignClick} className={classes.signBut}>Sign in</Link>
                    <h2 className={classes.or}>OR</h2>
                    <Link type="button" onClick={handleRegClick} className={classes.regBut}>Register</Link>
                </div>
            <p> &ensp;</p>
        </div>
    )

    let load
    if (parseInt(props.userID) !== 0) {
        load = loaded
    } else {
        load = notSignedIn
    }


    return load
}

export default AddComment