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
                profileImage
                description
                bornAt
                id
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
    let profileImage = data["directorById"]["0"]["profileImage"] || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'
    let description = data["directorById"]["0"]["description"]
    let bornAt = data["directorById"]["0"]["bornAt"]
    let id = data["directorById"]["0"]["id"]

    let d =
        <div>
        <div>
            <CardMedia
                component="img"
                alt="movie image"
                height="400"
                style={{width: "12cm"}}
                src={profileImage}
                className={classes.image}
            />
        </div>
        <div>
            <Card sx={{width: 1000, height: 670, right: 100}} style={{backgroundColor: "#cc2062", marginBottom: "3cm", position: "relative", right: "4.8cm"}} className={classes.card}>
                <CardContent >
                    <Typography gutterBottom variant="h5" component="div" >
                        <p style={{color: "yellow", fontSize: "xx-large", marginLeft: "13.5cm"}} className={classes.director}>
                            {name}
                        </p>
                        <p style={{color: "black", fontSize: "x-large", marginLeft: "13.5cm" }} className={classes.director}>
                            Date Of Birth : {bornAt}
                        </p>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" >
                        <p style={{color: "black", fontSize: "large", marginTop: "7.8cm"}} className={classes.director}>
                            About {name} : {description}
                        </p>
                    </Typography>
                </CardContent>
                <CardActions style={{marginTop: "2.8cm"}}>
                    <Button size="large">Share</Button>
                    <Link to={"/director's_details/" + id} style={{textDecoration: "none"}}><Button size="large">Edit Director's Details!</Button></Link>
                </CardActions>
            </Card>

            <div className={classes.moviesTitle}>
                Movies Of {name}
            </div>
        </div>
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
                    <Link to={"/moviePage/" + id} style={{textDecoration: "none"}}><Button size="large">Go To Movie's Page</Button></Link>
                </CardActions>
            </Card>
        </div>
    ))
    return <>{d},{loaded}</>
}

export default DirectorPage;





