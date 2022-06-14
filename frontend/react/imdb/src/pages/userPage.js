import React, {useEffect} from 'react'
import {gql, useQuery} from "@apollo/client";
import Card from "../components/ui/Card";
import {Link} from "react-router-dom";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {colors} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


import classes from "./userPage.module.css"
import styled from "styled-components";


function UserPage() {
    const USER_DATA = gql`
        query UserByID($id : ID!) {
            userById(id: $id) {
                id
                firstname
                lastname
                nickname
                description
                email
                birthday
                profile
                country
            }
        }
    `;


    const Details = styled.div`
        color: white;
        position: absolute;
        display: flex;
        right: 27.3cm;
        margin-top: 0.65cm;
    `;

    let TextBox = styled.text` 
        position: absolute;
        display: none;
        margin-top: 1cm;
        right: 21.9cm;
        background: #fff;
        font-size: small;
        ${Details}:hover & {
            display: flex;
            left: 1cm;
            top: -0.5cm;
            width: 4.5cm;
            color: black;
        }    
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const {loading, error, data} = useQuery(USER_DATA,
        {
            variables: {
                id: lastSegment || 0
            }

        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let firstName = data["userById"]["0"]["firstname"]
    let lastName = data["userById"]["0"]["lastname"]
    let nickName = data["userById"]["0"]["nickname"]
    let Description = data["userById"]["0"]["description"]
    let Email = data["userById"]["0"]["email"]
    let Birthday = data["userById"]["0"]["birthday"]
    let Country = data["userById"]["0"]["country"]
    let Profile = data["userById"]["0"]["profile"] || "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"

    const bull = (
        <Box
            component="span"
            sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
        >
            •
        </Box>
    );

    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)


    let loaded = (
        <Card>
            <div>
                <p className={classes.name}>
                    {firstName} {lastName}
                </p>
                <p className={classes.nick}>
                    {nickName}
                </p>
            </div>
            <div className={classes.image}>
                <img src={Profile}/>
            </div>
            <Stack direction="row" spacing={1} className={classes.changeProfile}>
                <IconButton color="primary" aria-label="change image" style={{color: "yellow"}}>
                    <SettingsSuggestIcon style={{fontSize: "xx-large"}}/>
                </IconButton>
            </Stack>

            <div>
                <PeopleAltIcon className={classes.followIcon}/>
                <Typography className={classes.follows}>Following</Typography>
                <FiberManualRecordIcon className={classes.dot}/>
                <Typography className={classes.followers}>Followers</Typography>
            </div>
            <div>
                <LocationOnIcon className={classes.location}/>
                <Typography className={classes.country}>{Country}</Typography>

            </div>
            <Stack direction="row" spacing={2} className={classes.edit}>
                <Button variant="edit" className={classes.editBut}>Edit Profile</Button>
            </Stack>
            <React.Fragment>
                <CardContent style={{backgroundColor: "darkslategray"}} className={classes.mainCard}>
                    <IconButton color="primary" aria-label="update details" className={classes.editDetails}>
                        <EditIcon className={classes.editDetailsBut}/>
                        <Details>
                            <TextBox>
                                <text>Click To Update Your Details</text>
                            </TextBox>
                        </Details>
                    </IconButton>
                    <Typography variant="h5" component="div">
                        Hi, i'm {firstName}
                    </Typography>
                    <div>
                        <h4 className={classes.desc}>
                            If I Had To Describe Myself I Would Say : {Description}
                        </h4>
                        <h4 className={classes.fav}>
                            My Favorite Movies Are : ...
                        </h4>
                    </div>
                    <div>
                        <h4 className={classes.birth}>
                            I Was Born In {Birthday} So Im {getAge(Birthday)} Years Old
                        </h4>
                    </div>
                    <h4 className={classes.contact}>
                        Wants To Contact {firstName} ? {Email}
                    </h4>
                </CardContent>
                <CardActions>
                </CardActions>
            </React.Fragment>
            <React.Fragment>
                <CardContent style={{backgroundColor: "darkslategray"}} className={classes.pined}>
                    <Typography variant="h5" component="div">
                        Pined Movies Of {firstName}
                    </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
            </React.Fragment>
            <React.Fragment>
                <CardContent style={{backgroundColor: "darkslategray"}} className={classes.contrib}>
                    <Typography variant="h5" component="div">
                        Contributes Of {firstName}
                    </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
            </React.Fragment>
        </Card>
    )
    return loaded
}

export default UserPage