import React, {useContext} from 'react';
import FavoriteList from '../favorites/FavoriteList';
import {gql, useQuery} from "@apollo/client";
import CardContent from "@mui/material/CardContent";
import classes from "../components/movies/NewMovieForm.module.css";
import Typography from "@mui/material/Typography";

// FavoritesPage function component get user's favorite list data and send it to another component that shows those movies on by one
function FavoritesPage(props) {
    const GET_FAVORITES = gql`
        query FavoritesOfUser($userID : ID!){
            favoritesOfUser(userID : $userID){
                movieID
                movieTitle
                movieImage
            }
        }
    `;

    let userID = props.userID

    const {loading, error, data} = useQuery(GET_FAVORITES,
        {
            variables: {
                userID: userID || 0
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    function handleSignClick() {
        window.location.replace("/register-sign-in")
    }

    function handleRegClick() {
        window.location.replace("/register-sign-in")
    }

    let content
    if (data["favoritesOfUser"] === null) {
        content = <p style={{color: "yellow"}}>You got no favorites yet. Start adding some?</p>;
    } else if (userID === 0) {
        content = <p style={{color: "yellow"}}>only signed in users have favorites</p>;
    } else if (props.userID === null) {
        content = (
            <div style={{color: "yellow"}}>
                <CardContent className={classes.oops} style={{top: "8.5cm"}}>
                    <Typography className={classes.oopsMsg} style={{fontSize: "x-large"}}>
                        Oops! it seems that you are not logged In!
                        <img src={"https://blog.qualimatch.co.il/wp-content/uploads/2017/12/Oops.jpg"} className={classes.oopsPic}/>
                    </Typography>
                    <div className={classes.actions}>
                        <button type="button" onClick={handleSignClick} className={classes.signBut}>Sign In!</button>
                        <h2 className={classes.or}>OR</h2>
                        <h2 className={classes.thirdTitle} style={{position: "relative", display: "flex"}}>And Find A World Of Movies!</h2>
                        <button type="button" onClick={handleRegClick} className={classes.regBut}>Register!</button>
                    </div>
                </CardContent>
            </div>
        )
    } else {
        content = <FavoriteList movies={data} userID={props.userID}/>;
    }

    return (
        <section>
            <h1 style={{color: "yellow", position: "relative", left: "10rem", top: "-1rem", fontSize: "50px"}}>My Favorites</h1>
            {content}
        </section>
    );
}

export default FavoritesPage;