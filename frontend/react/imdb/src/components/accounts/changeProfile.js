import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {useEffect, useRef, useState} from "react";
import Card from "../ui/Card";
import {Stack} from "@mui/material";
import {Marginer} from "../marginer";
import {Input, SubmitButton} from "./change";
import {gql, useMutation, useQuery} from "@apollo/client";
import classes from "./changeProfile.module.css";


function ChangeProfile(props) {
    const [sure, setSure] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [sureClicked, setSureClicked] = useState(false);
    const [profileError, setProfileError] = useState(false);

    const [profileImage1, setProfileImage1] = useState(props.profile || '')
    const [profileImage2, setProfileImage2] = useState('')

    let EDIT_PROFILE = gql`
        mutation ChangeUserProfile ($userID: ID!, $profile: String!) {
            changeUserProfile (userID: $userID, profile: $profile) {
                id
            }
        }
    `;

    let noPic = 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'

    const [edit] = useMutation(EDIT_PROFILE,
        {
            variables: {
                userID: props.userID,
                profile: profileImage1 || profileImage2 || noPic
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
        if (profileImage1 === "") {
            setProfileImage1(props.profile)
        }
        if (profileImage1 !== "" && profileImage2 !== "") {
            setProfileError(true)
        } else {
            setSure(true)
        }
    }

    const handleSure = () => {
        setSpinner(true)
        setSureClicked(true)
        edit()
    }

    let form = (
        <Card>
            <CardContent className={classes.card}>
                <Typography variant="h5" align="center" color="yellow" marginTop="2cm" className={classes.title}>
                    change Profile Image
                </Typography>
                {profileError && (profileImage1 !== "" && profileImage2 !== "")? <span className={classes.error}>choose file image OR url image</span> : null }
                <form className={classes.form}>
                    <div className={classes.im}>
                        <input type="url" datatype="string" id="image" defaultValue={props.profile}
                               onChange={event => setProfileImage1(event.target.value)}/>
                    </div>

                    <Stack direction="row" alignItems="center" spacing={2} className={classes.but}>
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    id="contained-button-file"
                                    value={profileImage2}
                                    onChange={event => setProfileImage2(event.target.value)}
                                />
                            </Button>
                            <Typography className={classes.profile2}>{profileImage2}</Typography>
                        </label>
                    </Stack>
                    <Marginer direction="vertical" margin={10}/>
                </form>
                    <div>
                        <img className={classes.image} src={profileImage1 || noPic} alt={"none"}/>
                        {profileImage2 && profileImage1 === '' ? <img className={classes.image} src={profileImage2 || noPic} alt={"none"}/> : null}
                    </div>
                <SubmitButton type="button" onClick={sure ? handleSure : handleSubmit} value="submit">{sure ? 'Are You Sure?' : spinner ? 'loading...' : 'Update!'}</SubmitButton>
            </CardContent>
        </Card>
    );
    return <>{form}{sureClicked ? edit : null}</>
}

export default ChangeProfile
