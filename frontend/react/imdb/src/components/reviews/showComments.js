import {gql, useQuery} from "@apollo/client";
import * as React from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {useState} from "react";
import Card from "@mui/material/Card";

function ShowComments(props) {
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

    const {data, loading, error} = useQuery(SHOW_COMMENTS,
        {
            variables: {
                reviewID: props.reviewID || 0,
            }
        })

    if (error) return <div>Error!</div>
    if (loading) return <div>Loading...</div>

    console.log(data)

    return (
    <Card>
        <div>
            comment
        </div>
    </Card>
    )



}

export default ShowComments