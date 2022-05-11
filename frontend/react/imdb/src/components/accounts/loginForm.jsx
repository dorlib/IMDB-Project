import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

import {useRef, useState} from "react";

import Card from "../ui/Card";
import {styled} from "@mui/material/styles";
import classes from "./LoginForm.module.css";
import {Input, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {gql, useMutation} from "@apollo/client";

export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);

    const nickNameInputRef = useRef();
    const passwordInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredNickName = nickNameInputRef.current.valueOf()
        const enteredPassword = passwordInputRef.current.valueOf();

        const signInData = {
            nickName: enteredNickName,
            password: enteredPassword,
        };

        props.onSignIn(signInData);
    }


  return (
    <BoxContainer>
      <FormContainer>
          <Card>
              <form className={classes.form} onSubmit={submitHandler}>

                  <div className={classes.control}>
                      <label htmlFor="nickName">Enter Your Nickname</label>
                      <input type="text" required id="nickName" ref={nickNameInputRef} />
                  </div>

                  <div className={classes.ctrl}>
                      <label htmlFor="password">Enter Your password (8 characters minimum</label>
                      <input type="password" id="password" name="password" minLength="8" required ref={passwordInputRef} />
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
