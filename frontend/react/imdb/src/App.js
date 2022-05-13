import { Route, Routes } from 'react-router-dom'

import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accounts";

import AllMoviesPage from './pages/AllMovies';
import FavoritesPage from './pages/Favorites';
import Layout from './components/layout/Layout';
import React from "react";
import AllDirectorsPage from "./pages/AllDirectors";
import NewMovieForm from "./components/movies/NewMovieForm";
import NewReviewForm from "./components/reviews/newReview";
import ShowReviews from "./components/reviews/showReviews";
import HoverRating from "./components/reviews/stars";
import DirectorPage from "./components/directors/directorPage";
import UpdateRank from "./components/reviews/total-rank";
import Top10Page from "./pages/Top10";
import Welcome from "./pages/Welcome";
import Last5Added from "./components/movies/last5-added";
import MoviesByGenre from "./components/movies/movies-by-genre";
import UserPage from "./pages/userPage";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<><Welcome /><Last5Added/></>} />
        <Route path="/movies" element={<AllMoviesPage />} />
        <Route path="/directors" element={<AllDirectorsPage />} />
        <Route path="/new-movie" element={<NewMovieForm />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path='/top10' element={<Top10Page />} />
        <Route path='/directorPage/:id' element={<DirectorPage />} />
        <Route path="/moviePage/:id" element={<><UpdateRank/><HoverRating/><ShowReviews/><NewReviewForm/></>} />
        <Route path='/moviesByGenre/:genre' element={<MoviesByGenre/>}/>
        <Route path='/register-sign-in' element={<AccountBox />} />
        <Route path='/userPage/:id' element={<UserPage />} />
      </Routes>
    </Layout>
  );
}

export default App;


