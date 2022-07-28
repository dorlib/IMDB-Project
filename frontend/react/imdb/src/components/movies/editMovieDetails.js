import React, {useContext, useState} from "react";
import {BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton,} from "../accounts/common"
import {Marginer} from "../marginer";

import {Typography} from "@mui/material";
import {Button, Stack} from "@mui/material";
import Card from "../ui/Card";
import {styled} from "@mui/material/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {gql, useMutation, useQuery} from "@apollo/client";

import classes from "./editMovieDetails.module.css"


export function EditMovieDetails(props) {
    const MOVIE_DATA = gql`
        query MovieById($id : ID!) {
            movieById(id: $id) {
                id
                title
                description
                genre
                image
                year
            }
        }
    `;

    let EDIT_MOVIE = gql`
        mutation EditMovieDetails ($movieID: ID!, $title: String!, $description: String!, $genre: String!, $image: String!, $year: Int!) {
            editMovieDetails (movieID: $movieID, title: $title , description: $description, genre: $genre , image: $image, year: $year) {
                id
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const [spinner, setSpinner] = useState(false);
    const [sure, setSure] = useState(false);
    const [sureClicked, setSureClicked] = useState(false);

    const {loading: loading1, error: error1, data: data1} = useQuery(MOVIE_DATA,
        {
            variables: {
                id: lastSegment || 0
            }
        })

    const [givenTitle, setTitle] = useState('')
    const [givenDescription, setDescription] = useState('')
    const [givenGenre, setGenre] = useState('')
    const [givenYear, setYear] = useState('')
    const [givenImage1, setImage1] = useState('')
    const [givenImage2, setImage2] = useState('')

    const [edit] = useMutation(EDIT_MOVIE,
        {
            variables: {
                movieID: lastSegment,
                title: givenTitle,
                description: givenDescription,
                genre: givenGenre,
                year: givenYear,
                image: givenImage1 || givenImage2
            },
            onCompleted: function (data, variant) {
                setSpinner(false)
                return setTimeout(() => window.location.replace("/moviePage/" + JSON.stringify(lastSegment)), 1000);

            },
            onError: function (error) {
                console.log("error:", error)
            }
        });

    if (loading1) return <p>Loading...</p>;
    if (error1) return <p>Error :{error1}</p>;

    let title = data1["movieById"]["0"]["title"]
    let description = data1["movieById"]["0"]["description"]
    let genre = data1["movieById"]["0"]["genre"]
    let year = data1["movieById"]["0"]["year"]
    let image = data1["movieById"]["0"]["image"]



    function handleSubmit() {
        console.log(givenTitle, givenGenre, givenYear, givenDescription, givenImage1)
        if (givenGenre === "") {setGenre(genre)}
        if (givenDescription === "") {setDescription(description)}
        if (givenYear === "") {setYear(year)}
        if (givenImage1 === "") {setImage1(image)}
        if (givenTitle === "") {setTitle(title)}
        setSure(true)
    }

    const handleSure = () => {
        setSpinner(true)
        setSureClicked(true)
        edit()
    }

    const Input = styled("input")({
        display: "none",
    });

    const handleChange = (event) => {
        setGenre(event.target.value);
    };

    let form = (
        <Card>
            <Typography variant="h5" align="center" color="yellow" marginTop="-2cm">
                Hello! Here You Can Update The Details Of {title}!
            </Typography>
            <form className={classes.form}>

                <div className={classes.control}>
                    <label htmlFor="title">Movie Title</label>
                    <input type="text" datatype="String" required id="title" defaultValue={title}
                           onChange={event => setTitle(event.target.value)}/>
                </div>

                <div className={classes.ctrl}>
                    <label htmlFor="year">Year Of Release</label>
                    <input
                        name="year"
                        id="year"
                        min="1890"
                        max="2022"
                        defaultValue={year} onChange={event => setYear(event.target.value)}
                        datatype="Int"
                        required
                    ></input>
                </div>

                <div className={classes.im}>
                    <label htmlFor="image">Movie Image</label>
                    <input type="url" datatype="string" id="image" defaultValue={image}
                           onChange={event => setImage1(event.target.value)}/>
                </div>

                <Stack direction="row" alignItems="center" spacing={2} className={classes.but}>
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                id="contained-button-file"
                                value={givenImage2}
                                onChange={event => setImage2(event.target.value)}
                            />
                        </Button>
                    </label>
                </Stack>

                <div className={classes.control}>
                    <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                    <Select
                        id="genre"
                        name="genre"
                        className={classes.genreInput}
                        defaultValue={genre}
                        datatype="String"
                        placeholder="genre"
                        onChange={handleChange}
                    >
                        <MenuItem value="action">action</MenuItem>
                        <MenuItem value="drama">drama</MenuItem>
                        <MenuItem value="comedy">comedy</MenuItem>
                        <MenuItem value="crime">crime</MenuItem>
                        <MenuItem value="animation">animation</MenuItem>
                        <MenuItem value="fantasy">fantasy</MenuItem>
                        <MenuItem value="romance">romance</MenuItem>
                        <MenuItem value="thriller">thriller</MenuItem>
                        <MenuItem value="horror">horror</MenuItem>
                        <MenuItem value="science fiction">science fiction</MenuItem>
                        <MenuItem value="historical">historical</MenuItem>
                        <MenuItem value="western">western</MenuItem>
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
                        defaultValue={description} onChange={event => setDescription(event.target.value)}
                    ></textarea>
                </div>

                <Marginer direction="vertical" margin={10}/>
                <SubmitButton type="button" onClick={sure ? handleSure : handleSubmit}
                              value="submit">{sure ? 'Are You Sure?' : spinner ? 'loading' : 'Update!'}</SubmitButton>
            </form>
        </Card>
    );

    return <>{form}{sureClicked ? edit : null}</>
}

export default EditMovieDetails
