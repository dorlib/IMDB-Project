import {gql, useQuery} from "@apollo/client";
import * as React from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {useState} from "react";
import Card from "@mui/material/Card";

function ToggleLike(props) {
    const ADD_LIKE = gql`
        mutation AddLike ($reviewID: ID! ,$userID: ID!) {
            addLike (reviewID: $reviewID, userID: $userID){
                id
            }
        }
    `;

    const REMOVE_LIKE = gql`
        mutation DeleteLike ($likeID: ID! ,$userID: ID!) {
            deleteLike (likeID: $likeID, userID: $userID){
                id
            }
        }
    `;


    const {data, loading, error} = useQuery(SHOW_COMMENTS,
        {
            variables: {
                reviewID: reviewID || 0,
            }
        })

    if (error) return <div>Error!</div>
    if (loading) return <div>Loading...</div>

    console.log(data)

    return (
        <Card>
            {data.commentsOfReview.map(comment => (
                <motion.div layoutId={comment.id} onClick={() => setReviewID(comment.id)}>
                    <motion.h5>{comment.topic}</motion.h5>
                    <motion.h2>{comment.text}</motion.h2>
                </motion.div>
            ))}
        </Card>
    )



}

export default ToggleLike