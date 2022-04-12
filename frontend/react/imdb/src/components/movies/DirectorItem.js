import { useContext } from "react";
import { Link } from 'react-router-dom';

import Card from "../ui/Card";
import classes from "./DirectorItem.module.css";

function DirectorItem(props) {
    const director = props.director

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <h3>{props.name}</h3>
                </div>
                <div className={classes.image}>
                    <img src={props.image} alt={props.name} />
                </div>
            </Card>
        </li>
    );
}

export default DirectorItem;
