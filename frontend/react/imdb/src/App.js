import { Route, Routes } from 'react-router-dom'

import AllMoviesPage from './pages/AllMovies';
import NewUserPage from './pages/NewUser';
import FavoritesPage from './pages/Favorites';
import SignInPage from './pages/SignIn';
import Layout from './components/layout/Layout';
import React from "react";
import AllDirectorsPage from "./pages/AllDirectors";
import NewMovieForm from "./components/movies/NewMovieForm";
import AllMovies from "./pages/AllMovies";
import NewReviewForm from "./components/reviews/newReview";
import ShowReviews from "./components/reviews/showReviews";
import HoverRating from "./components/reviews/stars";
import DirectorPage from "./components/directors/directorPage";
import UpdateRank from "./components/reviews/total-rank";
import NewUserForm from "./components/users/NewUserForm";
import CreateUser from "./components/users/create-user";
import Top10Page from "./pages/Top10";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/movies" element={<AllMoviesPage />} />
        <Route path="/directors" element={<AllDirectorsPage />} />
        <Route path="/new-movie" element={<NewMovieForm />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/new-user" element={<><NewUserForm /></>} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/top10' element={<Top10Page />} />
        <Route path='/directorPage/:id' element={<DirectorPage />} />
        <Route path="/moviePage/:id" element={<><UpdateRank/><HoverRating/><ShowReviews/><NewReviewForm/></>} />
      </Routes>
    </Layout>
  );
}

export default App;
