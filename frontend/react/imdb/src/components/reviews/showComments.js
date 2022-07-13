import {gql, useQuery} from "@apollo/client";
import * as React from 'react';
import classes from "./showComments.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RemoveComment from "./removeComment";
import {useState} from "react";

function ShowComments(props) {
    const [removeCommentID, setRemoveCommentID] = useState(0);
    const [editCommentID, setEditCommentID] = useState(0);

    const SHOW_COMMENTS = gql`
        query CommentsOfReview ($reviewID: ID!) {
            commentsOfReview (reviewID: $reviewID){
                text
                id
                user {
                    nickname
                    profile
                    id
                }
            }
        }
    `;

    const {data, loading, error} = useQuery(SHOW_COMMENTS,
        {
            variables: {
                reviewID: parseInt(props.reviewID) || 0,
            }
        })

    if (error) return <div>Error!</div>
    if (loading) return <div>Loading...</div>

    function HandlerRemove (commentID)  {
        return (
            <div>
                <RemoveComment userID={props.userID} commentID={commentID} reviewID={parseInt(props.reviewID)}/>
            </div>
        )
        setRemoveCommentID(0)
    }

    function HandleEdit (commentID, text)  {
        return (
            <div>
                <RemoveComment userID={props.userID} commentID={commentID} reviewID={parseInt(props.reviewID)}/>
            </div>
        )
        setRemoveCommentID(0)
    }

    let editComment = (
        <form className={classes.form}>
            <div className={classes.control}>
                <textarea
                    id="topic"
                    type="text"
                    datatype="String"
                    required
                    value={text} onChange={event => setText(event.target.value)}
                    rows="1"
                ></textarea>
            </div>
            <div className={classes.actions}>
                <button onClick={edit} className={classes.addReviewBut} type="submit">Save</button>
            </div>
        </form>
    )

    let loaded = data.commentsOfReview.map(({text, id, user}) => (
        text !== '' ? (
            <div key={id} className={classes.item} style={{marginTop: "2.4cm"}}>
                <List sx={{width: '100%',}} className={classes.comment}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Button>
                                <img src={user["profile"]} style={{
                                    width: "1.4cm",
                                    height: "1.4cm",
                                    borderRadius: "200px",
                                    marginTop: "-1cm",
                                }} onClick={() => window.location.replace("/userPage/" + user["id"])} alt={""}/>
                            </Button>
                        </ListItemAvatar>
                        <ListItemText style={{marginLeft: "0.3cm"}}
                                      primary={
                                          <React.Fragment>
                                              <Typography className={classes.by}>
                                                  <Link to={"/userPage/" + user["id"]} style={{
                                                  textDecoration: "none",
                                                  color: "white"
                                              }}>{user["nickname"]}</Link>
                                              </Typography>
                                              <Typography style={{fontSize: "large"}} className={classes.text}>
                                                  {text}
                                              </Typography>
                                              <PopupState variant="popover" popupId="demo-popup-menu">
                                                  {(popupState) => (
                                                      <React.Fragment>
                                                          <Button style={{backgroundColor: "#cc2062", color: "white", border: "none", left: "14cm", top: "-2cm"}} variant="contained" {...bindTrigger(popupState)}><MoreHorizIcon /></Button>
                                                          <Menu {...bindMenu(popupState)} style={{top: "0.2cm", width: "9cm"}}>
                                                              {props.userID === parseInt(user["id"])? <MenuItem><Button onClick={() => setEditCommentID(id)}>Edit
                                                                  </Button></MenuItem>: null}
                                                              {props.userID === parseInt(user["id"])? <MenuItem><Button onClick={() => setRemoveCommentID(id)} style={{textDecoration: "none"}}>Delete
                                                                  </Button></MenuItem>: null}
                                                              <MenuItem><Button style={{textDecoration: "none"}}>Share
                                                                  </Button></MenuItem>
                                                          </Menu>
                                                      </React.Fragment>
                                                  )}
                                              </PopupState>
                                          </React.Fragment>} />
                    </ListItem>
                </List>
            </div>
        ): null ))

    return <>{loaded}{removeCommentID !== 0 ? HandlerRemove(removeCommentID) : null}</>
}
export default ShowComments