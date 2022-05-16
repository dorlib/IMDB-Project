import React from "react";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import classes from "./top10.module.css"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from "styled-components";

function Top10Page() {

    const GET_TOP10_MOVIES = gql`
        query Top10Movies{
            top10Movies {
                title
                rank
                id
                image
            }
        }
    `;

    const {loading, error, data} = useQuery(GET_TOP10_MOVIES)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    let loaded

    const Icons = [
        {
            id: 1,
            name: "favorite",
            description:"icon",
            icon: FavoriteIcon,
        }]

    const Fav = styled.div`
        color: white;
        position: absolute;
        display: flex;
        right: 27.3cm;
        margin-top: -1.25cm;
    `;

    let TextBox = styled.text` 
        position: absolute;
        display: none;
        margin-top: 1cm;
        right: 21.9cm;
        background: #fff;
        font-size: small;
        ${Fav}:hover & {
            display: flex;
            left: 1cm;
            top: -0.5cm;
            width: 4.5cm;
            color: black;
        }    
    `;


    const handleClick = (e) => {
        if (e.target.style.color == 'white') {
            e.target.style.color = '#8B0000'
        } else {
            e.target.style.color = 'white'
        }
    }

    loaded = data.top10Movies.map(({title, rank, id, image}) => (
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
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {title} : {rank} / 100
                        </p>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">Share</Button>
                    <Link to={"/moviePage/" + id} style={{textDecoration: "none"}}><Button size="large">Go To Movie's Page</Button></Link>
                </CardActions>
                {Icons.map(list=>(
                    <div style={{fontSize: "xxx-large"}}>
                        <Fav>
                            <list.icon fontSize={'large'} onClick={handleClick} />
                            <TextBox><text >Click To Add To Favorites!</text></TextBox>
                        </Fav>

                    </div>
                ))}
            </Card>
        </div>
    ))
    return <>{loaded}</>
}

export default Top10Page;
