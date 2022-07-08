import {Link} from 'react-router-dom';
import {gql, useMutation, useQuery} from "@apollo/client";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentIcon from '@mui/icons-material/AddComment';

import classes from "./showReviews.module.css";
import Button from "@mui/material/Button";
import {useState} from "react";
import ShowComments from "./showComments";
import ToggleLike from "./toggle-like";
import CardContent from "@mui/material/CardContent";

function ShowReviews(props) {
    const [extend, setExtend] = useState(0)
    const [likeClicked, setLikeClicked] = useState(false)
    const [likedReviewID, setLikedReviewID] = useState(0)
    const [likeID, setLikeID] = useState(0)
    const [removeLike, setRemoveLike] = useState(false)
    const [showError, setShowError] = useState(0)

    const SHOW_REVIEWS = gql`
        query ReviewsOfMovie ($movieID: Int!) {
            reviewsOfMovie (movieID: $movieID){
                topic
                text
                rank
                id
                numOfLikes
                user {
                    nickname
                    profile
                    id
                }
            }
        }
    `;

    const COMMENTS_USER_LIKES = gql`
        query LikesOfUser ($userID: ID!) {
            likesOfUser (userID: $userID) {
                id                            #id of the like
                reviewID
            }
        }
    `

    const ORIGINAL_RANK = gql`
        query MovieById ($movieID: ID!) {
            movieById (id: $movieID) {
                rank
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const originalRank = useQuery(ORIGINAL_RANK,
        {
            variables: {
                movieID: lastSegment || 0,
            }
        })

    const {data, loading, error} = useQuery(SHOW_REVIEWS,
        {
            variables: {
                movieID: lastSegment || 0,
            }
        })

    const {data: data1, loading: loading1, error: error1} = useQuery(COMMENTS_USER_LIKES,
        {
            variables: {
                userID: props.userID || 0
            }
        })

    let sumOfLikes  // of user
    if (data1) {
        sumOfLikes = data1["likesOfUser"].length
    }

    // in order to find if user already like this review
    let reviewLikesIDS = [];
    let likesIDS = []
    for (let i = 0; i < sumOfLikes; i++) {
        reviewLikesIDS.push(data1["likesOfUser"][i]["reviewID"])
        likesIDS.push(data1["likesOfUser"][i]["id"])
    }

    if (error) return <div>Error! ,{error}</div>
    if (loading) return <div>Loading... </div>
    if (error1) return <div>Error!, {error1}</div>
    if (loading1) return <div>Loading...</div>

    function handleExtend(id) {
        if (extend !== id) {
            setExtend(id)
        } else {
            setExtend(0)
        }
    }

    function handleLike(id) {
        if (!props.userID) {
            setShowError(id)
            return
        }
        if (reviewLikesIDS.includes(id)) {
            let index = reviewLikesIDS.indexOf(id)
            setRemoveLike(true)
            setLikeID(data1["likesOfUser"][index]["id"])
        }
        setLikedReviewID(parseInt(id))
        setLikeClicked(true)
    }

    let addLike = (
        <div>
            {() => setLikeClicked(false)}
            <ToggleLike remove={removeLike} userID={parseInt(props.userID)} reviewID={likedReviewID} likeID={likeID}/>
        </div>
    )

    let loaded = data.reviewsOfMovie.map(({text, rank, topic, id, user, numOfLikes}) => (
        text !== '' ? (
            <div key={id} className={classes.item}>
                <List sx={{width: '100%',}} className={classes.rev}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Button>
                                <img src={user["profile"]} style={{
                                    width: "1.8cm",
                                    height: "1.8cm",
                                    borderRadius: "200px",
                                    marginLeft: "-0.3cm",
                                    marginTop: "-0.4cm"
                                }} onClick={() => window.location.replace("/userPage/" + user["id"])} alt={""}/>
                            </Button>
                        </ListItemAvatar>
                        <ListItemText style={{marginLeft: "0.3cm"}}
                                      primary={
                                          <React.Fragment>
                                              <Typography style={{fontSize: "x-large"}}>
                                                  {topic}
                                              </Typography>
                                              <Typography>
                                                  by: <Link to={"/userPage/" + user["id"]} style={{
                                                  textDecoration: "none",
                                                  color: "white"
                                              }}>{user["nickname"]}</Link>
                                              </Typography>
                                              <Typography className={classes.rank} style={{fontSize: "xx-large"}}>
                                                  {rank} / 100
                                              </Typography>
                                          </React.Fragment>

                                      }
                                      secondary={
                                          <React.Fragment>
                                              <Typography style={{height: "0.3cm"}}>
                                                  &ensp;
                                              </Typography>
                                              <Typography>
                                                  {text}
                                              </Typography>
                                              <Button onClick={() => handleLike(id)}><ThumbUpIcon
                                                  className={classes.thumb}/></Button>
                                              {showError === id? <CardContent className={classes.msg}>
                                                  <Typography component="div" style={{fontSize: "13px", marginTop: "-0.25cm"}}>
                                                      Guests cant make likes and comments
                                                  </Typography>
                                              </CardContent> : null}
                                              <Button><AddCommentIcon className={classes.comment}/></Button>
                                              <span className={classes.badgeComments}>{0}</span>
                                              <span className={classes.badgeLikes}>{numOfLikes}</span>
                                              <Button className={classes.showComments}
                                                      onClick={() => handleExtend(parseInt(id))}>{extend === parseInt(id) ? "Hide Comments" : "Show Comments"}</Button>
                                              <ShowComments id={extend}/>
                                          </React.Fragment>
                                      }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </List>
            </div>
        ) : null
    ))
    return <>{loaded}{likeClicked ? addLike : null}</>
}
export default ShowReviews