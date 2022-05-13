import React from 'react'
import {gql, useQuery} from "@apollo/client";
import Card from "../components/ui/Card";
import classes from "../components/movies/MovieItem.module.css";
import {Link} from "react-router-dom";

function UserPage () {
    const USER_DATA = gql`
        query UserByID($id : ID!) {
            userById(id: $id) {
                id
                firstname
                lastname
                nickname
                description
                password
                email
                birthday
                profile
                reviews {
                    movie{
                        title
                    }
                    topic
                    text
                    rank
                }
            }
        }
    `;

    let url = JSON.stringify(window.location.href);
    let lastSegment = parseInt(url.split("/").pop(), 10);

    const {loading, error, data} = useQuery(USER_DATA,
        {
            variables: {
                id: lastSegment || 0
            }

        })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let firstName = data["users"]["0"]["firstname"]
    let lastName = data["users"]["0"]["lastname"]
    let nickName = data["users"]["0"]["nickname"]
    let Description = data["users"]["0"]["description"]
    let Password = data["users"]["0"]["password"]
    let Email = data["users"]["0"]["email"]
    let Birthday = data["users"]["0"]["birthday"]
    let Profile = data["users"]["0"]["profile"]
    let moviesReviews = data["users"]["0"]["reviews"]["0"]["movie"]["0"]["name"]
    let reviewTopic = data["users"]["0"]["reviews"]["0"]["topic"]
    let reviewText = data["users"]["0"]["reviews"]["0"]["text"]
    let reviewRank = data["users"]["0"]["reviews"]["0"]["rank"]

    console.log(data)

    let loaded = (
        <Card>
            <div>
                <p style={{color: "yellow", fontSize: "xx-large"}}>
                    {firstName} {lastName} {"/100"}
                </p>
            </div>
            {/*<div>*/}
            {/*    <p style={{color: "yellow", fontSize: "x-large"}}>*/}
            {/*        Year Of Release : {year}*/}
            {/*    </p>*/}
            {/*</div>*/}
            {/*<div className={classes.image}>*/}
            {/*    <img src={image}/>*/}
            {/*    {image}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h4 style={{color: "yellow"}}>*/}
            {/*        Movie description : {description}*/}
            {/*    </h4>*/}
            {/*    <h4 style={{color: "yellow"}}>*/}
            {/*        Directed by: <Link style={{color: "yellow"}} to={"/directorPage/" + directorId}>{director}</Link>*/}
            {/*    </h4>*/}
            {/*</div>*/}
        </Card>
    )
    return loaded
}

export default UserPage