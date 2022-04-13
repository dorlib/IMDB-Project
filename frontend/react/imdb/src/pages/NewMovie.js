import { useNavigate } from 'react-router-dom';
import {gql, useQuery, useMutation} from "@apollo/client";
import NewMovieForm from "../components/movies/NewMovieForm";

function NewMoviePage(movieData) {
    const title = movieData.title
    const image = movieData.image
    const director = movieData.director
    const description = movieData.description
    const review = movieData.review
    const rank = movieData.rank
    const worth = movieData.worth
    const genre = movieData.genre

    const all_directors = gql`
        query Directors {
            directors {
                name
                id
            }
        }
    `;
    let len = all_directors.length
    let b = false
    let id

    for (let i = 0; i < len; i ++) {
        if (all_directors[i] === director) {
            b = true
            id = gql`
                query director {
                director (where: {name: director}){
                    id
                }}
            `
        }
    }

    let newDirector
    if (!b) {
        newDirector = gql`
            mutation newDirector {
                createDirector(director: {name: director})
            }
        `;
    }

    let newMovie
    newMovie = gql`
        mutation newMovie {
            createMovie(movie: {title: title,
            description: description,
            rank: rank,
            genre: genre})
        }
    `;




    return (
        <section>
            <h1 style={{color: "yellow"}}>Add New Movie</h1>
            <NewMovieForm onAddMovie={NewMoviePage} />
        </section>
    );
}

export default NewMoviePage;