import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import React, {useEffect, useState} from "react";
import SearchBar from "./search-bar";

function Layout(props) {
    let userFirstName = props.username
    let userId = props.userId
    let profile = props.profile

    return (
        <div>
            <div>
                <MainNavigation firstname={userFirstName} id={userId} profile={profile}/>
                <main className={classes.main}>{props.children}</main>
            </div>
        </div>
    );
}

export default Layout;
