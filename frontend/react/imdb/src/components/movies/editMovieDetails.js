import React, {useContext, useState} from "react";
import {BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton,} from "./common";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";

import {Typography} from "@mui/material";
import {Button, Stack} from "@mui/material";
import Card from "../ui/Card";
import classes from "./MovieItem.module.css"
import {styled} from "@mui/material/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EditIcon from "@mui/icons-material/Edit";
import CardContent from "@mui/material/CardContent";
import {gql, useMutation} from "@apollo/client";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

export function EditMovieDetails(props) {

    let EDIT_DETAILS = gql`
        mutation UpdateUserDetails ($userID: ID!, $firstname: String!, $lastname: String!, $nickname: String!, $description: String!, $profile: String!, $email: String!, $birthday: String!, $country: String!, $gender: String!) {
            updateUserDetails (userID: $userID, firstname: $firstname , lastname: $lastname, nickname: $nickname , description: $description, profile: $profile, email: $email, birthday: $birthday, country: $country, gender: $gender) {
                id
            }
        }
    `;

    let firstname = props.firstname
    let lastname = props.lastname
    let nickname = props.nickname
    let description = props.description
    let country = props.country
    let birthday = props.birthday
    let email = props.email
    let gender = props.gender
    let profile = props.profile
    let ID = props.userID

    let yearBirth = birthday.slice(4, 8)
    let monthBirth = birthday.slice(2, 4)
    let dayBirth = birthday.slice(0, 2)

    const [errorEmail, setErrorEmail] = useState(false)
    const [sure, setSure] = useState(false)
    const [sureClicked, setSureClicked] = useState(false)
    const [spinner, setSpinner] = useState(false);

    const [givenFirstName, setFirstName] = useState(firstname)
    const [givenLastName, setLastName] = useState(lastname)
    const [givenNickName, setNickName] = useState(nickname)
    const [givenGender, setGender] = useState(gender)
    const [givenDesc, setDesc] = useState(description)
    const [givenTextProfile, setTextProfile] = useState(profile)
    const [givenFileProfile, setFileProfile] = useState(profile)
    const [givenEmail, setEmail] = useState(email)
    const [givenEmailCheck, setEmailCheck] = useState(email)
    const [givenCountry, setCountry] = useState(country)
    const [givenDayOfBirth, setDayOfBirth] = useState(yearBirth)
    const [givenMonthOfBirth, setMonthOfBirth] = useState(monthBirth)
    const [givenYearOfBirth, setYearOfBirth] = useState(yearBirth)

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const [edit] = useMutation(EDIT_DETAILS,
        {
            variables: {
                userID: ID,
                firstname: givenFirstName,
                lastname: givenLastName,
                nickname: givenNickName,
                description: givenDesc,
                profile: givenFileProfile || givenTextProfile || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif',
                birthday: givenDayOfBirth + givenMonthOfBirth + givenYearOfBirth,
                email: givenEmail,
                country: givenCountry,
                gender: givenGender,
            },
            onCompleted: function (data, variant) {
                setSpinner(false)
                return setTimeout(() => window.location.replace("/"), 1000);

            },
            onError: function (error) {
                console.log("error:", error)
            }
        });

    function handleSubmit() {
        if (givenEmail !== givenEmailCheck) {
            setErrorEmail(true)
        } else {
            setSure(true)
        }
    }

    const handleSure = () => {
        setSpinner(true)
        setSureClicked(true)
        return(edit())
    }

    const Input = styled("input")({
        display: "none",
    });

    let form = (
        <Card>
            <Typography variant="h5" align="center" color="yellow" marginTop="-2cm">
                Hello {firstname}! Here You Can Update Your Details!
            </Typography>
            <Typography variant="h6" align="center" color="yellow" marginTop="0.4cm">
                If you are looking for changing password, please sign out and press on "forgot my password"
            </Typography>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor="firstname">Enter Your First Name</label>
                    <input type="text" required id="firstname" name="firstname"
                           defaultValue={givenFirstName ? givenFirstName : firstname}
                           onChange={event => setFirstName(event.target.value)}/>
                </div>

                <div className={classes.control}>
                    <label htmlFor="lastname">Enter Your Last Name</label>
                    <input type="text" id="lastname" name="lastname" defaultValue={givenLastName ? givenLastName : lastname}
                           onChange={event => setLastName(event.target.value)} required/>
                </div>

                <div className={classes.control}>
                    <label htmlFor="nickname">Choose Your Own Uniqe Nickname!</label>
                    <input type="text" required id="nickname" name="nickname"
                           defaultValue={givenNickName ? givenNickName : nickname}
                           onChange={event => setNickName(event.target.value)}/>
                </div>

                <label id="demo-simple-select-label" className={classes.genderLabel}>Gender</label>
                <Select
                    htmlFor="gender"
                    id="gender"
                    name="gender"
                    defaultValue={givenGender ? givenGender : gender}
                    onChange={handleChange}
                    style={{width: "4cm", height: "1cm", marginBottom: "0.3cm", backgroundColor: "white"}}
                >
                    <MenuItem value={'Male'} id="male" selected={'male' === JSON.stringify(gender)}>Male</MenuItem>
                    <MenuItem value={'Female'} id="female"
                              selected={'female' === JSON.stringify(gender)}>Female</MenuItem>
                    <MenuItem value={'Other'} id="other" selected={'other' === JSON.stringify(gender)}>Other</MenuItem>
                </Select>
                {errorEmail ? <CardContent className={classes.msg}>
                    <Typography component="div" style={{fontSize: "13px", marginTop: "-0.25cm", marginRight: "-1cm"}}>
                        Email's inputs doesnt match
                    </Typography>
                    <Button onClick={() => setErrorEmail(false)}
                            className={classes.close}><CancelPresentationIcon/></Button>
                </CardContent> : null}

                <div className={classes.control}>
                    <label htmlFor="email">Enter Your E-Mail</label>
                    <input type="text" required id="email" name="email" defaultValue={givenEmail ? givenEmail : email}
                           onChange={event => setEmail(event.target.value)} autoComplete="on"/>
                </div>

                <div className={classes.control}>
                    <label htmlFor="emailCheck">Enter Your E-Mail Again</label>
                    <input type="text" required id="emailCheck" name="emailCheck"
                           defaultValue={givenEmailCheck ? givenEmailCheck : email}
                           onChange={event => setEmailCheck(event.target.value)} autoComplete="on"/>
                </div>

                <div className={classes.im}>
                    <label htmlFor="textProfile">Profile Image</label>
                    <input datatype="string" id="textProfile" name="textProfile"
                           defaultValue={givenTextProfile ? givenTextProfile : profile}
                           onChange={event => setTextProfile(event.target.value)}/>
                </div>

                <Stack direction="row" alignItems="center" spacing={2} className={classes.but}>
                    <label htmlFor="fileProfile">
                        <Button variant="contained" component="span">
                            Upload
                            <Input
                                accept="image/*"
                                id="fileProfile"
                                name="fileProfile"
                                defaultValue={givenFileProfile} onChange={event => setFileProfile(event.target.value)}
                            />
                        </Button>
                    </label>
                </Stack>

                <div className={classes.ctrl2} style={{marginTop: "-0.8cm"}}>
                    <label htmlFor="country">Enter Your Country</label>
                    <input type="text" required id="country" name="country"
                           defaultValue={givenCountry ? givenCountry : country}
                           onChange={event => setCountry(event.target.value)} autoComplete="on"/>
                </div>

                <div>
                    <label htmlFor="birthday" className={classes.birthday}>Enter Your Birthday</label>

                    <table className={classes.tr}>
                        <tbody>
                        <tr>
                            <td><input type="number" id="year" name="year" min="1920" max="2022" placeholder="Year"
                                       required
                                       defaultValue={givenYearOfBirth ? givenYearOfBirth : yearBirth}
                                       onChange={event => setYearOfBirth(event.target.value)}
                                       className={classes.year}/></td>
                            <td><input type="number" id="month" name="month" min="1" max="12" placeholder="Month"
                                       required
                                       defaultValue={givenMonthOfBirth ? givenMonthOfBirth : monthBirth}
                                       onChange={event => setMonthOfBirth(event.target.value)}
                                       className={classes.month}/></td>
                            <td><input type="number" id="day" name="day" min="1" max="31" placeholder="Day" required
                                       defaultValue={givenDayOfBirth ? givenDayOfBirth : dayBirth}
                                       onChange={event => setDayOfBirth(event.target.value)}
                                       className={classes.day}/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className={classes.control}>
                    <label htmlFor="description">Here you Can Write A Short Description About Yourself</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        defaultValue={givenDesc ? givenDesc : description} onChange={event => setDesc(event.target.value)}
                    ></textarea>
                </div>

                <Marginer direction="vertical" margin={10}/>
                <SubmitButton type="button" onClick={sure ? handleSure : handleSubmit}
                              value="submit">{sure? 'Are You Sure?' : spinner ? 'loading' :'Update!'}</SubmitButton>
            </form>
        </Card>
    );

    return <>{form}{sureClicked ? edit : null}</>
}

export default EditMovieDetails
