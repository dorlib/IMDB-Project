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

function Last5Added() {
    const LAST_5_ADDED = gql`
        query Last5Added{
            last5Added {
                title
                rank
                id
                image
                genre
            }
        }
    `;

    const [currentIndex, setCurrentIndex] = useState(0);

    function Swapper() {
        useEffect(() => {
            const intervalId = setInterval(() => {
                if (currentIndex === 4) {
                    setCurrentIndex(0);
                } else {
                    setCurrentIndex(currentIndex + 1);
                }
            }, 5000)
            return () => clearInterval(intervalId);
        }, [])
        return (
            <div>
                {cards[currentIndex]}
            </div>
        )
    }



    const {loading, error, data} = useQuery(LAST_5_ADDED)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let card1 = (
        <div>
            <Card sx={{maxWidth: 600}} style={{
                backgroundColor: "#cc2062",
                marginRight: "-15cm",
                marginLeft: "15cm",
                marginTop: "-13cm",
                marginBottom: "13cm",
                borderRadius: "100px"
            }}>
                <CardMedia component="img" alt="movie image" height="300" src={data.last5Added["0"]["image"]}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {data.last5Added["0"]["title"]} : {data.last5Added["0"]["rank"]} / 100
                        </p>
                        <Typography className={classes.genre}>Genre : {data.last5Added["0"]["genre"]}</Typography>
                    </Typography>
                    <div  style={{textAlign: "center", marginTop: "0.2cm"}} >
                        <label>&nbsp;<span className={classes.fullDot}></span></label>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                        <span className={classes.emptyDot} style={{marginLeft: "0.1cm"}}></span>
                    </div>
                </CardContent>
                <CardActions className={classes.buttons}>
                    <Button size="large">Share</Button>
                    <Link to={"/moviePage/" + data.last5Added["0"]["id"]} style={{textDecoration: "none"}}><Button
                        size="large">Go To Movie's Page</Button></Link>
                </CardActions>
            </Card>
        </div>
    )
    let card2 = (
        <div>
            <Card sx={{maxWidth: 600}} style={{
                backgroundColor: "#cc2062",
                marginRight: "-15cm",
                marginLeft: "15cm",
                marginTop: "-13cm",
                marginBottom: "13cm",
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
                marginRight: "-15cm",
                marginLeft: "15cm",
                marginTop: "-13cm",
                marginBottom: "13cm",
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
                marginRight: "-15cm",
                marginLeft: "15cm",
                marginTop: "-13cm",
                marginBottom: "13cm",
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
                marginRight: "-15cm",
                marginLeft: "15cm",
                marginTop: "-13cm",
                marginBottom: "13cm",
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