import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {useEffect, useRef, useState} from "react";
import Card from "../ui/Card";
import {Stack} from "@mui/material";
import {Marginer} from "../marginer";
import {Input, SubmitButton} from "./add";
import {gql, useMutation, useQuery} from "@apollo/client";
import classes from "./add-actor.module.css";


function AddActor(props) {
    const [sure, setSure] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [sureClicked, setSureClicked] = useState(false);
    const [imageError, setImageError] = useState(false);

    const [image1, setImage1] = useState(props.profile || '')
    const [image2, setImage2] = useState('')
    const [givenName, setGivenName] = useState('')

    let ADD_ACTOR = gql`
        mutation ChangeUserProfile ($movieID: ID!, $image: String!, $name: String!) {
            changeUserProfile (movieID: $movieID, image: $image, name: $name) {
                id
            }
        }
    `;

    let noPic = 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'

    const [add] = useMutation(ADD_ACTOR,
        {
            variables: {
                movieID: props.movieID,
                profile: image1 || image2 || noPic,
                name: givenName
            },
            onCompleted: function (data, variant) {
                setSpinner(false)
                return setTimeout(() => window.location.reload(), 500);
            },
            onError: function (error) {
                console.log("error:", error)
            }
        });

    function handleSubmit() {
        if (image1 === "") {
            setImage1(props.profile)
        }
        if (image1 !== "" && image2 !== "") {
            setImageError(true)
        } else {
            setSure(true)
        }
    }

    const handleSure = () => {
        setSpinner(true)
        setSureClicked(true)
        add()
    }

    let form = (
        <Card>
            <CardContent className={classes.card}>
                <Typography variant="h5" align="center" color="yellow" marginTop="2cm" className={classes.title}>
                    change Profile Image
                </Typography>
                {imageError && (image1 !== "" && image2 !== "")? <span className={classes.error}>choose file image OR url image</span> : null }
                <form className={classes.form}>

                    <div className={classes.name}>
                        <label htmlFor="title">Actor's Name</label>
                        <input type="text" datatype="String" required id="title" value={givenName}
                               onChange={event => setGivenName(event.target.value)}/>
                    </div>

                    <label htmlFor="title" className={classes.imageLabel}>Actor's Image</label>
                    <div className={classes.im}>
                        <input type="url" datatype="string" id="image" defaultValue={props.profile}
                               onChange={event => setImage1(event.target.value)}/>
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
                                    value={image2}
                                    onChange={event => setImage2(event.target.value)}
                                />
                            </Button>
                            <Typography className={classes.profile2}>{image2}</Typography>
                        </label>
                    </Stack>
                    <Marginer direction="vertical" margin={10}/>
                </form>
                <div>
                    <img className={classes.image} src={image1 || noPic} alt={"none"}/>
                    {image2 && image1 === '' ? <img className={classes.image} src={image2 || noPic} alt={"none"}/> : null}
                </div>
                <SubmitButton type="button" onClick={sure ? handleSure : handleSubmit} value="submit">{sure ? 'Are You Sure?' : spinner ? 'loading...' : 'Add Actor!'}</SubmitButton>
            </CardContent>
        </Card>
    );
    return <>{form}{sureClicked ? add : null}</>
}

export default AddActor