import React, {useContext, useEffect, useRef, useState} from "react";
import Card from "../ui/Card";
import {gql, useMutation, useQuery} from "@apollo/client";

import classes from "./newReview.module.css";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function NewReviewForm(props) {
    const ADD_REVIEW = gql`
        mutation CreateReview ($text: String!, $rank: Int!, $movieID: Int!, $userID: Int! $topic: String!) {
            createReview(text: $text, rank: $rank, movieID: $movieID, userID: $userID, topic: $topic) {
                text
                rank
                topic
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const textInputRef = useRef();
    const rankInputRef = useRef();
    const topicInputRef = useRef();

    const [givenText, setText] = useState('')
    const [givenRank, setRank] = useState('')
    const [givenTopic, setTopic] = useState('')

    const [addReview] = useMutation(ADD_REVIEW,
        {
            variables: {
                movieID: lastSegment || 0 ,
                text: givenText,
                rank: givenRank,
                topic: givenTopic,
                userID: props.userId,
            },
            onError: function (error) {
                console.log("error:",error)
            },onCompleted: function (data) {
                window.location.reload();
            }
        });

    function handleSignClick() {
        window.location.replace("/register-sign-in")
    }

    function handleRegClick() {
        window.location.replace("/register-sign-in")
    }

    if (props.username === '' || props.username === 'Guest') {
        return (
            <div style={{color: "yellow"}}>
                <p htmlFor="review" style={{color: "yellow", marginTop: "1.6cm"}} className={classes.main}>Add Your Review!</p>
                <CardContent className={classes.oops}>
                    <Typography className={classes.oopsMsg} style={{fontSize: "x-large"}}>
                        Oops! it seems that you are not logged In!
                    </Typography>
                    <div className={classes.actions}>
                        <button type="button" onClick={handleSignClick} className={classes.signBut}>Sign In!</button>
                        <h2 className={classes.or}>OR</h2>
                        <button type="button" onClick={handleRegClick} className={classes.regBut}>Register!</button>
                    </div>
                </CardContent>
                <p> &ensp;</p>
            </div>
        )
    }

    let loaded =  (
        <Card>
            <form className={classes.form}>
                <p htmlFor="review" style={{color: "yellow"}} className={classes.main}>Add Your Review!</p>
                <div className={classes.control}>
                    <label htmlFor="topic" style={{color: "yellow"}}>Add Your Review's Title</label>
                    <textarea
                        id="topic"
                        type="text"
                        datatype="String"
                        required
                        value={givenTopic} onChange={event => setTopic(event.target.value)}
                        rows="1"
                    ></textarea>
                </div>
                <div className={classes.control}>
                    <label htmlFor="review" style={{color: "yellow"}}>Add Your Text!</label>
                    <textarea
                        id="review"
                        type="text"
                        datatype="String"
                        required
                        value={givenText} onChange={event => setText(event.target.value)}
                        rows="5"
                    ></textarea>
                </div>
                <div className={classes.ctrl}>
                    <label htmlFor="rank" style={{color: "yellow"}}>Add Your Rank</label>
                    <input
                        type="number"
                        name="ranking"
                        id="ranking"
                        min="1"
                        max="100"
                        value={givenRank} onChange={event => setRank(event.target.value)}
                        datatype="Int"
                    ></input>
                </div>
                <div className={classes.actions}>
                    <button onClick={addReview} className={classes.addReviewBut} type="button">Add Review</button>
                </div>
            </form>
        </Card>
    )

    return loaded

}

export default NewReviewForm