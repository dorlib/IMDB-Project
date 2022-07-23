import React, {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import classes from "./mostLikedReviews.module.css"
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

    console.log(data)

    let numOfReviews = data.mostLikedReviews.length

    console.log(numOfReviews)

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
                            <Link to={"/moviePage/" + data.mostLikedReviews["0"]["movie"]["id"]}>{data.mostLikedReviews["0"]["movie"]["title"]}</Link>
                        </p>
                    </Typography>
                    {data.mostLikedReviews["0"]["topic"] !== "" ? <span>{data.mostLikedReviews["0"]["topic"]}</span> : null}
                    {data.mostLikedReviews["0"]["rank"] !== null ? <span>{data.mostLikedReviews["0"]["rank"] / 100}</span>: null}
                    {data.mostLikedReviews["0"]["text"] !== "" ? <Typography>{data.mostLikedReviews["0"]["text"]} </Typography> : null}
                    <div>{numOfSet + 1 / 5}</div>
                </CardContent>
            </Card>
        </div>
    )
    let review2 = (
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
                            <Link to={"/moviePage/" + data.mostLikedReviews["1"]["movie"]["id"]}>{data.mostLikedReviews["1"]["movie"]["title"]}</Link>
                        </p>
                    </Typography>
                    {data.mostLikedReviews["1"]["topic"] !== "" ? <span>{data.mostLikedReviews["1"]["topic"]}</span> : null}
                    {data.mostLikedReviews["1"]["rank"] >= 0 ? <span>{data.mostLikedReviews["1"]["rank"]} / 100}</span>: null}
                    {data.mostLikedReviews["1"]["text"] !== "" ? <Typography>{data.mostLikedReviews["1"]["text"]} </Typography> : null}
                    <div>{numOfSet + 1 / 5}</div>
                </CardContent>
            </Card>
        </div>
    )
    let review3 = (
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
                            <Link to={"/moviePage/" + data.mostLikedReviews["2"]["movie"]["id"]}>{data.mostLikedReviews["2"]["movie"]["title"]}</Link>
                        </p>
                    </Typography>
                    {data.mostLikedReviews["2"]["topic"] !== "" ? <span>{data.mostLikedReviews["2"]["topic"]}</span> : null}
                    {data.mostLikedReviews["2"]["rank"] >= 0 ? <span>{data.mostLikedReviews["2"]["rank"]} / 100}</span>: null}
                    {data.mostLikedReviews["2"]["text"] !== "" ? <Typography>{data.mostLikedReviews["2"]["text"]} </Typography> : null}
                    <div>{numOfSet + 1 / 5}</div>
                </CardContent>
            </Card>
        </div>
    )
    let review4 = (
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
                            <Link to={"/moviePage/" + data.mostLikedReviews["3"]["movie"]["id"]}>{data.mostLikedReviews["3"]["movie"]["title"]}</Link>
                        </p>
                    </Typography>
                    {data.mostLikedReviews["3"]["topic"] !== "" ? <span>{data.mostLikedReviews["3"]["topic"]}</span> : null}
                    {data.mostLikedReviews["3"]["rank"] >= 0 ? <span>{data.mostLikedReviews["3"]["rank"]} / 100}</span>: null}
                    {data.mostLikedReviews["3"]["text"] !== "" ? <Typography>{data.mostLikedReviews["3"]["text"]} </Typography> : null}
                    <div>{numOfSet + 1 / 5}</div>
                </CardContent>
            </Card>
        </div>
    )
    let review5 = (
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
                            <Link to={"/moviePage/" + data.mostLikedReviews["4"]["movie"]["id"]}>{data.mostLikedReviews["4"]["movie"]["title"]}</Link>
                        </p>
                    </Typography>
                    {data.mostLikedReviews["4"]["topic"] !== "" ? <span>{data.mostLikedReviews["4"]["topic"]}</span> : null}
                    {data.mostLikedReviews["4"]["rank"] > 0 ? <span>{data.mostLikedReviews["4"]["rank"]} / 100}</span>: null}
                    {data.mostLikedReviews["4"]["text"] !== "" ? <Typography>{data.mostLikedReviews["4"]["text"]} </Typography> : null}
                    <div>{numOfSet + 1 / 5}</div>
                </CardContent>
            </Card>
        </div>
    )

    let reviews = [review1, review2, review3, review4, review5]

    return (
        <div>
            <ArrowForwardIosIcon className={classes.forward} style={{fontSize:"xxx-large"}} id={"Forward"} onClick={handleClickForward}/>
            <ArrowBackIosNewIcon className={classes.backward} style={{fontSize:"xxx-large"}} id={"Backward"} onClick={handleClickBackward}/>
            {reviews[numOfSet]}
        </div>
    )
}

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
export default MostLikedReviews