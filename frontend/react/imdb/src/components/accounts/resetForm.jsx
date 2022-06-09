import React, {useContext} from "react";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";
import {useState} from "react";
import Card from "../ui/Card";
import {styled} from "@mui/material/styles";

import classes from "./resetForm.module.css"
import {BoldLink, BoxContainer, FormContainer, MutedLink, SubmitButton,} from "./common";
import {Typography} from "@mui/material";
import styledComponentsBrowserEsm from "styled-components/dist/styled-components.browser.esm";


export function ResetForm() {
    const {switchToSignin} = useContext(AccountContext);

    const [givenEmail, setEmail] = useState('')

    const [spinner, setSpinner] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userName, setUserName] = useState('')


    const handleReset = (e) => {
        e.preventDefault();
        const userData = {
            givenEmail
        };

        setSpinner(true);
        setLoginError(false);
        setSuccess(false);

        fetch('http://localhost:8081/resetForm', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .catch((err) => {
                console.error('error:', err)
            })
            .then((data) => {
                if (data) {
                    console.log('login successfully')
                    setUserName(data["FirstName"])
                    setSpinner(false);
                    setSuccess(true);
                    return setTimeout( () => window.location.replace("/userPage/" + JSON.stringify(data["ID"])), 1000)
                } else {
                    console.log('login not successful')
                    setSpinner(false);
                    setLoginError(true)
                    return setTimeout(() => window.location.reload(),2000);
                }
            })
    }

    const Input = styled("input")({
        display: "none",
    });

    return (
        <BoxContainer>
            <form className={classes.form} onSubmit={handleReset}>
                <Card>
                    <div className={classes.email}>
                        <label htmlFor="email" className={classes.enterMail}>Enter Your Email</label>
                        <input type="text" id="email" name="email" required
                               onChange={event => setEmail(event.target.value)} autoComplete="username"/>
                    </div>
                </Card>
                <Typography className={classes.err}>{loginError? 'Login was not successful... please try again': null}</Typography>
                <Typography className={classes.success}>{success? 'Its Nice Seeing You Again '+ userName + ' !': null}</Typography>
                <Marginer direction="vertical" margin={45}/>
                <SubmitButton type="submit" value="submit" style={{display: "flex", marginLeft: "1.9cm", marginRight: "1.9cm", marginTop: "0.3cm"}}>{spinner? 'loading...' : 'Reset!'}</SubmitButton>
            </form>
            <MutedLink href="#">Forget your password?
                <BoldLink href="#" >
                    click here to reset
                </BoldLink>
            </MutedLink>
            <Marginer direction="vertical" margin="0.3em"/>
            <Marginer direction="vertical" margin="1em"/>
            <MutedLink href="#">
                Want to try again?{" "}
                <BoldLink href="#" onClick={switchToSignin}>
                    Sign Up
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}