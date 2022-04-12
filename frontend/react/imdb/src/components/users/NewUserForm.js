import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewUserForm.module.css";

function NewUserForm(props) {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const nickNameInputRef = useRef();
  const emailInputRef = useRef();
  const dayOfBirthInputRef = useRef();
  const monthOfBirthInputRef = useRef();
  const yearOfBirthInputRef = useRef();
  const passwordInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredNickName = nickNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredYearOfBirth = yearOfBirthInputRef.current.value;
    const enteredMonthOfBirth = monthOfBirthInputRef.current.value;
    const enteredDayOfBirth = dayOfBirthInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const userData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      nickName: enteredNickName,
      email: enteredEmail,
      dayOfBirth: enteredDayOfBirth,
      monthOfBirth: enteredMonthOfBirth,
      yearOfBirth: enteredYearOfBirth,
      password: enteredPassword,
      description: enteredDescription,
    };

    props.onAddUser(userData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>

        <div className={classes.control}>
          <label htmlFor="firstName">Enter Your First Name</label>
          <input type="text" required id="firstName" ref={firstNameInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="lastName">Enter Your Last Name</label>
          <input type="text" id="lastName" ref={lastNameInputRef} required/>
        </div>

        <div className={classes.control}>
          <label htmlFor="nickName">Choose Your Own Uniqe Nickname!</label>
          <input type="text" required id="nickName" ref={nickNameInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="email">Enter Your Mail</label>
          <input type="text" required id="email" ref={emailInputRef} />
        </div>
        
        <div>
        <table className={classes.tr}>
            <tr>
            <label htmlFor="birthday">Enter Your Birthday</label>
            <td><input type="number" id="year" min="1920" max="2022" placeholder="Year" required ref={yearOfBirthInputRef}/></td>
            <td><input type="number" id="month" min="1" max="12" placeholder="Month" required ref={monthOfBirthInputRef}/></td>
            <td><input type="number" id="day" min="1" max="31" placeholder="Day" required ref={dayOfBirthInputRef}/></td>
            </tr>
        </table>
        </div>

        <div className={classes.control}>
          <label htmlFor="description">Here you Can Write A Short Description About Yourself</label>
          <textarea
            id="description"
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>

        <div className={classes.ctrl}>
          <label htmlFor="password">Choose Your password (8 characters minimum</label>
          <input type="password" id="password" name="password" minlength="8" required ref={passwordInputRef} />
        </div>

        <div className={classes.actions}>
          <button>Create A User!</button>
        </div>

      </form>
    </Card>
  );
}

export default NewUserForm;
