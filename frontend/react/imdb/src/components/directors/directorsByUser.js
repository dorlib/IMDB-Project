import React from 'react'
import {gql, useQuery} from "@apollo/client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./directorsByUser.module.css";
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function DirectorsByUser(props) {
    const DIRECTORS_OF_USER = gql`
        query DirectorsOfUser($userID: ID!) {
            directorsOfUser(userID: $userID) {
                id
                name
                profileImage
            }
        }
    `
    const {loading, error, data} = useQuery(DIRECTORS_OF_USER,
        {
            variables: {
                userID: props.userID
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    let loaded = (
        <div>
            <ArrowForwardIosIcon className={classes.forward} style={{fontSize: "xx-large"}} id={"Forward"}/>
            <ArrowBackIosNewIcon className={classes.backward} style={{fontSize: "xx-large"}} id={"Backward"}/>
            <ul className={classes.list}>
                {data.directorsOfUser.map(({id, name, profileImage}) => (
                    <div>
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
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </ul>
        </div>
    );

    return <>{loaded}</>

}

export default DirectorsByUser
