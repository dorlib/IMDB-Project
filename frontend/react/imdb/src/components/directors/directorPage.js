import React, {useContext, useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom';

import FavoritesContext from "../../store/favorites-context";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {isIterableObject} from "graphql/jsutils/isIterableObject";
import MenuItem from "@mui/material/MenuItem";
import classes from "./directorPage.module.css"

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {Footer, Header} from "./styles";

function DirectorPage() {
    const [expanded, setExpanded] = useState(false);
    const [accordionHeight, setAccordionHeight] = useState(0);
    const ref = useRef("");
    let getHeight = ref.current?.scrollHeight || null;

    const open = () => setExpanded(!expanded);

    useEffect(() => {
        setAccordionHeight(getHeight);
    }, [expanded]);

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

    let d = (
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
            <Card sx={{width: 1000, height: 670, right: 100}}
                  style={{backgroundColor: "#cc2062", position: "relative", right: "4.8cm", marginBottom: "-1.5cm"}}
                  className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large", marginLeft: "13.5cm"}}
                           className={classes.director}>
                            {name}
                        </p>
                        <p style={{color: "black", fontSize: "x-large", marginLeft: "13.5cm"}}
                           className={classes.director}>
                            Date Of Birth : {bornAt}
                        </p>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "black", fontSize: "large", marginTop: "7.8cm"}}
                           className={classes.director}>
                            About {name} : {description}
                        </p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )

    let edit = (
        <Card style={{
            marginBottom: "2cm",
            position: "relative",
            display: "flex",
            right: "4.8cm",
            top: "0.3cm",
            width: "26.45cm"
        }}>
            <Footer
                className={expanded ? "show" : ""}
                setHeight={accordionHeight}
                ref={ref}
            >
                <CardActions>
                    <Button size="large">Share</Button>
                    <span size="large" onClick={open}><Button>Edit Director's Details!</Button></span>
                </CardActions>
                <div className="accordion" ref={ref} style={{marginTop: "0.5cm"}}>
                    {/*<div className={classes.control}>*/}
                    {/*    <label htmlFor="description">Description</label>*/}
                    {/*    <textarea*/}
                    {/*        id="description"*/}
                    {/*        type="text"*/}
                    {/*        datatype="String"*/}
                    {/*        required*/}
                    {/*        rows="5"*/}
                    {/*        value={givenDescription} onChange={event => setDescription(event.target.value)}*/}
                    {/*    ></textarea>*/}
                    {/*</div>*/}

                    {/*<div className={classes.control}>*/}
                    {/*    <label htmlFor="topic">Review title</label>*/}
                    {/*    <textarea*/}
                    {/*        id="topic"*/}
                    {/*        type="text"*/}
                    {/*        datatype="String"*/}
                    {/*        required*/}
                    {/*        rows="1"*/}
                    {/*        value={givenTopic} onChange={event => setTopic(event.target.value)}*/}
                    {/*    ></textarea>*/}
                    {/*</div>*/}

                    {/*<div className={classes.control}>*/}
                    {/*    <label htmlFor="review">Review Text</label>*/}
                    {/*    <textarea id="review" rows="5" datatype="String" value={givenText}*/}
                    {/*              onChange={event => setText(event.target.value)}></textarea>*/}
                    {/*</div>*/}
                </div>
            </Footer>
        </Card>
    )

    let l = (
        <div className={classes.moviesTitle}>
            Movies Directed By {name}
        </div>
    )

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
                    <Link to={"/moviePage/" + id} style={{textDecoration: "none"}}><Button size="large">Go To
                        Movie's Page</Button></Link>
                </CardActions>
            </Card>
        </div>
    ))
    return <>{d}{edit}{l}{loaded}</>
}

export default DirectorPage;





