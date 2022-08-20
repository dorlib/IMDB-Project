import React, {useState} from 'react'

function ShowAchievement(props) {
    let image
    if (props.name === "king-of-likes") {
        image = ""
    } else if (props.name === "the-commenter") {
        image = ""
    } else if (props.name === "the-reviewer") {
        image = ""
    } else if (props.name === "movies-lover") {
        image = ""
    }

    let load = (
        <div>
            <img>
        </div>
    )



    if (image !== "") {
        return load
    }
    return null

}

export default ShowAchievement
