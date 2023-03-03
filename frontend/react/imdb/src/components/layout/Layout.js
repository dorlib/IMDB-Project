import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import React, {useEffect, useState} from "react";
import SearchBar from "./search-bar";
import {gql, useQuery} from "@apollo/client";
import {Footer} from "./style";
import {Link} from "@mui/material";

function Layout(props) {
    let userFirstName = props.username
    let userId = props.userId
    let profile = props.profile

    // getting all the favorites of the user
    const FAVORITES_OF_USER = gql`
        query FavoritesOfUser ($userID: ID!){
            favoritesOfUser (userID: $userID) {
                movieID
            }
        }
    `;

    const {loading, error, data} = useQuery(FAVORITES_OF_USER,
        {
            variables: {
                userID: userId
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{error}</p>;
    let sumOfFavorites = data["favoritesOfUser"].length

    return (
        <div>
            <MainNavigation firstname={userFirstName} id={userId} profile={profile} sumOfFavorites={sumOfFavorites}/>
            <main className={classes.main}>{props.children}</main>
            <Footer>
                <h4>
                    <Link>About</Link> &ensp; &ensp; * &ensp; &ensp; <Link>contact</Link> &ensp; &ensp; *  &ensp; &ensp <Link to={/careers}>Careers</Link>;
                    <Link href={"https://github.com/dorlib"} target="_blank">Github</Link>
                </h4>
            </Footer>
        </div>
    );
}

export default Layout;
