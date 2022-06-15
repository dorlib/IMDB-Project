import {useEffect, useState} from "react";

import Card from "../ui/Card";
import classes from "./NewMovieForm.module.css";

import {styled} from "@mui/material/styles";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";

import React from 'react';
import { useSnackbar } from 'notistack';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

function NewMovieForm() {
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event) => {
        setGenre(event.target.value);
    };

    let NEW

    let NEW_MOVIE = gql`
        mutation CreateMovie ($title: String!, $description: String!, $genre: String!, $rank: Int!, $director_id: ID!, $image: String!, $topic: String!, $text: String!, $year: Int!) {
            createMovie(movie: {title: $title , description: $description, genre: $genre , rank: $rank, director_id: $director_id, image: $image, topic: $topic, text: $text, year: $year}) {
                id
            }
        }
    `;

    const DIRECTOR_ID = gql`
        query DirectorIdByName($director: String!) {
            directorIdByName(name: $director)
        }
    `;

    let NEW_MOVIE_AND_DIRECTOR = gql`
        mutation CreateMovieAndDirector ($title: String!, $description: String!, $genre: String!, $rank: Int!, $director_name: String!, $image: String!, $topic: String!, $text: String! $profileImage: String!, $bornAt: String!, $year: Int!){
            createMovieAndDirector(title: $title , description: $description, genre: $genre , rank: $rank, directorName: $director_name, image: $image, topic: $topic, text: $text, profileImage: $profileImage, bornAt: $bornAt, year: $year) {
                id
            }
        }
    `;


    const [givenTitle, setTitle] = useState('')
    const [givenYear, setYear] = useState('')
    const [givenDirector, setDirector] = useState('')
    const [givenDescription, setDescription] = useState('')
    const [givenText, setText] = useState('')
    const [givenRank, setRank] = useState('')
    const [givenWorth, setWorth] = useState('')
    const [givenGenre, setGenre] = useState('')
    const [givenImage1, setImage1] = useState('')
    const [givenImage2, setImage2] = useState('')
    const [givenTopic, setTopic] = useState('')

    const [name, setName] = useState('');

    const Input = styled("input")({
        display: "none",
    });

    useEffect(() => {
        (
            async () => {
                const response = await fetch("http://localhost:8081/user", {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const content = await response.json()
                console.log(content["0"]["firstname"])
                setName(content["firstname"])

            }
        )();
    });

    const id = useQuery(DIRECTOR_ID,
        {
            variables: {
                director: givenDirector,
            }
        }).data

    let int = NaN
    let index = NaN
    let data = JSON.stringify(id)
    let exist
    let unique

    if (id && id["directorIdByName"]) {
        index = data.indexOf(":")
        int = parseInt(data.slice(index + 2, data.length - 2), 10)
        console.log(int)
        NEW = NEW_MOVIE
        exist = true
    } else {
        NEW = NEW_MOVIE_AND_DIRECTOR
        exist = false
    }

    const [addMovie] = useMutation(NEW,
        {
            variables: {
                title: givenTitle,
                image: givenImage1 || givenImage2 ||'https://pharem-project.eu/wp-content/themes/consultix/images/no-image-found-360x250.png',
                profileImage: "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif",
                bornAt: "1.1.1111",
                description: givenDescription,
                review: givenText,
                rank: givenRank,
                worth: givenWorth,
                genre: givenGenre,
                topic :givenTopic,
                text: givenText,
                year: givenYear,
                director_id: int,
                director_name: givenDirector,
            },
            onCompleted: function (data, variant) {
                console.log("data:", data)
                if (exist === true) {
                    unique = data["createMovie"]["id"]
                } else {
                    unique = data["createMovieAndDirector"]["id"]
                }
                enqueueSnackbar('Thank You For Contributing!', { variant })
                return setTimeout(() => window.location.replace("/moviePage/" + unique),2000);

            },
            onError: function (error) {
                console.log("error:",error)
            }
        });

    function handleSignClick() {
        window.location.replace("/register-sign-in")
    }

    function handleRegClick() {
        window.location.replace("/register-sign-in")
    }

    if (name === '') {
        return (
            <div style={{color: "yellow"}}>
                <CardContent className={classes.oops}>
                    <Typography className={classes.oopsMsg} style={{fontSize: "x-large"}}>
                        Oops! it seems that you are not logged In!
                        <img src={"https://blog.qualimatch.co.il/wp-content/uploads/2017/12/Oops.jpg"} className={classes.oopsPic}/>
                    </Typography>
                    <div className={classes.actions}>
                        <button type="button" onClick={handleSignClick} className={classes.signBut}>Sign In!</button>
                        <h2 className={classes.or}>OR</h2>
                        <h2 className={classes.thirdTitle} style={{position: "relative", display: "flex"}}>And Find A World Of Movies!</h2>
                        <button type="button" onClick={handleRegClick} className={classes.regBut}>Register!</button>
                    </div>
                </CardContent>
            </div>
        )
    }

    return (
        <Card>
            <form className={classes.form} >
                <div className={classes.control}>
                    <label htmlFor="title">Movie Title</label>
                    <input type="text" datatype="String" required id="title" value={givenTitle} onChange={event => setTitle(event.target.value)}/>
                </div>
                <div className={classes.ctrl}>
                    <label htmlFor="year">Year Of Release</label>
                    <input
                        name="year"
                        id="year"
                        min="1890"
                        max="2022"
                        value={givenYear} onChange={event => setYear(event.target.value)}
                        datatype="Int"
                        required
                    ></input>
                </div>

                <div className={classes.im}>
                    <label htmlFor="image">Movie Image</label>
                    <input type="url" datatype="string" id="image" value={givenImage1} onChange={event => setImage1(event.target.value)}/>
                </div>

                <Stack direction="row" alignItems="center" spacing={2} className={classes.but} >
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            type="file"
                            id="contained-button-file"
                            value={givenImage2}
                            onChange={event => setImage2(event.target.value)}
                        />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                </Stack>

                <div className={classes.control}>
                    <label htmlFor="director">Director's Name</label>
                    <input type="text" required id="director"  datatype="String" value={givenDirector} onChange={event => setDirector(event.target.value)}/>
                </div>

                <div className={classes.control}>
                    <label htmlFor="worth">
                        How Much Do You Think This Movie Is worth Waching?
                    </label>
                    <input type="range" datatype="Int" id="worth" min="1" max="5" value={givenWorth} onChange={event => setWorth(event.target.value)}/>
                </div>

                <div className={classes.control}>
                    <InputLabel id="demo-simple-select-label" >Gender</InputLabel>
                    <Select
                        id="genre"
                        name="genre"
                        className={classes.genreInput}
                        value={givenGenre}
                        datatype="String"
                        placeholder="genre"
                        onChange={handleChange}
                    >
                        <MenuItem value="action">Action</MenuItem>
                        <MenuItem value="drama">Drama</MenuItem>
                        <MenuItem value="comedy">Comedy</MenuItem>
                        <MenuItem value="crime">Crime</MenuItem>
                        <MenuItem value="animation">Animation</MenuItem>
                        <MenuItem value="fantasy">Fantasy</MenuItem>
                        <MenuItem value="romance">Romance</MenuItem>
                        <MenuItem value="thriller">Thriller</MenuItem>
                        <MenuItem value="horror">Horror</MenuItem>
                        <MenuItem value="science fiction">Science Fiction</MenuItem>
                        <MenuItem value="historical">Historical</MenuItem>
                        <MenuItem value="western">Western</MenuItem>
                    </Select>
                </div>

                <div className={classes.control}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        type="text"
                        datatype="String"
                        required
                        rows="5"
                        value={givenDescription} onChange={event => setDescription(event.target.value)}
                    ></textarea>
                </div>

                <div className={classes.control}>
                    <label htmlFor="topic">Review title</label>
                    <textarea
                        id="topic"
                        type="text"
                        datatype="String"
                        required
                        rows="1"
                        value={givenTopic} onChange={event => setTopic(event.target.value)}
                    ></textarea>
                </div>

                <div className={classes.control}>
                    <label htmlFor="review">Review Text</label>
                    <textarea id="review" rows="5" datatype="String" value={givenText} onChange={event => setText(event.target.value)}></textarea>
                </div>

                <div className={classes.ctrl}>
                    <label htmlFor="rank">Add Your Rank</label>
                    <input
                        type="number"
                        name="ranking"
                        id="ranking"
                        min="1"
                        max="100"
                        value={givenRank} onChange={event => setRank(event.target.value)}
                        datatype="Int"
                    ></input>
                </div>

                <div className={classes.actions}>
                    <button type="button" onClick={addMovie}>Add Movie</button>
                </div>
            </form>
        </Card>
    );
}

export default NewMovieForm;