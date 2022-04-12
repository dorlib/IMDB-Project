import { useContext } from 'react';

import FavoritesContext from '../store/favorites-context';
import MovieList from '../components/movies/MovieList';

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);

  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = <p 
    style={{color: "yellow"}}>You got no favorites yet. Start adding some?</p>;
  } else {
    content = <MovieList movies={favoritesCtx.favorites} />;
  }

  return (
    <section>
      <h1 style={{color: "yellow"}}>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;