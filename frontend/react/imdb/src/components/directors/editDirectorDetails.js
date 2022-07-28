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

import classes from "./editDirectorDetails.module.css"


export function EditDirectorDetails(props) {
    const DIRECTOR_DATA = gql`
        query DirectorById($id : ID!) {
            directorById(id: $id) {
                name
                profileImage
                bornAt
                description
            }
        }
    `;

    let EDIT_DIRECTOR = gql`
        mutation EditDirectorDetails ($directorID: ID!, $name: String!, $profileImage: String!, $bornAt: String!, $description: String!) {
            editDirectorDetails (directorID: $directorID, director: {name: $name , profileImage: $profileImage, bornAt: $bornAt , description: $description}) {
                id
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const [spinner, setSpinner] = useState(false);
    const [sure, setSure] = useState(false);
    const [sureClicked, setSureClicked] = useState(false);

    const {loading: loading1, error: error1, data: data1} = useQuery(DIRECTOR_DATA,
        {
            variables: {
                id: lastSegment || 0
            }
        })

    const [givenName, setName] = useState('')
    const [givenProfileImage1, setProfileImage1] = useState('')
    const [givenProfileImage2, setProfileImage2] = useState('')
    const [givenBornAtDay, setBornAtDay] = useState('')
    const [givenBornAtMonth, setBornAtMonth] = useState('')
    const [givenBornAtYear, setBornAtYear] = useState('')
    const [givenDescription, setDescription] = useState('')

    const [edit] = useMutation(EDIT_DIRECTOR,
        {
            variables: {
                directorID: lastSegment,
                name: givenName,
                profileImage: givenProfileImage1 || givenProfileImage2,
                bornAt: givenBornAtDay + "." + givenBornAtMonth + "." + givenBornAtYear,
                description: givenDescription,
            },

            onCompleted: function (data, variant) {
                setSpinner(false)
                return setTimeout(() => window.location.replace("/directorPage/" + JSON.stringify(lastSegment)), 1000);

            },
            onError: function (error) {
                console.log("error:", error)
            }
        });

    if (loading1) return <p>Loading...</p>;
    if (error1) return <p>Error :{error1}</p>;

    let name = data1["directorById"]["0"]["name"]
    let profileImage = data1["directorById"]["0"]["profileImage"]
    let bornAt = data1["directorById"]["0"]["bornAt"]
    let description = data1["directorById"]["0"]["description"]

    if (bornAt.length !== 10 && bornAt[1] === ".") {
        bornAt = "0" + bornAt
    }

    if (bornAt.length !== 10 && bornAt[4] === ".") {
        bornAt = bornAt.slice(0,3) + "0" + bornAt.slice(3,9)
    }

    let yearBirth = bornAt.slice(6, 10)
    let monthBirth = bornAt.slice(3, 5)
    let dayBirth = bornAt.slice(0, 2)



    function handleSubmit() {
        if (givenName === "") {setName(name)}
        if (givenBornAtDay === "") {setBornAtDay(dayBirth)}
        if (givenBornAtMonth === "") {setBornAtMonth(monthBirth)}
        if (givenBornAtYear === "") {setBornAtYear(yearBirth)}
        if (givenDescription === "") {setDescription(description)}
        if (givenProfileImage1 === "") {setProfileImage1(profileImage)}

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

    let form = (
        <Card>
            <Typography variant="h5" align="center" color="yellow" marginTop="-2cm">
                Hello! Here You Can Update The Details Of {name}!
            </Typography>
            <form className={classes.form}>

                <div className={classes.control}>
                    <label htmlFor="title">Director's Name</label>
                    <input type="text" datatype="String" required id="title" defaultValue={name}
                           onChange={event => setName(event.target.value)}/>
                </div>

                <div className={classes.im}>
                    <label htmlFor="image">Director's Image</label>
                    <input type="url" datatype="string" id="image" defaultValue={profileImage}
                           onChange={event => setProfileImage1(event.target.value)}/>
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
                                value={givenProfileImage2}
                                onChange={event => setProfileImage2(event.target.value)}
                            />
                        </Button>
                    </label>
                </Stack>

                <div>
                    <label htmlFor="birthday" style={{
                        color: "yellow",
                        fontWeight: "bold",
                        position: "relative",
                        display: "flex",
                        bottom: "1cm"
                    }}>Enter Birthday</label>
                    <table className={classes.tr}>
                        <tbody>
                        <tr>
                            <td><input type="number" id="year" min="1920" max="2022" placeholder="Year"
                                       defaultValue={yearBirth}
                                       onChange={event => setBornAtYear(event.target.value)}
                                       style={{width: "2cm"}}/></td>
                            <td><input type="number" id="month" min="1" max="12" placeholder="Month"
                                       defaultValue={monthBirth}
                                       onChange={event => setBornAtMonth(event.target.value)}
                                       style={{width: "2cm"}}/></td>
                            <td><input type="number" id="day" min="1" max="31" placeholder="Day"
                                       defaultValue={dayBirth} onChange={event => setBornAtDay(event.target.value)}
                                       style={{width: "2cm"}}/></td>
                        </tr>
                        </tbody>
                    </table>
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

export default EditDirectorDetails
