import CardContent from "@mui/material/CardContent";
import classes from "./changeProfile.module.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import Card from "../ui/Card";
import {Stack} from "@mui/material";
import {Marginer} from "../marginer";
import {Input, SubmitButton} from "./common";
import {gql, useMutation, useQuery} from "@apollo/client";

function ChangeProfile(props) {
    const [insert, setInsert] = useState(false);
    const [sure, setSure] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [sureClicked, setSureClicked] = useState(false);

    const [profileImage1, setProfileImage1] = useState('')
    const [profileImage2, setProfileImage2] = useState('')

    let EDIT_PROFILE = gql`
        mutation EditDirectorDetails ($userID: ID!, $profile: String!) {
            editDirectorDetails (userID: $userID, profile: $profile) {
                id
            }
        }
    `;

    const [edit] = useMutation(EDIT_PROFILE,
        {
            variables: {
                userID: props.userID,
                profile: profileImage1 || profileImage2 || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'
            },
            onCompleted: function (data, variant) {
                setSpinner(false)
                return setTimeout(() => window.location.replace("/userPage/" + JSON.stringify(props.userID)), 1000);
            },
            onError: function (error) {
                console.log("error:", error)
            }
        });

    function handleSubmit() {
        if (profileImage1 === "") {setProfileImage1(props.profile)}
        setSure(true)
    }

    const handleSure = () => {
        setSpinner(true)
        setSureClicked(true)
        edit()
    }

    let form = (
        <Card>
            <Typography variant="h5" align="center" color="yellow" marginTop="-2cm">
                change Profile Image
            </Typography>
            <form className={classes.form}>
                <div className={classes.im}>
                    <label htmlFor="image">Director's Image</label>
                    <input type="url" datatype="string" id="image" defaultValue={props.profile}
                           onChange={event => setProfileImage1(event.target.value)}/>
                </div>

                <Stack direction="row" alignItems="center" spacing={2} className={classes.but}>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            type="file"
                            id="contained-button-file"
                            defaultValue={props.profile}
                            onChange={event => setProfileImage2(event.target.value)}
                        />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                </Stack>

                <Marginer direction="vertical" margin={10}/>
                <SubmitButton type="button" onClick={sure ? handleSure : handleSubmit}
                              value="submit">{sure ? 'Are You Sure?' : spinner ? 'loading' : 'Update!'}</SubmitButton>
            </form>
        </Card>
    );
    return <>{form}{sureClicked ? edit : null}</>
}

export default ChangeProfile
