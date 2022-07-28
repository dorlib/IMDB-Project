import React, {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom';

import {gql, useMutation, useQuery} from "@apollo/client";
import {Input, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from "./directorPage.module.css"

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {Footer} from "./styles";

import UpdateDirectorInfo from "./update-directors-info";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import {motion, transform} from "framer-motion";

function DirectorPage(props) {
    const Arrow = styled(motion.div)`
        position: absolute;
        display: flex;
        right: -0.8cm;
        transform: rotate(180deg);
`;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const [descriptionGiven, setDescription] = useState()
    const [profileImageGiven, setProfileImage] = useState()
    const [profileImageGiven2, setProfileImage2] = useState()
    const [dayOfBirthGiven, setDay] = useState()
    const [monthOfBirthGiven, setMonth] = useState()
    const [yearOfBirthGiven, setYear] = useState()

    const [visible, setVisible] = useState(false)

    let desc = descriptionGiven
    let prof = profileImageGiven || profileImageGiven2
    let birthday = dayOfBirthGiven + "." + monthOfBirthGiven + "." + yearOfBirthGiven

    console.log(birthday)

    const [expanded, setExpanded] = useState(false);
    const [accordionHeight, setAccordionHeight] = useState(0);
    const ref = useRef("");
    let getHeight = ref.current?.scrollHeight || null;

    const open = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        setAccordionHeight(getHeight);
    }, [expanded]);

    const style = {
        transform: expanded ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }

    const DIRECTOR_DATA = gql`
        query DirectorById($id : ID!) {
            directorById(id: $id) {
                name
                profileImage
                description
                bornAt
                id
                movies{
                    id
                    title
                    rank
                    image
                }
                user {
                    id
                }
            }
        }
    `;

    const {loading, error, data} = useQuery(DIRECTOR_DATA,
        {
            variables: {
                id: lastSegment || 0
            }
        })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    console.log(data)

    // those variable store the current data - before change
    let name = data["directorById"]["0"]["name"]
    let profileImage = data["directorById"]["0"]["profileImage"] || 'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'
    let description = data["directorById"]["0"]["description"]
    let bornAt = data["directorById"]["0"]["bornAt"]

    if (bornAt.length !== 10 && bornAt[1] === ".") {
        bornAt = "0" + bornAt
    }

    if (bornAt.length !== 10 && bornAt[4] === ".") {
        bornAt = bornAt.slice(0,3) + "0" + bornAt.slice(3,9)
    }

    let yearBirth = bornAt.slice(6, 10)
    let monthBirth = bornAt.slice(3, 5)
    let dayBirth = bornAt.slice(0, 2)
    let id = data["directorById"]["0"]["id"]
    let userIdOfDirector = data["directorById"]["0"]["user"]["id"]

    const getAge = birthDate => Math.floor( (new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

    let d = (
        <div>
            <div>
                <CardMedia
                    component="img"
                    alt="movie image"
                    height="400"
                    style={{width: "12cm", bottom: "7.7cm"}}
                    src={profileImage}
                    className={classes.image}
                />
            </div>
            <Card sx={{width: 1000, height: 670, right: 100}}
                  style={{
                      backgroundColor: "#cc2062",
                      position: "relative",
                      right: "4.8cm",
                      marginBottom: "-1.5cm",
                      borderRadius: "15px"
                  }}
                  className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large", marginLeft: "13.5cm"}}
                           className={classes.director}>
                            {name}
                        </p>
                        <p style={{color: "black", fontSize: "x-large", marginLeft: "13.5cm"}}
                           className={classes.director}>
                            Date Of Birth : {bornAt}
                        </p>
                        <p style={{color: "black", fontSize: "x-large", marginLeft: "13.9cm"}}>
                            Age: {getAge(bornAt)}
                        </p>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "black", fontSize: "large", marginTop: "7.8cm"}}
                           className={classes.director}>
                            About {name} : {description}
                        </p>
                    </Typography>
                    { parseInt(userIdOfDirector) !== props.userID ? <Button size="large" className={classes.share}>Share</Button>: null}
                </CardContent>
            </Card>
        </div>
    )

    let edit = (
        <Card style={{
            marginBottom: "2cm",
            position: "relative",
            display: "flex",
            right: "4.8cm",
            top: "0.3cm",
            width: "26.45cm",
            borderRadius: "15px"
        }}>
            <Footer
                className={expanded ? "show" : ""}
                setHeight={accordionHeight}
                ref={ref}
            >
                <CardActions>
                    <Button size="large">Share</Button>
                    <span size="large" onClick={open}>
                        <Button>
                            Edit Director's Details!
                            <Arrow>
                                <KeyboardArrowUpIcon style={style}/>
                            </Arrow>
                        </Button>
                    </span>
                </CardActions>
                <div className="accordion" ref={ref} style={{marginTop: "0.5cm"}}>
                    <div className={classes.control} style={{color: "yellow", fontWeight: "bold", marginRight: "16cm"}}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            type="text"
                            datatype="String"
                            required
                            rows="5"
                            defaultValue={description} onChange={event => setDescription(event.target.value)}
                        ></textarea>
                    </div>

                    <div className={classes.control} style={{color: "yellow", fontWeight: "bold"}}>
                        <label htmlFor="profileImage">Profile Image</label>
                        <textarea
                            id="topic"
                            type="text"
                            datatype="String"
                            required
                            rows="1"
                            style={{width: "11.8cm", height: "0.7cm"}}
                            defaultValue={profileImage} onChange={event => setProfileImage(event.target.value)}
                        ></textarea>
                    </div>
                    <Stack direction="row" alignItems="center" spacing={2} className={classes.but}>
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="contained"
                                component="span"
                                style={{position: "relative", display: "flex", bottom: "0.1cm", right: "7.3cm"}}>
                                Upload
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    id="contained-button-file"
                                    value={profileImageGiven2}
                                    onChange={event => setProfileImage2(event.target.value)}
                                />
                            </Button>
                            <span id="upload-file-name">&ensp;  {profileImageGiven2}</span>
                        </label>
                    </Stack>
                    <div>
                        <label htmlFor="birthday" style={{
                            color: "yellow",
                            fontWeight: "bold",
                            position: "relative",
                            display: "flex",
                            bottom: "1cm"
                        }}>Enter Birthday</label>
                        <table className={classes.tr}>
                            <tbody>
                            <tr>
                                <td><input type="number" id="year" min="1920" max="2022" placeholder="Year"
                                           defaultValue={yearBirth}
                                           onChange={event => setYear(event.target.value)}
                                           style={{width: "2cm"}}/></td>
                                <td><input type="number" id="month" min="1" max="12" placeholder="Month"
                                           defaultValue={monthBirth}
                                           onChange={event => setMonth(event.target.value)}
                                           style={{width: "2cm"}}/></td>
                                <td><input type="number" id="day" min="1" max="31" placeholder="Day"
                                           defaultValue={dayBirth} onChange={event => setDay(event.target.value)}
                                           style={{width: "2cm"}}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.actions}>
                        <button onClick={() => setVisible(true)}>SUBMIT</button>
                        {visible ? <UpdateDirectorInfo prof={prof || profileImage} desc={desc || description} birthday={birthday || bornAt} id={lastSegment}
                                                       currentDesc={description} currentBornAt={bornAt}
                                                       currentProfile={profileImage}/> : console.log("none")}
                    </div>
                </div>
            </Footer>
        </Card>
    )

    let l = (
        <div className={classes.moviesTitle} style={{marginBottom: "1cm"}}>
            Movies Directed By {name}
        </div>
    )

    let loaded = data.directorById["0"]["movies"].map(({title, id, rank, image}) => (
        <div key={id}>
            <Card sx={{maxWidth: 600}} style={{backgroundColor: "#cc2062", marginBottom: "1cm", borderRadius: "15px"}}
                  key={id}>
                <CardMedia
                    component="img"
                    alt="movie image"
                    height="300"
                    src={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.director}>
                            {title} : {rank} / 100
                        </p>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">Share</Button>
                    <Link to={"/moviePage/" + id} style={{textDecoration: "none"}}><Button size="large">Go To
                        Movie's Page</Button></Link>
                </CardActions>
            </Card>
            <h3>&ensp;</h3>
        </div>
    ))
    return <>{d}{props.userID === parseInt(userIdOfDirector) ? edit: null}{l}{loaded}</>
}

export default DirectorPage;

