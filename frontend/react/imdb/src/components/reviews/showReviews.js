import React, {useContext, useRef} from "react";
import {Link} from 'react-router-dom';

import Card from "../ui/Card";
import classes from "../movies/MovieItem.module.css";
import FavoritesContext from "../../store/favorites-context";
import {gql, useMutation, useQuery} from "@apollo/client";
import {isIterableObject} from "graphql/jsutils/isIterableObject";


function ShowReviews() {
    const SHOW_REVIEWS = gql`
        query ReviewsOfMovie ($movieID: Int!) {
            reviewsOfMovie (movieID: $movieID){
                text 
                rank 
                id
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const { data, loading, error } = useQuery(SHOW_REVIEWS,
        {
            variables: {
                movieID: lastSegment || 0,
            }
        })
    if (error) return <div>Error!</div>
    if (loading) return <div>Loading...</div>

    let loaded

    loaded = data.reviewsOfMovie.map(( {text, rank, id}) => (
        <Card>
        <div key={id}>
            <p style={{color: "yellow"}}>
                {text}:{rank}
            </p>
        </div>
        </Card>
    ));

    return loaded
}

export default ShowReviews