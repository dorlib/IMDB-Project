
import MovieItem from './MovieItem';
import classes from './MovieList.module.css';

function MovieList(props) {
  return (
    <ul className={classes.list}>
      {props.movies.map((movie) => (
        <MovieItem
          key={movie.id}
          id={movie.id}
          image={movie.image}
          title={movie.title}
          director={movie.director}
          description={movie.description}
        />
      ))}
    </ul>
  );
}

export default MovieList;