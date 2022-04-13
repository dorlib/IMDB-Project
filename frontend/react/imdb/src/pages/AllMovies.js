import React, {useState} from "react";
import {gql, useQuery} from "@apollo/client";

function AllMoviesPage() {
    const [loadedMovies, setLoadedMovies] = useState([]);
    const GET_MOVIES = gql`
        query Movies{
            movies {
                rank
                id
                title
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_MOVIES)
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;
        let loaded

        loaded = data.movies.map(( {title, rank, id}) => (
            <div key={id}>
                <p style={{color: "yellow"}}>
                    {title}: {rank}
                </p>
            </div>
        ));

        return loaded

}

export default AllMoviesPage;
