import React, {useContext} from "react";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";
import {useState} from "react";
import Card from "../ui/Card";
import {styled} from "@mui/material/styles";

import classes from "./LoginForm.module.css";
import {BoldLink, BoxContainer, FormContainer, MutedLink, SubmitButton,} from "./common";
import {Typography} from "@mui/material";


export function LoginForm() {
    const {switchToSignup} = useContext(AccountContext);

    const [givenPassword, setPassword] = useState('')
    const [givenNickname, setNickname] = useState('')
    // const [givenEmail, setEmail] = useState('')

    const [spinner, setSpinner] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleLogin = (e) => {
        e.preventDefault();
        const userData = {
            givenPassword,
            givenNickname,
            // givenEmail
        };

        setSpinner(true);
        setLoginError(false);
        setSuccess(false);

        fetch('http://localhost:8081/loginForm', {
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
                    setSpinner(false);
                    setSuccess(true);
                    return setTimeout( () => window.location.replace("/userPage/" + JSON.stringify(data)), 1000)
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
                <form className={classes.form} onSubmit={handleLogin}>
                    <Card>
                        <div className={classes.control}>
                            <label htmlFor="nickname">Enter Your Nickname</label>
                            <input type="text" id="nickname" name="nickname" required
                                   onChange={event => setNickname(event.target.value)} autoComplete="username"/>
                        </div>
                        <div className={classes.ctrl}>
                            <label htmlFor="password">Enter Your password (8 characters minimum</label>
                            <input type="password" id="password" name="password" minLength="8" required
                                   onChange={event => setPassword(event.target.value)} autoComplete="new-password"/>
                        </div>
                    </Card>
                    <Typography className={classes.err}>{loginError? 'Login was not successful... please try again': null}</Typography>
                    <Typography className={classes.success}>{success? 'Welcome Back Again!': null}</Typography>
                    <Marginer direction="vertical" margin={45}/>
                    <SubmitButton type="submit" value="submit" style={{display: "flex", marginLeft: "1.9cm"}}>{spinner? 'loading...' : 'Log In!'}</SubmitButton>
                </form>
                <MutedLink href="#">Forget your password?</MutedLink>
                <Marginer direction="vertical" margin="0.3em"/>
                <Marginer direction="vertical" margin="1em"/>
                <MutedLink href="#">
                    Don't have an account?{" "}
                    <BoldLink href="#" onClick={switchToSignup}>
                        Sign Up
                    </BoldLink>
                </MutedLink>
            </BoxContainer>
        );
    }