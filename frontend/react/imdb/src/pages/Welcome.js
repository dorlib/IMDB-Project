import React from "react";
import classes from "./welcome.module.css"

function Welcome() {

    function handleSignClick() {
        window.location.replace("/register-sign-in")
    }

    function handleRegClick() {
        window.location.replace("/register-sign-in")
    }


    return (
        <div className={classes.welcome}>
            <div style={{color: "yellow"}} className={classes.Title}>
                <div>
                    <h1 className={classes.mainTitle}>
                        Find Your Movie For Tonight
                    </h1>
                    <h2 className={classes.secondTitle}>
                        Contribute.  &ensp;  Search. &ensp;  Rate.  &ensp; Review.
                    </h2>

                </div>
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={handleSignClick}>Sign In!</button>
                <h2 className={classes.or}>OR</h2>
                <h2 className={classes.thirdTitle} style={{position: "relative", display: "flex", bottom: "1cm"}}>And Find A World Of Movies!</h2>
                <button type="button" onClick={handleRegClick} style={{position: "relative", display: "flex", bottom: "5.425cm", left: "-4.8cm"}}>Register!</button>
            </div>
        </div>
    )
}

export default Welcome;
