import {gql, useQuery} from "@apollo/client";
import * as React from 'react';
import classes from "./showReviews.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

function ShowComments(props) {
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

    console.log(data)

    let loaded = data.commentsOfReview.map(({text, id, user}) => (
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
                                              <Typography>
                                                  by: <Link to={"/userPage/" + user["id"]} style={{
                                                  textDecoration: "none",
                                                  color: "white"
                                              }}>{user["nickname"]}</Link>
                                              </Typography>
                                              <Typography style={{fontSize: "x-large"}}>
                                                  {text}
                                              </Typography>
                                          </React.Fragment>} />
                    </ListItem>
                </List>
            </div>
        ): null ))

    return loaded

}

export default ShowComments