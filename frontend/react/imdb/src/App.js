import { Route, Routes } from 'react-router-dom'

import AllMoviesPage from './pages/AllMovies';
import NewUserPage from './pages/NewUser';
import FavoritesPage from './pages/Favorites';
import SignInPage from './pages/SignIn';
import Layout from './components/layout/Layout';
import React from "react";
import AllDirectorsPage from "./pages/AllDirectors";
import NewMovieForm from "./components/movies/NewMovieForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMoviesPage />} />
        <Route path="/directors" element={<AllDirectorsPage />} />
        <Route path="/new-movie" element={<NewMovieForm />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/new-user" element={<NewUserPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
