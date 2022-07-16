import React, {useContext} from "react";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";
import {useState} from "react";
import Card from "../ui/Card";
import {styled} from "@mui/material/styles";

import classes from "./forgotForm.module.css"
import {BoldLink, BoxContainer, FormContainer, MutedLink, SubmitButton,} from "./common";
import {Typography} from "@mui/material";
import styledComponentsBrowserEsm from "styled-components/dist/styled-components.browser.esm";


export function ForgotForm() {
    const {switchToSignin} = useContext(AccountContext);

    const [givenEmail, setEmail] = useState('')
    const [spinner, setSpinner] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleForgot = async (e) => {
        e.preventDefault();

        const userData = {
            givenEmail
        };

        setSpinner(true);
        setLoginError(false);
        setSuccess(false);

        await fetch('http://localhost:8081/forgot', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(givenEmail)
        })
            .catch((err) => {
                console.error('error:', err)
            })
            .then((data) => {
                if (data) {
                    console.log('submit successfully')
                    setSpinner(false);
                    setSuccess(true);
                } else {
                    console.log('submit not successful')
                    setSpinner(false);
                    setLoginError(true)
                }
            })
    }

    const Input = styled("input")({
        display: "none",
    });

    return (
        <BoxContainer>
            <form className={classes.form} onSubmit={handleForgot}>
                <Card>
                    <div className={classes.email}>
                        <label htmlFor="email" className={classes.enterMail}>Enter Your Email</label>
                        <input type="text" id="email" name="email" required
                               onChange={event => setEmail(event.target.value)} autoComplete="email"/>
                    </div>
                </Card>
                <Typography className={classes.err}>{loginError? 'submit was not successful... please try again': null}</Typography>
                <h4 className={classes.err}>{success? 'Email sent, check Your Email': null}</h4>
                <Marginer direction="vertical" margin={45}/>
                <SubmitButton type="submit" value="submit" style={{display: "flex", marginLeft: "1.9cm", marginRight: "1.9cm", marginTop: "0.3cm"}}>{spinner? 'loading...' : 'Submit!'}</SubmitButton>
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
                    Log In
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}