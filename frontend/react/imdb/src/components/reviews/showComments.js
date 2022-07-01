import {Link} from 'react-router-dom';
import {gql, useMutation, useQuery} from "@apollo/client";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import UpdateRank from "./total-rank";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentIcon from '@mui/icons-material/AddComment';

import classes from "./showReviews.module.css";
import Button from "@mui/material/Button";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {useState} from "react";

function ShowComments(props) {
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

    {items.map(item => (
        <motion.div layoutId={item.id} onClick={() => setExtend(item.id)}>
            <motion.h5>{item.subtitle}</motion.h5>
            <motion.h2>{item.title}</motion.h2>
        </motion.div>
    ))}

    let showComments = (
        <AnimatePresence>
            {extend && (
                <motion.div layoutId={selectedId}>
                    <motion.h5>{item.subtitle}</motion.h5>
                    <motion.h2>{item.title}</motion.h2>
                    <motion.button onClick={() => setExtend(0)} />
                </motion.div>
            )}
        </AnimatePresence>
    )



    return (

    )


}

export default ShowComments