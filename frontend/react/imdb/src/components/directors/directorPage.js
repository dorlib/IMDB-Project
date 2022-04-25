import React, {useContext, useRef} from "react";
import {Link} from 'react-router-dom';

import FavoritesContext from "../../store/favorites-context";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {isIterableObject} from "graphql/jsutils/isIterableObject";
import MenuItem from "@mui/material/MenuItem";
import classes from "./directorPage.module.css"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function DirectorPage() {
    const DIRECTOR_DATA = gql`
        query DirectorById($id : ID!) {
            directorById(id: $id) {
                name
                movies{
                    id
                    title
                    rank
                    image
                }
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const {loading, error, data} = useQuery(DIRECTOR_DATA,
        {
            variables: {
                id: lastSegment || 0
            }

        })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    console.log(data)

    let name = data["directorById"]["0"]["name"]
    // let title = data["directorById"]["0"]["movies"]["0"]["titl e"]
    // let rank = data["directorById"]["0"]["movies"]["0"]["rank"]
    // let id = data["directorById"]["0"]["movies"]["0"]["id"]
    // let img = data["directorById"]["0"]["movies"]["0"]["image"]

    let d =
        <div>
            <p className={classes.name} style={{color: "yellow", fontSize: "xx-large"}}>
                {name}
            </p>
        </div>


    let loaded = data.directorById["0"]["movies"].map(({title, id, rank, image}) => (
        <div>
            <Card sx={{maxWidth: 600}} style={{backgroundColor: "#cc2062", marginBottom: "3cm"}} key={id}>
                <CardMedia
                    component="img"
                    alt="movie image"
                    height="300"
                    src={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.director}>
                            {title} : {rank} / 100
                        </p>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">Share</Button>
                    <Button size="large">Go To Movie's Page</Button>
                </CardActions>
            </Card>
        </div>
    ))
    return <>{d},{loaded}</>
}

export default DirectorPage;





