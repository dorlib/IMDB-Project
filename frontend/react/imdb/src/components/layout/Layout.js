import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import React, {useEffect, useState} from "react";
import SearchBar from "./search-bar";

function Layout(props) {
    const [userFirstName, setUserFirstName] = useState('Guest')
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        (
            async () => {
                await fetch("http://localhost:8081/user", {
                    method: 'get',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                }).then(response => response.json())
                    .catch((err) => {
                        console.error('error:', err)
                    })
                    .then((data) => {
                        console.log(data)
                        setUserId(data["0"]["id"])
                        setUserFirstName(data["0"]["firstname"])
                    });
            }
        )();
    });

    return (
        <div>
            <div>
                <MainNavigation firstname={userFirstName} id={userId}/>
                <main className={classes.main}>{props.children}</main>
            </div>
        </div>
    );
}

export default Layout;
