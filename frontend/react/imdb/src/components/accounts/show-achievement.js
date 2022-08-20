import React, {useState} from 'react'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classes from "../directors/directorsByUser.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

function ShowAchievement(props) {
    let image
    if (props.name === "king-of-likes") {
        image = ""
    } else if (props.name === "the-commenter") {
        image = ""
    } else if (props.name === "the-reviewer") {
        image = ""
    } else if (props.name === "movies-lover") {
        image = ""
    }

    let load = (
        <div style={{position: "absolute"}}>
            {numOfSet === numOfSets || numOfDirectors <= 8 ? null : <ArrowForwardIosIcon className={classes.forward} onClick={handleClickForward} style={{fontSize: "xx-large"}} id={"Forward"}/>}
            {numOfSet === 0 || numOfDirectors <= 8 ? null : <ArrowBackIosNewIcon className={classes.backward} onClick={handleClickBackward} style={{fontSize: "xx-large"}} id={"Backward"}/>}
            <ul className={classes.list}>
                {newData.map(({id, name, profileImage}) => (
                    <Card sx={{maxWidth: 100}} style={{
                        backgroundColor: "#cc2062",
                        borderRadius: "50px",
                        width: "90px",
                        display: "inline-block",
                        marginTop: "0.7cm"
                    }} key={id}>
                        <CardMedia
                            component="img"
                            alt="movie image"
                            height="90"
                            src={profileImage || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'}
                        />
                        <CardContent className={classes.card}>
                            <Typography gutterBottom variant="h5" component="div">
                                <p style={{color: "yellow"}} className={classes.director}>
                                    <Link to={"/directorPage/" + id} className={classes.directorName}> {name}</Link>
                                </p>
                                <div className={classes.outOf}>{numOfSet + 1  + "/" + (numOfSets+1)}</div>
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </ul>
        </div>
    )



    if (image !== "") {
        return load
    }
    return null

}

export default ShowAchievement
