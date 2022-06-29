import {Link} from 'react-router-dom';
import {gql, useMutation, useQuery} from "@apollo/client";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import UpdateRank from "./total-rank";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentIcon from '@mui/icons-material/AddComment';

import classes from "./showReviews.module.css";
import Button from "@mui/material/Button";


function ShowReviews(props) {
    const SHOW_REVIEWS = gql`
        query ReviewsOfMovie ($movieID: Int!) {
            reviewsOfMovie (movieID: $movieID){
                topic
                text
                rank
                id
                user {
                    nickname
                    profile
                    id
                }
            }
        }
    `;

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

    if (error) return <div>Error!</div>
    if (loading) return <div>Loading...</div>

    let loaded
    let load

    loaded = data.reviewsOfMovie.map(({text, rank, topic, id, user}) => (
        text !== '' ? (
            <div key={id} className={classes.item}>
                <List sx={{width: '100%',}} className={classes.rev}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Button>
                                <img src={user["profile"]} style={{width: "1.8cm", height: "1.8cm", borderRadius: "200px", marginLeft: "-0.3cm", marginTop: "-0.4cm"}} onClick={() => window.location.replace("/userPage/" + user["id"])}/>
                            </Button>
                        </ListItemAvatar>
                        <ListItemText style={{marginLeft: "0.3cm"}}
                            primary={
                            <React.Fragment>
                            <Typography style={{fontSize: "x-large"}}>
                                {topic}
                            </Typography>
                                <Typography>
                                    by: <Link to={"/userPage/" + user["id"]} style={{textDecoration: "none", color: "white"}}>{user["nickname"]}</Link>
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
                                    <Typography

                                    >
                                        {text}
                                    </Typography>
                                    <Button><ThumbUpIcon className={classes.thumb}/></Button>
                                    <Button><AddCommentIcon className={classes.comment}/></Button>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </List>
            </div>
        ) : null
    ))
    return loaded
}

export default ShowReviews