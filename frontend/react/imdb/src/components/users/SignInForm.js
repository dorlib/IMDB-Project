import { Typography } from "@mui/material";
import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./SignInForm.module.css";

function SignInForm(props) {
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

        <div className={classes.actions}>
          <button>Sign In!</button>
        </div>

      </form>
    </Card>
  );
}

export default SignInForm;
