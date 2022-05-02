
import Card from "../ui/Card";
import classes from "./DirectorItem.module.css";

function DirectorItem(props) {
    const director = props.director

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <h3>{director.name}</h3>
                </div>
                <div className={classes.image}>
                    <img src={director.image} alt={director.name} />
                </div>
            </Card>
        </li>
    );
}

export default DirectorItem;
