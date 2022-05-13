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
                email
                birthday
                profile
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

    console.log(data)

    let firstName = data["userById"]["0"]["firstname"]
    let lastName = data["userById"]["0"]["lastname"]
    let nickName = data["userById"]["0"]["nickname"]
    let Description = data["userById"]["0"]["description"]
    let Email = data["userById"]["0"]["email"]
    let Birthday = data["userById"]["0"]["birthday"]
    let Profile = data["userById"]["0"]["profile"] || "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"


    let loaded = (
        <Card>
            <div>
                <p style={{color: "yellow", fontSize: "xx-large"}}>
                    {firstName} {lastName}
                </p>
            </div>
            <div>
                <p style={{color: "yellow", fontSize: "x-large"}}>
                    Born At : {Birthday}
                </p>
            </div>
            <div className={classes.image}>
                <img src={Profile}/>
                {Profile}
            </div>
            <div>
                <h4 style={{color: "yellow"}}>
                    Movie description : {Description}
                </h4>
                <h4 style={{color: "yellow"}}>
                    Wants To Contact {firstName} ? {Email}
                </h4>
            </div>
        </Card>
    )
    return loaded
}

export default UserPage