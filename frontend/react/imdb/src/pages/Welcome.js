import React from "react";
import classes from "./welcome.module.css"

function Welcome() {

    function handleSignClick() {
        window.location.replace("/sign-in")
    }

    function handleRegClick() {
        window.location.replace("/new-user")
    }


    return (
        <div className={classes.welcome}>
            <div style={{color: "yellow"}} className={classes.Title}>
                <p>
                    <h1 className={classes.mainTitle}>
                        Find Your Movie For Tonight
                    </h1>
                    <h2 className={classes.secondTitle}>
                        Contribute.  &ensp;  Search. &ensp;  Rate.  &ensp; Review.
                    </h2>

                </p>
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={handleSignClick}>Sign In!</button>
                <h2 className={classes.or}>OR</h2>
                <h2 className={classes.thirdTitle} style={{position: "relative", display: "flex", bottom: "1cm"}}>Find The World Of movies!</h2>
                <button type="button" onClick={handleRegClick} style={{position: "relative", display: "flex", bottom: "5.425cm", left: "-4.8cm"}}>Register!</button>
            </div>
        </div>
    )
}

export default Welcome;
