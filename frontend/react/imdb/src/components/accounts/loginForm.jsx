import React, {useContext} from "react";
import {BoldLink, BoxContainer, FormContainer, MutedLink, SubmitButton,} from "./common";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";
import {useState} from "react";
import Card from "../ui/Card";
import {styled} from "@mui/material/styles";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";

import classes from "./loginForm.module.css";

export function LoginForm() {
    const {switchToSignup} = useContext(AccountContext);
    const LOGIN_USER = gql`
        query LoginUser ($nickname: String!, $password: String!, $email: String!) {
            loginUser(nickname: $nickname, password: $password, email: $email) {
                id
                firstname
            }
        }
    `;

    const [givenPassword, setPassword] = useState('')
    const [givenNickname, setNickname] = useState('')
    const [givenEmail, setEmail] = useState('')
    const Input = styled("input")({
        display: "none",
    });

    const [loginUser, {loading, error}] = useLazyQuery(LOGIN_USER,
        {
            variables: {
                nickname: givenNickname,
                password: givenPassword,
                email: givenEmail,
            }, onCompleted: function (data) {
                if (data && data["loginUser"]) {
                    return (
                        console.log(data),
                            <p>Welcome Back {data["loginUser"]["0"]["firstname"]}</p>,
                            window.location.replace("/userPage/" + data["loginUser"]["0"]["id"])
                    )
                } else {
                    return (
                        console.log(data),
                            console.log("login failed"),
                            window.location.reload()
                    )
                }
            },
        });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Login Failed.. Please Try Again</p>;

    return (
        <BoxContainer>
            <form className={classes.form} action="loginForm.jsx" method="POST">
                <Card>
                    <div className={classes.control}>
                        <label htmlFor="nickName">Enter Your Nickname</label>
                        <input type="text" id="nickname" name="nickname" required
                               onChange={event => setNickname(event.target.value)} autoComplete="username"/>
                    </div>
                    <div className={classes.ctrl}>
                        <label htmlFor="password">Enter Your password (8 characters minimum</label>
                        <input type="password" id="password" name="password" minLength="8" required
                               onChange={event => setPassword(event.target.value)} autoComplete="new-password"/>
                    </div>
                </Card>
            </form>
            <SubmitButton type="submit" /*onClick={loginUser}*/>Log In!</SubmitButton>
            <Marginer direction="vertical" margin={10}/>
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