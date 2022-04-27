import { useRef } from "react";

import Card from "../ui/Card";
import {styled} from "@mui/material/styles";
import classes from "./NewUserForm.module.css";
import {Input, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {gql, useMutation, useQuery} from "@apollo/client";

function NewUserForm() {

  let NEW_USER = gql`
         mutation CreateUser ($firstname: String!, $lastname: String!, $nickname: String!, $description: String!, $password: String!, $profile: String!, $email: String!, $birthday: String! ) {
           createUser(user: {firstname: $firstname , lastname: $lastname, nickname: $nickname , description: $description, password: $password, profile: $profile, email: $email, birthday: $birthday}) {
             id
           }
         }
  `
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const nickNameInputRef = useRef();
  const emailInputRef = useRef();
  const dayOfBirthInputRef = useRef();
  const monthOfBirthInputRef = useRef();
  const yearOfBirthInputRef = useRef();
  const passwordInputRef = useRef();
  const descriptionInputRef = useRef();
  const imageInputRef = useRef();

  let birthday = JSON.stringify(dayOfBirthInputRef) + "." + JSON.stringify(monthOfBirthInputRef) + "." + JSON.stringify(yearOfBirthInputRef)
  console.log(birthday)

    const [addUser] = useMutation(NEW_USER,
      {
        variables: {
          firstname: firstNameInputRef.current?.value || 'Unknown',
          lastname: lastNameInputRef.current?.value || 'Unknown',
          nickname: nickNameInputRef.current?.value || 'No nickname',
          email: emailInputRef.current?.value || 'Doesnt Have Email',
          birthday: birthday.current?.value || 'No birthday given',
          password: passwordInputRef.current?.value || 'No password',
          description: descriptionInputRef.current?.value || 'No description given',
          profile: imageInputRef.current?.value || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif',
        },
        onCompleted: function (data) {
          console.log("data:", data)
          const uniqe = data["createUser"]["id"]
          return window.location.replace("/userPage/" + uniqe)
        },
        onError: function (error) {
          console.log("error:",error)
        }
      });


  return (
    <Card>
      <Typography variant="h6" align="center" color="yellow">
        Hello Dear Future User! Thank You For Signing In To My WebSite!
      </Typography>
      <form className={classes.form} >

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
          <label htmlFor="email">Enter Your E-Mail</label>
          <input type="text" required id="email" ref={emailInputRef} autoComplete="on"/>
        </div>

        <div className={classes.im}>
          <label htmlFor="image">Movie Image</label>
          <input datatype="string" type="url" id="image" ref={imageInputRef}/>
        </div>

        <Stack direction="row" alignItems="center" spacing={2} className={classes.but}>
          <label htmlFor="contained-button-file">

            <Button variant="contained" component="span">
              Upload
              <Input
                  accept="image/*"
                  type="file"
                  id="contained-button-file"
                  ref={imageInputRef}
              />
            </Button>
          </label>
        </Stack>
        
        <div>
        <table className={classes.tr}>
            <tr>
            <label htmlFor="birthday">Enter Your Birthday</label>
            <td><input type="number" id="year" min="1920" max="2022" placeholder="Year" required ref={yearOfBirthInputRef} style={{width:"2cm"}}/></td>
            <td><input type="number" id="month" min="1" max="12" placeholder="Month" required ref={monthOfBirthInputRef} style={{width:"2cm"}}/></td>
            <td><input type="number" id="day" min="1" max="31" placeholder="Day" required ref={dayOfBirthInputRef} style={{width:"2cm"}}/></td>
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
          <input type="password" id="password" name="password" minLength="8" required ref={passwordInputRef} autoComplete= "current-password"/>
        </div>

        <div className={classes.actions}>
          <button onClick={addUser}>Create A User!</button>
        </div>

      </form>
    </Card>
  );
}

export default NewUserForm;


