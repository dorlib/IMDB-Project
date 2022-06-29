import {Link} from 'react-router-dom';

import Card from "../ui/Card";
import FavoritesContext from "../../favorites/favorites-context";
import {gql, useMutation, useQuery} from "@apollo/client";
import {isIterableObject} from "graphql/jsutils/isIterableObject";

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import UpdateRank from "./total-rank";

import classes from "./showReviews.module.css";


function ShowReviews(props) {
    const SHOW_REVIEWS = gql`
        query ReviewsOfMovie ($movieID: Int!) {
            reviewsOfMovie (movieID: $movieID){
                topic
                text
                rank
                id
                user {
                    nickname
                }
            }
        }
    `;

    const ORIGINAL_RANK = gql`
        query MovieById ($movieID: ID!) {
            movieById (id: $movieID) {
                rank
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const originalRank = useQuery(ORIGINAL_RANK,
        {
            variables: {
                movieID: lastSegment || 0,
            }
        })

    const {data, loading, error} = useQuery(SHOW_REVIEWS,
        {
            variables: {
                movieID: lastSegment || 0,
            }
        })

    if (error) return <div>Error!</div>
    if (loading) return <div>Loading...</div>

    let loaded
    let load

    loaded = data.reviewsOfMovie.map(({text, rank, topic, id, user}) => (
        text !== '' ? (
            <div key={id} className={classes.item}>
                <List sx={{width: '100%',}} className={classes.rev}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                            <React.Fragment>
                            <Typography style={{fontSize: "x-large"}}>
                                {topic}
                            </Typography>
                                <Typography>
                                    by: {user["nickname"]}
                                </Typography>
                                <Typography className={classes.rank} style={{fontSize: "xx-large"}}>
                                    {rank}
                                </Typography>
                            </React.Fragment>

                            }
                            secondary={
                                <React.Fragment>
                                    <Typography style={{height: "0.3cm"}}>
                                        &ensp;
                                    </Typography>
                                    <Typography

                                    >
                                        {text}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </List>
            </div>
        ) : null
    ))
    return loaded
}

export default ShowReviews