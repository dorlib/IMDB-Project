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

import classes from "./showReviews.module.css";
import MovieItem from "../movies/MovieItem";

function UpdateRank(props) {
    const GET_RANKS = gql`
        query ReviewsOfMovie ($movieID: Int!) {
            reviewsOfMovie (movieID: $movieID){
                rank
                id
            }
        }
    `;


    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const {data, error, loading} = useQuery(GET_RANKS,
        {
            variables: {
                movieID: lastSegment || 0,
            },
        })

    if (error) return <div>Error</div>
    if (loading) return <div>Loading..</div>

    let total = 0
    let counter = 0

    data.reviewsOfMovie.map(({rank}) =>  (
            total = total + rank,
            counter = counter + 1
    ))
    console.log(total)

    return (
        <div>
            <MovieItem total={total} counter={counter} />
        </div>
    )

}

export default UpdateRank