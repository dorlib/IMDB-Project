import React, {useState} from 'react'
import {gql, useQuery} from "@apollo/client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./mostLikedReviews.module.css";
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function MostLikedReviews(props) {
    // const [numOfSet, setNumOfSet] = useState(0)

    const MOST_LIKED_REVIEWS = gql`
        query MostLikedReviews($userID: ID!) {
            mostLikedReviews(userID: $userID) {
                id
                topic
                text
                numOfLikes
                numOfComments
                movie {
                    id
                    title
                }
            }
        }
    `
    const {loading, error, data} = useQuery(MOST_LIKED_REVIEWS,
        {
            variables: {
                userID: props.userID
            }
        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    console.log(data)

    let numOfReviews = data.mostLikedReviews.length

    console.log(numOfReviews)

    // function handleClickForward() {
    //     if (numOfSet >= 0 && numOfSet < numOfReviews - 1) {
    //         setNumOfSet(numOfSet + 1)
    //     }
    // }
    //
    // function handleClickBackward() {
    //     if (numOfSet > 0 && numOfSet <= numOfReviews - 1) {
    //         setNumOfSet(numOfSet - 1)
    //     }
    // }

    // let newData = data.mostLikedReviews.slice(numOfSet, numOfSet + 1)

    // let loaded = newData.map(({Topic, Text, NumOfLikes, NumOfComments, MovieTitle, MovieID}) => (
    //     <div style={{position: "absolute"}}>
    //         {numOfSet === 4 || numOfReviews <= 1 ? null : <ArrowForwardIosIcon className={classes.forward} onClick={handleClickForward} style={{fontSize: "xx-large"}} id={"Forward"}/>}
    //         {numOfSet === 0 || numOfReviews <= 1 ? null : <ArrowBackIosNewIcon className={classes.backward} onClick={handleClickBackward} style={{fontSize: "xx-large"}} id={"Backward"}/>}
    //         <div>
    //             <Card>
    //                 <CardContent>
    //                     <Typography gutterBottom variant="h5" component="div">
    //                         <p style={{color: "yellow"}} className={classes.movie}>
    //                             <Link to={"/moviePage/" + MovieID} className={classes.movieTitle}> {MovieTitle}</Link>
    //                         </p>
    //                     </Typography>
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     </div>
    // ))

return <>{data}</>

}

export default MostLikedReviews