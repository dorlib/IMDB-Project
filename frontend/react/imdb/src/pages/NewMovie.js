import { useNavigate } from 'react-router-dom';

import NewMovieForm from "../components/movies/NewMovieForm";

function NewMoviePage() {
    const navigate = useNavigate();

  function AddMovieHandler(movieData) {
    fetch(
      "https://react-getting-started-af0bd-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movieData),
        headers: {
            'Content-Type': 'application/json',
        },
      }
    ).then(() => {
        navigate('/',{replace:true});
    });
  }

  return (
    <section>
      <h1 style={{color: "yellow"}}>Add New Movie</h1>
      <NewMovieForm onAddMovie={AddMovieHandler} />
    </section>
  );
}

export default NewMoviePage;
