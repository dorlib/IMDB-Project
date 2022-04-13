import React from "react";
import {gql, useQuery} from "@apollo/client";
import allDirectors from "./AllDirectors";


function AllDirectorsPage() {
    const GET_DIRECTORS = gql`
        query Directors {
            directors {
                name
                id
                movies {
                    title
                    id
                }
            }
        }
    `;

    const { data, loading, error} = useQuery(GET_DIRECTORS)
    if (loading) return <p style={{color: "yellow"}}>Loading...</p>;
    if (error) return <p style={{color: "yellow"}}>Error :</p>;
    let loaded

    loaded = data.directors.map(({name, movies},id) => (
        <div style={{color: "yellow"}} key={id}>
            <div>
                {name}:
                {movies.map(({title,id}) => (
                    <li key={movies.id}>
                        {title}
                    </li>
                ))}
            </div>
        </div>
    ));

    return loaded
}

export default AllDirectorsPage;
