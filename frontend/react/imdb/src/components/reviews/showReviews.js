import {Link} from 'react-router-dom';

import Card from "../ui/Card";
import FavoritesContext from "../../store/favorites-context";
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

import classes from "./showReviews.module.css";



function ShowReviews() {
    const SHOW_REVIEWS = gql`
        query ReviewsOfMovie ($movieID: Int!) {
            reviewsOfMovie (movieID: $movieID){
                topic
                text
                rank
                id
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const {data, loading, error} = useQuery(SHOW_REVIEWS,
        {
            variables: {
                movieID: lastSegment || 0,
            }
        })
    if (error) return <div>Error!</div>
    if (loading) return <div>Loading...</div>

    let loaded

    loaded = data.reviewsOfMovie.map(({text, rank, topic, id}) => (
        text !== "Doesnt Have Any Reviews" ? (
        <div key={id}  className={classes.item}>
            <List sx={{width: '100%', }} className={classes.rev}>
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={topic}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{display: 'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                </Typography>
                                {text}: {rank}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li"/>
            </List>
        </div>
    ): null
    ))
    return loaded
}

export default ShowReviews