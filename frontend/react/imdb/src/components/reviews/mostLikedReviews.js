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

function MostLikedReviews(props) {
    const MOST_LIKED_REVIEWS = gql`
        query MostLikedReviews ($userID: ID!){
            mostLikedReviews (userID: $userID) {
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


    const {loading, error, data} = useQuery(MOST_LIKED_REVIEWS, {
        variables: {
            userID : props.userID
        }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    console.log(data)

    let numOfReviews = data.mostLikedReviews.length

    console.log(numOfReviews)

    let review1 = (
        <div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className={classes.movie}>
                            - <Link style={{color: "darkblue"}} to={"/moviePage/" + data.mostLikedReviews["0"]["movie"]["id"]}>{data.mostLikedReviews["0"]["movie"]["title"]}</Link>
                    </Typography>
                    {data.mostLikedReviews["0"]["topic"] ? <Typography className={classes.topic} style={{fontSize: "xx-large"}}>{data.mostLikedReviews["0"]["topic"]}</Typography> : null}
                    {data.mostLikedReviews["0"]["rank"] ? <Typography className={classes.rank} style={{fontSize: "x-large"}}>{data.mostLikedReviews["0"]["rank"]+ " /100"}</Typography>:  <Typography className={classes.rank}>rank not given</Typography>}
                    {data.mostLikedReviews["0"]["text"] ? <Typography className={classes.text} style={{fontSize: "x-large"}}>"{data.mostLikedReviews["0"]["text"]}" </Typography> : null}
                    <Typography className={classes.likes} style={{fontSize: "large"}}>Likes : {data.mostLikedReviews["0"]["numOfLikes"]}</Typography>
                    <Typography className={classes.comments} style={{fontSize: "large"}}>Comments : {data.mostLikedReviews["0"]["numOfComments"]}</Typography>
                    <div className={classes.outOf}>{numOfSet + 1  + "/" + 5}</div>
                </CardContent>
        </div>
    )

    let review2 = (
        <div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className={classes.movie}>
                        - <Link style={{color: "darkblue"}} to={"/moviePage/" + data.mostLikedReviews["1"]["movie"]["id"]}>{data.mostLikedReviews["1"]["movie"]["title"]}</Link>
                    </Typography>
                    {data.mostLikedReviews["1"]["topic"] ? <Typography className={classes.topic} style={{fontSize: "xx-large"}}>{data.mostLikedReviews["1"]["topic"]}</Typography> : null}
                    {data.mostLikedReviews["1"]["rank"] ? <Typography className={classes.rank} style={{fontSize: "x-large"}}>{data.mostLikedReviews["1"]["rank"] + " / 100"}</Typography>: <Typography className={classes.rank}>rank not given</Typography>}
                    <Typography className={classes.text} style={{fontSize: "x-large"}}>"{data.mostLikedReviews["1"]["text"]}" </Typography>
                    <Typography className={classes.likes} style={{fontSize: "large"}}>Likes : {data.mostLikedReviews["1"]["numOfLikes"]}</Typography>
                    <Typography className={classes.comments} style={{fontSize: "large"}}>Comments : {data.mostLikedReviews["1"]["numOfComments"]}</Typography>
                    <div className={classes.outOf}>{numOfSet + 1  + "/" + 5}</div>
                </CardContent>
        </div>
    )

    let review3 = (
        <div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className={classes.movie}>
                        - <Link style={{color: "darkblue"}} to={"/moviePage/" + data.mostLikedReviews["2"]["movie"]["id"]}>{data.mostLikedReviews["2"]["movie"]["title"]}</Link>
                    </Typography>
                    {data.mostLikedReviews["2"]["topic"] ? <Typography className={classes.topic} style={{fontSize: "xx-large"}}>{data.mostLikedReviews["2"]["topic"]}</Typography> : null}
                    {data.mostLikedReviews["2"]["rank"] ? <Typography className={classes.rank} style={{fontSize: "x-large"}}>{data.mostLikedReviews["2"]["rank"] + " / 100"}</Typography>:  <Typography className={classes.rank}>rank not given</Typography>}
                    {data.mostLikedReviews["2"]["text"] ? <Typography className={classes.text} style={{fontSize: "x-large"}}>"{data.mostLikedReviews["2"]["text"]}" </Typography> : null}
                    <Typography className={classes.likes} style={{fontSize: "large"}}>Likes : {data.mostLikedReviews["2"]["numOfLikes"]}</Typography>
                    <Typography className={classes.comments} style={{fontSize: "large"}}>Comments : {data.mostLikedReviews["2"]["numOfComments"]}</Typography>
                    <div className={classes.outOf}>{numOfSet + 1  + "/" + 5}</div>
                </CardContent>
        </div>
    )

    let review4 = (
        <div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className={classes.movie}>
                        - <Link style={{color: "darkblue"}} to={"/moviePage/" + data.mostLikedReviews["3"]["movie"]["id"]}>{data.mostLikedReviews["3"]["movie"]["title"]}</Link>
                    </Typography>
                    {data.mostLikedReviews["3"]["topic"] ? <Typography className={classes.topic} style={{fontSize: "xx-large"}}>{data.mostLikedReviews["3"]["topic"]}</Typography> : null}
                    {data.mostLikedReviews["3"]["rank"] ? <Typography className={classes.rank} style={{fontSize: "x-large"}}>{data.mostLikedReviews["3"]["rank"] + " / 100"}</Typography>:  <Typography className={classes.rank}>rank not given</Typography>}
                    {data.mostLikedReviews["3"]["text"] ? <Typography className={classes.text} style={{fontSize: "x-large"}}>"{data.mostLikedReviews["3"]["text"]}" </Typography> : null}
                    <Typography className={classes.likes} style={{fontSize: "large"}}>Likes : {data.mostLikedReviews["3"]["numOfLikes"]}</Typography>
                    <Typography className={classes.comments} style={{fontSize: "large"}}>Comments : {data.mostLikedReviews["3"]["numOfComments"]}</Typography>
                    <div className={classes.outOf}>{numOfSet + 1  + "/" + 5}</div>
                </CardContent>
        </div>
    )

    let review5 = (
        <div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className={classes.movie}>
                        - <Link style={{color: "darkblue"}} to={"/moviePage/" + data.mostLikedReviews["4"]["movie"]["id"]}>{data.mostLikedReviews["4"]["movie"]["title"]}</Link>
                    </Typography>
                    {data.mostLikedReviews["4"]["topic"] ? <Typography className={classes.topic} style={{fontSize: "xx-large"}}>{data.mostLikedReviews["4"]["topic"]}</Typography> : null}
                    {data.mostLikedReviews["4"]["rank"] ? <Typography className={classes.rank} style={{fontSize: "x-large"}}>{data.mostLikedReviews["4"]["rank"] + " / 100"}</Typography>:  <Typography className={classes.rank}>rank not given</Typography>}
                    {data.mostLikedReviews["4"]["text"] ? <Typography className={classes.text} style={{fontSize: "x-large"}}>"{data.mostLikedReviews["4"]["text"]}" </Typography> : null}
                    <Typography className={classes.likes} style={{fontSize: "large"}}>Likes : {data.mostLikedReviews["4"]["numOfLikes"]}</Typography>
                    <Typography className={classes.comments} style={{fontSize: "large"}}>Comments : {data.mostLikedReviews["4"]["numOfComments"]}</Typography>
                    <div className={classes.outOf}>{numOfSet + 1  + "/" + 5}</div>
                </CardContent>
        </div>
    )

    let reviews = [review1, review2, review3, review4, review5]

    return (
        <div>
            {numOfSet === 4 || numOfReviews <= 1 ? null : <ArrowForwardIosIcon className={classes.forward} onClick={handleClickForward} style={{fontSize: "xx-large"}} id={"Forward"}/>}
            {numOfSet === 0 || numOfReviews <= 1 ? null : <ArrowBackIosNewIcon className={classes.backward} onClick={handleClickBackward} style={{fontSize: "xx-large"}} id={"Backward"}/>}            {reviews[numOfSet]}
        </div>
    )
}

export default MostLikedReviews