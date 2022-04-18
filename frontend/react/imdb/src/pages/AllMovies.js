import React, {useState} from "react";
import {gql, useQuery} from "@apollo/client";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import NewMovieForm from "../components/movies/NewMovieForm";
import App from "../App";

function AllMoviesPage(props) {
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
        //let movieId = data["movies"]["id"]

        loaded = data.movies.map(( {title, rank, id}) => (
            <div key={id}>
                <p style={{color: "yellow"}}>
                    <MenuItem><Link to={"/moviePage/" + id} style={{color: "yellow"}}>{title}</Link>:{rank}</MenuItem>
                </p>
            </div>
        ));

        return loaded

}

export default AllMoviesPage;
