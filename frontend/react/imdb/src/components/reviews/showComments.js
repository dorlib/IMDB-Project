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
    const SHOW_COMMENTS = gql`
        query Co ($movieID: Int!) {
            reviewsOfMovie (movieID: $movieID){
                topic
                text
                rank
                id
                user {
                    nickname
                    profile
                    id
                }
            }
        }
    `;



    return (

    )


}

export default ShowComments