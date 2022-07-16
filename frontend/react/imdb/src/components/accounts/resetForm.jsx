import React, {useContext, useState} from "react";
import {BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton,} from "./common";
import {Marginer} from "../marginer";

import {Typography} from "@mui/material";
import {Button, Stack} from "@mui/material";
import Card from "../ui/Card";
import classes from "./resetForm.module.css";
import {styled} from "@mui/material/styles";


function ResetForm(props) {
    const [spinner, setSpinner] = useState(false);
    const [givenPassword, setPassword] = useState('')
    const [givenPasswordConfirm, setPasswordConfirm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            givenPassword,
            givenPasswordConfirm
        };

        setSpinner(true);

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
                setSpinner(false);
                console.log('password updated')
                window.location.replace("/register-sign-in/")
            })
    }

    const Input = styled("input")({
        display: "none",
    });

    return (
        <BoxContainer>
            <Card>
                <Typography variant="h6" align="center" color="yellow">
                    Reset Your Password!
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>

                    <div className={classes.ctrl}>
                        <label htmlFor="password" >Choose Your New Password (8 characters minimum)</label>
                        <input type="password" id="password" name="password" minLength="8" value={givenPassword}
                               onChange={event => setPassword(event.target.value)}
                               autoComplete="new-password"/>
                    </div>

                    <div className={classes.ctrl}>
                        <label htmlFor="passwordConfirm">Confirm your New Password </label>
                        <input type="password" id="passwordConfirm" name="passwordConfirm" minLength="8" value={givenPasswordConfirm}
                               onChange={event => setPasswordConfirm(event.target.value)}
                               autoComplete="new-password"/>
                    </div>

                    <Marginer direction="vertical" margin={10}/>
                    <SubmitButton type="submit" value="submit" disabled={givenPassword !== givenPasswordConfirm}>{spinner? 'loading...' : 'Reset!'}</SubmitButton>
                </form>
            </Card>
            <Marginer direction="vertical" margin="0.3em"/>
            <Marginer direction="vertical" margin="1em"/>
        </BoxContainer>
    );
}

export default ResetForm
