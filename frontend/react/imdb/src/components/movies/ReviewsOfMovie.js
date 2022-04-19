import React, {useContext, useRef} from "react";
import {Link} from 'react-router-dom';

import Card from "../ui/Card";
import classes from "./MovieItem.module.css";
import FavoritesContext from "../../store/favorites-context";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {isIterableObject} from "graphql/jsutils/isIterableObject";
import MenuItem from "@mui/material/MenuItem";

function ReviewsOfMovie() {
    const ADD_REVIEW = gql`
        mutation CreateReview ($text: String!, $rank: Int!, $movieID: ID!) {
            createReview(text: $text, rank: $rank, movieID: $movieID) {
                text
                rank
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const reviewInputRef = useRef();
    const rankInputRef = useRef();

    const [addReview] = useMutation(ADD_REVIEW,
        {
            variables: {
                movieID: lastSegment || 0,
                text: reviewInputRef.current?.value || 'Doesnt Have Any Reviews',
                rank: rankInputRef.current?.value || 'No Rank Was Given',
            },
            onError: function (error) {
                console.log("error:",error)
            },
        });

    let loaded =  (
        <Card>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor="review">Add Your Review!</label>
                    <textarea
                        id="review"
                        type="text"
                        datatype="String"
                        required
                        ref={reviewInputRef}
                        rows="5"
                    ></textarea>
                </div>
                <div className={classes.ctrl}>
                    <label htmlFor="rank">Add Your Rank</label>
                    <input
                        type="number"
                        name="ranking"
                        id="ranking"
                        min="0"
                        max="100"
                        ref={rankInputRef}
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

export default ReviewsOfMovie