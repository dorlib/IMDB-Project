import {gql, useQuery} from "@apollo/client";
import * as React from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {useState} from "react";
import Card from "@mui/material/Card";

function AddLike(props) {
    const [reviewID, setReviewID] = useState(0)

    const SHOW_COMMENTS = gql`
        query CommentsOfReview ($reviewID: ID!) {
            commentsOfReview (reviewID: $reviewID){
                topic
                text
                id
                user {
                    nickname
                    profile
                    id
                }
            }
        }
    `;

    if (props.id !== 0) {
        setReviewID(props.id)
    }

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

export default AddLike