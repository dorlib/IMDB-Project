import React, {useState} from "react";
import {gql, useQuery} from "@apollo/client";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import NewMovieForm from "../components/movies/NewMovieForm";
import App from "../App";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./top10.module.css";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import styled from "styled-components";
import FavoriteIcon from '@mui/icons-material/Favorite';

function AllMoviesPage(props) {
    const [loadedMovies, setLoadedMovies] = useState([]);
    const GET_MOVIES = gql`
        query Movies{
            movies {
                rank
                id
                title
                image
                description
                director {
                    name
                }
            }
        }
    `;
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
        margin-top: 0.65cm;
    `;

    const { loading, error, data } = useQuery(GET_MOVIES)
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;
        let loaded
        //let movieId = data["movies"]["id"]

    const handleClick = (e) => {
        if (e.target.style.color == 'white') {
        e.target.style.color = '#8B0000'
        } else {
            e.target.style.color = 'white'
        }
    }

    const handleOver = () => {
        console.log("yay")
    }

    loaded = data.movies.map(( {title, rank, id, image, description, director}) => (
            // <div key={id}>
            //     <p style={{color: "yellow"}}>
            //         <MenuItem style={{fontSize: "x-large"}}><Link to={"/moviePage/" + id} style={{color: "yellow"}} >{title}</Link>:{rank}</MenuItem>
            //     </p>
            // </div>
            <div>
                <Card sx={{maxWidth: 600}} style={{backgroundColor: "#cc2062", marginBottom: "3cm"}} key={id}>
                    <CardMedia
                        component="img"
                        alt="movie image"
                        height="300"
                        src={image || 'https://pharem-project.eu/wp-content/themes/consultix/images/no-image-found-360x250.png'}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                                    <Link to={"/moviePage/" + id}  style={{color: "yellow" }}  > {title}: {rank} / 100 </Link>
                            </p>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{fontSize: "large", fontWeight: "bolder"}}>
                            Description: {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{fontSize: "large", fontWeight: "bolder"}}>
                            Directed By: {director.name}
                        </Typography>
                        {Icons.map(list=>(
                            <div style={{fontSize: "xxx-large"}}>
                                <Fav><list.icon fontSize={'large'} onClick={handleClick} onMouseOver={handleOver}/></Fav>
                                <Typography className={classes.textBox} >Click To Add To Favorites!</Typography>
                            </div>
                        ))}
                    </CardContent>
                    <CardActions>
                        <Button size="large">Share</Button>
                        <Link to={"/moviePage/" + id} style={{textDecoration: "none"}}><Button size="large">Go To Movie's Page</Button></Link>
                    </CardActions>
                </Card>
            </div>
        ));

        return loaded

}

export default AllMoviesPage;
