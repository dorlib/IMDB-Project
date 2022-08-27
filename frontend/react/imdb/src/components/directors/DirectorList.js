import DirectorItem from './DirectorItem';
import classes from './DirectorList.module.css';

// DirectorList function shows a list of the directors on the client side
function DirectorList(props) {
    return (
        <ul className={classes.list}>
            {props.director.map((director) => (
                <DirectorItem
                    key={director.id}
                    id={director.id}
                    image={director.image}
                    name={director.name}
                />
            ))}
        </ul>
    );
}

export default DirectorList