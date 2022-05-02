import React from "react";
import {gql, useQuery} from "@apollo/client";
import allDirectors from "./AllDirectors";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import classes from "./top10.module.css"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function AllDirectorsPage() {
    const GET_DIRECTORS = gql`
        query Directors {
            directors {
                name
                profileImage
                id
                movies {
                    title
                    id
                }
            }
        }
    `;

    const {data, loading, error} = useQuery(GET_DIRECTORS)
    if (loading) return <p style={{color: "yellow"}}>Loading...</p>;
    if (error) return <p style={{color: "yellow"}}>Error :</p>;
    let loaded

    loaded = data.directors.map(({name, id, profileImage, movies}) => (
        <div>
            <Card sx={{maxWidth: 600}} style={{backgroundColor: "#cc2062", marginBottom: "3cm"}} key={id}>
                <CardMedia
                    component="img"
                    alt="movie image"
                    height="300"
                    src={profileImage || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {name}
                        </p>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movies.map(({title, id}) => (
                            <li key={movies.id}>
                                <Link to={"/moviePage/" + id}  style={{color: "yellow" }}  > {title}: </Link>
                            </li>
                        ))}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">Share</Button>
                    <Link to={"/directorPage/" + id} style={{textDecoration: "none"}}><Button size="large">Go To Director's Page</Button></Link>
                </CardActions>
            </Card>
        </div>

))

    return loaded
}

export default AllDirectorsPage;