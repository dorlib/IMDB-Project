import React, {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import classes from "./last5Added.module.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function MostLikedReviews() {
    const MOST_LIKED_REVIEWS = gql`
        query MostLikedReviews{
            mostLikedReviews {
                id
                topic
                text
                rank
                numOfLikes
                numOfComments
                movie {
                    id
                    title
                }
            }
        }
    `;

    const [numOfSet, setNumOfSet] = useState(0)

    function handleClickForward() {
        if (numOfSet >= 0 && numOfSet < numOfReviews - 1) {
            setNumOfSet(numOfSet + 1)
        }
    }

    function handleClickBackward() {
        if (numOfSet > 0 && numOfSet <= numOfReviews - 1) {
            setNumOfSet(numOfSet - 1)
        }
    }

    const {loading, error, data} = useQuery(MOST_LIKED_REVIEWS)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    let review1 = (
        <div>
            <Card sx={{maxWidth: 600}} style={{
                backgroundColor: "#cc2062",
                marginRight: "-35.6rem",
                marginLeft: "35.6rem",
                marginTop: "-31rem",
                borderRadius: "100px"
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {data.mostLikedReviews["0"]["topic"]} : {data.mostLikedReviews["0"]["rank"]} / 100
                        </p>
                    </Typography>
                    {{data.mostLikedReviews["0"]["rank"]} !== null ? <span>{data.mostLikedReviews["0"]["rank"]} / 100}</span>: null}
                    {{data.mostLikedReviews["0"]["topic"]} !== "" ? <span>data.mostLikedReviews["0"]["topic"]}</span> : null}
                    <Typography>
                    </Typography>
                    {data.mostLikedReviews["0"]["text"] !== "" ? <Typography>
                        {data.mostLikedReviews["0"]["text"]}
                    </Typography> : null}
                    <div>{numOfSet + 1 / 5}</div>
                </CardContent>
            </Card>
        </div>
    )
    let card2 = (
        <div>
            <Card sx={{maxWidth: 600}} style={{
                backgroundColor: "#cc2062",
                marginRight: "-35.6rem",
                marginLeft: "35.6rem",
                marginTop: "-31rem",
                borderRadius: "100px"
            }}>
                <CardMedia component="img" alt="movie image" height="300" src={data.last5Added["1"]["image"]}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {data.last5Added["1"]["title"]} : {data.last5Added["1"]["rank"]} / 100
                        </p>
                        <Typography className={classes.genre}>Genre : {data.last5Added["1"]["genre"]}</Typography>
                    </Typography>
                    <div  style={{textAlign: "center" , marginTop: "0.2cm"}} >
                        <span className={classes.emptyDot}></span>
                        <span className={classes.fullDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                    </div>
                </CardContent>
                <CardActions className={classes.buttons}>
                    <Button size="large">Share</Button>
                    <Link to={"/moviePage/" + data.last5Added["1"]["id"]} style={{textDecoration: "none"}}><Button
                        size="large">Go To Movie's Page</Button></Link>
                </CardActions>
            </Card>
        </div>
    )
    let card3 = (
        <div>
            <Card sx={{maxWidth: 600}} style={{
                backgroundColor: "#cc2062",
                marginRight: "-35.6rem",
                marginLeft: "35.6rem",
                marginTop: "-31rem",
                borderRadius: "100px"
            }}>
                <CardMedia component="img" alt="movie image" height="300" src={data.last5Added["2"]["image"]}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {data.last5Added["2"]["title"]} : {data.last5Added["2"]["rank"]} / 100
                        </p>
                        <Typography className={classes.genre}>Genre : {data.last5Added["2"]["genre"]}</Typography>
                    </Typography>
                    <div  style={{textAlign: "center" , marginTop: "0.2cm"}} >
                        <span className={classes.emptyDot}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.fullDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                    </div>
                </CardContent>
                <CardActions className={classes.buttons}>
                    <Button size="large">Share</Button>
                    <Link to={"/moviePage/" + data.last5Added["2"]["id"]} style={{textDecoration: "none"}}><Button
                        size="large">Go To Movie's Page</Button></Link>
                </CardActions>
            </Card>
        </div>
    )
    let card4 = (
        <div>
            <Card sx={{maxWidth: 600}} style={{
                backgroundColor: "#cc2062",
                marginRight: "-35.6rem",
                marginLeft: "35.6rem",
                marginTop: "-31rem",
                borderRadius: "100px"
            }}>
                <CardMedia component="img" alt="movie image" height="300" src={data.last5Added["3"]["image"]}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {data.last5Added["3"]["title"]} : {data.last5Added["3"]["rank"]} / 100
                        </p>
                        <Typography className={classes.genre}>Genre : {data.last5Added["3"]["genre"]}</Typography>
                    </Typography>
                    <div  style={{textAlign: "center" , marginTop: "0.2cm"}} >
                        <span className={classes.emptyDot}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.fullDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                    </div>
                </CardContent>
                <CardActions className={classes.buttons}>
                    <Button size="large">Share</Button>
                    <Link to={"/moviePage/" + data.last5Added["3"]["id"]} style={{textDecoration: "none"}}><Button
                        size="large">Go To Movie's Page</Button></Link>
                </CardActions>
            </Card>
        </div>
    )
    let card5 = (
        <div>
            <Card sx={{maxWidth: 600}} style={{
                backgroundColor: "#cc2062",
                marginRight: "-35.6rem",
                marginLeft: "35.6rem",
                marginTop: "-31rem",
                borderRadius: "100px"
            }}>
                <CardMedia component="img" alt="movie image" height="300" src={data.last5Added["4"]["image"]}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {data.last5Added["4"]["title"]} : {data.last5Added["4"]["rank"]} / 100
                        </p>
                        <Typography className={classes.genre}>Genre : {data.last5Added["4"]["genre"]}</Typography>
                    </Typography>
                    <div  style={{textAlign: "center" , marginTop: "0.2cm" }} >
                        <span className={classes.emptyDot} ></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.fullDot} style={{marginLeft: "0.1cm"}}></span>
                    </div>
                </CardContent>
                <CardActions className={classes.buttons}>
                    <Button size="large">Share</Button>
                    <Link to={"/moviePage/" + data.last5Added["4"]["id"]} style={{textDecoration: "none"}}><Button
                        size="large">Go To Movie's Page</Button></Link>
                </CardActions>
            </Card>
        </div>
    )

    let cards = [card1, card2, card3, card4, card5]

    const forwardInput = () => {
        if (currentIndex === 4) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const backwardInput = () => {
        if (currentIndex === 0) {
            setCurrentIndex(4)
        } else {
            setCurrentIndex(currentIndex - 1)
        }
    }

    return (
        <div>
            <ArrowForwardIosIcon className={classes.forward} style={{fontSize:"xxx-large"}} id={"Forward"} onClick={forwardInput}/>
            <ArrowBackIosNewIcon className={classes.backward} style={{fontSize:"xxx-large"}} id={"Backward"} onClick={backwardInput}/>
            <Swapper/>
        </div>
    )
}

export default Last5Added;








// import React, {useState} from 'react'
// import {gql, useQuery} from "@apollo/client";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import classes from "./mostLikedReviews.module.css";
// import {Link} from "react-router-dom";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
//
// function MostLikedReviews(props) {
//     const [numOfSet, setNumOfSet] = useState(0)
//
//     const MOST_LIKED_REVIEWS = gql`
//         query MostLikedReviews($userID: ID!) {
//             mostLikedReviews(userID: $userID) {
//                 id
//                 topic
//             }
//         }
//     `
//     const {loading, error, data} = useQuery(MOST_LIKED_REVIEWS,
//         {
//             variables: {
//                 userID: props.userID
//             }
//         })
//
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error : {error}</p>;
//
//     console.log(data)
//
//     let numOfReviews = data.mostLikedReviews.length
//
//     console.log(numOfReviews)
//
//     function handleClickForward() {
//         if (numOfSet >= 0 && numOfSet < numOfReviews - 1) {
//             setNumOfSet(numOfSet + 1)
//         }
//     }
//
//     function handleClickBackward() {
//         if (numOfSet > 0 && numOfSet <= numOfReviews - 1) {
//             setNumOfSet(numOfSet - 1)
//         }
//     }
//
//     let newData = data.mostLikedReviews.slice(numOfSet, numOfSet + 1)
//
//     let loaded = newData.map(({Topic, Text, NumOfLikes, NumOfComments, MovieTitle, MovieID}) => (
//         <div style={{position: "absolute"}}>
//             {numOfSet === 4 || numOfReviews <= 1 ? null : <ArrowForwardIosIcon className={classes.forward} onClick={handleClickForward} style={{fontSize: "xx-large"}} id={"Forward"}/>}
//             {numOfSet === 0 || numOfReviews <= 1 ? null : <ArrowBackIosNewIcon className={classes.backward} onClick={handleClickBackward} style={{fontSize: "xx-large"}} id={"Backward"}/>}
//             <div>
//                 <Card>
//                     <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                             <p style={{color: "yellow"}} className={classes.movie}>
//                                 <Link to={"/moviePage/" + MovieID} className={classes.movieTitle}> {MovieTitle}</Link>
//                             </p>
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     ))
//
// return loaded
//
// }
//
// export default MostLikedReviews