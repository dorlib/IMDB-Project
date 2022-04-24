import React from "react";
import {gql, useQuery} from "@apollo/client";
import allDirectors from "./AllDirectors";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";


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

    const {data, loading, error} = useQuery(GET_DIRECTORS)
    if (loading) return <p style={{color: "yellow"}}>Loading...</p>;
    if (error) return <p style={{color: "yellow"}}>Error :</p>;
    let loaded

    loaded = data.directors.map(({name, id, movies}) => (
        <div style={{color: "yellow"}} key={id}>
            <div>
                <Link to={"/DirectorPage/" + id}  style={{color: "yellow" }}  > {name}: </Link>
                {movies.map(({title, id}) => (
                    <li key={movies.id}>
                        <Link to={"/moviePage/" + id}  style={{color: "yellow" }}  > {title}: </Link>
                    </li>
                ))}
            </div>
        </div>

))


    return loaded
}

export default AllDirectorsPage;
