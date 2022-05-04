import React from "react";
import classes from "./welcome.module.css"

function Welcome() {

    return (
        <div className={classes.welcome}>
            <div style={{color: "yellow"}} className={classes.home}>
            </div>
        </div>
    )
}

export default Welcome;
