import React, {useContext, useState} from "react";
import {BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton,} from "./common";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";

import {Typography} from "@mui/material";
import {Button, Stack} from "@mui/material";
import Card from "../ui/Card";
import classes from "./editDetails.module.css"
import {styled} from "@mui/material/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EditIcon from "@mui/icons-material/Edit";
import CardContent from "@mui/material/CardContent";
import {gql, useMutation} from "@apollo/client";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

export function EditDetails(props) {

    let EDIT_DETAILS = gql`
        mutation UpdateUserDetails ($firstnme: String!, $lastname: String!, $nickname: String!, $description: String!, $profile: String!, $birthday: String!, $email: String!, $country: String!, $gender: Int!) {
            updateUserDetails (user: {firstname: $firstname , lastname: $lastname, nickname: $nickname , description: $description, profile: $profile, birthday: $birthday, email: $email, country: $country, gender: $gender}) {
                id
            }
        }
    `;

    const [ThankYou, setThankYou] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [sure, setSure] = useState(false)
    const [spinner, setSpinner] = useState(false);

    const [givenFirstName, setFirstName] = useState('')
    const [givenLastName, setLastName] = useState('')
    const [givenNickName, setNickName] = useState('')
    const [givenGender, setGender] = useState('')
    const [givenDesc, setDesc] = useState('')
    const [givenTextProfile, setTextProfile] = useState('')
    const [givenFileProfile, setFileProfile] = useState('')
    const [givenEmail, setEmail] = useState('')
    const [givenEmailCheck, setEmailCheck] = useState('')
    const [givenCountry, setCountry] = useState('')
    const [givenDayOfBirth, setDayOfBirth] = useState('')
    const [givenMonthOfBirth, setMonthOfBirth] = useState('')
    const [givenYearOfBirth, setYearOfBirth] = useState('')

    const handleChange = (event) => {
        setGender(event.target.value);
    };

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

    const [edit] = useMutation(EDIT_DETAILS,
        {
            variables: {
                firstname: givenFirstName,
                lastname: givenLastName,
                nickname: givenNickName,
                description: givenDesc,
                profile: givenFileProfile || givenTextProfile ||'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif',
                birthday: givenDayOfBirth + givenMonthOfBirth + givenYearOfBirth,
                email: givenEmail,
                country: givenCountry,
                gender: givenGender,
            },
            onCompleted: function (data, variant) {
                setSpinner(false)
                return setTimeout(() => window.location.replace("/"),1000);

            },
            onError: function (error) {
                console.log("error:",error)
            }
        });

    const handleSubmit = (e) => {
        if (givenEmail !== givenEmailCheck) {
            setErrorEmail(true)
        } else{
            setSure(true)
        }
    }

    const Input = styled("input")({
        display: "none",
    });

    let SureMassage = (
        <div>
            <CardContent className={classes.about}>
                <EditIcon className={classes.editDetailsBut}/>
                <Typography component="div">
                    Are you sure you want to update details? theres no turning back if you press "Yes"
                    <Button onClick={() => setSure(false)}>Cancel</Button>
                    <Button onClick={() => edit().then(() => (setSpinner(true)))}>Yes</Button>
                </Typography>
            </CardContent>
        </div>
    )

    let form = (
            <Card>
                <Typography variant="h5" align="center" color="yellow">
                    Hello {firstname}! Here You Can Update Your Details!
                </Typography>
                <Typography variant="h6" align="center" color="yellow" marginTop="0.4cm">
                    If you are looking for changing password, please sign out and press on "forgot my password"
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.control}>
                        <label htmlFor="firstname">Enter Your First Name</label>
                        <input type="text" required id="firstname" name="firstname" value={givenFirstName? givenFirstName: firstname}
                               onChange={event => setFirstName(event.target.value)}/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="lastname">Enter Your Last Name</label>
                        <input type="text" id="lastname" name="lastname" value={givenLastName? givenLastName: lastname}
                               onChange={event => setLastName(event.target.value)} required/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="nickname">Choose Your Own Uniqe Nickname!</label>
                        <input type="text" required id="nickname" name="nickname" value={givenNickName? givenNickName: nickname}
                               onChange={event => setNickName(event.target.value)}/>
                    </div>

                    <label id="demo-simple-select-label" className={classes.genderLabel}>Gender</label>
                    <Select
                        htmlFor="gender"
                        id="gender"
                        name="gender"
                        value={givenGender? givenGender : gender}
                        onChange={handleChange}
                        style={{width: "4cm", height: "1cm", marginBottom: "0.3cm", backgroundColor: "white"}}
                    >
                        <MenuItem value={'Male'} id="male" selected={'male' === JSON.stringify(gender)}>Male</MenuItem>
                        <MenuItem value={'Female'} id="female" selected={'female' === JSON.stringify(gender)}>Female</MenuItem>
                        <MenuItem value={'Other'} id="other" selected={'other' === JSON.stringify(gender)}>Other</MenuItem>
                    </Select>
                    {errorEmail? <CardContent className={classes.msg}>
                        <Typography component="div" style={{fontSize: "13px", marginTop: "-0.25cm", marginRight: "-1cm"}}>
                            Email's inputs doesnt match
                        </Typography>
                        <Button onClick={() => setErrorEmail(false)} className={classes.close}><CancelPresentationIcon /></Button>
                    </CardContent> : null}

                    <div className={classes.control}>
                        <label htmlFor="email">Enter Your E-Mail</label>
                        <input type="text" required id="email" name="email" value={givenEmail? givenEmail: email}
                               onChange={event => setEmail(event.target.value)} autoComplete="on"/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="emailCheck">Enter Your E-Mail Again</label>
                        <input type="text" required id="emailCheck" name="emailCheck" value={givenEmailCheck? givenEmailCheck: email}
                               onChange={event => setEmailCheck(event.target.value)} autoComplete="on"/>
                    </div>

                    <div className={classes.im}>
                        <label htmlFor="textProfile">Profile Image</label>
                        <input datatype="string" id="textProfile" name="textProfile" value={givenTextProfile? givenTextProfile: profile}
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
                                    value={givenFileProfile} onChange={event => setFileProfile(event.target.value)}
                                />
                            </Button>
                        </label>
                    </Stack>

                    <div className={classes.ctrl2} style={{marginTop: "-0.8cm"}}>
                        <label htmlFor="country">Enter Your Country</label>
                        <input type="text" required id="country" name="country" value={givenCountry? givenCountry : country}
                               onChange={event => setCountry(event.target.value)} autoComplete="on"/>
                    </div>

                    <div>
                        <label htmlFor="birthday" className={classes.birthday}>Enter Your Birthday</label>

                        <table className={classes.tr}>
                            <tbody>
                            <tr>
                                <td><input type="number" id="year" name="year" min="1920" max="2022" placeholder="Year"
                                           required
                                           value={givenYearOfBirth}
                                           onChange={event => setYearOfBirth(event.target.value)}
                                           className={classes.year}/></td>
                                <td><input type="number" id="month" name="month" min="1" max="12" placeholder="Month"
                                           required
                                           value={givenMonthOfBirth}
                                           onChange={event => setMonthOfBirth(event.target.value)}
                                           className={classes.month}/></td>
                                <td><input type="number" id="day" name="day" min="1" max="31" placeholder="Day" required
                                           value={givenDayOfBirth} onChange={event => setDayOfBirth(event.target.value)}
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
                            value={givenDesc? givenDesc : description} onChange={event => setDesc(event.target.value)}
                        ></textarea>
                    </div>

                    <Marginer direction="vertical" margin={10}/>
                    <SubmitButton type="submit" value="submit">{spinner ? 'loading...' : 'Update!'}</SubmitButton>
                </form>
            </Card>
    );

    return <>{form}{sure ? SureMassage : null}</>
}

export default EditDetails
