import React, {useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import classes from "./last5Added.module.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

let bool = true
const numbers = [0, 1, 2, 3, 4];
let currentNumber
let setCurrentNumber

function Last5Added() {
    function ChangeHandler() {
        [currentNumber, setCurrentNumber] = useState("0");
        let temp = JSON.stringify(numbers[0])
        if (numbers.indexOf(parseInt(currentNumber)) == 4) {
            temp = JSON.stringify(numbers[0])
        } else {
            temp = JSON.stringify(numbers[(numbers.indexOf(parseInt(currentNumber)) + 1)])
        }
        console.log(temp)
        setInterval(() => {
            setCurrentNumber(temp);
        }, 3000)
    }

    if (bool = true) {
        ChangeHandler()
    }

    bool = false
    
    const LAST_5_ADDED = gql`
        query Last5Added{
            last5Added {
                title
                rank
                id
                image
            }
        }
    `;

    const {loading, error, data} = useQuery(LAST_5_ADDED)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    let loaded

    loaded = (
        <div>
            <Card sx={{maxWidth: 600}} style={{
                backgroundColor: "#cc2062",
                marginRight: "-15cm",
                marginLeft: "15cm",
                marginTop: "-13cm",
                marginBottom: "13cm",
                borderRadius: "100px"
            }}>
                <CardMedia
                    component="img"
                    alt="movie image"
                    height="300"
                    src={data.last5Added[currentNumber]["image"]}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <p style={{color: "yellow", fontSize: "xx-large"}} className={classes.movie}>
                            {data.last5Added[currentNumber]["title"]} : {data.last5Added[currentNumber]["rank"]} / 100
                        </p>
                    </Typography>
                </CardContent>
                <CardActions className={classes.buttons}>
                    <Button size="large">Share</Button>
                    <Link to={"/moviePage/" + data.last5Added[currentNumber]["id"]}
                          style={{textDecoration: "none"}}><Button
                        size="large">Go To Movie's Page</Button></Link>
                </CardActions>
            </Card>
        </div>
    )
    return <>{loaded}</>
}

export default Last5Added;