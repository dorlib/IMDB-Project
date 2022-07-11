import {gql, useMutation, useQuery} from "@apollo/client";
import * as React from 'react';
import {motion, AnimateSharedLayout, AnimatePresence} from "framer-motion";
import {useState} from "react";
import Card from "@mui/material/Card";
import classes from "./showReviews.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Divider from "@mui/material/Divider";

function AddComment(props) {
    const [text, setText] = useState('')
    const ADD_COMMENT = gql`
        query AddComment ($userID: ID!, $reviewID: ID!, $text: String!) {
            addComment (userID: $userID, reviewID: $reviewID, text: $text){
                id
            }
        }
    `;

    const [addComment] = useMutation(ADD_COMMENT,
        {
            variables: {
                userID: props.userID,
                reviewID: props.reviewID || 0,
                text: text,
            }
        })

    let loaded = (text !== '' ? (
        <Card>
            <form className={classes.form}>
                <p htmlFor="review" style={{color: "yellow"}} className={classes.main}>Add Your Review!</p>
                <div className={classes.control}>
                    <label htmlFor="topic" style={{color: "yellow"}}>Add Comment</label>
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
                    <button onClick={addComment} className={classes.addReviewBut} type="button">Add Review</button>
                </div>
            </form>
        </Card>
    ) : null)
    return loaded
}

export default ShowComments