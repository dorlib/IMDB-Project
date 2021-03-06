import React, {useContext} from "react";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";
import {useState} from "react";
import Card from "../ui/Card";
import {styled} from "@mui/material/styles";

import classes from "./LoginForm.module.css";
import {BoldLink, BoxContainer, FormContainer, MutedLink, SubmitButton,} from "./common";
import {Link, Typography} from "@mui/material";
import styledComponentsBrowserEsm from "styled-components/dist/styled-components.browser.esm";


export function LoginForm() {
    const {switchToSignup} = useContext(AccountContext);
    const {switchToReset} = useContext(AccountContext);


    const [givenPassword, setPassword] = useState('')
    const [givenNickname, setNickname] = useState('')
    const [givenEmail, setEmail] = useState('')

    const [signWithEmail, setSignWithEmail] = useState(false)


    const [spinner, setSpinner] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userName, setUserName] = useState('')


    const handleLogin = (e) => {
        e.preventDefault();
        const userData = {
            givenPassword,
            givenNickname,
            givenEmail
        };

        setSpinner(true);
        setLoginError(false);
        setSuccess(false);

        fetch('http://localhost:8081/loginForm', {
            method: 'post',
            credentials: 'include',
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
                    console.log(data["Cookie"])
                    setUserName(data["FirstName"])
                    setSpinner(false);
                    setSuccess(true);
                    return setTimeout( () => window.location.replace("/"), 1000)
                } else {
                    console.log('login not successful')
                    setSpinner(false);
                    setLoginError(true)
                    return setTimeout(() => setLoginError(false),2000);
                }
            })
    }

        const Input = styled("input")({
            display: "none",
        });

    const handleEmail = () => {
        setSignWithEmail(true)
    }

    const handleNickname = () => {
        setSignWithEmail(false)
    }

        let withNickname =  (
            <BoxContainer>
                <form className={classes.form} onSubmit={handleLogin}>
                    <Card>
                        <div className={classes.control}>
                            <label htmlFor="nickname">Enter Your Nickname</label>
                            <Typography className={classes.OR} style={{fontWeight: "bolder"}}>OR click&ensp;<Link className={classes.here} onClick={handleEmail}>Here</Link>&ensp;to sigh in with email</Typography>
                            <input type="text" id="nickname" name="nickname" required placeholder="enter nickname here"
                                   onChange={event => setNickname(event.target.value)} autoComplete="username"/>
                        </div>
                        <div className={classes.control}>
                            <label htmlFor="password">Enter Your password (8 characters minimum)</label>
                            <input type="password" id="password" name="password" minLength="8" required placeholder="password"
                                   onChange={event => setPassword(event.target.value)} autoComplete="new-password"/>
                        </div>
                    </Card>
                    <Typography className={classes.err}>{loginError? 'Login was not successful... please try again': null}</Typography>
                    <Typography className={classes.success}>{success? 'Its Nice Seeing You Again '+ userName + ' !': null}</Typography>
                    <Marginer direction="vertical" margin={45}/>
                    <SubmitButton type="submit" value="submit" style={{display: "flex", marginLeft: "1.9cm"}}>{spinner? 'loading...' : 'Log In!'}</SubmitButton>
                </form>
                <MutedLink href="#">Forget your password?
                    <BoldLink href="#" onClick={switchToReset}>
                        click here to reset
                    </BoldLink>
                </MutedLink>
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

    let withEmail =  (
        <BoxContainer>
            <form className={classes.form} onSubmit={handleLogin}>
                <Card>
                    <div className={classes.control}>
                        <label htmlFor="email">Enter Your Nickname</label>
                        <Typography className={classes.OR} style={{fontWeight: "bolder"}}>OR click&ensp;<Link onClick={handleNickname}>Here</Link>&ensp;to sigh in with nickname</Typography>
                        <input type="email" id="email" name="email" required placeholder="enter email here"
                               onChange={event => setEmail(event.target.value)} autoComplete="username"/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="password">Enter Your password (8 characters minimum)</label>
                        <input type="password" id="password" name="password" minLength="8" required placeholder="password"
                               onChange={event => setPassword(event.target.value)} autoComplete="new-password"/>
                    </div>
                </Card>
                <Typography className={classes.err}>{loginError? 'Login was not successful... please try again': null}</Typography>
                <Typography className={classes.success}>{success? 'Its Nice Seeing You Again '+ userName + ' !': null}</Typography>
                <Marginer direction="vertical" margin={45}/>
                <SubmitButton type="submit" value="submit" style={{display: "flex", marginLeft: "1.9cm"}}>{spinner? 'loading...' : 'Log In!'}</SubmitButton>
            </form>
            <MutedLink href="#">Forget your password?
                <BoldLink href="#" onClick={switchToReset}>
                    click here to reset
                </BoldLink>
            </MutedLink>
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

        if (signWithEmail) {
            return withEmail
        } else {
            return withNickname
        }
    }