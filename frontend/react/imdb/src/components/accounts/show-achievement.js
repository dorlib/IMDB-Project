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
            <Card sx={{maxWidth: 100}} style={{
                backgroundColor: "#cc2062",
                borderRadius: "50px",
                width: "90px",
                display: "inline-block",
                marginTop: "0.7cm"
            }}>
                <CardMedia
                    component="img"
                    alt="movie image"
                    height="90"
                    src={image}
                />
            </Card>
        </div>
    )


    if (image !== "") {
        return load
    }
    return null

}

export default ShowAchievement
