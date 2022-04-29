import React, {useContext, useRef, useState} from "react";
import {Link} from 'react-router-dom';

import Card from "../ui/Card";
import FavoritesContext from "../../store/favorites-context";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {isIterableObject} from "graphql/jsutils/isIterableObject";
import MenuItem from "@mui/material/MenuItem";
import UpdateRank from "./total-rank";

import classes from "./newReview.module.css";

function NewReviewForm() {
    const ADD_REVIEW = gql`
        mutation CreateReview ($text: String!, $rank: Int!, $movieID: Int!, $topic: String!) {
            createReview(text: $text, rank: $rank, movieID: $movieID, topic: $topic) {
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
            },
            onError: function (error) {
                console.log("error:",error)
            },onCompleted: function (data) {
                window.location.reload();
            }
        });

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
                    <button onClick={addReview} type="button">Add Review</button>
                </div>
            </form>
        </Card>
    )

    return loaded

}

export default NewReviewForm