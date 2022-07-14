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
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import classes from "./showReviews.module.css";
import Button from "@mui/material/Button";
import {useEffect, useRef, useState} from "react";
import ShowComments from "./showComments";
import ToggleLike from "./toggle-like";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";
import {motion} from "framer-motion";
import Card from "@mui/material/Card";
import {Footer} from "../directors/styles";
import CardActions from "@mui/material/CardActions";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddComments from "./addComments";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveComment from "./removeComment";
import EditComment from "./editComment";

function ShowReviews(props) {
    //from here to line 52 there are functions and variables for the show comments functionality
    const Arrow = styled(motion.div)`
        position: absolute;
        display: flex;
        right: -0.8cm;
        transform: rotate(180deg);
`;

    const [visible, setVisible] = useState(false)
    const [expanded, setExpanded] = useState(0);
    const [accordionHeight, setAccordionHeight] = useState(0);
    const ref = useRef("");
    let getHeight = ref.current?.scrollHeight + 8 || null;

    const open = (id) => {
        if (expanded === 0) {
            setExpanded(id)
        } else if (expanded !== 0 && expanded !== id) {
            setExpanded(id)
        } else {
            setExpanded(0)
        }
    }

    //from here to line 65 there are function and variables for the add comments functionality
    const [titleGiven, setTitleGiven] = useState('')
    const [textGiven, setTextGiven] = useState('')

    useEffect(() => {
        setAccordionHeight(getHeight);
    }, [expanded]);

    const style = {
        transform: expanded ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }

    const [extend, setExtend] = useState(0)
    const [likeClicked, setLikeClicked] = useState(false)
    const [likedReviewID, setLikedReviewID] = useState(0)
    const [likeID, setLikeID] = useState(0)
    const [removeLike, setRemoveLike] = useState(false)
    const [showError, setShowError] = useState(0)

    const [removeReviewID, setRemoveReviewID] = useState(0);
    const [editReviewID, setEditReviewID] = useState(0);
    const [editConfirmed, setEditConfirmed] = useState(false);
    const [editText, setEditText] = useState('');
    const [editTopic, setEditTopic] = useState('');
    const [editRank, setEditRank] = useState(0);

    const SHOW_REVIEWS = gql`
        query ReviewsOfMovie ($movieID: Int!) {
            reviewsOfMovie (movieID: $movieID){
                topic
                text
                rank
                id
                numOfLikes
                numOfComments
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

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

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
            if (showError === 0) {
                setShowError(id)
            } else {
                setShowError(0)
            }
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

    function HandleClickEdit(id) {
        if (!props.expanded) {
            setEditReviewID(0)
        }
        if (editReviewID !== id) {
            setEditReviewID(parseInt(id))
        } else {
            setEditReviewID(0)
        }
    }

    function HandlerRemove (commentID)  {
        return (
            <div>
                <RemoveComment userID={props.userID} commentID={commentID} reviewID={parseInt(props.reviewID)} />
            </div>
        )
        setRemoveReviewID(0)
    }

    let addLike = (
        <div>
            {() => setLikeClicked(false)}
            <ToggleLike remove={removeLike} userID={parseInt(props.userID)} reviewID={likedReviewID} likeID={likeID}/>
        </div>
    )

    let HandleEdit = (
        <div>
            <EditComment commentID={editReviewID} text={JSON.stringify(editText)}/>
            {() => setEditReviewID(0)}
        </div>
    )

    let loaded = data.reviewsOfMovie.map(({text, rank, topic, id, user, numOfLikes, numOfComments}) => (
        text !== '' ? (
            <div key={id} className={classes.item} style={{marginTop: "2.4cm"}}>
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
                                              <Typography className={classes.rank} style={{fontSize: "xx-large"}}>
                                                  {rank} / 100
                                              </Typography>
                                              <Typography>
                                                  by: <Link to={"/userPage/" + user["id"]} style={{
                                                  textDecoration: "none",
                                                  color: "white"
                                              }}>{user["nickname"]}</Link>
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
                                              {showError === id ? <CardContent className={classes.msg}>
                                                  <Typography component="div" style={{
                                                      fontSize: "13px",
                                                      marginTop: "-0.25cm",
                                                      marginRight: "-1cm"
                                                  }}>
                                                      Guests cant make likes and comments
                                                  </Typography>
                                                  <Button onClick={() => setShowError(0)}
                                                          className={classes.close}><CancelPresentationIcon/></Button>
                                              </CardContent> : null}
                                          </React.Fragment>
                                      }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </List>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button style={{position: "absolute",backgroundColor: "#cc2062", color: "white", border: "none", left: "0.4cm", top: "2.3cm"}} variant="contained" {...bindTrigger(popupState)}><MoreHorizIcon /></Button>
                            <Menu {...bindMenu(popupState)} style={{top: "0.2cm", width: "9cm"}}>
                                {props.userID === parseInt(user["id"])? <MenuItem><Button onClick={() => HandleClickEdit(parseInt(id))}>Edit
                                </Button></MenuItem>: null}
                                {props.userID === parseInt(user["id"])? <MenuItem><Button onClick={() => setRemoveReviewID(id)} style={{textDecoration: "none"}}>Delete
                                </Button></MenuItem>: null}
                                <MenuItem><Button style={{textDecoration: "none"}}>Share
                                </Button></MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
                <Card style={{
                    marginBottom: "4.2cm",
                    position: "relative",
                    display: "flex",
                    marginTop: "0cm",
                    marginRight: "-22cm",
                    width: "21cm",
                    borderRadius: "0 0 15px 15px",
                }}>
                    <Footer
                        className={expanded === id ? "show" : ""}
                        setHeight={expanded === id ? accordionHeight : 0}
                        ref={ref}
                    >
                        <CardActions>
                            <span size="large" onClick={() => open(id)}>
                        <Button style={{position: "absolute"}}>
                            {expanded !== id ? "Show Comments" : "Hide Comments"}
                            <Arrow>
                                <KeyboardArrowUpIcon style={style}/>
                            </Arrow>
                        </Button>
                                <Button className={classes.comment}><AddCommentIcon/></Button>
                            </span>
                            <Button onClick={() => handleLike(id)}
                                    className={classes.thumb}><ThumbUpIcon/></Button>
                            <span className={classes.badgeComments}>{numOfComments}</span>
                            <span className={classes.badgeLikes}>{numOfLikes}</span>
                        </CardActions>
                        <div className={classes.actions}>
                            <ShowComments reviewID={id} userID={parseInt(props.userID)} expanded={expanded}/>
                            <AddComments userID={parseInt(props.userID)} reviewID={id}/>
                        </div>
                    </Footer>
                </Card>
                {editReviewID === parseInt(id)?
                    <form className={classes.formEdit}>
                        <div className={classes.controlEdit}>
                <textarea
                    id="topic"
                    type="text"
                    datatype="String"
                    required
                    defaultValue={text} onChange={event => setEditText(event.target.value)}
                    rows="1"
                ></textarea>
                        </div>
                        <div className={classes.controlEditTopic}>
                <textarea
                    id="topic"
                    type="text"
                    datatype="String"
                    required
                    defaultValue={topic} onChange={event => setEditTopic(event.target.value)}
                    rows="1"
                ></textarea>
                        </div>
                        <div className={classes.ctrlEditRank}>
                            <label htmlFor="rank" style={{color: "yellow"}}>Add Your Rank</label>
                            <input
                                type="number"
                                name="ranking"
                                id="ranking"
                                min="1"
                                max="100"
                                value={rank} onChange={event => setEditRank(event.target.value)}
                                datatype="Int"
                            ></input>
                        </div>
                        <div className={classes.actionsEdit}>
                            <Button onClick={() => setEditConfirmed(true)} className={classes.addReviewButEdit}>Save</Button>
                        </div>
                        <button className={classes.cancel} style={{backgroundColor: "#cc2062", borderColor: "#cc2062"}} onClick={() => HandleClickEdit(parseInt(id))}><CancelIcon style={{color: "black"}} /></button>
                    </form>: null}
            </div>
        ) : null
    ))

    return <>{loaded}{likeClicked ? addLike : null}{removeReviewID !== 0 ? HandlerRemove(removeReviewID) : null}{editConfirmed? HandleEdit: null}</>
}

export default ShowReviews