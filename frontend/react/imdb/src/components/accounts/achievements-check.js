import React from "react";

export function AchievementsCheck(props) {
    let givenUserID = props.userID
    const userData = {
        givenUserID
    };

    let result

    fetch('http://localhost:8081/signupForm', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .catch((err) => {
            console.error('error:', err)
        })
        .then((data) => {
            result = data
        })

    return result
}
