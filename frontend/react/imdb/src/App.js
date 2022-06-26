import { Route, Routes } from 'react-router-dom'

import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accounts";

import AllMoviesPage from './pages/AllMovies';
import FavoritesPage from './pages/Favorites';
import Layout from './components/layout/Layout';
import React, {useEffect, useState} from "react";
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

  // this useEffect checks if the user is authenticated.
  // from here this info can be delivered to any other components.

  const [userFirstName, setUserFirstName] = useState('Guest')
  const [userProfileImage, setUserProfileImage] = useState('https://hope.be/wp-content/uploads/2015/05/no-user-image.gif')
  const [userId, setUserId] = useState(0)
  const [userNickname, setUserNickname] = useState('')


    useEffect(() => {
    (
        async () => {
          await fetch("http://localhost:8081/user", {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          }).then(response => response.json())
              .catch((err) => {
                console.error('error:', err)
              })
              .then((data) => {
                console.log(data)
                setUserId(data["0"]["id"])
                setUserFirstName(data["0"]["firstname"])
                setUserNickname(data["0"]["nickname"])
                if (data["0"]["profile"] !== '') {
                    setUserProfileImage(data["0"]["profile"])
                }
              });
        }
    )();
  });

  return (
    <Layout username={userFirstName} userId={userId} profile={userProfileImage}>
      <Routes>
        <Route path="/" element={<><Welcome /><Last5Added/></>} />
        <Route path="/movies" element={<AllMoviesPage userID={userId} />} />
        <Route path="/directors" element={<AllDirectorsPage />} />
        <Route path="/new-movie" element={<NewMovieForm />} />
        <Route path="/favorites" element={<FavoritesPage userID={userId}/>} />
        <Route path='/top10' element={<Top10Page />} />
        <Route path='/directorPage/:id' element={<DirectorPage />} />
        <Route path="/moviePage/:id" element={<><UpdateRank/><HoverRating/><ShowReviews /><NewReviewForm username={userFirstName} userId={userId} nickname={userNickname} profile={userProfileImage}/></>} />
        <Route path='/moviesByGenre/:genre' element={<MoviesByGenre/>}/>
        <Route path='/register-sign-in' element={<AccountBox />} />
        <Route path='/userPage/:id' element={<UserPage />} />
      </Routes>
    </Layout>
  );
}

export default App;


