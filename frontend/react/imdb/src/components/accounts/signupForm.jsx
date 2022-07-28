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


export function SignUpForm(props) {
    const {switchToSignin} = useContext(AccountContext);

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const [ThankYou, setThankYou] = useState(false)
    const [spinner, setSpinner] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorValid, setEmailErrorValid] = useState(false);
    const [PassError, setPassError] = useState(false);
    const [imageError, setImageError] = useState(false);


    const [givenFirstName, setFirstName] = useState('')
    const [givenLastName, setLastName] = useState('')
    const [givenNickName, setNickName] = useState('')
    const [givenGender, setGender] = useState('')
    const [givenDesc, setDesc] = useState('')
    const [givenPassword, setPassword] = useState('')
    const [givenTextProfile, setTextProfile] = useState('')
    const [givenFileProfile, setFileProfile] = useState('')
    const [givenEmail, setEmail] = useState('')
    const [givenEmailVer, setEmailVer] = useState('')
    const [givenCountry, setCountry] = useState('')
    const [givenDayOfBirth, setDayOfBirth] = useState('')
    const [givenMonthOfBirth, setMonthOfBirth] = useState('')
    const [givenYearOfBirth, setYearOfBirth] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            givenFirstName,
            givenLastName,
            givenNickName,
            givenGender,
            givenDesc,
            givenPassword,
            givenTextProfile,
            givenFileProfile,
            givenEmail,
            givenCountry,
            givenDayOfBirth,
            givenMonthOfBirth,
            givenYearOfBirth,
        };


        if (givenEmail !== givenEmailVer) {
            setEmailError(true);
        } else if (givenEmail.indexOf("@") === -1) {
            setEmailErrorValid(true);
        } else if (givenPassword.length < 8) {
            setPassError(true);
        } else if (givenFileProfile !== "" && givenTextProfile !== "") {
            setImageError(true);
        } else {
            setSpinner(true);
            fetch('http://localhost:8081/signupForm', {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .catch((err) => {
                    console.error('error:', err)
                })
                .then((data) => {
                    setSpinner(false);
                    console.log('new user added')
                    setThankYou(true);
                    setTimeout(() => window.location.replace("/register-sign-in/"), 1500)
                })
        }
    }

    const Input = styled("input")({
        display: "none",
    });

    let ThankYouMassage = (
        <div>
            <CardContent className={classes.about}>
                <Typography component="div" style={{marginLeft: "1.7cm"}}>
                    Thanks {givenFirstName} for signing up and welcome to IMDB !
                </Typography>
                <pre><Typography style={{
                    marginTop: "0.6cm",
                    position: "absolute",
                    display: "flex",
                    left: "6cm",
                    fontSize: "15px"
                }}>Redirecting...</Typography></pre>
            </CardContent>
        </div>
    )

    let form = (
        <BoxContainer>
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

                    <label id="demo-simple-select-label" className={classes.genderLabel}>Gender</label>
                    <Select
                        htmlFor="gender"
                        id="gender"
                        name="gender"
                        value={givenGender}
                        placeholder="gender"
                        onChange={handleChange}
                        style={{width: "4cm", height: "1cm", marginBottom: "0.3cm", backgroundColor: "white"}}
                    >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                        <MenuItem value={'other'}>Other</MenuItem>
                    </Select>

                    <div className={classes.control}>
                        <label htmlFor="email">
                            <span>Enter Your E-mail</span>
                            {emailError && givenEmail !== givenEmailVer ? <span style={{color: "red", marginLeft: "5cm"}}>address doesnt match</span> : null }
                            {emailErrorValid && givenEmail.indexOf("@") === -1  ?<span style={{color: "red", marginLeft: "1cm"}}>address not valid</span> : null }
                        </label>
                        <input type="text" required id="email" name="email" value={givenEmail}
                               onChange={event => setEmail(event.target.value)} autoComplete="on"/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="emailVer">Enter Your E-Mail Again</label>
                        <input type="text" required id="email" name="email" value={givenEmailVer}
                               onChange={event => setEmailVer(event.target.value)} autoComplete="on"/>
                    </div>

                    <div className={classes.im}>
                        <label htmlFor="textProfile">Profile Image</label>
                        <input datatype="string" id="textProfile" name="textProfile" value={givenTextProfile}
                               onChange={event => setTextProfile(event.target.value)}/>
                    </div>

                    <Stack direction="row" alignItems="center" spacing={2} className={classes.but}>
                        <label htmlFor="fileProfile">
                            {imageError && (givenTextProfile !== "" && givenFileProfile !== "")? <span className={classes.imageErr}>choose file image OR url image</span> : null }
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
                                    value={givenFileProfile}
                                    onChange={event => setFileProfile(event.target.value)}
                                />
                            </Button>
                            <Typography className={classes.error}>{givenFileProfile}</Typography>
                        </label>
                    </Stack>

                    <div className={classes.ctrl2} style={{marginTop: "-0.8cm"}}>
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
                        <label htmlFor="password">Choose Your password (8 characters minimum)
                            {PassError && givenPassword.length < 8 ?<span style={{color: "red", marginLeft: "5cm"}}> "password has les then 8 characters"</span> : null}
                        </label>
                        <input type="password" id="password" name="password" minLength="8" value={givenPassword}
                               onChange={event => setPassword(event.target.value)}
                               autoComplete="new-password"/>
                    </div>
                    <Marginer direction="vertical" margin={10}/>
                    <SubmitButton type="submit" value="submit">
                        {spinner ? 'loading...' : 'Sign In!'}
                    </SubmitButton>
                </form>
            </Card>
            <Marginer direction="vertical" margin="0.3em"/>
            <Marginer direction="vertical" margin="1em"/>
            <MutedLink href="#">
                Want to go back to login?{" "}
                <BoldLink href="#" onClick={switchToSignin}>
                    login
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );

    return <>{form}{ThankYou ? ThankYouMassage : null}</>
}
