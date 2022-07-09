import React, {useContext, useState} from "react";
import {BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton,} from "./common";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";

import {Typography} from "@mui/material";
import {Button, Stack} from "@mui/material";
import Card from "../ui/Card";
import classes from "./SignupForm.module.css";
import {styled} from "@mui/material/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EditIcon from "@mui/icons-material/Edit";
import CardContent from "@mui/material/CardContent";

// add are you sure at the end 
export function EditDetails(props) {

    const [ThankYou, setThankYou] = useState(false)
    const [spinner, setSpinner] = useState(false);

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

    const handleSubmit = (e) => {

    }

    const Input = styled("input")({
        display: "none",
    });

    let ThankYouMassage = (
        <div>
            <CardContent className={classes.about}>
                <EditIcon className={classes.editDetailsBut}/>
                <Typography component="div">
                    Thank You {givenFirstName} for signing up and welcome to IMDB !
                </Typography>
            </CardContent>
        </div>
    )

    let form = (
            <Card>
                <Typography variant="h6" align="center" color="#1c0907">
                    Hello Dear Future User! Thank You For Signing Up To My WebSite!
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.control}>
                        <label htmlFor="firstname">Enter Your First Name</label>
                        <input type="text" required id="firstname" name="firstname" value={givenFirstName}
                               onChange={event => setFirstName(event.target.value)}/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="lastname">Enter Your Last Name</label>
                        <input type="text" id="lastname" name="lastname" value={givenLastName}
                               onChange={event => setLastName(event.target.value)} required/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="nickname">Choose Your Own Uniqe Nickname!</label>
                        <input type="text" required id="nickname" name="nickname" value={givenNickName}
                               onChange={event => setNickName(event.target.value)}/>
                    </div>

                    <InputLabel id="demo-simple-select-label" className={classes.genderLabel}>Gender</InputLabel>
                    <Select
                        htmlFor="gender"
                        id="gender"
                        name="gender"
                        value={givenGender}
                        placeholder="gender"
                        onChange={handleChange}
                        style={{width: "4cm", height: "1cm", marginBottom: "0.3cm"}}
                    >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                        <MenuItem value={'other'}>Other</MenuItem>
                    </Select>

                    <div className={classes.control}>
                        <label htmlFor="email">Enter Your E-Mail</label>
                        <input type="text" required id="email" name="email" value={givenEmail}
                               onChange={event => setEmail(event.target.value)} autoComplete="on"/>
                    </div>

                    <div className={classes.im}>
                        <label htmlFor="textProfile">Profile Image</label>
                        <input datatype="string" id="textProfile" name="textProfile" value={givenTextProfile}
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

                    <div className={classes.ctrl2}>
                        <label htmlFor="country">Enter Your Country</label>
                        <input type="text" required id="country" name="country" value={givenCountry}
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
                            value={givenDesc} onChange={event => setDesc(event.target.value)}
                        ></textarea>
                    </div>

                    <div className={classes.ctrl}>
                        <label htmlFor="password">Choose Your password (8 characters minimum)</label>
                        <input type="password" id="password" name="password" minLength="8" value={givenPassword}
                               onChange={event => setPassword(event.target.value)}
                               autoComplete="new-password"/>
                    </div>
                    <Marginer direction="vertical" margin={10}/>
                    <SubmitButton type="submit" value="submit">{spinner ? 'loading...' : 'Sign In!'}</SubmitButton>
                </form>
            </Card>
    );

    return <>{form}{ThankYou ? ThankYouMassage : null}</>
}

export default EditDetails