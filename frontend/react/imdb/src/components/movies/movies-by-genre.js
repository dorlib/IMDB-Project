import React from 'react'
import {gql, useQuery} from "@apollo/client";

function MoviesByGenre() {
    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const MOVIES_BY_GENRE = gql`
        query MoviesByGenre($genre: String!) {
            moviesBYGenre(genre: $genre) {
                id
                title
                rank
                description
                genre
                image
                director {
                    id
                    name
                }
            }
        }
    `

    const {loading, error, data} = useQuery(MOVIES_BY_GENRE,
        {
            variables: {
                genre: lastSegment || 'action'
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    console.log(data)

    return (
        <div>
            Hello
        </div>
    )



}

export default MoviesByGenre

