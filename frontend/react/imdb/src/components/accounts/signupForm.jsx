import React, {useContext, useState} from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";

import {Typography} from "@mui/material";
import { Button , Stack} from "@mui/material";
import Card from "../ui/Card";
import classes from "./SignupForm.module.css";
import {gql, useMutation} from "@apollo/client";
import {styled} from "@mui/material/styles";

export function SignUpForm(props) {
    const { switchToSignin } = useContext(AccountContext);


    let NEW_USER = gql`
        mutation CreateUser ($firstname: String!, $lastname: String!, $nickname: String!, $description: String!, $password: String!, $profile: String!, $email: String!, $birthday: String!, $country: String! ) {
            createUser(firstname: $firstname , lastname: $lastname, nickname: $nickname , description: $description, password: $password, profile: $profile, email: $email, birthday: $birthday, country: $country) {
                id
            }
        }
    `;

    const [givenFirstName, setFirstName] = useState('')
    const [givenLastName, setLastName] = useState('')
    const [givenNickName, setNickName] = useState('')
    const [givenDesc, setDesc] = useState('')
    const [givenPassword, setPassword] = useState('')
    const [givenProfile, setProfile] = useState('')
    const [givenEmail, setEmail] = useState('')
    const [givenCountry, setCountry] = useState('')
    const [givenDayOfBirth, setDayOfBirth] = useState('')
    const [givenMonthOfBirth, setMonthOfBirth] = useState('')
    const [givenYearOfBirth, setYearOfBirth] = useState('')

    const Input = styled("input")({
        display: "none",
    });

    const [addUser] = useMutation(NEW_USER,
        {
            variables: {
                firstname: givenFirstName,
                lastname: givenLastName,
                nickname: givenNickName,
                email: givenDayOfBirth + givenMonthOfBirth + givenYearOfBirth,
                birthday:givenPassword,
                country: givenCountry,
                password: givenEmail,
                description:givenDesc,
                profile: givenProfile || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif',
            },
            onCompleted: function (data) {
                return window.location.replace("/userPage/" + data["createUser"]["id"])
            },
            onError: function (error) {
                console.log("error:", error)
            },
        });

    return (
        <BoxContainer>
            <Card>
                <Typography variant="h6" align="center" color="#1c0907">
                    Hello Dear Future User! Thank You For Signing In To My WebSite!
                </Typography>
                <form className={classes.form}>

                    <div className={classes.control}>
                        <label htmlFor="firstName">Enter Your First Name</label>
                        <input type="text" required id="firstName" value={givenFirstName} onChange={event => setFirstName(event.target.value)}/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="lastName">Enter Your Last Name</label>
                        <input type="text" id="lastName" value={givenLastName} onChange={event => setLastName(event.target.value)} required/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="nickName">Choose Your Own Uniqe Nickname!</label>
                        <input type="text" required id="nickName" value={givenNickName} onChange={event => setNickName(event.target.value)}/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="email">Enter Your E-Mail</label>
                        <input type="text" required id="email" value={givenEmail} onChange={event => setEmail(event.target.value)} autoComplete="on"/>
                    </div>

                    <div className={classes.im}>
                        <label htmlFor="image">Profile Image</label>
                        <input datatype="string" type="url" id="image" value={givenProfile} onChange={event => setProfile(event.target.value)}/>
                    </div>

                    <Stack direction="row" alignItems="center" spacing={2} className={classes.but}>
                        <label htmlFor="contained-button-file">

                            <Button variant="contained" component="span">
                                Upload
                                <Input
                                    accept="image/*"
                                    type="file"
                                    id="contained-button-file"
                                    value={givenProfile} onChange={event => setProfile(event.target.value)}
                                />
                            </Button>
                        </label>
                    </Stack>

                    <div className={classes.ctrl2}>
                        <label htmlFor="country">Enter Your Country</label>
                        <input type="text" required id="country" value={givenCountry} onChange={event => setCountry(event.target.value)} autoComplete="on"/>
                    </div>

                    <div>
                        <label htmlFor="birthday" style={{color: "#1c0907", fontWeight: "bold"}}>Enter Your Birthday</label>

                        <table className={classes.tr}>
                            <tbody>
                            <tr>
                                <td><input type="number" id="year" min="1920" max="2022" placeholder="Year" required
                                           value={givenYearOfBirth} onChange={event => setYearOfBirth(event.target.value)} style={{width: "2cm"}}/></td>
                                <td><input type="number" id="month" min="1" max="12" placeholder="Month" required
                                           value={givenMonthOfBirth} onChange={event => setMonthOfBirth(event.target.value)} style={{width: "2cm"}}/></td>
                                <td><input type="number" id="day" min="1" max="31" placeholder="Day" required
                                           value={givenDayOfBirth} onChange={event => setDayOfBirth(event.target.value)} style={{width: "2cm"}}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="description">Here you Can Write A Short Description About Yourself</label>
                        <textarea
                            id="description"
                            rows="5"
                            value={givenDesc} onChange={event => setDesc(event.target.value)}
                        ></textarea>
                    </div>

                    <div className={classes.ctrl}>
                        <label htmlFor="pass">Choose Your password (8 characters minimum)</label>
                        <input type="password" id="pass" name="pass" minLength="8" value={givenPassword} onChange={event => setPassword(event.target.value)}
                               autoComplete="new-password"/>
                    </div>
                </form>
            </Card>
            <Marginer direction="vertical" margin={10}/>
            <MutedLink href="#">Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em"/>
            <SubmitButton type="submit" onClick={addUser}>Sign In!</SubmitButton>
            <Marginer direction="vertical" margin="1em"/>
            <MutedLink href="#">
                Don't have an account?{" "}
                <BoldLink href="#" onClick={switchToSignin}>
                    Signup
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}
