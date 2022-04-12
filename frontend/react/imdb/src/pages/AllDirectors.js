import React, { useState, useEffect } from "react";
import DirectorList from "../components/movies/DirectorList";
import {gql, useQuery} from "@apollo/client";

function AllDirectorsPage() {
    const GET_DIRECTORS = gql`
        query Directors{
            directors {
                name
                movies {
                    name
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_DIRECTORS)
    console.log(data, loading, error)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return data.movies.map(( {name, rank,}) => (
        <div key={name}>
            <p style={{color: "yellow"}}>
                {name}: {name}
            </p>
        </div>
    ));

}

export default AllDirectorsPage;
