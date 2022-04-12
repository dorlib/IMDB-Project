import React, { useState, useEffect } from "react";
import MovieList from "../components/movies/MovieList";
import {gql, useQuery} from "@apollo/client";

function AllMoviesPage() {
    const GET_MOVIES = gql`
        query Movies{
            movies {
                rank
                name
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_MOVIES)
        console.log(data, loading, error)
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;

        return data.movies.map(( {name, rank}) => (
            <div key={rank}>
                <p style={{color: "yellow"}}>
                    {name}: {rank}
                </p>
            </div>
        ));

}

export default AllMoviesPage;
