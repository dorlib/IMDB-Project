import React, { useContext } from "react";
import {BoldLink, BoxContainer, FormContainer, MutedLink, SubmitButton,} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

import {useState} from "react";

import Card from "../ui/Card";
import {styled} from "@mui/material/styles";
import classes from "./LoginForm.module.css";
import {Input, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {gql, useMutation} from "@apollo/client";

export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);

    const SIGN_IN_USER = gql`
        mutation LoginUser ($nickname: String!, $password: String!, $email: String!) {
            loginUser(nickname: $nickname, password: $password, email: $email) {
                id
            }
        }
    `;

    const [givenPassword, setPassword] = useState('')
    const [givenNickname, setNickname] = useState('')

    const Input = styled("input")({
        display: "none",
    });

    const [loginUser] = useMutation(SIGN_IN_USER,
        {
            variables: {
                nickname: givenNickname,
                password: givenPassword,

            },
            onCompleted: function (data) {
                if (data === null) {
                    return <div>Login Failed.. Please Try Again</div>
                } else {
                    return window.location.replace("/userPage/" + data["createUser"]["id"])
                }
            },
            onError: function (error) {
                console.log("error:", error)
            },
        });


  return (
    <BoxContainer>
      <FormContainer>
          <Card>
              <form className={classes.form} onSubmit={loginUser}>

                  <div className={classes.control}>
                      <label htmlFor="nickName">Enter Your Nickname</label>
                      <input type="text" required id="nickName" onChange={event => setNickname(event.target.value)}/>
                  </div>

                  <div className={classes.ctrl}>
                      <label htmlFor="password">Enter Your password (8 characters minimum</label>
                      <input type="password" id="password" name="password" minLength="8" required onChange={event => setPassword(event.target.value)}/>
                  </div>
              </form>
          </Card>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" >Log In!</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign Up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

export default LoginForm
