import React from 'react'
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

import classes from "./userPage.module.css"


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
            <div>
                <p style={{color: "yellow", fontSize: "x-large"}} className={classes.birth}>
                    Born At : {Birthday}
                </p>
            </div>
            <div className={classes.image}>
                <img src={Profile}/>
            </div>
            <div>
                <h4 className={classes.desc} style={{color: "yellow"}}>
                    Movie description : {Description}
                </h4>
                <h4 style={{color: "yellow"}} className={classes.connect}>
                    Wants To Contact {firstName} ? {Email}
                </h4>
            </div>

            <div>
                <PeopleAltIcon className={classes.followIcon}/>
                <Typography className={classes.follows}>Followers</Typography>
                <FiberManualRecordIcon className={classes.dot}/>
                <Typography className={classes.followers}>Followers</Typography>
            </div>
            <div>
                <LocationOnIcon className={classes.location} />
                <Typography className={classes.country}>{Country}</Typography>

            </div>
            <Stack direction="row" spacing={2} className={classes.edit} >
                <Button variant="edit" className={classes.editBut} >Edit Profile</Button>
            </Stack>
        </Card>
    )
    return loaded
}

export default UserPage