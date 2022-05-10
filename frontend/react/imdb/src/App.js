import { Route, Routes } from 'react-router-dom'

import AllMoviesPage from './pages/AllMovies';
import NewUserPage from './pages/NewUser';
import FavoritesPage from './pages/Favorites';
import SignInPage from './pages/SignIn';
import Layout from './components/layout/Layout';
import React from "react";
import AllDirectorsPage from "./pages/AllDirectors";
import NewMovieForm from "./components/movies/NewMovieForm";
import NewReviewForm from "./components/reviews/newReview";
import ShowReviews from "./components/reviews/showReviews";
import HoverRating from "./components/reviews/stars";
import DirectorPage from "./components/directors/directorPage";
import UpdateRank from "./components/reviews/total-rank";
import NewUserForm from "./components/users/NewUserForm";
import Top10Page from "./pages/Top10";
import Welcome from "./pages/Welcome";
import Last5Added from "./components/movies/last5-added";
import MoviesByGenre from "./components/movies/movies-by-genre";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<><Welcome /><Last5Added/></>} />
        <Route path="/movies" element={<AllMoviesPage />} />
        <Route path="/directors" element={<AllDirectorsPage />} />
        <Route path="/new-movie" element={<NewMovieForm />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/new-user" element={<><NewUserForm /></>} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/top10' element={<Top10Page />} />
        <Route path='/directorPage/:id' element={<DirectorPage />} />
        <Route path="/moviePage/:id" element={<><UpdateRank/><HoverRating/><ShowReviews/><NewReviewForm/></>} />
        <Route path='/moviesByGenre/:genre' element={<MoviesByGenre/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
